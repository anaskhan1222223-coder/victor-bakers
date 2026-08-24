import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#fff8f0] px-4 text-center">
      <span className="text-7xl" aria-hidden="true">🍰</span>
      <h1 className="mt-6 text-3xl font-extrabold text-[#3e2723]">
        Oops! This page got eaten.
      </h1>
      <p className="mt-2 text-[#8d6e63]">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-gradient-to-r from-rose-500 to-orange-400 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-rose-200"
      >
        Back to Home
      </Link>
    </main>
  );
}