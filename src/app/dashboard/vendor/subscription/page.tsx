"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api-client";

type Status = { plan: "free" | "premium"; expiresAt: string | null };

export default function SubscriptionPage() {
  const [status, setStatus] = useState<Status | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiFetch("/subscription/status")
      .then(setStatus)
      .catch((e) =>
        toast.error(e instanceof Error ? e.message : "Failed to load plan")
      );
  }, []);

  const upgrade = async () => {
    setLoading(true);
    try {
      const { url } = await apiFetch("/subscription/checkout", {
        method: "POST",
      });
      window.location.href = url;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to start payment");
      setLoading(false);
    }
  };

  const isPremium = status?.plan === "premium";

  return (
    <section>
      <h1 className="text-2xl font-semibold text-slate-900">Subscription</h1>
      <p className="mt-1 text-sm text-slate-500">
        {status === null
          ? "Loading your plan..."
          : isPremium
          ? `Premium active until ${new Date(status.expiresAt!).toLocaleDateString()}`
          : "You are on the Free plan."}
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div
          className={`rounded-2xl border bg-white p-6 ${
            !isPremium && status ? "border-rose-400" : "border-slate-200"
          }`}
        >
          <h2 className="text-lg font-semibold text-slate-900">Free Plan</h2>
          <p className="mt-1 text-3xl font-semibold">$0</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>✓ Maximum 3 active services</li>
            <li>✓ Basic vendor dashboard</li>
            <li>✓ Booking request management</li>
          </ul>
          {!isPremium && status && (
            <p className="mt-6 text-sm font-medium text-rose-600">Current plan</p>
          )}
        </div>

        <div
          className={`rounded-2xl border bg-white p-6 ${
            isPremium ? "border-rose-400" : "border-slate-200"
          }`}
        >
          <h2 className="text-lg font-semibold text-slate-900">Premium Plan 👑</h2>
          <p className="mt-1 text-3xl font-semibold">
            $20
            <span className="text-sm font-normal text-slate-500"> / 30 days</span>
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>✓ Unlimited active services</li>
            <li>✓ Premium Vendor badge</li>
            <li>✓ All Free plan features</li>
          </ul>
          {isPremium ? (
            <p className="mt-6 text-sm font-medium text-rose-600">Current plan</p>
          ) : (
            <button
              onClick={upgrade}
              disabled={loading || status === null}
              className="mt-6 w-full rounded-full bg-gradient-to-r from-rose-500 to-pink-600 py-3 text-sm font-semibold text-white disabled:opacity-70"
            >
              {loading ? "Redirecting to Stripe..." : "Upgrade to Premium"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}