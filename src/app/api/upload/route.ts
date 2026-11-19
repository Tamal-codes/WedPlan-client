import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image");

    if (!(file instanceof File)) {
      return NextResponse.json({ message: "No image provided" }, { status: 400 });
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ message: "File must be an image" }, { status: 400 });
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ message: "Image must be under 5MB" }, { status: 400 });
    }

    const body = new FormData();
    body.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      { method: "POST", body }
    );
    const json = await res.json();

    if (!res.ok || !json?.data?.url) {
      return NextResponse.json({ message: "Upload failed" }, { status: 502 });
    }

    return NextResponse.json({ url: json.data.url });
  } catch {
    return NextResponse.json({ message: "Upload failed" }, { status: 500 });
  }
}