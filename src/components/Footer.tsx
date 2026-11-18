import Link from "next/link";

const linkGroups = [
  {
    title: "Services",
    links: [
      { label: "Wedding Venues", href: "/services" },
      { label: "Photographers", href: "/services" },
      { label: "Wedding Planners", href: "/services" },
      { label: "Catering & Cake", href: "/services" },
      { label: "Decor & Flowers", href: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/" },
      { label: "How it works", href: "/" },
      { label: "Careers", href: "/" },
      { label: "Press & media", href: "/" },
      { label: "Partner with us", href: "/" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help center", href: "/" },
      { label: "Contact us", href: "/" },
      { label: "Booking policy", href: "/" },
      { label: "FAQs", href: "/" },
      { label: "Trust & safety", href: "/" },
    ],
  },
];

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    path: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
  {
    label: "X (Twitter)",
    href: "https://x.com",
    path: (
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    path: (
      <>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <path d="M9.75 15.02 15.5 11.75 9.75 8.48v6.54z" />
      </>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative isolate mt-auto overflow-hidden bg-slate-950 text-slate-300">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-rose-500/25 via-pink-500/20 to-amber-400/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -right-32 h-[26rem] w-[26rem] rounded-full bg-pink-600/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-400/50 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="grid gap-12 pb-14 pt-16 sm:pb-16 sm:pt-20 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">
          <div className="max-w-sm">
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 via-pink-500 to-amber-400 text-white shadow-lg shadow-rose-500/25 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-rose-500/40">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <circle cx="9" cy="12" r="5.25" />
                  <circle cx="15" cy="12" r="5.25" />
                </svg>
              </span>
              <span className="text-xl font-semibold tracking-tight text-white">
                Wed
                <span className="bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">
                  Plan
                </span>
              </span>
            </Link>

            <p className="mt-5 text-sm leading-relaxed text-slate-400">
              Beautifully curated wedding vendors, real couple stories, and
              planning tools — everything you need to make the big day feel
              effortless.
            </p>

            <div className="mt-6 space-y-2 text-sm">
              <a
                href="mailto:couples@wedplan.com"
                className="flex items-center gap-2.5 text-slate-400 transition-colors hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-rose-300"
                  aria-hidden="true"
                >
                  <path d="M4 5h16v14H4z" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
                couples@wedplan.com
              </a>
              <a
                href="tel:+15551234567"
                className="flex items-center gap-2.5 text-slate-400 transition-colors hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-rose-300"
                  aria-hidden="true"
                >
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.9 2.3z" />
                </svg>
                +1 (555) 123-4567
              </a>
            </div>

            <div className="mt-6 flex items-center gap-2.5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-rose-400/40 hover:bg-rose-500/15 hover:text-rose-200 outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-[18px] w-[18px]"
                    aria-hidden="true"
                  >
                    {social.path}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {linkGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {group.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors duration-200 hover:text-white outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    >
                      <span className="h-px w-0 bg-gradient-to-r from-rose-400 to-pink-400 transition-all duration-300 group-hover:w-3" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            &copy; WedPlan. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
            <Link
              href="/"
              className="text-slate-500 transition-colors hover:text-slate-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/"
              className="text-slate-500 transition-colors hover:text-slate-200"
            >
              Terms of Service
            </Link>
            <Link
              href="/"
              className="text-slate-500 transition-colors hover:text-slate-200"
            >
              Cookies
            </Link>
            <span className="hidden h-3 w-px bg-white/15 sm:block" />
            <span className="inline-flex items-center gap-1.5 text-slate-500">
              Made with
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-3.5 w-3.5 text-rose-400"
                aria-hidden="true"
              >
                <path d="M12 21s-7.5-4.7-9.5-9A5.5 5.5 0 0 1 12 6.4 5.5 5.5 0 0 1 21.5 12c-2 4.3-9.5 9-9.5 9z" />
              </svg>
              for couples everywhere
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}