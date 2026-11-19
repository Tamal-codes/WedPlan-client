"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api-client";

const categories = [
  "Photography & Videography",
  "Wedding Venues",
  "Decoration & Florist",
  "Catering Services",
  "Makeup & Styling",
  "Wedding Fashion",
];

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10";
const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

export default function AddServicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;

    const form = event.currentTarget;
    const data = new FormData(form);

    const serviceName = String(data.get("serviceName") ?? "").trim();
    const category = String(data.get("category") ?? "");
    const description = String(data.get("description") ?? "").trim();
    const price = Number(data.get("price"));
    const location = String(data.get("location") ?? "").trim();
    const files = data
      .getAll("images")
      .filter((f): f is File => f instanceof File && f.size > 0);

    if (!serviceName || !category || !description || !location) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (!Number.isFinite(price) || price <= 0) {
      toast.error("Please enter a valid price");
      return;
    }
    if (files.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }
    if (files.length > 4) {
      toast.error("You can upload up to 4 images");
      return;
    }

    setLoading(true);
    try {
      // ছবিগুলো একটা একটা করে ImgBB তে আপলোড
      const images: string[] = [];
      for (const file of files) {
        const upload = new FormData();
        upload.append("image", file);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: upload,
        });
        if (!res.ok) {
          throw new Error("Image upload failed. Please try again.");
        }
        const json = await res.json();
        images.push(json.url);
      }

      await apiFetch("/services", {
        method: "POST",
        body: JSON.stringify({
          serviceName,
          category,
          description,
          price,
          location,
          images,
        }),
      });

      toast.success("Service submitted. Waiting for admin approval.");
      form.reset();
      router.push("/dashboard/vendor/services");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to add service"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-slate-900">Add Service</h1>
      <p className="mt-1 text-sm text-slate-500">
        New services stay pending until an admin approves them.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="serviceName" className={labelClass}>
            Service name
          </label>
          <input
            id="serviceName"
            name="serviceName"
            required
            placeholder="e.g. Dream Lens Photography"
            className={inputClass}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="category" className={labelClass}>
              Category
            </label>
            <select
              id="category"
              name="category"
              required
              defaultValue=""
              className={inputClass}
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="price" className={labelClass}>
              Price (৳)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="1"
              required
              placeholder="25000"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="location" className={labelClass}>
            Location
          </label>
          <input
            id="location"
            name="location"
            required
            placeholder="e.g. Dhaka"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="description" className={labelClass}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={5}
            placeholder="Describe your service..."
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="images" className={labelClass}>
            Service images <span className="text-slate-400">(up to 4)</span>
          </label>
          <input
            id="images"
            name="images"
            type="file"
            accept="image/*"
            multiple
            required
            className="block w-full rounded-xl border border-slate-200 bg-white text-sm text-slate-600 file:mr-4 file:cursor-pointer file:border-0 file:bg-rose-50 file:px-4 file:py-3 file:text-sm file:font-medium file:text-rose-600 hover:file:bg-rose-100"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-gradient-to-r from-rose-500 to-pink-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-500/30 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Submitting..." : "Submit service"}
        </button>
      </form>
    </section>
  );
}