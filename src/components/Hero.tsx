import Image from "next/image";
import Link from "next/link";

const stats = [
  { value: "2,000+", label: "Trusted vendors" },
  { value: "150+", label: "Cities covered" },
  { value: "4.9/5", label: "Couple rating" },
];

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[560px] items-center overflow-hidden sm:min-h-[620px] lg:min-h-[680px]">
      <Image
        src="/images/wedding-banner.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

  
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/15"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/25"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-rose-500/25 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-rose-50 shadow-sm backdrop-blur-md">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 text-rose-300"
              aria-hidden="true"
            >
              <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
              <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
            </svg>
            Wedding planning made simple
          </span>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
            Plan the wedding you have always{" "}
            <span className="bg-gradient-to-r from-rose-300 via-pink-300 to-amber-200 bg-clip-text text-transparent">
              dreamed of
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            From breathtaking venues and talented photographers to every little
            detail in between — discover trusted wedding services, all in one
            beautifully curated place.
          </p>

          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rose-600/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-rose-600/40 outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Explore Wedding Services
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <span className="text-xs font-medium text-white/60 sm:text-sm">
              Free to browse · No booking fees
            </span>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
            {stats.map((stat, index) => (
              <div key={stat.label} className="flex items-center gap-8">
                {index > 0 && (
                  <span
                    aria-hidden="true"
                    className="hidden h-9 w-px bg-white/20 sm:block"
                  />
                )}
                <div>
                  <p className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-xs text-white/60 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
