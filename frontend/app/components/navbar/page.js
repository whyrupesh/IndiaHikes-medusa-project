"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="bg-green-700 text-white px-6 py-4 flex items-center justify-between shadow">
      <Link href="/" className="text-2xl font-bold tracking-wide">
        Indiahikes-Store
      </Link>
      <div className="space-x-6">
        <Link
          href="/products"
          className={`hover:underline ${pathname === "/products" ? "underline" : ""}`}
        >
          Products
        </Link>
        <Link
          href="/cart"
          className={`hover:underline ${pathname === "/cart" ? "underline" : ""}`}
        >
          Cart
        </Link>
      </div>
    </nav>
  );
}
