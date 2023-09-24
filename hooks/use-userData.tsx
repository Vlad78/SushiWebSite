import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface UserData {
  isUserRegistered: boolean;
  isUserLoggedIn: boolean;
  orderOptions: {
    addresses: string[];
    lastAdress: string;
    lastPickUpPlace: string;
  };
}

const useUserData = create(
  devtools(
    immer(
      persist<UserData>(
        (set, get) => ({
          isUserRegistered: false,
          isUserLoggedIn: false,
          orderOptions: {
            addresses: [],
            lastAdress: "",
            lastPickUpPlace: "",
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
