import React from "react";
import styles from "./styles/product-card.module.scss";
import Image from "next/image";
import { addDecimal } from "../lib/utils";

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
}> = (e) => {
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
            {addDecimal(e.price) + " zl"}
            <div className={styles["product-content-oldPrice__dash"]}>————</div>
          </div>
          <div className={styles["product-content-mainPrice"]}>
            {e.discountPrice ? addDecimal(e.discountPrice) + " zl" : addDecimal(e.price) + " zl"}
          </div>
        </div>
        <div className={styles["product-content-cart"]}>
          <div className={styles["product-content-cart-img"]}></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
