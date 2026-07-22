"use client";

import Link from "next/link";
import { Construction, Hammer, BellRing, Home } from "lucide-react";

export default function NotDevelopedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B1126] px-6 py-20">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-violet-500/20">
          <Construction className="h-12 w-12 text-violet-400" />
        </div>

        <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-300">
          🚧 Under Development
        </span>

        <h1 className="mt-6 text-4xl font-bold text-white md:text-5xl">
          This Page Isn't Ready Yet
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-300">
          We're currently building this page and adding exciting new features.
          It isn't available yet, but it will be released soon.
        </p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-left">
          <div className="flex items-start gap-4">
            <BellRing className="mt-1 text-violet-400" size={24} />

            <div>
              <h3 className="font-semibold text-white">Stay Tuned</h3>

              <p className="mt-2 text-slate-400">
                This feature is currently in the development phase. Once it's
                completed, we'll make it available for everyone.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-500"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <button
            disabled
            className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-slate-400"
          >
            <Hammer size={18} />
            Coming Soon
          </button>
        </div>
      </div>
    </main>
  );
}
