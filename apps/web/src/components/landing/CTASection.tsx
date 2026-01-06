import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, BookOpen } from "lucide-react";
import { useChatWidget } from "@/contexts/ChatWidgetContext";

export function CTASection() {
  const { openChat } = useChatWidget();
  return (
    <section className="py-24 px-4 relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="relative z-10 max-w-4xl w-full border border-neutral-border bg-background-dark/80 backdrop-blur-md p-8 md:p-16 text-center rounded-xl shadow-2xl">
        <span className="inline-block text-primary border border-primary/30 bg-primary/10 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
          Try it now
        </span>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight font-display">
          TRY THE AI SUPPORT
        </h2>
        <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
          Open the chat and ask about orders, products, shipping, returns, or
          hydration. Or read the full documentation to see how it&apos;s built.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={openChat}
            className="bg-primary text-white! hover:bg-white hover:text-black! px-8 py-4 rounded font-bold uppercase tracking-widest whitespace-nowrap flex items-center gap-2"
          >
            <MessageCircle className="size-5" />
            Open Support Chat
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-neutral-border text-gray-300 hover:bg-white/5 px-8 py-4 rounded font-bold uppercase tracking-widest whitespace-nowrap flex items-center gap-2"
          >
            <Link to="/docs">
              <BookOpen className="size-5" />
              Read Documentation
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
