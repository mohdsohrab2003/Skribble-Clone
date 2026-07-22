import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-7xl font-bold">404</h1>
        <p className="mt-4 text-gray-400">
          The page you're looking for doesn't exist.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-violet-600 px-5 py-3 text-white"
        >
          Back Home
        </Link>
      </div>
    </main>
  );
}
