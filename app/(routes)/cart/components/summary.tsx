"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";

import style from "./styles/summary.module.scss";

const Summary = () => {
  const searchParams = useSearchParams();
  const cart = useCart((state) => state);
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  const onCheckout = async () => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
      productIds: cart.items.map((item) => item.product.id),
    });

    window.location = response.data.url;
  };

  return (
    <div
      className={`${style["container-summary"]} mt-12 bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8`}
    >
      <h2 className="text-lg font-medium text-gray-900">Podsumowanie zamowienia</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Całkowity</div>
          {cart.totalPrice + " zl"}
        </div>
      </div>
      <Button onClick={onCheckout} disabled={cart.items.length === 0} className="w-full mt-6">
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
