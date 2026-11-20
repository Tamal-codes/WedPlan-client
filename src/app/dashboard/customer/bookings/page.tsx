"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api-client";

type Booking = { status: string };

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}

export default function CustomerOverviewPage() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<Booking[] | null>(null);

  useEffect(() => {
    apiFetch("/customer/bookings")
      .then(setBookings)
      .catch((e) =>
        toast.error(e instanceof Error ? e.message : "Failed to load data")
      );
  }, []);

  const count = (s: string) => bookings?.filter((b) => b.status === s).length ?? 0;

  return (
    <section>
      <h1 className="text-2xl font-semibold text-slate-900">
        Welcome, {session?.user.name}
      </h1>
      <p className="mt-1 text-sm text-slate-500">Your booking summary.</p>

      {bookings === null ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-slate-100" />
          ))}
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Requests" value={bookings.length} />
          <StatCard label="Pending" value={count("pending")} />
          <StatCard label="Accepted" value={count("accepted")} />
          <StatCard label="Rejected" value={count("rejected")} />
        </div>
      )}

      <Link
        href="/services"
        className="mt-8 inline-block rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white"
      >
        Browse services
      </Link>
    </section>
  );
}