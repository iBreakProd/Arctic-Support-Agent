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
};

const ChatWidgetContext = createContext<ChatWidgetContextValue | null>(null);

export function ChatWidgetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openChat = useCallback(() => setIsOpen(true), []);
  const closeChat = useCallback(() => setIsOpen(false), []);

  return (
    <ChatWidgetContext.Provider
      value={{ isOpen, openChat, closeChat }}
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
    };
  }
  return ctx;
}
