import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/lib/api";

export default function ServiceCard({ service }: { service: Service }) {
  const image = service.images?.[0];

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-52 w-full bg-slate-100">
        {image ? (
          <Image
            src={image}
            alt={service.serviceName}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            No image
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-rose-600 shadow">
          {service.category}
        </span>
      </div>

      <div className="space-y-3 p-5">
        <h3 className="line-clamp-1 text-lg font-semibold text-slate-900">
          {service.serviceName}
        </h3>

        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>📍 {service.location}</span>
          <span className="font-semibold text-rose-600">
            ৳{service.price.toLocaleString()}
          </span>
        </div>

        <p className="text-sm text-slate-500">
          By {service.vendorName ?? "Vendor"}
        </p>

        <Link
          href={`/services/${service._id}`}
          className="block rounded-full bg-gradient-to-r from-rose-500 to-pink-600 py-2.5 text-center text-sm font-semibold text-white transition hover:opacity-90"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}