import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

type ChatWidgetContextValue = {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  openChatWithMessage: (message: string) => void;
  pendingMessage: string | null;
  clearPendingMessage: () => void;
};

const ChatWidgetContext = createContext<ChatWidgetContextValue | null>(null);

export function ChatWidgetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);

  const openChat = useCallback(() => setIsOpen(true), []);
  const closeChat = useCallback(() => setIsOpen(false), []);

  const openChatWithMessage = useCallback((message: string) => {
    const trimmed = message.trim();
    setPendingMessage(trimmed || null);
    setIsOpen(true);
  }, []);

  const clearPendingMessage = useCallback(() => setPendingMessage(null), []);

  return (
    <ChatWidgetContext.Provider
      value={{ isOpen, openChat, closeChat, openChatWithMessage, pendingMessage, clearPendingMessage }}
    >
      {children}
    </ChatWidgetContext.Provider>
  );
}

export function useChatWidget() {
  const ctx = useContext(ChatWidgetContext);
  if (!ctx) {
    return {
      isOpen: false,
      openChat: () => {},
      closeChat: () => {},
      openChatWithMessage: () => {},
      pendingMessage: null,
      clearPendingMessage: () => {},
    };
  }
  return ctx;
}
