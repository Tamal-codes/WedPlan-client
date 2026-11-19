"use client";

import { useSession } from "@/lib/auth-client";

export default function CustomerDashboardPage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <p className="p-10 text-center text-slate-500">Loading...</p>;
  }

  if (!session) {
    return <p className="p-10 text-center text-slate-500">Not signed in</p>;
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-2xl font-semibold text-slate-900">
        Welcome, {session.user.name}
      </h1>
      <p className="mt-2 text-slate-500">Role: {session.user.role}</p>
      <p className="text-slate-500">Email: {session.user.email}</p>
    </section>
  );
}