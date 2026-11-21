"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function PaymentCancelPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session) router.replace("/sign-in");
  }, [isPending, session, router]);

  return (
    <section className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="text-5xl">😕</p>
      <h1 className="mt-4 text-2xl font-semibold text-slate-900">
        Payment cancelled
      </h1>
      <p className="mt-2 text-slate-500">
        No money was charged. You can upgrade any time.
      </p>
      <Link
        href="/dashboard/vendor/subscription"
        className="mt-8 inline-block rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white"
      >
        Back to Subscription
      </Link>
    </section>
  );
}