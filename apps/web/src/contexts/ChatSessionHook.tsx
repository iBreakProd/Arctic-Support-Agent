import { createContext, useContext } from "react";
import type { Message } from "./ChatSessionContext";

export type AmbiguityState = {
  response: string;
  id_array: string[];
  resourceType: "product" | "order";
};

export type ChatSessionState = {
  conversationId: string | null;
  messages: Message[];
  isLoading: boolean;
  isLoadingHistory: boolean;
  ambiguity: AmbiguityState | null;
  sendMessage: (text: string) => Promise<void>;
  handleAmbiguitySelect: (id: string) => void;
  clearSession: () => void;
  loadConversation: (id: string | null) => void;
};


export const ChatSessionContext = createContext<ChatSessionState | null>(null);

export function useChatSession(): ChatSessionState {
  const ctx = useContext(ChatSessionContext);
  if (!ctx) {
    throw new Error("useChatSession must be used within ChatSessionProvider");
  }
  return ctx;
}
