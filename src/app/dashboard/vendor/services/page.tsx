"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api-client";

type MyService = {
  _id: string;
  serviceName: string;
  category: string;
  price: number;
  location: string;
  images: string[];
  status: string;
  isAvailable?: boolean;
};

const statusStyle: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700",
  approved: "bg-emerald-50 text-emerald-700",
  rejected: "bg-red-50 text-red-700",
};

export default function MyServicesPage() {
  const [services, setServices] = useState<MyService[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    apiFetch("/vendor/services")
      .then(setServices)
      .catch((error) =>
        toast.error(
          error instanceof Error ? error.message : "Failed to load services"
        )
      )
      .finally(() => setLoading(false));
  }, []);

  const toggleAvailability = async (service: MyService) => {
    const next = service.isAvailable === false;
    setBusyId(service._id);
    try {
      await apiFetch(`/services/${service._id}/availability`, {
        method: "PATCH",
        body: JSON.stringify({ isAvailable: next }),
      });
      setServices((prev) =>
        prev.map((s) =>
          s._id === service._id ? { ...s, isAvailable: next } : s
        )
      );
      toast.success(next ? "Service is now available" : "Service hidden");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update availability"
      );
    } finally {
      setBusyId(null);
    }
  };

  const deleteService = async (service: MyService) => {
    if (!window.confirm(`Delete "${service.serviceName}"? This cannot be undone.`))
      return;
    setBusyId(service._id);
    try {
      await apiFetch(`/services/${service._id}`, { method: "DELETE" });
      setServices((prev) => prev.filter((s) => s._id !== service._id));
      toast.success("Service deleted");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete service"
      );
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">My Services</h1>
        <Link
          href="/dashboard/vendor/add-service"
          className="rounded-full bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white"
        >
          + Add Service
        </Link>
      </div>

      {services.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 py-16 text-center">
          <p className="font-semibold text-slate-900">No services yet</p>
          <p className="mt-1 text-sm text-slate-500">
            Add your first wedding service to get started.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4">
          {services.map((s) => {
            const available = s.isAvailable !== false;
            return (
              <div
                key={s._id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center"
              >
                <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                  {s.images?.[0] && (
                    <Image
                      src={s.images[0]}
                      alt={s.serviceName}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold text-slate-900">
                    {s.serviceName}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {s.category} · {s.location}
                  </p>
                  <p className="text-sm font-semibold text-rose-600">
                    ৳{s.price.toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                      statusStyle[s.status] ?? "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {s.status}
                  </span>
                  <button
                    onClick={() => toggleAvailability(s)}
                    disabled={busyId === s._id}
                    className={`rounded-full px-3 py-1 text-xs font-medium disabled:opacity-60 ${
                      available
                        ? "bg-sky-50 text-sky-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {available ? "Available" : "Unavailable"}
                  </button>
                  <button
                    onClick={() => deleteService(s)}
                    disabled={busyId === s._id}
                    className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100 disabled:opacity-60"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}