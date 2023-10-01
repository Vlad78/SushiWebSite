import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { produce } from "immer";
import { Address } from "../types";

type deliveryTypes = "delivery" | "pick-up";

interface UserData {
  isUserRegistered: boolean;
  isUserLoggedIn: boolean;
  current: {
    deliveryTab: deliveryTypes;
    delivery: Address;
    previousDelivery: Address | null;
  };
  addressesHistoty: {
    allDeliveryAddresses: Address[]; // последний адресс всегда последний элемент массива?
    lastDeliveryAddress: Address | null;
    lastPickUpPlace: Address;
  };
  setDeliveryTab: (data: deliveryTypes) => void;
  setCurrentDelivery: (data: Address) => void;
}

const addressExample: Address = {
  address: "Migawka CAFE, Opawska, Raciborz, Poland",
  lat: 50.0833419,
  lng: 18.2113659,
  type: "delivery",
};

const useUserData = create(
  devtools(
    immer(
      persist<UserData>(
        (set, get) => ({
          isUserRegistered: false,
          isUserLoggedIn: false,
          current: {
            deliveryTab: "delivery",
            delivery: addressExample,
            previousDelivery: null,
          },
          addressesHistoty: {
            allDeliveryAddresses: [addressExample],
            lastDeliveryAddress: addressExample,
            lastPickUpPlace: {
              lat: 50.09705502403408,
              lng: 18.210203374501827,
              type: "pick-up",
              address: "Księdza Józefa Londzina 54, 47-400 Racibórz, Польша",
              workingHours: "13:00-22:00",
            },
          },
          setDeliveryTab: (data) => {
            set(
              produce((state) => {
                state.current.deliveryTab = data;
              })
            );
          },
          setCurrentDelivery: (data) => {
            set(
              produce((state) => {
                state.current.previouseDelivery = get().current.delivery;
                state.current.delivery = data;
              })
            );
          },
        }),
        {
          name: "user-data-storage",
          storage: createJSONStorage(() => localStorage),
        }
      )
    )
  )
);

export default useUserData;
