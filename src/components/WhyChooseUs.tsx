const reasons = [
  {
    icon: "✅",
    title: "Verified Vendors",
    description:
      "Every service is reviewed and approved by our team before it goes live.",
  },
  {
    icon: "🔍",
    title: "Easy Search & Filter",
    description:
      "Find the right vendor quickly by category, location, and price.",
  },
  {
    icon: "📩",
    title: "Simple Booking Requests",
    description:
      "Send a booking request in minutes and track its status anytime.",
  },
  {
    icon: "🔒",
    title: "Secure Platform",
    description:
      "Role-based access and secure payments keep your data safe.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
          Why Choose WedPlan?
        </h2>
        <p className="mt-2 text-slate-500">
          Everything you need to plan your wedding with confidence.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-2xl">
              {item.icon}
            </span>
            <h3 className="mt-4 font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}