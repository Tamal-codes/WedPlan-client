"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api-client";

type Stats = {
  totalUsers: number;
  totalVendors: number;
  totalCustomers: number;
  totalServices: number;
  pendingServices: number;
  totalTransactions: number;
};

const cards: { key: keyof Stats; label: string }[] = [
  { key: "totalUsers", label: "Total Registered Users" },
  { key: "totalVendors", label: "Total Vendors" },
  { key: "totalCustomers", label: "Total Customers" },
  { key: "totalServices", label: "Total Services" },
  { key: "pendingServices", label: "Pending Services" },
  { key: "totalTransactions", label: "Total Transactions" },
];

export default function AdminOverviewPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    apiFetch("/admin/stats")
      .then(setStats)
      .catch((e) =>
        toast.error(e instanceof Error ? e.message : "Failed to load stats")
      );
  }, []);

  return (
    <section>
      <h1 className="text-2xl font-semibold text-slate-900">
        Welcome, {session?.user.name}
      </h1>
      <p className="mt-1 text-sm text-slate-500">Platform overview.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats === null
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-28 animate-pulse rounded-2xl bg-slate-100" />
            ))
          : cards.map((c) => (
              <div key={c.key} className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-sm text-slate-500">{c.label}</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">
                  {stats[c.key]}
                </p>
              </div>
            ))}
      </div>
    </section>
  );
}