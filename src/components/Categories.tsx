import Link from "next/link";

const categories = [
  {
    name: "Photography & Videography",
    icon: "📸",
    description: "Capture every precious moment",
  },
  {
    name: "Wedding Venues",
    icon: "🏛️",
    description: "Find the perfect place to say I do",
  },
  {
    name: "Decoration & Florist",
    icon: "💐",
    description: "Beautiful setups and fresh flowers",
  },
  {
    name: "Catering Services",
    icon: "🍽️",
    description: "Delicious food for your guests",
  },
  {
    name: "Makeup & Styling",
    icon: "💄",
    description: "Look stunning on your big day",
  },
  {
    name: "Wedding Fashion",
    icon: "👗",
    description: "Outfits for the bride and groom",
  },
];

export default function Categories() {
  return (
    <section className="bg-rose-50/60 py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
            Explore by Category
          </h2>
          <p className="mt-2 text-slate-500">
            Find the right vendors for every part of your wedding.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/services?category=${encodeURIComponent(cat.name)}`}
              className="group flex items-center gap-4 rounded-2xl border border-rose-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-2xl transition group-hover:scale-110">
                {cat.icon}
              </span>
              <div>
                <h3 className="font-semibold text-slate-900">{cat.name}</h3>
                <p className="mt-0.5 text-sm text-slate-500">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}