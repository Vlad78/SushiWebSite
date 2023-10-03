"use client";

import { useEffect, useState } from "react";

import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";
import Summary from "./components/summary";
import CartItem from "./components/cart-item";

import style from "./page.module.scss";
import useUserData from "../../../hooks/use-userData";
import { to2Decimal } from "../../../lib/utils";

export const revalidate = 0;

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();
  const {
    current: { delivery },
  } = useUserData();

  useEffect(() => {
    setIsMounted(true);
    cart.validateTotalPrice();
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Container>
      {/* <div className="bg-white"> */}
      <div className={`${style.container} sm:px-6 lg:px-8`}>
        <h1 className="text-3xl font-bold pl-4">Kosz</h1>
        <div className="mt-8 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
          <div className="lg:col-span-7">
            {cart.items.length === 0 && (
              <p className="pl-4 pb-4 text-xl text-neutral-500">Brak artykułów w koszyku.</p>
            )}
            <ul>
              {cart.items.map((item) => (
                <CartItem key={item.product.id} data={item} />
              ))}
            </ul>
          </div>
        </div>
        <div className={`${style.delivery} sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8`}>
          <div className={style["delivery-main"]}>
            <div className={style["delivery-address-title"]}>
              <p>Adres dostawy:</p>
            </div>
            <div className={style["delivery-address"]}>{delivery.address}</div>
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
            <div className={style["pickup-discount"]}>
              <p>10% zniżki </p>
            </div>
            <div className={style["pickup-discount-amount"]}>
              <p>{to2Decimal(cart.totalPrice * 0.1) + " zł"}</p>
            </div>
          </div>
        </div>

        <div className={style.summery}>
          <Summary />
        </div>
      </div>
      {/* </div> */}
    </Container>
  );
};

export default CartPage;
