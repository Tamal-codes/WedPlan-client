const steps = [
  {
    number: "01",
    title: "Browse Services",
    description:
      "Explore photographers, venues, decorators and more, all in one place.",
  },
  {
    number: "02",
    title: "Send a Booking Request",
    description:
      "Pick your event date and location, then send a request to the vendor.",
  },
  {
    number: "03",
    title: "Vendor Confirms",
    description:
      "The vendor reviews your request and accepts or rejects it.",
  },
  {
    number: "04",
    title: "Enjoy Your Big Day",
    description:
      "Track everything from your dashboard and relax while the team does the rest.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-rose-50/60 py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
            How WedPlan Works
          </h2>
          <p className="mt-2 text-slate-500">
            Four simple steps from search to celebration.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-2xl border border-rose-100 bg-white p-6 shadow-sm"
            >
              <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-4xl font-bold text-transparent">
                {step.number}
              </span>
              <h3 className="mt-3 font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}