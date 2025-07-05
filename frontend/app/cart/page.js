"use client";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function CartPage() {
  const { cart, updateLineItem, removeLineItem } = useCart();
  const [updating, setUpdating] = useState({});

  if (!cart) return <div className="text-center py-10">Loading cart...</div>;

  const handleUpdate = async (itemId, newQty) => {
    setUpdating((prev) => ({ ...prev, [itemId]: true }));
    await updateLineItem(itemId, newQty);
    setUpdating((prev) => ({ ...prev, [itemId]: false }));
  };

  const handleRemove = async (itemId) => {
    setUpdating((prev) => ({ ...prev, [itemId]: true }));
    await removeLineItem(itemId);
    setUpdating((prev) => ({ ...prev, [itemId]: false }));
  };

  return (
    <div className="px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-green-800 text-center">Your Cart</h2>
      {cart.items?.length === 0 ? (
        <div className="text-center text-gray-500">Your cart is empty.</div>
      ) : (
        <div className="flex flex-col gap-6">
          <ul className="space-y-4">
            {cart.items.map(item => (
              <li key={item.id} className="bg-white rounded-xl shadow-lg p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                <img
                  src={item.thumbnail || "/placeholder.png"}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <div className="font-semibold text-lg">{item.title}</div>
                  <div className="text-gray-600 text-sm mb-2">{item.description}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() => handleUpdate(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1 || updating[item.id]}
                    >-</button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() => handleUpdate(item.id, item.quantity + 1)}
                      disabled={updating[item.id]}
                    >+</button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between h-full">
                  <div className="font-semibold text-green-700 mb-2">
                    {(item.unit_price / 100).toFixed(2)} {cart.region?.currency_code?.toUpperCase()}
                  </div>
                  <button
                    className="text-red-600 hover:underline text-sm"
                    onClick={() => handleRemove(item.id)}
                    disabled={updating[item.id]}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
            <div className="font-bold text-xl">
              Total: {(cart.total / 100).toFixed(2)} {cart.region?.currency_code?.toUpperCase()}
            </div>
            <button
              className="px-6 py-3 bg-green-700 text-white rounded-lg font-semibold shadow hover:bg-green-800 transition"
              onClick={() => alert("It is not connected to payment gateway yet")}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
