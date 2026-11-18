export type Service = {
  _id: string;
  serviceName: string;
  category: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  vendorName?: string;
  status: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getServices(): Promise<Service[]> {
  const res = await fetch(`${API_URL}/services`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch services");
  }
  return res.json();
}