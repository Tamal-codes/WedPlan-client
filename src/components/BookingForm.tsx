"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api-client";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10";

export default function BookingForm({
  serviceId,
  vendorId,
}: {
  serviceId: string;
  vendorId: string;
}) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [loading, setLoading] = useState(false);
  const user = session?.user;

  if (isPending) {
    return <div className="h-40 animate-pulse rounded-2xl bg-slate-100" />;
  }

  if (!user) {
    return (
      <button
        onClick={() => router.push("/sign-in")}
        className="w-full rounded-full bg-rose-500 py-3 text-sm font-semibold text-white"
      >
        Sign in to book
      </button>
    );
  }

  if (user.role === "admin") {
    return (
      <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
        Admins cannot submit booking requests.
      </p>
    );
  }
  if (user.id === vendorId || user.role === "vendor") {
    return (
      <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
        {user.id === vendorId
          ? "You cannot book your own service."
          : "Vendors cannot submit customer booking requests."}
      </p>
    );
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setLoading(true);
    try {
      await apiFetch("/bookings", {
        method: "POST",
        body: JSON.stringify({
          serviceId,
          eventDate: data.get("eventDate"),
          eventLocation: data.get("eventLocation"),
          message: data.get("message"),
        }),
      });
      toast.success("Booking request sent!");
      form.reset();
      router.push("/dashboard/customer/bookings");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="date" name="eventDate" required min={today} className={inputClass} />
      <input name="eventLocation" required placeholder="Event location" className={inputClass} />
      <textarea name="message" rows={3} placeholder="Additional message (optional)" className={inputClass} />
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-gradient-to-r from-rose-500 to-pink-600 py-3 text-sm font-semibold text-white disabled:opacity-70"
      >
        {loading ? "Sending..." : "Send booking request"}
      </button>
    </form>
  );
}