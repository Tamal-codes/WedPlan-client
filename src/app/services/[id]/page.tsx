import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { getService } from "@/lib/api";
import BookingForm from "@/components/BookingForm";

async function Details({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await getService(id);

  if (!service) {
    return (
      <div className="py-24 text-center">
        <p className="text-5xl">😕</p>
        <h1 className="mt-4 text-2xl font-semibold text-slate-900">
          Service not found
        </h1>
        <p className="mt-2 text-slate-500">
          This service doesn&apos;t exist or is no longer available.
        </p>
        <Link
          href="/services"
          className="mt-6 inline-block rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white"
        >
          Browse services
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="grid grid-cols-2 gap-3">
          {service.images.map((img, i) => (
            <div
              key={img}
              className={`relative overflow-hidden rounded-2xl bg-slate-100 ${
                i === 0 ? "col-span-2 h-80" : "h-40"
              }`}
            >
              <Image
                src={img}
                alt={service.serviceName}
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <span className="mt-6 inline-block rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-600">
          {service.category}
        </span>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">
          {service.serviceName}
        </h1>
        <p className="mt-2 text-slate-500">
          📍 {service.location} · By {service.vendorName ?? "Vendor"}
        </p>
        <p className="mt-4 text-2xl font-semibold text-rose-600">
          ৳{service.price.toLocaleString()}
        </p>
        <p className="mt-6 whitespace-pre-line leading-relaxed text-slate-600">
          {service.description}
        </p>
      </div>

      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">
          Book this service
        </h2>
        <BookingForm
          serviceId={service._id}
          vendorId={service.vendorId ?? ""}
        />
      </aside>
    </div>
  );
}

export default function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Suspense
        fallback={<div className="h-96 animate-pulse rounded-2xl bg-slate-100" />}
      >
        <Details params={params} />
      </Suspense>
    </section>
  );
}