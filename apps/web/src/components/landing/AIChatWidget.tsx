import { Bot, MoreVertical, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { FeaturesSection } from "./FeaturesSection";

const STATIC_MESSAGES = [
  {
    role: "sent",
    text: "Where is my order #ORD-22C56AE4?",
    time: "10:41 AM",
  },
  {
    role: "received",
    text: "Order #ORD-22C56AE4 shipped. Expected delivery Feb 15. Want details on items or shipping address?",
    time: "10:41 AM",
  },
  {
    role: "sent",
    text: "What's your return policy?",
    time: "10:42 AM",
  },
  {
    role: "received",
    text: "Unopened shelf-stable products: 30 days. Opened bottles aren't eligible. Email support@arcticwater.com with order ID to start a return.",
    time: "10:42 AM",
    typing: true,
  },
];

export function AIChatWidget() {
  return (
    <section className="pt-32 pb-12 px-4 md:px-12 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="glass-panel rounded-xl overflow-hidden relative z-10">
              <div className="bg-white/5 border-b border-white/5 p-4 flex items-center justify-between backdrop-blur-sm pointer-events-none">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary border border-primary/20">
                      <Bot className="size-5" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-neutral-900 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm tracking-wide">
                      HydraBot AI
                    </h3>
                    <p className="text-xs text-primary font-medium">
                      System Online
                    </p>
                  </div>
                </div>
                <MoreVertical className="size-5 text-gray-500" />
              </div>
              <div className="p-6 h-[400px] overflow-y-auto space-y-6 relative bg-background-dark/80">
                {STATIC_MESSAGES.map((msg, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex flex-col gap-1",
                      msg.role === "sent" ? "items-end" : "items-start"
                    )}
                  >
                    <div
                      className={cn(
                        "p-4 text-sm max-w-[85%] shadow-lg",
                        msg.role === "received"
                          ? "chat-bubble-received text-gray-200"
                          : "chat-bubble-sent"
                      )}
                    >
                      {msg.typing ? (
                        <div className="flex gap-1 mb-2">
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
                      ) : null}
                      {msg.text}
                    </div>
                    <span
                      className={cn(
                        "text-[10px] text-gray-500 font-mono",
                        msg.role === "sent" ? "mr-1" : "ml-1"
                      )}
                    >
                      {msg.time}
                    </span>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-background-dark/80 border-t border-white/5 backdrop-blur-sm pointer-events-none">
                <div className="flex gap-3 items-center">
                  <div className="flex-1 h-12 bg-black/20 border border-white/10 rounded-lg px-4 flex items-center text-sm text-gray-500">
                    Ask about orders, products, or how I work...
                  </div>
                  <div className="shrink-0 size-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    <Send className="size-5" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -left-6 w-32 h-32 border-t border-l border-primary/20 rounded-tl-3xl pointer-events-none" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b border-r border-primary/20 rounded-br-3xl pointer-events-none" />
          </div>
          <div className="space-y-10 order-1 lg:order-2">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-px bg-primary" />
                <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
                  AI Support in Action
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-none tracking-tight font-display">
                ORDERS.
                <br />
                <span className="text-outline">POLICIES.</span>
                <br />
                <span className="text-gradient-grain">PERSONALIZED.</span>
              </h2>
              <p className="text-gray-400 leading-relaxed text-lg max-w-md">
                Orders, products, shipping, returns, hydration advice—all from
                one chat. Real data, instant answers. Log in for personalized
                recommendations.
              </p>
            </div>
            <FeaturesSection />
          </div>
        </div>
      </div>
    </section>
  );
}
