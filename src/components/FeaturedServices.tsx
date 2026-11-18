import Link from "next/link";
import { Suspense } from "react";
import { getServices } from "@/lib/api";
import ServiceCard from "@/components/ServiceCard";

async function ServiceList() {
  const services = await getServices();
  const featured = services.slice(0, 6);

  if (featured.length === 0) {
    return (
      <p className="py-10 text-center text-slate-500">
        No services available yet.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {featured.map((service) => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </div>
  );
}

function ServiceListSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="h-80 animate-pulse rounded-2xl bg-slate-100"
        />
      ))}
    </div>
  );
}

export default function FeaturedServices() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
            Featured Wedding Services
          </h2>
          <p className="mt-2 text-slate-500">
            Handpicked vendors to make your big day unforgettable.
          </p>
        </div>
        <Link
          href="/services"
          className="hidden text-sm font-semibold text-rose-600 hover:underline sm:block"
        >
          View all →
        </Link>
      </div>

      <Suspense fallback={<ServiceListSkeleton />}>
        <ServiceList />
      </Suspense>
    </section>
  );
}