import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Services — WedPlan",
};

export default function ServicesPage() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        Browse Services
      </h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Venues, photographers, decorators, and more will appear here soon.
      </p>
    </main>
  );
}
