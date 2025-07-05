import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center h-[60vh]">
      <h1 className="text-4xl font-bold mb-4 text-green-800">Welcome to Indiahikes-Store</h1>
      <p className="mb-8 text-lg text-gray-700">Your one-stop shop for trekking essentials.</p>
      <Link
        href="/products"
        className="px-6 py-3 bg-green-700 text-white rounded-lg text-lg font-semibold shadow hover:bg-green-800 transition"
      >
        See Products
      </Link>
    </section>
  );
}
