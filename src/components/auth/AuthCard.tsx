"use client";

import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";

type AuthVariant = "sign-in" | "sign-up";
type Status = "idle" | "loading" | "done";

const fieldClass =
  "w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10";

const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

const iconClass = "h-[18px] w-[18px]";

const mailIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={iconClass}
    aria-hidden="true"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);

const lockIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={iconClass}
    aria-hidden="true"
  >
    <rect x="4" y="10" width="16" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);

const userIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={iconClass}
    aria-hidden="true"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </svg>
);

function Field({
  id,
  label,
  type,
  placeholder,
  autoComplete,
  icon,
  trailing,
  hint,
}: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  autoComplete: string;
  icon: ReactNode;
  trailing?: ReactNode;
  hint?: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-0 flex w-11 items-center justify-center text-slate-400">
          {icon}
        </span>
        <input
          id={id}
          name={id}
          type={type}
          required
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`${fieldClass} ${trailing ? "pr-12" : ""}`}
        />
        {trailing && (
          <span className="absolute inset-y-0 right-1.5 flex items-center">
            {trailing}
          </span>
        )}
      </div>
      {hint && <div className="mt-1.5">{hint}</div>}
    </div>
  );
}

function SocialButton({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
    >
      {children}
      <span>{label}</span>
    </button>
  );
}

const googleIcon = (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M21.6 12.23c0-.68-.06-1.34-.17-1.98H12v3.75h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.3z"
    />
    <path
      fill="#34A853"
      d="M12 22c2.7 0 4.96-.9 6.62-2.43l-3.24-2.51c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.06v2.59A10 10 0 0 0 12 22z"
    />
    <path
      fill="#FBBC05"
      d="M6.41 13.9a6 6 0 0 1 0-3.8V7.51H3.06a10 10 0 0 0 0 8.98l3.35-2.59z"
    />
    <path
      fill="#EA4335"
      d="M12 5.98c1.47 0 2.79.5 3.83 1.5l2.87-2.87A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.94 5.51l3.35 2.59C7.2 7.74 9.4 5.98 12 5.98z"
    />
  </svg>
);

const appleIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-[18px] w-[18px]"
    aria-hidden="true"
  >
    <path d="M16.37 1.43c0 1.14-.42 2.2-1.26 3.03-.9.9-1.96 1.4-3.13 1.31-.06-1.1.42-2.25 1.24-3.06.87-.87 2.1-1.4 3.15-1.28zM20.9 17.06c-.55 1.28-.82 1.86-1.53 3-.99 1.58-2.39 3.55-4.12 3.56-1.54.02-1.94-1-4.03-.99-2.09.01-2.53 1.01-4.07.99-1.73-.01-3.05-1.78-4.04-3.36C-.6 15.9-.87 10.62 1.13 7.75c1.42-2.04 3.66-3.24 5.78-3.24 2.15 0 3.5 1.18 5.28 1.18 1.73 0 2.78-1.18 5.27-1.18 1.88 0 3.87 1.02 5.29 2.79-4.65 2.55-3.89 9.19 1.15 9.76z" />
  </svg>
);

