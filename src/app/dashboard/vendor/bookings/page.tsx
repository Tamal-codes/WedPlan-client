"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api-client";

type Booking = {
  _id: string;
  eventDate: string;
  eventLocation: string;
  message: string;
  status: string;
  service?: { serviceName: string };
  customer?: { name: string; email: string };
};

const statusStyle: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700",
  accepted: "bg-emerald-50 text-emerald-700",
  rejected: "bg-red-50 text-red-700",
  cancelled: "bg-slate-100 text-slate-600",
};

export default function VendorBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    apiFetch("/vendor/bookings")
      .then(setBookings)
      .catch((e) =>
        toast.error(e instanceof Error ? e.message : "Failed to load bookings")
      )
      .finally(() => setLoading(false));
  }, []);

  const update = async (b: Booking, status: "accepted" | "rejected") => {
    setBusyId(b._id);
    try {
      await apiFetch(`/bookings/${b._id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setBookings((prev) =>
        prev.map((x) => (x._id === b._id ? { ...x, status } : x))
      );
      toast.success(`Booking ${status}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to update");
    } finally {
      setBusyId(null);
    }
  };

  if (loading) {
    return (
      <div className="grid gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-28 animate-pulse rounded-2xl bg-slate-100" />
        ))}
      </div>
    );
  }

  return (
    <section>
      <h1 className="text-2xl font-semibold text-slate-900">Booking Requests</h1>

      {bookings.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 py-16 text-center">
          <p className="font-semibold text-slate-900">No booking requests yet</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="rounded-2xl border border-slate-200 bg-white p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1 text-sm text-slate-600">
                  <h3 className="font-semibold text-slate-900">
                    {b.service?.serviceName ?? "Service removed"}
                  </h3>
                  <p>
                    👤 {b.customer?.name ?? "Customer"} ({b.customer?.email})
                  </p>
                  <p>
                    📅 {b.eventDate} · 📍 {b.eventLocation}
                  </p>
                  <p>💬 {b.message || "No message"}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                      statusStyle[b.status] ?? "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {b.status}
                  </span>
                  {b.status === "pending" && (
                    <>
                      <button
                        onClick={() => update(b, "accepted")}
                        disabled={busyId === b._id}
                        className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-100 disabled:opacity-60"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => update(b, "rejected")}
                        disabled={busyId === b._id}
                        className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100 disabled:opacity-60"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}