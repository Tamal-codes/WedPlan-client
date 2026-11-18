import type { ReactNode } from "react";
import Image from "next/image";

type AuthVariant = "sign-in" | "sign-up";

const showcase = {
  "sign-in": {
    quote:
      "We found our dream venue in a single weekend. WedPlan made the whole thing feel effortless.",
    name: "Amara & Josh",
    meta: "Married June 2026 · Lake Como",
  },
  "sign-up": {
    quote:
      "From the first shortlist to the final dance, every detail lived in one beautiful place.",
    name: "Priya & Daniel",
    meta: "Planning for 2027 · Santorini",
  },
} satisfies Record<AuthVariant, { quote: string; name: string; meta: string }>;

const stats = [
  { value: "2,000+", label: "Vendors" },
  { value: "150+", label: "Cities" },
  { value: "4.9/5", label: "Rating" },
];

export default function AuthShell({
  variant,
  children,
}: {
  variant: AuthVariant;
  children: ReactNode;
}) {
  const content = showcase[variant];

  return (
    <main className="relative isolate flex-1 overflow-hidden bg-gradient-to-br from-rose-50/60 via-slate-50 to-amber-50/40">
      {/* Ambient decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-rose-300/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-pink-300/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-200/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.05)_1px,transparent_0)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]"
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,27rem)_1fr] lg:gap-16 lg:px-8 lg:py-20">
        <div className="mx-auto w-full max-w-md">{children}</div>

        <aside className="relative hidden min-h-[38rem] overflow-hidden rounded-[2rem] border border-white/40 bg-slate-950 shadow-[0_40px_90px_-40px_rgba(15,23,42,0.6)] ring-1 ring-slate-900/5 lg:flex lg:flex-col lg:justify-end">
          <Image
            src="/images/wedding-banner.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 0px"
            className="object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-slate-950/10"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-rose-600/25 via-transparent to-amber-500/15"
          />

          {/* Glass badges */}
          <div className="absolute inset-x-6 top-6 flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-rose-50 shadow-sm backdrop-blur-md">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                className="h-3.5 w-3.5 text-rose-200"
                aria-hidden="true"
              >
                <circle cx="9" cy="12" r="5.25" />
                <circle cx="15" cy="12" r="5.25" />
              </svg>
              Trusted by 2,000+ vendors
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white shadow-sm backdrop-blur-md">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-3.5 w-3.5 text-amber-300"
                aria-hidden="true"
              >
                <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5L2.6 9.3l6.5-.9L12 2.5z" />
              </svg>
              4.9/5
            </span>
          </div>

          {/* Bottom showcase content */}
          <div className="relative p-8 xl:p-10">
            <div className="flex items-center gap-1 text-amber-300">
              {Array.from({ length: 5 }).map((_, index) => (
                <svg
                  key={index}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5L2.6 9.3l6.5-.9L12 2.5z" />
                </svg>
              ))}
            </div>

            <blockquote className="mt-4 text-balance text-2xl font-medium leading-snug tracking-tight text-white xl:text-[1.7rem]">
              &ldquo;{content.quote}&rdquo;
            </blockquote>

            <div className="mt-6 flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-pink-600 text-sm font-semibold text-white ring-2 ring-white/25">
                {content.name
                  .split(" ")
                  .filter((part) => part !== "&")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)}
              </span>
              <div>
                <p className="text-sm font-semibold text-white">
                  {content.name}
                </p>
                <p className="text-xs text-white/60">{content.meta}</p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/15 pt-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-lg font-semibold tracking-tight text-white">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-xs text-white/55">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
