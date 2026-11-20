"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api-client";

type Service = {
  _id: string;
  serviceName: string;
  category: string;
  price: number;
  location: string;
  images: string[];
  vendorName?: string;
  status: string;
};

const statusStyle: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700",
  approved: "bg-emerald-50 text-emerald-700",
  rejected: "bg-red-50 text-red-700",
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (status) params.set("status", status);
      apiFetch(`/admin/services?${params.toString()}`)
        .then(setServices)
        .catch((e) =>
          toast.error(e instanceof Error ? e.message : "Failed to load services")
        )
        .finally(() => setLoading(false));
    }, 400);
    return () => clearTimeout(timer);
  }, [search, status]);

  const setServiceStatus = async (s: Service, next: string) => {
    setBusyId(s._id);
    try {
      await apiFetch(`/admin/services/${s._id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: next }),
      });
      setServices((prev) =>
        prev.map((x) => (x._id === s._id ? { ...x, status: next } : x))
      );
      toast.success(`Service ${next}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to update");
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (s: Service) => {
    if (!window.confirm(`Delete "${s.serviceName}"?`)) return;
    setBusyId(s._id);
    try {
      await apiFetch(`/admin/services/${s._id}`, { method: "DELETE" });
      setServices((prev) => prev.filter((x) => x._id !== s._id));
      toast.success("Service deleted");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to delete");
    } finally {
      setBusyId(null);
    }
  };

  const inputClass =
    "rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-rose-400";

  return (
    <section>
      <h1 className="text-2xl font-semibold text-slate-900">Manage Services</h1>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          placeholder="Search by service name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`${inputClass} flex-1`}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputClass}>
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {loading ? (
        <div className="mt-6 h-40 animate-pulse rounded-2xl bg-slate-100" />
      ) : services.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 py-16 text-center text-slate-500">
          No services found
        </div>
      ) : (
        <div className="mt-6 grid gap-4">
          {services.map((s) => (
            <div
              key={s._id}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center"
            >
              <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                {s.images?.[0] && (
                  <Image src={s.images[0]} alt={s.serviceName} fill sizes="96px" className="object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold text-slate-900">{s.serviceName}</h3>
                <p className="text-sm text-slate-500">
                  {s.category} · {s.location} · By {s.vendorName ?? "Vendor"}
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
                {s.status !== "approved" && (
                  <button
                    onClick={() => setServiceStatus(s, "approved")}
                    disabled={busyId === s._id}
                    className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 disabled:opacity-60"
                  >
                    Approve
                  </button>
                )}
                {s.status !== "rejected" && (
                  <button
                    onClick={() => setServiceStatus(s, "rejected")}
                    disabled={busyId === s._id}
                    className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 disabled:opacity-60"
                  >
                    Reject
                  </button>
                )}
                <button
                  onClick={() => remove(s)}
                  disabled={busyId === s._id}
                  className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600 disabled:opacity-60"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}