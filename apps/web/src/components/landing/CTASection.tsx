import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CTASection() {
  const [email, setEmail] = useState("");

  return (
    <section className="py-24 px-4 relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="relative z-10 max-w-4xl w-full border border-neutral-border bg-background-dark/80 backdrop-blur-md p-8 md:p-16 text-center rounded-xl shadow-2xl">
        <span className="inline-block text-primary border border-primary/30 bg-primary/10 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
          Join the Movement
        </span>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight font-display">
          ELEVATE YOUR DAILY RITUAL
        </h2>
        <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
          Subscribe to our exclusive list. Get early access to limited edition
          drops, urban hydration guides, and a welcome gift on your first order.
        </p>
        <form
          className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            type="email"
            placeholder="ENTER YOUR EMAIL"
            className="flex-1 bg-neutral-900 border-neutral-border py-4 px-4 text-sm placeholder:text-gray-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            className="bg-primary hover:bg-white hover:text-black text-white px-8 py-4 rounded font-bold uppercase tracking-widest whitespace-nowrap"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
