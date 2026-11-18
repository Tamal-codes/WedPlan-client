import type { Metadata } from "next";
import AuthCard from "@/components/auth/AuthCard";
import AuthShell from "@/components/auth/AuthShell";

export const metadata: Metadata = {
  title: "Sign Up — WedPlan",
  description:
    "Create a free WedPlan account to discover trusted wedding vendors and plan your perfect day.",
};

export default function SignUpPage() {
  return (
    <AuthShell variant="sign-up">
      <AuthCard variant="sign-up" />
    </AuthShell>
  );
}
