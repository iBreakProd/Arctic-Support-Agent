import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Info, Plus } from "lucide-react";
import api from "@/lib/api";
import { AppShell } from "@/components/layout/AppShell";
import { Modal } from "@/components/ui/Modal";
import { ProductGrid } from "@/components/product/ProductGrid";
import { CreateProductForm } from "@/components/product/CreateProductForm";

export function ProductsPage() {
  const [showCreate, setShowCreate] = useState(false);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await api.get("/products");
      return res.data.data;
    },
  });

  if (isLoading)
    return (
      <AppShell>
        <div className="min-h-screen flex items-center justify-center">
          Loading products…
        </div>
      </AppShell>
    );
  if (isError)
    return (
      <AppShell>
        <div className="min-h-screen flex items-center justify-center text-red-400">
          {error?.message}
        </div>
      </AppShell>
    );

  return (
    <AppShell>
      <main className="lg:pl-24 min-h-screen bg-grid-pattern p-4 md:p-8 lg:pr-8 relative">
        <div className="fixed top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="fixed bottom-20 left-40 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none z-0" />
        <div className="relative z-10 max-w-5xl mx-auto pt-24 lg:pt-12">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 border-b border-neutral-border pb-8 gap-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                OUR
                <br />
                <span className="text-outline">COLLECTION</span>
              </h1>
              <p className="text-gray-400 mt-4 max-w-xl">
                Precision-engineered hydration vessels. Crafted for the modern minimalist.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowCreate(true)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white font-bold hover:bg-primary-dark w-full md:w-auto transition-colors"
            >
              <Plus className="size-5" />
              Add product
            </button>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-lg border border-primary/30 bg-primary/5 mb-8">
            <Info className="size-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-gray-300">
              You can add mock products to verify Hydra, our AI support bot. Open the chat and ask about products—comparisons, recommendations, or details.
            </p>
          </div>
          <Modal
            open={showCreate}
            onClose={() => setShowCreate(false)}
            title="Add product"
          >
            <CreateProductForm onSuccess={() => setShowCreate(false)} />
          </Modal>
          <ProductGrid products={data ?? []} />
        </div>
      </main>
    </AppShell>
  );
}
