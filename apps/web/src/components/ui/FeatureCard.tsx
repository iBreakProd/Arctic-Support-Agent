import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon: Icon, title, description, className }: FeatureCardProps) {
  return (
    <div className={cn("flex gap-6 group", className)}>
      <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300 shadow-lg shadow-black/20">
        <Icon className="size-6 text-primary group-hover:scale-110 transition-transform" />
      </div>
      <div>
        <h3 className="text-white font-bold text-xl mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
