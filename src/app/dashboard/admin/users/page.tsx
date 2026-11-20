"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api-client";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  isBlocked?: boolean;
  subscriptionPlan?: string;
  businessName?: string;
};

export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [selected, setSelected] = useState<User | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (role) params.set("role", role);
      apiFetch(`/admin/users?${params.toString()}`)
        .then(setUsers)
        .catch((e) =>
          toast.error(e instanceof Error ? e.message : "Failed to load users")
        )
        .finally(() => setLoading(false));
    }, 400);
    return () => clearTimeout(timer);
  }, [search, role]);

  const toggleBlock = async (u: User) => {
    const next = !u.isBlocked;
    setBusyId(u._id);
    try {
      await apiFetch(`/admin/users/${u._id}/block`, {
        method: "PATCH",
        body: JSON.stringify({ isBlocked: next }),
      });
      setUsers((prev) =>
        prev.map((x) => (x._id === u._id ? { ...x, isBlocked: next } : x))
      );
      toast.success(next ? "User blocked" : "User unblocked");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to update user");
    } finally {
      setBusyId(null);
    }
  };

  const inputClass =
    "rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-rose-400";

  return (
    <section>
      <h1 className="text-2xl font-semibold text-slate-900">Manage Users</h1>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`${inputClass} flex-1`}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} className={inputClass}>
          <option value="">All roles</option>
          <option value="customer">Customer</option>
          <option value="vendor">Vendor</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {loading ? (
        <div className="mt-6 h-40 animate-pulse rounded-2xl bg-slate-100" />
      ) : users.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 py-16 text-center text-slate-500">
          No users found
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium text-slate-900">{u.name}</td>
                  <td className="px-4 py-3 text-slate-600">{u.email}</td>
                  <td className="px-4 py-3 capitalize">{u.role}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        u.isBlocked
                          ? "bg-red-50 text-red-700"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      {u.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td className="space-x-2 px-4 py-3">
                    <button
                      onClick={() => setSelected(u)}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                    >
                      Details
                    </button>
                    {u.role !== "admin" && (
                      <button
                        onClick={() => toggleBlock(u)}
                        disabled={busyId === u._id}
                        className={`rounded-full px-3 py-1 text-xs font-medium disabled:opacity-60 ${
                          u.isBlocked
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {u.isBlocked ? "Unblock" : "Block"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-slate-900">User details</h2>
            <dl className="mt-4 space-y-2 text-sm text-slate-600">
              <p><span className="font-medium">Name:</span> {selected.name}</p>
              <p><span className="font-medium">Email:</span> {selected.email}</p>
              <p><span className="font-medium">Role:</span> {selected.role}</p>
              {selected.businessName && (
                <p><span className="font-medium">Business:</span> {selected.businessName}</p>
              )}
              <p><span className="font-medium">Plan:</span> {selected.subscriptionPlan ?? "free"}</p>
              <p><span className="font-medium">Blocked:</span> {selected.isBlocked ? "Yes" : "No"}</p>
            </dl>
            <button
              onClick={() => setSelected(null)}
              className="mt-6 rounded-full bg-rose-500 px-5 py-2 text-sm font-semibold text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}