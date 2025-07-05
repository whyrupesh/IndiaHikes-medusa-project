"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { medusa } from "../lib/medusa";
const regions = await medusa.get("/regions");
const regionId = regions.data.regions[0].id; // or let user select


const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);

  useEffect(() => {
  const cartId = localStorage.getItem("cart_id");
  if (cartId) {
    medusa.get(`/carts/${cartId}`)
      .then(res => setCart(res.data.cart))
      .catch(() => localStorage.removeItem("cart_id"));
  } else {
    medusa.get("/regions").then(regionsRes => {
      const regionId = regionsRes.data.regions[0].id;
      medusa.post("/carts", { region_id: regionId }).then(res => {
        setCart(res.data.cart);
        localStorage.setItem("cart_id", res.data.cart.id);
      });
    });
  }
}, []);

  const addToCart = async (productId) => {
    if (!cart) return;
    // Get first variant
    const product = await medusa.get(`/products/${productId}`);
    const variantId = product.data.product.variants[0].id;
    await medusa.post(`/carts/${cart.id}/line-items`, {
      variant_id: variantId,
      quantity: 1,
    }).then(res => setCart(res.data.cart));
  };

  // In CartContext.js
const updateLineItem = async (lineItemId, quantity) => {
  if (!cart) return;
  await medusa.post(`/carts/${cart.id}/line-items/${lineItemId}`, { quantity })
    .then(res => setCart(res.data.cart));
};

const removeLineItem = async (lineItemId) => {
  if (!cart) return;
  await medusa.delete(`/carts/${cart.id}/line-items/${lineItemId}`)
    .then(res => setCart(res.data.cart));
};



  return (
    <CartContext.Provider value={{ cart, addToCart,updateLineItem, removeLineItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
