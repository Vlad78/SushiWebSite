"use client";

import { useEffect, useState } from "react";

import Container from "@/components/ui/container";
import Summary from "./components/summary";
import CartItem from "./components/cart-item";
import Delivery from "@/components/modal-delivery";
import useCart from "@/hooks/use-cart";
import useUserData from "@/hooks/use-userData";
import usePreviewModal from "@/hooks/use-preview-modal";
import { to2Decimal } from "@/lib/utils";
import style from "./page.module.scss";

export const revalidate = 0;

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();
  const modal = usePreviewModal();
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

        {/* Items start */}
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
        {/* Items end */}

        {/* Delivery isle start */}
        <div className={`${style.delivery} sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8`}>
          <div className={style["delivery-main"]}>
            {(delivery === null || delivery?.type === "delivery") && (
              <>
                <div className={style["delivery-address-title"]}>
                  <p>Adres dostawy:</p>
                </div>
                <div
                  className={style["delivery-address"]}
                  onClick={() =>
                    modal.onOpen(
                      <div className={style["delivery-wrap"]}>
                        <Delivery />
                      </div>
                    )
                  }
                >
                  {delivery ? delivery.address : "Wprowadź adres"}
                </div>
                <div className={style["main-text-col1"]}>
                  <p>Koszt dostawy</p>
                </div>
                <div className={style["main-text-col2"]}>
                  <p>15 zł</p>
                </div>
                <div className={style["small-text-col1"]}>
                  <p>Do darmowej dostawy jeszcze </p>
                </div>
                <div className={style["small-text-col2"]}>
                  <p>10 zł</p>
                </div>
              </>
            )}
            {delivery?.type === "pick-up" && (
              <>
                <div className={style["delivery-address-title"]}>
                  <p>Adres odbioru:</p>
                </div>
                <div
                  className={style["delivery-address"]}
                  onClick={() =>
                    modal.onOpen(
                      <div className={style["delivery-wrap"]}>
                        <Delivery />
                      </div>
                    )
                  }
                >
                  {delivery ? delivery.address : "Wybierz miejsce"}
                </div>
                <div className={style["working-hours-col1"]}>
                  <p>Godziny pracy:</p>
                </div>
                <div className={style["working-hours-col2"]}>
                  <p>{delivery.workingHours}</p>
                </div>
                <div className={style["main-text-col1"]}>
                  <p>10% zniżki </p>
                </div>
                <div className={style["main-text-col2"]}>
                  <p>{"-" + to2Decimal(cart.totalPrice * 0.1) + " zł"}</p>
                </div>
              </>
            )}
          </div>
        </div>
        {/* Delivery isle end */}

        <div className={style.summery}>
          <Summary />
        </div>
      </div>
      {/* </div> */}
    </Container>
  );
};

export default CartPage;
