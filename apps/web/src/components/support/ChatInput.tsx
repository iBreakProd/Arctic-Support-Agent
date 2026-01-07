import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

type ChatInputProps = {
  onSend: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
  initialValue?: string;
};

export function ChatInput({ onSend, disabled, placeholder, autoFocus, initialValue }: ChatInputProps) {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialValue?.trim()) {
      setText(initialValue);
      const id = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(id);
    }
  }, [initialValue]);

  useEffect(() => {
    if (autoFocus && !initialValue && inputRef.current) {
      const id = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(id);
    }
  }, [autoFocus, initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed && !disabled) {
      onSend(trimmed);
      setText("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 rounded-xl bg-background-dark/80 transition-all"
    >
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder ?? "Type a message..."}
        disabled={disabled}
        maxLength={1000}
        className="flex-1 px-4 py-3 rounded-lg bg-transparent text-white placeholder:text-gray-500 disabled:opacity-50 outline-none text-sm focus:outline-none"
      />
      <button
        type="submit"
        disabled={disabled || !text.trim()}
        className="px-4 py-3 rounded-lg bg-primary text-white font-bold disabled:opacity-50 hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
        aria-label="Send message"
      >
        <Send className="size-4" />
      </button>
    </form>
  );
}
