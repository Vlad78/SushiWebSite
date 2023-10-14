import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { produce } from "immer";
import { Address } from "../types";

type deliveryTypes = "delivery" | "pick-up";

// TODO define default address to show on the map

interface UserData {
  isSMSSent: boolean;
  isUserLoggedIn: boolean;
  current: {
    deliveryTab: deliveryTypes;
    delivery: Address | null;
    previousDelivery: Address | null;
  };
  addressesHistoty: {
    allDeliveryAddresses: Address[]; // последний адресс всегда последний элемент массива?
    lastDeliveryAddress: Address | null;
    lastPickUpPlace: Address;
  };
  pickUpAddresses: Address[];
  setDeliveryTab: (data: deliveryTypes) => void;
  setCurrentDelivery: (data: Address) => void;
  setSMSSent: (data: boolean | undefined) => void;
  setUserLoggedIn: (data: boolean) => void;
}

const defaultAddress1: Address = {
  address: "Delivery! Migawka CAFE, Opawska, Raciborz, Poland",
  lat: 50.0833419,
  lng: 18.2113659,
  type: "delivery",
};
const defaultAddress2: Address = {
  address: "Delivery! rondo im. Żołnierzy Niezłomnych 3 , Racibórz",
  lat: 50.0932566734312,
  lng: 18.2226621208742,
  type: "delivery",
};
const pickUpAddress1: Address = {
  lat: 50.09705502403408,
  lng: 18.210203374501827,
  type: "pick-up",
  address: "Księdza Józefa Londzina 54, Racibórz",
  workingHours: "13:00-22:00",
};

const useUserData = create(
  devtools(
    immer(
      persist<UserData>(
        (set, get) => ({
          isSMSSent: false,
          isUserLoggedIn: false,
          current: {
            deliveryTab: "delivery",
            delivery: null,
            previousDelivery: null,
          },
          addressesHistoty: {
            allDeliveryAddresses: [defaultAddress1, defaultAddress2],
            lastDeliveryAddress: defaultAddress1,
            lastPickUpPlace: pickUpAddress1,
          },
          pickUpAddresses: [pickUpAddress1],
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
                state.current.previousDelivery = get().current.delivery;
                state.current.delivery = data;
              })
            );
          },
          setSMSSent: (data) => {
            set(
              produce((state) => {
                state.isSMSSent = data;
              })
            );
          },
          setUserLoggedIn: (data) => {
            set(
              produce((state) => {
                state.isUserLoggedIn = data;
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
