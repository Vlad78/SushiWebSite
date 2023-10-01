"use client";

import { useEffect, useState } from "react";

import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";
import Summary from "./components/summary";
import CartItem from "./components/cart-item";
import Delivery from "@/components/delivery";

import style from "./page.module.scss";

export const revalidate = 0;

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();

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
          <Delivery />
        </div>
        <div className={`${style.delivery} sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8`}>
          <div className={style["delivery-main"]}>
            <div className={style["delivery-adress"]}>
              <p>Adres dostawy:</p>
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
