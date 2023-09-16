import React from "react";
import styles from "./styles/category-card-icon.module.scss";
import Image from "next/image";

// size of the category icon
const iconSize = { height: 40, width: 40 };

const CategoryCardIcon: React.FC<{
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
      className={styles[`category-content-icon`]}
      style={{ width: e.containerWidth, height: e.containerHeight, order: e.order }}
    >
      <div className={styles["category-content-icon-container"]}>
        <Image src={e.img} alt={e.title} {...iconSize} />
      </div>
      <div className={styles["categoty-content-icon-title"]}>{e.title}</div>
    </div>
  );
};

export default CategoryCardIcon;
