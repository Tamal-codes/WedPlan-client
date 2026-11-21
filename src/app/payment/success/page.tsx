"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api-client";

function SuccessContent() {
  const router = useRouter();
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const { data: session, isPending } = useSession();
  const [result, setResult] = useState<"ok" | "error" | null>(null);

  useEffect(() => {
    if (!isPending && !session) router.replace("/sign-in");
  }, [isPending, session, router]);

  useEffect(() => {
    if (!session || !sessionId) return;
    apiFetch("/subscription/confirm", {
      method: "POST",
      body: JSON.stringify({ sessionId }),
    })
      .then(() => setResult("ok"))
      .catch(() => setResult("error"));
  }, [session, sessionId]);

  // session_id না থাকলে সরাসরি error, ইফেক্টে setState লাগে না
  const state: "loading" | "ok" | "error" = !sessionId
    ? "error"
    : (result ?? "loading");

  return (
    <section className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="text-5xl">
        {state === "ok" ? "🎉" : state === "error" ? "⚠️" : "⏳"}
      </p>
      <h1 className="mt-4 text-2xl font-semibold text-slate-900">
        {state === "ok"
          ? "Payment confirmed!"
          : state === "error"
          ? "Could not verify payment"
          : "Verifying your payment..."}
      </h1>
      <p className="mt-2 text-slate-500">
        {state === "ok"
          ? "Your Premium plan is now active."
          : state === "error"
          ? "If money was charged, contact support. Premium activates only after verified payment."
          : "Please wait a moment."}
      </p>
      <Link
        href="/dashboard/vendor/subscription"
        className="mt-8 inline-block rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white"
      >
        Go to Subscription
      </Link>
    </section>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}