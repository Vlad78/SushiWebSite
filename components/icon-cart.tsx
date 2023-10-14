"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import cartIcon from "@/public/cart @100.webp";
import useCart from "../hooks/use-cart";

type imgParams = {
  imgParams: {
    width: number;
    height: number;
    quality: number;
    priority: boolean;
  };
};

const CartIcon: React.FC<imgParams> = ({ imgParams }) => {
  const cart = useCart();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <button onClick={() => router.push("/cart")}>
        <Image src={cartIcon} alt="cart" {...imgParams}></Image>
        <span>...</span>
        <p>kosz</p>
      </button>
    );
  }

  return (
    <button onClick={() => router.push("/cart")}>
      <Image src={cartIcon} alt="cart" {...imgParams}></Image>
      <span>{cart.totalItems}</span>
      <p>kosz</p>
    </button>
  );
};

export default CartIcon;
