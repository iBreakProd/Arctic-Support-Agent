import { useEffect, useRef, useMemo } from "react";
import { useChatSession } from "@/contexts/ChatSessionHook";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { AmbiguityPicker } from "./AmbiguityPicker";

function getFollowUpSuggestions(lastUserMessage: string): string[] {
  const lower = lastUserMessage.toLowerCase();
  if (/\b(order|track|shipment|delivery)\b/.test(lower)) {
    return [
      "What's the delivery date?",
      "Can I change the shipping address?",
      "What's the return policy for this order?",
    ];
  }
  if (/\b(product|bottle|catalog)\b/.test(lower)) {
    return [
      "Compare with similar products",
      "What's the warranty?",
      "Show me more options under $100",
    ];
  }
  if (/\b(shipping|deliver)\b/.test(lower)) {
    return [
      "What's the return policy?",
      "How do I track my shipment?",
      "Do you ship internationally?",
    ];
  }
  if (/\b(return|refund)\b/.test(lower)) {
    return [
      "How long does a refund take?",
      "Can I exchange instead?",
      "How do I start a return?",
    ];
  }
  if (/\b(hydration|water|drink)\b/.test(lower)) {
    return [
      "How much water should I drink?",
      "Tips for my climate",
      "Personalized recommendations",
    ];
  }
  if (/\b(how|what|documentation|api|architecture)\b/.test(lower)) {
    return [
      "What tools do you have?",
      "How does the API work?",
      "What endpoints exist?",
    ];
  }
  return [
    "Tell me about my orders",
    "What products do you have?",
    "What's your return policy?",
  ];
}

type ChatWindowProps = {
  initialQuery?: string;
  suggestions?: string[];
  className?: string;
  autoScroll?: boolean;
  autoFocusInput?: boolean;
};

export function ChatWindow({
  initialQuery,
  suggestions = [],
  className = "",
  autoScroll = true,
  autoFocusInput = false,
}: ChatWindowProps) {
  const {
    messages,
    isLoading,
    isLoadingHistory,
    ambiguity,
    sendMessage,
    handleAmbiguitySelect,
  } = useChatSession();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const initialQuerySent = useRef(false);

  const scrollToBottom = (smooth = true) => {
    const el = scrollContainerRef.current;
    if (el) {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: smooth ? "smooth" : "auto",
      });
    }
  };

  useEffect(() => {
    if (!autoScroll) return;
    scrollToBottom(true);
  }, [messages, isLoading, autoScroll]);

  useEffect(() => {
    if (!autoScroll) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToBottom(false));
    });
    return () => cancelAnimationFrame(id);
  }, [autoScroll]);

  useEffect(() => {
    if (
      initialQuery &&
      !initialQuerySent.current &&
      !isLoadingHistory &&
      messages.length === 0
    ) {
      initialQuerySent.current = true;
      sendMessage(initialQuery);
    }
  }, [initialQuery, isLoadingHistory, messages.length, sendMessage]);

  const options = ambiguity?.id_array.map((id) => ({ id, label: id })) ?? [];

  const displayedSuggestions = useMemo(() => {
    if (messages.length === 0) return suggestions;
    const lastUser = [...messages].reverse().find((m) => m.sender === "user");
    return lastUser ? getFollowUpSuggestions(lastUser.text) : suggestions;
  }, [messages, suggestions]);

  return (
    <div
      className={`flex flex-col ${
        className ? className : "h-[70vh] min-h-0"
      }`}
    >
      {isLoadingHistory && (
        <div className="flex items-center justify-center py-8 text-gray-400">
          Loading conversation…
        </div>
      )}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2"
      >
        {messages.length === 0 && !isLoadingHistory && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-gray-400 text-sm mb-2">
              Hi! I'm Hydra. How can I help you today?
            </p>
            <p className="text-gray-500 text-xs max-w-[280px]">
              Ask about orders, products, shipping, or get personalized hydration tips.
            </p>
          </div>
        )}
        {messages.map((m) => (
          <ChatMessage
            key={m.id}
            text={m.text}
            sender={m.sender}
            timestamp={m.timestamp}
            embeddings={m.embeddings}
          />
        ))}
        {ambiguity && (
          <AmbiguityPicker
            options={options}
            resourceType={ambiguity.resourceType}
            prompt="Which one did you mean?"
            onSelect={handleAmbiguitySelect}
          />
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="chat-bubble-received px-4 py-2 rounded-lg">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" />
                <span
                  className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                />
                <span
                  className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {displayedSuggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {displayedSuggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => sendMessage(s)}
              className="px-3 py-1.5 rounded-lg text-sm border border-primary/50 text-primary hover:bg-primary/10 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}
      <ChatInput
        onSend={sendMessage}
        disabled={isLoading}
        placeholder="Ask Hydra about orders, products, or support..."
        autoFocus={autoFocusInput}
      />
    </div>
  );
}
