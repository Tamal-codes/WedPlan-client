import type { Metadata } from "next";
import AuthCard from "@/components/auth/AuthCard";
import AuthShell from "@/components/auth/AuthShell";

export const metadata: Metadata = {
  title: "Sign In — WedPlan",
  description:
    "Sign in to WedPlan to manage your saved vendors, guest lists, and wedding planning details.",
};

export default function SignInPage() {
  return (
    <AuthShell variant="sign-in">
      <AuthCard variant="sign-in" />
    </AuthShell>
  );
}
