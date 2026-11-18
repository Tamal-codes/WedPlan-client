"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const categories = [
  "Photography & Videography",
  "Wedding Venues",
  "Decoration & Florist",
  "Catering Services",
  "Makeup & Styling",
  "Wedding Fashion",
];

export default function ServiceFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [location, setLocation] = useState(searchParams.get("location") ?? "");
  const category = searchParams.get("category") ?? "";
  const sort = searchParams.get("sort") ?? "";

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    router.push(`/services?${params.toString()}`);
  };

  // টাইপ থামার ০.৫ সেকেন্ড পর সার্চ ও লোকেশন আপডেট হবে
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentSearch = searchParams.get("search") ?? "";
      const currentLocation = searchParams.get("location") ?? "";
      if (search !== currentSearch || location !== currentLocation) {
        updateParams({ search, location });
      }
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, location]);

  const inputClass =
    "w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-200";

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <input
        type="text"
        placeholder="Search by service name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`${inputClass} lg:col-span-2`}
      />

      <select
        value={category}
        onChange={(e) => updateParams({ category: e.target.value })}
        className={inputClass}
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className={inputClass}
      />

      <select
        value={sort}
        onChange={(e) => updateParams({ sort: e.target.value })}
        className={inputClass}
      >
        <option value="">Sort by price</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>
    </div>
  );
}