import {
  Thermometer,
  FlaskConical,
  Ruler,
  Droplets,
} from "lucide-react";

const SPECS = [
  { icon: Thermometer, label: "Retention", value: "24H COLD / 12H HOT" },
  { icon: FlaskConical, label: "Material", value: "304 STAINLESS STEEL" },
  { icon: Ruler, label: "Dimensions", value: "25CM X 7.5CM" },
  { icon: Droplets, label: "Capacity", value: "750ML / 25OZ" },
];

const BOTTLE_FORMATION_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDb4lArGZmhHLwCGXwmgKRf2JxNfgYsSDcZvGoTpFQDYEi_VkQFUtSrhhxtsWCwHx2STvPOy_MtyUwIAFM2cNznmwUmOjaYe1pcC2Gp6PmDEVYkPRgLc6Tsal2yZsFUn5jSdv6AYYd_xAtzJiydNM_R5JqTWWJua2zlavEhuXcmha9XjroS0w96-3PaA9cbVB8tGPI4YqGamgpIhld9WXBnaVGAlWylRSmm_8uz6XhNkhHBUiRZ7OKoLDnfiakesUUsfC4xZq3y5XQ";

const TEXTURE_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDpX71l7Vewq95-jh7whjlOEjakLfZWJb14jbUNHGpFycTenMkNwpyg1HC48EeF_R_O0VzV35hj2EAdxe7S2NiHCAsZlaSUEXh3vitkgC1KojWctCZ_ihV9ACsLGGeoZW4DT6H1WAehOQrZ85iipUlAAqbCVoAM1GZ-MVWOxreZcG4TbzvnRxVeX4hQSAPjB8TvUUzDm0AUNlxTBijkWQRJv5IqwUCJ0vp-HO3pHcSQJo12rv27T3BUVkWp9Kz9O67T78bzsiHXA9M";

const CAP_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBYjp7stvRr7ObWAGEirWk0YmofoACnEopu4NMmRRMEhTqytdvTHmDRG0tjH4PN3ZUCECQMp2_Hlw-5qQMiLuHbphwhV4w6Bu-QlWOeIUEkiYb4913lq_kmBBfVocKPPd7GIj0lbstzKEs_AmLIHOmzE_FT717gHGrCmNuk_OHOh2liQ8DDS9Pgn9djU0gflZA6QtGmT0Lb3j4Jba5P8eEsXDG8xxDkppFTbfPFgHh4NSa16Kw1bTvjpCcHK7s7hYafzpzZ4y5mq2A";

export function SpecsSection() {
  return (
    <section className="px-4 md:px-12 py-12 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-8 order-2 lg:order-1">
          <div className="border-l-2 border-primary pl-6">
            <h2 className="text-3xl font-bold mb-2 font-display">
              ENGINEERED
              <br />
              PRECISION
            </h2>
            <p className="text-gray-400 max-w-md">
              Every curve is calculated. Every material is curated. The X-200
              isn&apos;t just a bottle; it&apos;s a vessel of technological
              advancement.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-px bg-neutral-border border border-neutral-border rounded overflow-hidden">
            {SPECS.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="bg-background-dark p-6 hover:bg-neutral-dark transition-colors group"
              >
                <Icon className="size-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-sm font-bold uppercase text-white mb-1">
                  {label}
                </h3>
                <p className="text-xs text-gray-500">{value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
          <div className="col-span-2 aspect-video rounded-lg overflow-hidden border border-neutral-border relative group">
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
            <img
              alt="High-end studio shot of brushed metal water bottles in formation"
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
              src={BOTTLE_FORMATION_IMAGE}
            />
            <div className="absolute bottom-4 right-4 bg-primary text-white text-xs px-2 py-1 rounded z-20">
              SERIES X
            </div>
          </div>
          <div className="aspect-square rounded-lg overflow-hidden border border-neutral-border relative group">
            <img
              alt="Detailed macro shot of aluminum bottle texture"
              className="w-full h-full object-cover"
              src={TEXTURE_IMAGE}
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-xs tracking-widest uppercase border border-white px-3 py-1">
                Micro Structure
              </span>
            </div>
          </div>
          <div className="aspect-square rounded-lg overflow-hidden border border-neutral-border bg-neutral-800 relative group">
            <img
              alt="Close up of metal bottle cap machining"
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              src={CAP_IMAGE}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-4 bg-black/40 backdrop-blur-sm rounded w-full h-full flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-white block mb-2">
                  100%
                </span>
                <span className="text-xs text-gray-300 uppercase tracking-widest">
                  Metal Construction
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
