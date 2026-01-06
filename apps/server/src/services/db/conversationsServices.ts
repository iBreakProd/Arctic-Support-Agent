import { db } from "@repo/db";
import { eq } from "drizzle-orm";
import { messagesTable } from "@repo/db/schema";
import { PgTransaction } from "drizzle-orm/pg-core";

const AI_DB_LOG = "[AI:DB]";

export const getRecentConversationMessages = async (conversationId: string) => {
  const messages = await db
    .select()
    .from(messagesTable)
    .where(eq(messagesTable.conversationId, conversationId))
    .orderBy(messagesTable.createdAt)
    .limit(10);
  console.log(`${AI_DB_LOG} getRecentConversationMessages`, {
    conversationId,
    count: messages.length,
  });
  return messages;
};

export const saveUserAndAssistantMessage = async (
  conversationId: string,
  userMessage: string,
  assistantMessage: string
) => {
  console.log(`${AI_DB_LOG} saveUserAndAssistantMessage`, {
    conversationId,
    userPreview: userMessage.slice(0, 50),
    assistantPreview: assistantMessage.slice(0, 80),
  });
  await db.transaction(async (tx: PgTransaction<typeof db.schema>) => {
    await tx.insert(messagesTable).values({
      conversationId,
      sender: "user",
      text: userMessage,
    });
    await tx.insert(messagesTable).values({
      conversationId,
      sender: "assistant",
      text: assistantMessage,
    });
  });
};
