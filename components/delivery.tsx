"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

import IconButton from "./ui/icon-button";
import { useClientRect } from "../lib/utils-hooks";
import style from "./styles/delivery.module.scss";
import Combobox from "./ui/combobox";
import { CompassIcon } from "lucide-react";
import Button from "./ui/button";
import useCart from "../hooks/use-cart";
import { to2Decimal } from "../lib/utils";

const places = [
  {
    id: 1,
    name: "Księdza Józefa Londzina 54, 47-400 Racibórz, Польша",
    fullAdress: "adress 1, city, Poland",
    shortAdress: "adress 1",
    img: "img url",
    workingHours: "13:00-21:00",
  },
  {
    id: 2,
    name: "Sushi place 2",
    fullAdress: "adress 1, city, Poland",
    shortAdress: "adress 1",
    img: "img url",
    workingHours: "13:00-21:00",
  },
  {
    id: 3,
    name: "Sushi place 3",
    fullAdress: "adress 1, city, Poland",
    shortAdress: "adress 1",
    img: "img url",
    workingHours: "13:00-21:00",
  },
];

const Delivery = () => {
  const [isMounted, setIsMounted] = useState(false);

  // cart

  const cart = useCart();

  // header animation
  const [isActive, setIsActive] = useState<"courier" | "pickup">("courier");
  const [courierRect, courierBlockRef] = useClientRect();
  const [pickupRect, pickupBlockRef] = useClientRect();
  const [lineRect, lineBlockRef] = useClientRect();

  let underscoreStyle = {
    width: courierRect?.width,
    marginLeft: "2rem",
    transform: "translate3d(0, -3px, 0)",
  };

  if (isActive === "pickup") {
    underscoreStyle = {
      width: pickupRect?.width,
      marginLeft: "0",
      transform: `translate3d(${Number(lineRect?.width) / 2}px, -3px, 0)`,
    };
  }

  // combobox take away options
  const [selected, setSelected] = useState(places[0]); // user preferences data

  // hydration workaround

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={`${style["delivery-container"]} mt-12 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8`}
    >
      {/* header */}
      <div className={style["delivery-header"]} style={{}}>
        <div
          className={`${style.courier} ${isActive === "courier" && style.isActive}`}
          onClick={() => setIsActive("courier")}
        >
          <span ref={courierBlockRef}>Kurier</span>
        </div>
        <div
          className={`${style.pickup} ${isActive === "pickup" && style.isActive}`}
          onClick={() => setIsActive("pickup")}
        >
          <span ref={pickupBlockRef}>Odbiór własny</span>
        </div>
        <div
          ref={lineBlockRef as unknown as (node: HTMLDivElement) => void}
          className={style.line}
        ></div>
        <div className={`${style["underscore"]}`} style={underscoreStyle}></div>
      </div>
      {/* delivery block */}
      <div
        className={style["delivery-main"]}
        style={isActive === "courier" ? { display: "grid" } : { display: "none" }}
      >
        <div className={style["delivery-adress"]}>
          <p>Adres dostawy:</p>
        </div>
        <div className={style["adress"]}>Księdza Józefa Londzina 54, 47-400 Racibórz, Польша</div>
        <div className={style["arrow"]}>
          <IconButton
            onClick={() => {}}
            className={style["arrow-icon"]}
            icon={<ChevronDown size={35} aria-hidden="true" />}
          />
        </div>
        <div className={style["delivery-price"]}>
          <p>Koszt dostawy</p>
        </div>
        <div className={style["price"]}>
          <p>15 zł</p>
        </div>
        <div className={style["remain-money"]}>
          <p>Do darmowej dostawy jeszcze </p>
        </div>
        <div className={style["money"]}>
          <p>10 zł</p>
        </div>
      </div>
      {/* pickup block */}
      <div
        className={style["pickup-main"]}
        style={isActive === "pickup" ? { display: "grid" } : { display: "none" }}
      >
        <div className={style["pickup-adress"]}>
          <p>Adres odbioru:</p>
        </div>
        <div className={style["pickup-combobox"]}>
          <Combobox selected={selected} setSelected={setSelected} places={places} />
        </div>
        <div className={style["pickup-see-on-map"]}>
          <Button onClick={() => {}}>
            <CompassIcon size={20} display="inline" />
            <span>Wyświetl na mapie</span>
          </Button>
        </div>
        <div className={style["pickup-discount"]}>
          <p>10% zniżki </p>
        </div>
        <div className={style["pickup-discount-amount"]}>
          <p>{to2Decimal(cart.totalPrice * 0.1) + " zł"}</p>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
