export type Service = {
  _id: string;
  serviceName: string;
  category: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  vendorId?: string;
  vendorName?: string;
  status: string;
};

export type ServiceFilters = {
  search?: string;
  category?: string;
  location?: string;
  sort?: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getServices(
  filters: ServiceFilters = {}
): Promise<Service[]> {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });

  const query = params.toString();
  const res = await fetch(
    `${API_URL}/services${query ? `?${query}` : ""}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch services");
  }
  return res.json();
}

export async function getService(id: string): Promise<Service | null> {
  const res = await fetch(`${API_URL}/services/${id}`, { cache: "no-store" });
  if (res.status === 404 || res.status === 400) return null;
  if (!res.ok) throw new Error("Failed to fetch service");
  return res.json();
}