export default function AuthCard({ variant }: { variant: AuthVariant }) {
  const isSignIn = variant === "sign-in";
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status !== "idle") return;
    setStatus("loading");
    window.setTimeout(() => setStatus("done"), 850);
  };

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/85 p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-400/60 to-transparent"
      />

      {/* Header */}
      <span className="inline-flex items-center gap-2 rounded-full border border-rose-100 bg-rose-50 px-3 py-1 text-xs font-medium text-rose-600">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          className="h-3.5 w-3.5"
          aria-hidden="true"
        >
          <circle cx="9" cy="12" r="5.25" />
          <circle cx="15" cy="12" r="5.25" />
        </svg>
        {isSignIn ? "Welcome back" : "Join WedPlan"}
      </span>

      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-[1.75rem]">
        {isSignIn ? (
          <>
            Sign in to your{" "}
            <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
              account
            </span>
          </>
        ) : (
          <>
            Start planning your{" "}
            <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
              perfect day
            </span>
          </>
        )}
      </h1>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
        {isSignIn
          ? "Pick up right where you left off — your saved vendors are waiting."
          : "Create a free account and unlock curated vendors, tools, and inspiration."}
      </p>

      {/* Social auth */}
      <div className="mt-6 grid grid-cols-2 gap-2.5">
        <SocialButton label="Google">{googleIcon}</SocialButton>
        <SocialButton label="Apple">{appleIcon}</SocialButton>
      </div>

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-slate-200" />
        <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
          or continue with email
        </span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isSignIn && (
          <Field
            id="name"
            label="Full name"
            type="text"
            placeholder="Amara Bennett"
            autoComplete="name"
            icon={userIcon}
          />
        )}

        <Field
          id="email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          icon={mailIcon}
        />

        <Field
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder={isSignIn ? "Enter your password" : "At least 8 characters"}
          autoComplete={isSignIn ? "current-password" : "new-password"}
          icon={lockIcon}
          hint={
            !isSignIn ? (
              <p className="text-xs text-slate-400">
                Use 8+ characters with a mix of letters, numbers &amp; symbols.
              </p>
            ) : undefined
          }
          trailing={
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-[18px] w-[18px]"
                aria-hidden="true"
              >
                {showPassword ? (
                  <>
                    <path d="M3 3l18 18" />
                    <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                    <path d="M9.9 5.2A10.9 10.9 0 0 1 12 5c6.5 0 10 7 10 7a17.4 17.4 0 0 1-3.1 4.1M6.3 6.3A17.6 17.6 0 0 0 2 12s3.5 7 10 7a10.7 10.7 0 0 0 4.1-.8" />
                  </>
                ) : (
                  <>
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
                    <circle cx="12" cy="12" r="3" />
                  </>
                )}
              </svg>
            </button>
          }
        />

        {isSignIn ? (
          <div className="flex items-center justify-between gap-3 pt-0.5">
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                name="remember"
                className="h-4 w-4 rounded border-slate-300 accent-rose-500 outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
              />
              Remember me
            </label>
            <Link
              href="/"
              className="text-sm font-medium text-rose-600 transition-colors hover:text-rose-700 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
            >
              Forgot password?
            </Link>
          </div>
        ) : (
          <label className="flex cursor-pointer items-start gap-2.5 pt-0.5 text-sm text-slate-600">
            <input
              type="checkbox"
              name="terms"
              required
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-rose-500 outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
            />
            <span>
              I agree to the{" "}
              <Link
                href="/"
                className="font-medium text-rose-600 underline-offset-2 hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/"
                className="font-medium text-rose-600 underline-offset-2 hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>
        )}

        {status === "done" && (
          <div
            role="status"
            aria-live="polite"
            className="flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
              aria-hidden="true"
            >
              <path d="m5 13 4 4L19 7" />
            </svg>
            <span>
              <span className="font-semibold">You&apos;re all set!</span> This
              demo doesn&apos;t create a real account yet.
            </span>
          </div>
        )}

        <button
          type="submit"
          disabled={status !== "idle"}
          className="group mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rose-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-rose-600/40 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-80 outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
        >
          {status === "loading" ? (
            <>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="h-4 w-4 animate-spin"
                aria-hidden="true"
              >
                <path d="M21 12a9 9 0 1 1-6.2-8.6" />
              </svg>
              {isSignIn ? "Signing in..." : "Creating account..."}
            </>
          ) : status === "done" ? (
            <>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="m5 13 4 4L19 7" />
              </svg>
              {isSignIn ? "Signed in" : "Account created"}
            </>
          ) : (
            <>
              {isSignIn ? "Sign in" : "Create free account"}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </>
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        {isSignIn ? "New to WedPlan?" : "Already have an account?"}{" "}
        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-semibold text-rose-600 transition-colors hover:text-rose-700 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
        >
          {isSignIn ? "Create an account" : "Sign in instead"}
        </Link>
      </p>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-slate-400">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3.5 w-3.5"
          aria-hidden="true"
        >
          <path d="M12 3l7 3v6c0 4.4-3 7.7-7 9-4-1.3-7-4.6-7-9V6l7-3z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
        Secure, encrypted &amp; spam-free
      </p>
    </section>
  );
}
