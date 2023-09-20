"use client";

import Image from "next/image";
import React from "react";

import cartIcon from "@/public/cart @100.webp";
import useCart from "../hooks/use-cart";

const CartIcon = () => {
  const cart = useCart();
  const imgParams = {
    width: 36,
    height: 36,
    quality: 100,
    priority: true,
  };
  return (
    <>
      <Image src={cartIcon} alt="cart" {...imgParams}></Image>
      <span>{cart.totalItems}</span>
      <p>kosz</p>
    </>
  );
};

export default CartIcon;
