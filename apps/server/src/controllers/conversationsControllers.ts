import { db } from "@repo/db";
import { Request, Response } from "express";
import { AppError } from "../utils/errorClasses";
import { messageSchema } from "@repo/zod";
import { conversationsTable, messagesTable } from "@repo/db/schema";
import { generateResponse } from "../ai";
import { getRecentConversationMessages } from "../services/db/conversationsServices";
import { eq } from "drizzle-orm";

const AI_CTRL_LOG = "[AI:Controller]";

export const listConversations = async (req: Request, res: Response) => {
  const userId = (req as Request & { user?: { id: string } }).user?.id;
  const conversations = userId
    ? await db
        .select()
        .from(conversationsTable)
        .where(eq(conversationsTable.userId, userId))
    : [];
  res.status(200).json({ success: true, data: conversations });
};

export const userQuery = async (req: Request, res: Response) => {
  const inputs = messageSchema.safeParse(req.body);

  if (!inputs.success) {
    console.warn(`${AI_CTRL_LOG} userQuery invalid input`, { issues: inputs.error.issues });
    throw new AppError(inputs.error.message ?? "Invalid inputs", 400);
  }

  let conversationId = inputs.data.conversationId;
  let userId = (req as Request & { user: { id: string } }).user?.id;
  console.log(`${AI_CTRL_LOG} userQuery`, {
    conversationId: conversationId ?? "new",
    textPreview: inputs.data.text.slice(0, 80),
    hasUserId: !!userId,
  });

  if (!conversationId) {
    const conversation = await db
      .insert(conversationsTable)
      .values({userId: userId ?? null})
      .returning();
    conversationId = conversation[0].id;
    console.log(`${AI_CTRL_LOG} created conversation`, { conversationId });
  } else {
    const [existingConversation] = await db
      .select()
      .from(conversationsTable)
      .where(eq(conversationsTable.id, conversationId))
      .limit(1);
    if (!existingConversation) {
      console.warn(`${AI_CTRL_LOG} conversation not found`, { conversationId });
      throw new AppError("Conversation not found", 404);
    }
  }

  const response = await generateResponse(conversationId!, inputs.data.text, userId);
  console.log(`${AI_CTRL_LOG} userQuery success`, {
    conversationId,
    responseType: response.type,
  });

  res.status(200).json({ success: true, data: response, conversationId });
};

export const getConversationMessages = async (req: Request, res: Response) => {
  const { conversationId } = req.params;
  if (!conversationId) {
    throw new AppError("Conversation ID is required", 400);
  }
  console.log(`${AI_CTRL_LOG} getConversationMessages`, { conversationId });
  const messages = await getRecentConversationMessages(conversationId);
  console.log(`${AI_CTRL_LOG} getConversationMessages loaded`, {
    conversationId,
    count: messages.length,
  });
  res.status(200).json({ success: true, data: messages });
};
