import { Link } from "react-router-dom";
import { Package, ShoppingBag, FileText, Droplets, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const USE_CASES = [
  {
    icon: Package,
    title: "Order status",
    examples: ["Where is my order?", "Track my shipment"],
  },
  {
    icon: ShoppingBag,
    title: "Product info",
    examples: ["Tell me about the Obsidian X-200", "Compare capacities"],
  },
  {
    icon: FileText,
    title: "Policies",
    examples: ["What's your return policy?", "Shipping to Canada?"],
  },
  {
    icon: Droplets,
    title: "Hydration tips",
    examples: ["How much water should I drink?"],
    note: "Personalized when logged in",
  },
];

export function InfoSection() {
  return (
    <section className="py-44 pb-20 px-4 md:px-12 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-px bg-primary" />
            <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
              The heart of Arctic
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight font-display">
            AI support at the heart of everything
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Our AI chatbot is the main interface for Arctic. Products, orders,
            and policies exist to support your conversation—ask anything, get
            grounded answers.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {USE_CASES.map(({ icon: Icon, title, examples, note }) => (
            <div
              key={title}
              className="border border-neutral-border rounded-lg p-6 bg-background-dark/50 hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Icon className="size-6 text-primary" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
              <ul className="space-y-1 text-sm text-gray-400">
                {examples.map((ex) => (
                  <li key={ex} className="italic">
                    &ldquo;{ex}&rdquo;
                  </li>
                ))}
              </ul>
              {note && (
                <p className="text-xs text-primary mt-2">{note}</p>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild className="bg-primary text-white! hover:bg-white hover:text-black!">
            <Link to="/support" className="flex items-center gap-2">
              Try the chat
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-neutral-border">
            <Link to="/docs" className="flex items-center gap-2">
              Learn more
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
