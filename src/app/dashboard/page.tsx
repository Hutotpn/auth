import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/utils/auth";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center p-6">
      <section className="w-full max-w-md rounded-2xl border border-neutral-200 p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="mt-2 text-sm text-neutral-700">
          Hello {session.user.name}.
        </p>
        <p className="text-sm text-neutral-700">
          Your email is {session.user.email}.
        </p>
        <Link
          className="mt-6 inline-block text-sm font-medium underline"
          href="/"
        >
          Back to auth page
        </Link>
      </section>
    </main>
  );
}
