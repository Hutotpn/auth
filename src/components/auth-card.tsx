"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/utils/auth-client";

type Mode = "signin" | "signup";

export function AuthCard() {
  const { data: session, isPending } = authClient.useSession();
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSignIn = mode === "signin";

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      if (isSignIn) {
        const result = await authClient.signIn.email({
          email,
          password,
        });

        if (result.error) {
          setMessage(result.error.message ?? "Unable to sign in.");
          return;
        }

        setMessage("Signed in successfully.");
        return;
      }

      const result = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (result.error) {
        setMessage(result.error.message ?? "Unable to create your account.");
        return;
      }

      setMessage("Account created. You are now signed in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSignOut = async () => {
    setMessage("");
    setIsSubmitting(true);
    try {
      await authClient.signOut();
      setMessage("Signed out.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending) {
    return <p className="text-sm text-neutral-600">Loading session…</p>;
  }

  if (session?.user) {
    return (
      <section className="w-full max-w-md rounded-2xl border border-neutral-200 p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">
          Welcome back, {session.user.name}
        </h1>
        <p className="mt-2 text-sm text-neutral-700">
          Signed in as {session.user.email}
        </p>
        <div className="mt-6 flex items-center gap-3">
          <Link
            className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
            href="/dashboard"
          >
            Go to dashboard
          </Link>
          <button
            className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium"
            onClick={onSignOut}
            type="button"
          >
            {isSubmitting ? "Signing out..." : "Sign out"}
          </button>
        </div>
        {message ? (
          <p className="mt-3 text-sm text-neutral-600">{message}</p>
        ) : null}
      </section>
    );
  }

  return (
    <section className="w-full max-w-md rounded-2xl border border-neutral-200 p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">Simple auth starter</h1>
      <p className="mt-2 text-sm text-neutral-600">
        {isSignIn
          ? "Sign in to your account."
          : "Create an account to continue."}
      </p>

      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        {!isSignIn ? (
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-neutral-700">
              Name
            </span>
            <input
              className="w-full rounded-md border border-neutral-300 px-3 py-2"
              onChange={(event) => setName(event.target.value)}
              required
              type="text"
              value={name}
            />
          </label>
        ) : null}

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-neutral-700">Email</span>
          <input
            className="w-full rounded-md border border-neutral-300 px-3 py-2"
            onChange={(event) => setEmail(event.target.value)}
            required
            type="email"
            value={email}
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-neutral-700">
            Password
          </span>
          <input
            className="w-full rounded-md border border-neutral-300 px-3 py-2"
            minLength={8}
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
            value={password}
          />
        </label>

        <button
          className="w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting
            ? "Working..."
            : isSignIn
              ? "Sign in"
              : "Create account"}
        </button>
      </form>

      <button
        className="mt-4 text-sm font-medium text-neutral-700 underline"
        onClick={() => {
          setMode(isSignIn ? "signup" : "signin");
          setMessage("");
        }}
        type="button"
      >
        {isSignIn ? "Need an account? Sign up" : "Have an account? Sign in"}
      </button>

      {message ? (
        <p className="mt-3 text-sm text-neutral-600">{message}</p>
      ) : null}
    </section>
  );
}
