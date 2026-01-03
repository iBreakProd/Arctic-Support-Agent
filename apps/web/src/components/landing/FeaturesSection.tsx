import { Package, ShoppingBag, FileText, Droplets } from "lucide-react";
import { FeatureCard } from "@/components/ui/FeatureCard";

const FEATURES = [
  {
    icon: Package,
    title: "Order tracking",
    description:
      "Look up orders by ID or list all your orders. Get status and shipment details instantly.",
  },
  {
    icon: ShoppingBag,
    title: "Product catalog",
    description: "Browse products, compare specs, and get detailed info on any item.",
  },
  {
    icon: FileText,
    title: "Policies",
    description: "Ask about shipping, returns, refunds, and company information—all in one place.",
  },
  {
    icon: Droplets,
    title: "Hydration consulting",
    description:
      "Personalized hydration and lifestyle advice when logged in. General tips available to everyone.",
  },
];

export function FeaturesSection() {
  return (
    <section className="space-y-8">
      {FEATURES.map((feature) => (
        <FeatureCard
          key={feature.title}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </section>
  );
}
