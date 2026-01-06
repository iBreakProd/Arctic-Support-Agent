import { Database, FileText, LayoutGrid, User } from "lucide-react";
import { Link } from "react-router-dom";

const CAPABILITIES = [
  {
    icon: Database,
    label: "Real data",
    value: "Orders, products, profiles from DB",
  },
  {
    icon: FileText,
    label: "Knowledge",
    value: "Shipping, returns, company info",
  },
  {
    icon: LayoutGrid,
    label: "Embeddings",
    value: "Clickable product/order cards",
  },
  {
    icon: User,
    label: "Personalization",
    value: "Hydration advice when logged in",
  },
];

const BOTTLE_FORMATION_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDb4lArGZmhHLwCGXwmgKRf2JxNfgYsSDcZvGoTpFQDYEi_VkQFUtSrhhxtsWCwHx2STvPOy_MtyUwIAFM2cNznmwUmOjaYe1pcC2Gp6PmDEVYkPRgLc6Tsal2yZsFUn5jSdv6AYYd_xAtzJiydNM_R5JqTWWJua2zlavEhuXcmha9XjroS0w96-3PaA9cbVB8tGPI4YqGamgpIhld9WXBnaVGAlWylRSmm_8uz6XhNkhHBUiRZ7OKoLDnfiakesUUsfC4xZq3y5XQ";

export function SpecsSection() {
  return (
    <section className="px-4 md:px-12 pt-24 md:pt-32 pb-24 md:pb-40 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-10 order-2 lg:order-1">
          <div className="border-l-4 border-primary pl-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 font-display tracking-tight">
              BUILT FOR
              <br />
              <span className="text-primary">ACCURACY</span>
            </h2>
            <p className="text-gray-400 max-w-md text-base leading-relaxed">
              Tool-driven intelligence. The AI fetches real data and knowledge—no
              hallucination. Every answer is grounded in orders, products,
              policies, or your profile.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {CAPABILITIES.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="bg-neutral-dark/50 border border-neutral-border rounded-xl p-5 hover:border-primary/30 hover:bg-neutral-dark transition-all duration-200 group"
              >
                <Icon className="size-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-sm font-bold uppercase tracking-wide text-white mb-1.5">
                  {label}
                </h3>
                <p className="text-xs text-gray-500 leading-snug">{value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="aspect-square rounded-xl overflow-hidden border border-neutral-border relative group shadow-xl shadow-primary/5">
            <img
              alt="AI support—user asks, AI responds with real data"
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 opacity-90"
              src={BOTTLE_FORMATION_IMAGE}
            />
            <div className="absolute inset-0 bg-linear-to-t from-background-dark via-background-dark/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-3 text-sm">
              <div className="flex items-center gap-3">
                <span className="bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-md text-gray-200 font-medium">
                  User asks
                </span>
                <span className="text-primary text-lg">→</span>
                <span className="bg-primary/25 backdrop-blur-sm px-3 py-1.5 rounded-md text-primary font-semibold">
                  AI responds with data
                </span>
              </div>
            </div>
            <Link
              to="/docs"
              className="absolute bottom-6 right-6 bg-primary text-white! hover:bg-white hover:text-black! text-sm px-4 py-2 rounded-lg font-medium transition-colors shadow-lg"
            >
              See architecture
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
