"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
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

type ServiceData = {
  serviceName: string;
  category: string;
  description: string;
  price: number;
  location: string;
  images: string[];
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10";
const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

export default function EditServicePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [service, setService] = useState<ServiceData | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    apiFetch(`/vendor/services/${id}`)
      .then(setService)
      .catch((error) => {
        toast.error(
          error instanceof Error ? error.message : "Failed to load service"
        );
        router.replace("/dashboard/vendor/services");
      });
  }, [id, router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (saving || !service) return;

    const data = new FormData(event.currentTarget);
    const price = Number(data.get("price"));
    if (!Number.isFinite(price) || price <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    setSaving(true);
    try {
      // নতুন ছবি বাছলে আপলোড হবে, না বাছলে পুরনো ছবিই থাকবে
      let images = service.images;
      const files = data
        .getAll("images")
        .filter((f): f is File => f instanceof File && f.size > 0);

      if (files.length > 0) {
        if (files.length > 4) {
          toast.error("You can upload up to 4 images");
          setSaving(false);
          return;
        }
        images = [];
        for (const file of files) {
          const upload = new FormData();
          upload.append("image", file);
          const res = await fetch("/api/upload", {
            method: "POST",
            body: upload,
          });
          if (!res.ok) throw new Error("Image upload failed. Please try again.");
          images.push((await res.json()).url);
        }
      }

      await apiFetch(`/services/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          serviceName: String(data.get("serviceName") ?? ""),
          category: String(data.get("category") ?? ""),
          description: String(data.get("description") ?? ""),
          location: String(data.get("location") ?? ""),
          price,
          images,
        }),
      });

      toast.success("Service updated");
      router.push("/dashboard/vendor/services");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update service"
      );
    } finally {
      setSaving(false);
    }
  };

  if (!service) {
    return <div className="h-64 animate-pulse rounded-2xl bg-slate-100" />;
  }

  return (
    <section className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-slate-900">Edit Service</h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="serviceName" className={labelClass}>
            Service name
          </label>
          <input
            id="serviceName"
            name="serviceName"
            required
            defaultValue={service.serviceName}
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
              defaultValue={service.category}
              className={inputClass}
            >
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
              defaultValue={service.price}
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
            defaultValue={service.location}
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
            defaultValue={service.description}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="images" className={labelClass}>
            Replace images{" "}
            <span className="text-slate-400">
              (optional, up to 4. Leave empty to keep current images)
            </span>
          </label>
          <input
            id="images"
            name="images"
            type="file"
            accept="image/*"
            multiple
            className="block w-full rounded-xl border border-slate-200 bg-white text-sm text-slate-600 file:mr-4 file:cursor-pointer file:border-0 file:bg-rose-50 file:px-4 file:py-3 file:text-sm file:font-medium file:text-rose-600 hover:file:bg-rose-100"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-gradient-to-r from-rose-500 to-pink-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-500/30 transition hover:opacity-90 disabled:opacity-70"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/dashboard/vendor/services")}
            className="rounded-full border border-slate-200 px-8 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}