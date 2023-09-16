import React from "react";
import styles from "./styles/category-card-img.module.scss";
import Image from "next/image";

const CategoryCardImg: React.FC<{
  order: number;
  id: string;
  title: string;
  url: string;
  img: string;
  containerHeight: number;
  containerWidth: number;
  type: string;
}> = (e) => {
  return (
    <div
      className={styles[`category-content-img`]}
      style={{ width: e.containerWidth, height: e.containerHeight, order: e.order }}
    >
      <div className={styles["category-content-img-container"]}>
        <Image src={e.img} alt={e.title} width={e.containerWidth} height={e.containerHeight} />
      </div>
      <div className={styles["categoty-content-img-title"]}>{e.title}</div>
    </div>
  );
};

export default CategoryCardImg;
