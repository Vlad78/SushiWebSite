"use client";

import React, { MouseEventHandler } from "react";
import styles from "./styles/product-card.module.scss";
import Image from "next/image";
import { to1Decimal } from "../lib/utils";
import useCart from "../hooks/use-cart";
import { Product } from "../types";

const ProductCard: React.FC<{
  order: number;
  id: string;
  url: string;
  img: string;
  title: string;
  desc: string;
  price: number;
  discountPrice: number;
  containerHeight: number;
  containerWidth: number;
  type: string;
  originalObject: Product;
}> = (e) => {
  const cart = useCart();

  const addClickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    cart.addItem(e.originalObject);
  };
  return (
    <div
      className={styles[`product-content`]}
      style={{ width: e.containerWidth, height: e.containerHeight, order: e.order }}
    >
      <div className={styles["product-content-img-container"]}>
        <Image src={e.img} alt={e.title} width={e.containerWidth} height={e.containerHeight} />
      </div>

      <div className={styles["product-content-title"]}>
        <p>{e.title}</p>
      </div>

      <div className={styles["product-shop-block"]}>
        <div className={styles["product-price-block"]}>
          <div
            className={styles["product-content-oldPrice"]}
            style={!e.discountPrice ? { display: "none" } : {}}
          >
            {to1Decimal(e.price) + " zl"}
            <div className={styles["product-content-oldPrice__dash"]}>————</div>
          </div>
          <div className={styles["product-content-mainPrice"]}>
            {e.discountPrice ? to1Decimal(e.discountPrice) + " zl" : to1Decimal(e.price) + " zl"}
          </div>
        </div>
        <div className={styles["product-content-cart"]}>
          <button className={styles["product-content-cart-img"]} onClick={addClickHandler}></button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
