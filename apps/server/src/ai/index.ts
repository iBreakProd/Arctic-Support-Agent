import {
  getRecentConversationMessages,
  saveUserAndAssistantMessage,
} from "../services/db/conversationsServices";
import { systemPrompt } from "./prompts";
import { messagesTable } from "@repo/db/schema";
import { tools, toolRunner } from "./tools";
import { openaiClient } from "./client";
import { aiResponseSchema } from "@repo/zod";
import { AppError } from "../utils/errorClasses";

const AI_LOG = "[AI]";

export const generateResponse = async (
  conversationId: string,
  userQuery: string,
  userId?: string
) => {
  console.log(`${AI_LOG} generateResponse started`, {
    conversationId,
    userQuery: userQuery.slice(0, 100),
    hasUserId: !!userId,
  });
  try {
    const history = await getRecentConversationMessages(conversationId);
    console.log(`${AI_LOG} loaded history`, {
      conversationId,
      historyCount: history.length,
    });

    const userContext = userId ? `\n\nThe current user id is ${userId}. Use getUserProfile tool with userId parameter when the user asks about hydration, lifestyle, or personalized advice.` : "";

    const messages = [
      { role: "system", content: systemPrompt + userContext },
      ...history.map((message: typeof messagesTable) => ({
        role: message.sender,
        content: message.text,
      })),
      { role: "user", content: userQuery },
    ];

    console.log(`${AI_LOG} calling OpenAI`, {
      messageCount: messages.length,
      model: "gpt-4o-mini",
    });
    let res = await openaiClient.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      tools,
      max_tokens: 1000,
    });

    let toolCallIterations = 0;
    const MAX_TOOL_CALL_ITERATIONS = 5;

    while (
      res.choices[0]?.finish_reason === "tool_calls" &&
      toolCallIterations < MAX_TOOL_CALL_ITERATIONS
    ) {
      const msg = res.choices[0]?.message;
      const toolCalls = msg?.tool_calls ?? [];

      toolCallIterations++;
      console.log(`${AI_LOG} tool call iteration ${toolCallIterations}`, {
        finishReason: res.choices[0]?.finish_reason,
        toolCallCount: toolCalls.length,
      });

      if (toolCalls.length === 0) {
        console.log(`${AI_LOG} breaking: no tool calls`);
        break;
      }

      messages.push(msg);

      for (const call of toolCalls) {
        if (call.type !== "function") continue;

        let toolResult: string;
        let args: Record<string, unknown>;

        try {
          args = JSON.parse(call.function.arguments);
        } catch (error) {
          console.warn(`${AI_LOG} invalid tool args`, {
            toolName: call.function.name,
            raw: call.function.arguments,
          });
          messages.push({
            role: "tool",
            tool_call_id: call.id,
            content: JSON.stringify({ error: "Invalid tool arguments, please try again" }),
          });
          continue;
        }
        try {
          toolResult = await toolRunner(call.function.name, args, { userId });
          console.log(`${AI_LOG} tool result`, {
            toolName: call.function.name,
            resultPreview: typeof toolResult === "string" ? toolResult.slice(0, 150) : JSON.stringify(toolResult).slice(0, 150),
          });
        } catch (error) {
          console.error(`${AI_LOG} tool execution failed`, {
            toolName: call.function.name,
            args,
            error: error instanceof Error ? error.message : String(error),
          });
          toolResult = JSON.stringify({ error: "Tool execution failed, please try again" });
        }
        messages.push({
          role: "tool",
          tool_call_id: call.id,
          content: typeof toolResult === "string" ? toolResult : JSON.stringify(toolResult),
        });
      }

      res = await openaiClient.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
        tools,
        max_tokens: 1000,
      });
    }

    const finalMessage = res.choices[0]?.message;
    console.log(`${AI_LOG} OpenAI response`, {
      finishReason: res.choices[0]?.finish_reason,
      hasContent: !!finalMessage?.content,
    });
    if (!finalMessage) {
      console.error(`${AI_LOG} no final message from OpenAI`);
      throw new AppError("Ai did not respond, please try again", 500);
    }

    const rawResponse = finalMessage.content ?? "{}";
    let parsedResponseJson;
    try {
      parsedResponseJson = JSON.parse(rawResponse);
    } catch (error) {
      console.error(`${AI_LOG} failed to parse response JSON`, {
        rawPreview: rawResponse.slice(0, 200),
      });
      throw new AppError(
        "Ai responded with invalid data, please try again",
        500
      );
    }

    if (
      parsedResponseJson?.type === "answer" &&
      Array.isArray(parsedResponseJson.embeddings) &&
      parsedResponseJson.embeddings.length > 6
    ) {
      console.log(`${AI_LOG} truncating embeddings`, {
        original: parsedResponseJson.embeddings.length,
      });
      parsedResponseJson.embeddings = parsedResponseJson.embeddings.slice(0, 6);
    }

    const parsedResponse = aiResponseSchema.safeParse(parsedResponseJson);
    if (!parsedResponse.success) {
      console.warn(`${AI_LOG} response schema validation failed`, {
        raw: parsedResponseJson,
        issues: parsedResponse.error.issues,
      });
      throw new AppError(
        "Ai responded with invalid data, please try again",
        500
      );
    }
    console.log(`${AI_LOG} parsed response`, {
      type: parsedResponse.data.type,
      responsePreview: typeof parsedResponse.data.response === "string" ? parsedResponse.data.response.slice(0, 80) : undefined,
    });

    await saveUserAndAssistantMessage(conversationId, userQuery, rawResponse);
    console.log(`${AI_LOG} generateResponse completed`, { conversationId });
    return parsedResponse.data;
  } catch (error: any) {
    if (error?.status === 429) {
      throw new AppError(
        "AI service is currently rate limited. Please try again in a moment.",
        429
      );
    }
    if (error?.status === 401) {
      throw new AppError(
        "AI service authentication failed. Please contact support.",
        500
      );
    }
    if (error?.code === "ECONNABORTED" || error?.message?.includes("timeout")) {
      throw new AppError(
        "AI service request timed out. Please try again.",
        504
      );
    }
    if (error instanceof AppError) {
      throw error;
    }

    console.error(`${AI_LOG} OpenAI API error`, {
      status: error?.status,
      code: error?.code,
      message: error?.message,
    });
    throw new AppError(
      "Failed to generate AI response. Please try again later.",
      500
    );
  }
};
