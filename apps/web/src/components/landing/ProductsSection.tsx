import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useChatWidget } from "@/contexts/ChatWidgetContext";
import { ProductCard } from "@/components/product/ProductCard";

const PRODUCTS = [
  {
    name: "OBSIDIAN",
    description: "Matte Finish / 750ml",
    price: "$45",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBYjp7stvRr7ObWAGEirWk0YmofoACnEopu4NMmRRMEhTqytdvTHmDRG0tjH4PN3ZUCECQMp2_Hlw-5qQMiLuHbphwhV4w6Bu-QlWOeIUEkiYb4913lq_kmBBfVocKPPd7GIj0lbstzKEs_AmLIHOmzE_FT717gHGrCmNuk_OHOh2liQ8DDS9Pgn9djU0gflZA6QtGmT0Lb3j4Jba5P8eEsXDG8xxDkppFTbfPFgHh4NSa16Kw1bTvjpCcHK7s7hYafzpzZ4y5mq2A",
    imageAlt: "Matte black water bottle isolated on dark background",
  },
  {
    name: "CHROME",
    description: "Polished / 750ml",
    price: "$345",
    imageSrc: "/images/products/B-5.png",
    imageAlt: "Silver stainless steel water bottle on concrete",
    badge: "Best Seller",
    featured: true,
  },
  {
    name: "ALABASTER",
    description: "Soft Touch / 750ml",
    price: "$45",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAgbuZh6MNrIBW6qAmlBCZhPn8z1w4NlzyoVZz8HszKI6lUiWTqcOvDC9ogfJDZKHxbyQzPoEIGnyuW3X5CcoZmb67Ouz2btOY1eLX8mX6XnoHSyQayF429RuDY79vBYhs-9u5cmDjh6FEkr-e-Dg4Ztobp08FjwQGGggxyIt_m0LBjs7qDN9mvE56DtRko6sTmBxyrMqUyIY39fHEgktA3HyXtUM5z-sGPXshZK7GHRwYYTMKebtH8gOjGAPvHx_GYFpLV9jnRUF8",
    imageAlt: "White minimalistic water bottle in sunlight",
  },
];

export function ProductsSection() {
  const { openChat } = useChatWidget();
  return (
    <section className="py-20 px-4 md:px-12 bg-neutral-dark/50 border-t border-b border-neutral-border relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary to-transparent opacity-50" />
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold uppercase font-display mb-3">
          Ask the AI about these<span className="text-primary">.</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mb-6">
          These are live products. Ask the AI for details, comparisons, or
          recommendations.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-widest hover:text-white transition-colors"
          >
            View all products
            <ArrowRight className="size-4" />
          </Link>
          <button
            type="button"
            onClick={openChat}
            className="inline-flex items-center gap-2 text-gray-400 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors"
          >
            <MessageCircle className="size-4" />
            Try the chat
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PRODUCTS.map((product) => (
          <ProductCard
            key={product.name}
            name={product.name}
            description={product.description}
            price={product.price}
            imageSrc={product.imageSrc}
            imageAlt={product.imageAlt}
            badge={product.badge}
            featured={product.featured}
          />
        ))}
      </div>
    </section>
  );
}
