"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api-client";

type MyService = { _id: string; status: string };

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}

export default function VendorOverviewPage() {
  const { data: session } = useSession();
  const [services, setServices] = useState<MyService[] | null>(null);

  useEffect(() => {
    apiFetch("/vendor/services")
      .then(setServices)
      .catch((error) =>
        toast.error(
          error instanceof Error ? error.message : "Failed to load data"
        )
      );
  }, []);

  const total = services?.length ?? 0;
  const active = services?.filter((s) => s.status === "approved").length ?? 0;
  const plan = session?.user.subscriptionPlan === "premium" ? "Premium" : "Free";

  return (
    <section>
      <h1 className="text-2xl font-semibold text-slate-900">
        Welcome, {session?.user.name}
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Here is a quick look at your vendor account.
      </p>

      {services === null ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-slate-100" />
          ))}
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard label="Total Services" value={total} />
          <StatCard label="Active Services" value={active} />
          <StatCard label="Current Plan" value={plan} />
        </div>
      )}

      <Link
        href="/dashboard/vendor/add-service"
        className="mt-8 inline-block rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white"
      >
        + Add a new service
      </Link>
    </section>
  );
}