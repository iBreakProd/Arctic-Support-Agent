import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

type EmbeddingCardProps = {
  type: "product" | "order";
  id: string;
};

const PLACEHOLDER_IMAGE = "/images/products/B-1.png";

function ProductEmbeddingCard({ id }: { id: string }) {
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await api.get<{
        data: { id: string; name: string; imageUrl: string };
      }>(`/products/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 p-3 rounded-lg border border-neutral-border bg-white/5 animate-pulse">
        <div className="w-12 h-12 rounded-lg bg-white/10 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="h-3 bg-white/10 rounded w-24 mb-2" />
          <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded font-bold uppercase">
            Product
          </span>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <Link
      to={`/products/${id}`}
      className="flex items-center gap-3 p-3 rounded-lg border border-neutral-border bg-white/5 hover:border-primary/50 hover:bg-primary/5 transition-all group"
    >
      <div className="w-12 h-12 rounded-lg overflow-hidden bg-neutral-800 shrink-0">
        <img
          src={product.imageUrl || PLACEHOLDER_IMAGE}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          onError={(e) => {
            (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
          }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate group-hover:text-primary transition-colors">
          {product.name}
        </p>
        <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded font-bold uppercase">
          Product
        </span>
      </div>
    </Link>
  );
}

function OrderEmbeddingCard({ id }: { id: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const res = await api.get<{
        data: {
          order: { id: string; total: string; createdAt: string };
          items: Array<{ product: { id: string; name: string; imageUrl: string } }>;
        };
      }>(`/orders/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 p-3 rounded-lg border border-neutral-border bg-white/5 animate-pulse">
        <div className="w-12 h-12 rounded-lg bg-white/10 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="h-3 bg-white/10 rounded w-20 mb-2" />
          <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded font-bold uppercase">
            Order
          </span>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { order, items } = data;
  const shortId = order.id.replace(/-/g, "").slice(-8).toUpperCase();
  const imageUrl =
    items[0]?.product?.imageUrl || PLACEHOLDER_IMAGE;

  return (
    <Link
      to={`/orders/${id}`}
      className="flex items-center gap-3 p-3 rounded-lg border border-neutral-border bg-white/5 hover:border-primary/50 hover:bg-primary/5 transition-all group"
    >
      <div className="w-12 h-12 rounded-lg overflow-hidden bg-neutral-800 shrink-0">
        <img
          src={imageUrl}
          alt={`Order #ORD-${shortId}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          onError={(e) => {
            (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
          }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate group-hover:text-primary transition-colors">
          #ORD-{shortId} · ${order.total}
        </p>
        <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded font-bold uppercase">
          Order
        </span>
      </div>
    </Link>
  );
}

export function EmbeddingCard({ type, id }: EmbeddingCardProps) {
  if (type === "product") {
    return <ProductEmbeddingCard id={id} />;
  }
  return <OrderEmbeddingCard id={id} />;
}
