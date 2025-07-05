"use client";
import { useEffect, useState } from "react";
import { medusa } from "../lib/medusa";
import { useCart } from "../context/CartContext";
// import toast from "react-hot-toast";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState({});
  const { addToCart, cart } = useCart();

  useEffect(() => {
    medusa.get("/products")
      .then(res => setProducts(res.data.products))
      .finally(() => setLoading(false));
  }, []);

  // Helper to get quantity of a product in cart
  const getQuantity = (productId) => {
    if (!cart || !cart.items) return 0;
    const item = cart.items.find(
      (i) => i.product_id === productId
    );
    return item ? item.quantity : 0;
  };

  const handleAddToCart = async (productId) => {
    setAdding((prev) => ({ ...prev, [productId]: true }));
    await addToCart(productId);
    setAdding((prev) => ({ ...prev, [productId]: false }));
    toast.success("Added to cart!");
  };

  return (
    <div className="px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-green-800 text-center">Products</h2>
      {loading && <div className="text-center">Loading...</div>}
      {!loading && products.length === 0 && <div className="text-center">No products found.</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(prod => (
          <div key={prod.id} className="bg-white p-4 rounded-xl shadow-lg flex flex-col hover:shadow-2xl transition">
            <img
              src={prod.thumbnail || "/placeholder.png"}
              alt={prod.title}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h3 className="font-semibold text-lg mb-1">{prod.title}</h3>
            <p className="text-gray-600 text-sm mb-2 flex-1">{prod.description}</p>
            <div className="flex items-center justify-between mt-2">
              <button
                className={`px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition disabled:opacity-60`}
                onClick={() => handleAddToCart(prod.id)}
                disabled={adding[prod.id]}
              >
                {adding[prod.id] ? "Adding..." : "Add to Cart"}
              </button>
              <span className="ml-3 text-gray-700 text-sm">
                {getQuantity(prod.id) > 0 && (
                  <span>
                    <span className="font-semibold">Qty:</span> {getQuantity(prod.id)}
                  </span>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
