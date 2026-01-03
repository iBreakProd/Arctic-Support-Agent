import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  name: string;
  description: string;
  price: string;
  imageSrc: string;
  imageAlt: string;
  badge?: string;
  featured?: boolean;
}

export function ProductCard({
  name,
  description,
  price,
  imageSrc,
  imageAlt,
  badge,
  featured = false,
}: ProductCardProps) {
  return (
    <div
      className={cn(
        "group relative bg-background-dark border-2 rounded-lg overflow-hidden h-[500px] transition-all duration-300",
        featured
          ? "border-primary shadow-[0_0_30px_rgba(48,140,232,0.15)]"
          : "border-transparent hover:border-primary"
      )}
    >
      {badge && (
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
            {badge}
          </span>
        </div>
      )}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10 transition-opacity",
          featured ? "opacity-60 group-hover:opacity-40" : "opacity-60 group-hover:opacity-40"
        )}
      />
      <img
        alt={imageAlt}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        src={imageSrc}
      />
      <div
        className={cn(
          "absolute bottom-0 left-0 w-full p-6 z-20 transition-transform duration-300",
          featured ? "" : "transform translate-y-4 group-hover:translate-y-0"
        )}
      >
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
          <span className="text-xl font-bold text-primary">{price}</span>
        </div>
        <Button
          className={cn(
            "w-full mt-4 uppercase tracking-widest transition-opacity duration-300",
            featured
              ? "bg-primary hover:bg-white hover:text-black"
              : "bg-white text-black opacity-0 group-hover:opacity-100 hover:bg-primary hover:text-white"
          )}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
