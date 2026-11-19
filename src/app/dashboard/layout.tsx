"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { signOut, useSession } from "@/lib/auth-client";

function dashboardPath(role?: string | null) {
  if (role === "admin") return "/dashboard/admin";
  if (role === "vendor") return "/dashboard/vendor";
  return "/dashboard/customer";
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const allowedBase = user ? dashboardPath(user.role) : null;
  const isAllowedPath =
    !!allowedBase &&
    (pathname === allowedBase || pathname.startsWith(`${allowedBase}/`));

  useEffect(() => {
    if (isPending) return;

    if (!user) {
      router.replace("/sign-in");
      return;
    }

    if (user.isBlocked) {
      toast.error("Your account has been blocked.");
      signOut().then(() => router.replace("/sign-in"));
      return;
    }

    if (!isAllowedPath) {
      router.replace(allowedBase!);
    }
  }, [isPending, user, isAllowedPath, allowedBase, router]);

  if (isPending || !user || user.isBlocked || !isAllowedPath) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-rose-200 border-t-rose-500" />
      </div>
    );
  }

  return <>{children}</>;
}