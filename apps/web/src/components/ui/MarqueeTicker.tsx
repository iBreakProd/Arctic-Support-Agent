interface MarqueeTickerProps {
  items: Array<string | React.ReactNode>;
}

export function MarqueeTicker({ items }: MarqueeTickerProps) {
  return (
    <div className="border-t border-b border-neutral-border py-3 overflow-hidden flex bg-neutral-dark relative">
      <div className="absolute inset-0 bg-grain opacity-10 pointer-events-none" />
      <div className="whitespace-nowrap flex gap-12 animate-marquee items-center">
        {items.map((item, i) => (
          <span key={i} className="contents">
            {typeof item === "string" ? (
              <span
                className={`text-2xl font-bold tracking-widest ${
                  i % 2 === 0 ? "text-transparent text-outline" : "text-white"
                }`}
              >
                {item}
              </span>
            ) : (
              item
            )}
            <span className="w-2 h-2 bg-primary rotate-45 shrink-0" />
          </span>
        ))}
        {items.map((item, i) => (
          <span key={`dup-${i}`} className="contents">
            {typeof item === "string" ? (
              <span
                className={`text-2xl font-bold tracking-widest ${
                  i % 2 === 0 ? "text-transparent text-outline" : "text-white"
                }`}
              >
                {item}
              </span>
            ) : (
              item
            )}
            <span className="w-2 h-2 bg-primary rotate-45 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
