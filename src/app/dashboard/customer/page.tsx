"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api-client";

export default function CustomerDashboardPage() {
  const { data: session } = useSession();
  const [result, setResult] = useState("");

  const testServer = async () => {
    try {
      const data = await apiFetch("/me");
      setResult(JSON.stringify(data, null, 2));
      toast.success("Server verified your token");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed");
    }
  };

  return (
    <section>
      <h1 className="text-2xl font-semibold text-slate-900">
        Welcome, {session?.user.name}
      </h1>
      <p className="mt-2 text-slate-500">Role: {session?.user.role}</p>

      <button
        onClick={testServer}
        className="mt-6 rounded-full bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white"
      >
        Test server auth
      </button>

      {result && (
        <pre className="mt-4 rounded-xl bg-slate-100 p-4 text-sm">{result}</pre>
      )}
    </section>
  );
}