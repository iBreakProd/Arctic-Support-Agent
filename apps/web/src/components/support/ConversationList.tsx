import type { Conversation } from "@/types/conversation";

type ConversationListProps = {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
};

export function ConversationList({
  conversations,
  selectedId,
  onSelect,
}: ConversationListProps) {
  const sorted = [...conversations].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="flex flex-col gap-3">
      {sorted.map((c) => (
        <button
          key={c.id}
          type="button"
          onClick={() => onSelect(c.id)}
          className={`w-full text-left p-4 rounded-lg transition-all duration-300 border group hover:border-primary/50 ${
            selectedId === c.id
              ? "glass-panel border-primary/40 bg-primary/5"
              : "border-neutral-border bg-white/5 hover:bg-white/10"
          }`}
        >
          <span className="block truncate text-sm font-medium text-white">
            {new Date(c.createdAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </button>
      ))}
      {sorted.length === 0 && (
        <p className="text-gray-400 text-sm py-4">No past conversations yet.</p>
      )}
    </div>
  );
}
