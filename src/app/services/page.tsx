import { Suspense } from "react";
import { getServices } from "@/lib/api";
import ServiceCard from "@/components/ServiceCard";
import ServiceFilters from "@/components/ServiceFilters";

type SearchParams = {
  search?: string;
  category?: string;
  location?: string;
  sort?: string;
};

async function ServiceResults({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const filters = await searchParams;
  const services = await getServices(filters);

  if (services.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 py-20 text-center">
        <p className="text-4xl">🔍</p>
        <h3 className="mt-3 text-lg font-semibold text-slate-900">
          No services found
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </div>
  );
}

function ResultsSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-80 animate-pulse rounded-2xl bg-slate-100" />
      ))}
    </div>
  );
}

export default function BrowseServicesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Browse Wedding Services
        </h1>
        <p className="mt-2 text-slate-500">
          Search, filter and find the perfect vendors for your big day.
        </p>
      </div>

      <div className="mb-10">
        <Suspense fallback={null}>
          <ServiceFilters />
        </Suspense>
      </div>

      <Suspense fallback={<ResultsSkeleton />}>
        <ServiceResults searchParams={searchParams} />
      </Suspense>
    </section>
  );
}