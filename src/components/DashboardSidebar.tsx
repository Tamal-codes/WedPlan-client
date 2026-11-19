"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string };

const navByRole: Record<string, NavItem[]> = {
  customer: [
    { href: "/dashboard/customer", label: "Overview" },
    { href: "/dashboard/customer/bookings", label: "My Bookings" },
    { href: "/dashboard/customer/profile", label: "Profile Settings" },
  ],
  vendor: [
    { href: "/dashboard/vendor", label: "Overview" },
    { href: "/dashboard/vendor/services", label: "My Services" },
    { href: "/dashboard/vendor/add-service", label: "Add Service" },
    { href: "/dashboard/vendor/bookings", label: "Booking Requests" },
    { href: "/dashboard/vendor/subscription", label: "Subscription" },
    { href: "/dashboard/vendor/profile", label: "Profile Settings" },
  ],
  admin: [
    { href: "/dashboard/admin", label: "Overview" },
    { href: "/dashboard/admin/users", label: "Manage Users" },
    { href: "/dashboard/admin/services", label: "Manage Services" },
    { href: "/dashboard/admin/transactions", label: "Transactions" },
  ],
};

export default function DashboardSidebar({ role }: { role: string }) {
  const pathname = usePathname();
  const items = navByRole[role] ?? navByRole.customer;

  const isActive = (href: string, index: number) =>
    index === 0 ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="w-full shrink-0 border-b border-slate-200 bg-white lg:w-64 lg:border-b-0 lg:border-r">
      <div className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
        {role} dashboard
      </div>
      <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:overflow-visible lg:pb-6">
        {items.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
              isActive(item.href, i)
                ? "bg-rose-50 text-rose-600"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}