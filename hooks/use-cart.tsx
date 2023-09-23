import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { Product } from "@/types";
import { AlertTriangle } from "lucide-react";

interface CartStore {
  items: { product: Product; quantity: number }[];
  totalItems: number;
  totalPrice: number;
  addItem: (data: Product) => void;
  subtractItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  validateTotalPrice: () => void;
}

const useCart = create(
  devtools(
    immer(
      persist<CartStore>(
        (set, get) => ({
          items: [],
          totalItems: 0,
          totalPrice: 0,

          addItem: (data: Product) => {
            const currentItems = get().items;
            const existingItem = currentItems.find((item) => item.product.id === data.id);

            if (existingItem) {
              ++existingItem.quantity;
              set({
                items: [...get().items],
                totalPrice:
                  get().totalPrice + data.attributes.price - data.attributes.discount_value,
              });
            } else {
              set({
                items: [...get().items, { product: data, quantity: 1 }],
                totalItems: ++get().totalItems,
                totalPrice:
                  get().totalPrice + data.attributes.price - data.attributes.discount_value,
              });
              toast.success("Item added to cart.");
            }
          },

          subtractItem: (data: Product) => {
            const currentItems = get().items;
            const existingItem = currentItems.find((item) => item.product.id === data.id);

            if (!existingItem) return;

            if (existingItem.quantity <= 1) {
              // set({
              //   items: [...get().items.filter((item) => item.product.id !== data.id)],
              //   totalItems: --get().totalItems,
              //   totalPrice:
              //     get().totalPrice - data.attributes.price + data.attributes.discount_value,
              // });
              return;
            }
            if (existingItem.quantity > 1) {
              --existingItem.quantity;
              set({
                items: [...get().items],
                totalPrice:
                  get().totalPrice - data.attributes.price + data.attributes.discount_value,
              });
            }
          },

          removeItem: (id: string) => {
            set({
              items: [...get().items.filter((item) => item.product.id !== id)],
              totalItems: --get().totalItems,
            });
            get().validateTotalPrice();
          },

          removeAll: () => set({ items: [], totalItems: 0, totalPrice: 0 }),

          // TODO get prices from server
          validateTotalPrice: () => {
            const totalPrice = get().items.reduce<number>((prev, e) => {
              if (e.product.attributes.discount_price) {
                return prev + e.quantity * e.product.attributes.discount_price;
              } else {
                return prev + e.quantity * e.product.attributes.price;
              }
            }, 0);
            set({
              totalPrice: totalPrice,
            });
          },
        }),
        {
          name: "cart-storage",
          storage: createJSONStorage(() => localStorage),
        }
      )
    )
  )
);

export default useCart;
