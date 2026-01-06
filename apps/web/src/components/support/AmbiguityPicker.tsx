type AmbiguityPickerProps = {
  options: Array<{ id: string; label: string }>;
  resourceType: "product" | "order";
  prompt: string;
  onSelect: (id: string) => void;
};

export function AmbiguityPicker({
  options,
  resourceType,
  prompt,
  onSelect,
}: AmbiguityPickerProps) {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-2">
        {prompt}
        <span className="ml-1 text-[10px] uppercase text-primary/80">
          ({resourceType}s)
        </span>
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            className="px-4 py-2 rounded-lg border border-primary/50 text-primary hover:bg-primary/10"
          >
            {label || id}
          </button>
        ))}
      </div>
    </div>
  );
}
