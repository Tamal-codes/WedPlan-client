"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { signOut, useSession } from "@/lib/auth-client";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Browse Services" },
];

function dashboardPath(role?: string | null) {
  if (role === "admin") return "/dashboard/admin";
  if (role === "vendor") return "/dashboard/vendor";
  return "/dashboard/customer";
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  if (pathname !== menuPath) {
    setMenuPath(pathname);
    setIsOpen(false);
    setProfileOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // ড্রপডাউনের বাইরে ক্লিক করলে বন্ধ হবে
  useEffect(() => {
    if (!profileOpen) return;
    const handleClick = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [profileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleLogout = async () => {
    setProfileOpen(false);
    setIsOpen(false);
    await signOut();
    toast.success("Logged out successfully");
    router.push("/");
    router.refresh();
  };

  const avatar = (size: string) =>
    user?.image ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={user.image}
        alt={user.name}
        className={`${size} rounded-full object-cover`}
      />
    ) : (
      <span
        className={`${size} flex items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-600 text-sm font-semibold text-white`}
      >
        {user?.name?.charAt(0).toUpperCase()}
      </span>
    );

  const menuItemClass =
    "block w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-slate-100";

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-all duration-300 ${
        isScrolled
          ? "border-slate-200/80 bg-white/85 shadow-[0_10px_40px_-18px_rgba(15,23,42,0.25)]"
          : "border-slate-200/60 bg-white/70"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6 px-4 sm:h-20 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
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
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            Wed
            <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
              Plan
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`group relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 ${
                  active
                    ? "text-rose-600"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-4 -bottom-0.5 h-0.5 origin-left rounded-full bg-gradient-to-r from-rose-500 to-pink-500 transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Desktop auth actions */}
        <div className="hidden items-center gap-2 md:flex">
          {isPending ? (
            <div className="h-10 w-28 animate-pulse rounded-full bg-slate-100" />
          ) : user ? (
            <div ref={profileRef} className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((open) => !open)}
                aria-expanded={profileOpen}
                aria-haspopup="menu"
                aria-label="Open profile menu"
                className="rounded-full outline-none ring-2 ring-transparent transition focus-visible:ring-rose-500 hover:ring-rose-200"
              >
                {avatar("h-10 w-10")}
              </button>

              {profileOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 px-3 pb-3 pt-2">
                    {avatar("h-10 w-10 shrink-0")}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Link
                      href={dashboardPath(user.role)}
                      role="menuitem"
                      className={menuItemClass}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href={`${dashboardPath(user.role)}/profile`}
                      role="menuitem"
                      className={menuItemClass}
                    >
                      Profile Settings
                    </Link>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleLogout}
                      className={`${menuItemClass} text-red-600 hover:bg-red-50`}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="rounded-full bg-gradient-to-r from-rose-500 to-pink-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rose-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-rose-500/35 outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 md:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="h-6 w-6"
            aria-hidden="true"
          >
            {isOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      <div
        id="mobile-menu"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`grid overflow-hidden border-slate-200/70 transition-all duration-300 ease-in-out md:hidden ${
          isOpen
            ? "grid-rows-[1fr] border-t opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <div className="mx-auto w-full max-w-7xl space-y-1 px-4 py-4 sm:px-6">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    active
                      ? "bg-rose-50 text-rose-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="mt-3 grid gap-2 border-t border-slate-200/70 pt-4">
              {isPending ? null : user ? (
                <>
                  <div className="flex items-center gap-3 px-2 pb-2">
                    {avatar("h-10 w-10 shrink-0")}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={dashboardPath(user.role)}
                    className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href={`${dashboardPath(user.role)}/profile`}
                    className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    Profile Settings
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-xl bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-600 transition-colors hover:bg-red-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-rose-500/25 transition-all hover:shadow-xl hover:shadow-rose-500/35"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}