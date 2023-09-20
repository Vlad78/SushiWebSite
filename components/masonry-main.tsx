import React from "react";
import { Category, Product, Story } from "../types";
import defaultIcon from "@/public/sushi.png";
import { getRandom1to10 } from "../lib/utils";
import CategoryCardImg from "./category-card-img";
import CategoryCardIcon from "./category-card-icon";
import ProductCard from "./product-card";

import styles from "./styles/masonry-main.module.scss";

const MasonryMain: React.FC<{ categories: Category[]; products: Product[]; stories: Story[] }> = ({
  categories,
  products,
  stories,
}) => {
  // cherry-picking data
  const categoryRevised = categories.map((e) => {
    let data = {};
    if (e.attributes.img.data) {
      data = {
        img: e.attributes.img.data[0].attributes.formats.small.url,
        containerHeight: 145,
        containerWidth: 135,
        type: "img",
      };
    }
    return {
      // random order of items on page
      order: getRandom1to10(),
      id: e.id,
      title: e.attributes.title,
      url: e.attributes.url,
      img: e.attributes.icon.data
        ? e.attributes.icon.data[0].attributes.formats.thumbnail.url
        : defaultIcon.src,
      containerHeight: 50,
      containerWidth: 150,
      type: "icon",

      ...data,
    };
  });

  const storiesRevised = stories.map((e) => {
    return {
      order: getRandom1to10(),
      img: e.attributes.img.data?.[0].attributes.formats.small.url,
    };
  });

  const productsRevised = products.map((e) => {
    return {
      order: getRandom1to10(),

      id: e.id,
      url: e.attributes.url,
      img:
        e.attributes.img.data[0].attributes.formats.small !== undefined
          ? e.attributes.img.data[0].attributes.formats.small.url
          : e.attributes.img.data[0].attributes.url,
      title: e.attributes.title,
      desc: e.attributes.descShort,
      price: e.attributes.price,
      discountPrice: e.attributes.discount_price,
      containerHeight: 185,
      containerWidth: 145,
      type: "product",
      originalObject: e,
    };
  });

  return (
    <div className={styles.container}>
      {categoryRevised.map((e) => {
        if (e.type === "img") return <CategoryCardImg key={e.id} {...e} />;
        if (e.type === "icon") return <CategoryCardIcon key={e.id} {...e} />;
      })}
      {productsRevised.map((e) => (
        <ProductCard key={e.id} {...e} />
      ))}
    </div>
  );
};

export default MasonryMain;
