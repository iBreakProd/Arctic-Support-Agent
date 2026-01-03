import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-full w-20 border-r border-neutral-border bg-background z-50 flex-col items-center justify-between py-8">
      <Link
        to="/"
        className="h-10 w-10 bg-primary rounded flex items-center justify-center text-white font-bold text-xl overflow-hidden p-1"
      >
        <img
          alt="Arctic Logo"
          className="w-full h-full object-contain"
          src="/arctic.png"
        />
      </Link>
      <div className="flex flex-row gap-12 -rotate-90">
        <Link
          to="/"
          className="text-sm font-bold tracking-widest hover:text-primary transition-colors whitespace-nowrap"
        >
          Home
        </Link>
        <Link
          to="/products"
          className="text-sm font-bold tracking-widest hover:text-primary transition-colors whitespace-nowrap"
        >
          Products
        </Link>
        <Link
          to="/orders"
          className="text-sm font-bold tracking-widest hover:text-primary transition-colors whitespace-nowrap"
        >
          Orders
        </Link>
        <Link
          to="/docs"
          className="text-sm font-bold tracking-widest hover:text-primary transition-colors whitespace-nowrap"
        >
          Docs
        </Link>
      </div>
      <div className="flex flex-col gap-6 text-gray-400">
        <ShoppingBag className="size-5 cursor-pointer hover:text-primary transition-colors" />
      </div>
    </aside>
  );
}
