import React, { useMemo } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

import { Address } from "@/types";
import style from "./styles/combobox.module.scss";
import useUserData from "../../hooks/use-userData";

const MyCombobox: React.FC<{
  map?: google.maps.Map | null;
}> = ({ map }) => {
  const {
    init,
    // это текущая фраза в инпуте. Сразу она пустая
    value = "",
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    initOnMount: false,
    debounce: 300,
    requestOptions: {
      // locationBias: "pl",
      // region: "pl",
      componentRestrictions: { country: ["pl"] },
    },
  });

  const {
    addressesHistoty: { allDeliveryAddresses },
    pickUpAddresses,
    current: { delivery, deliveryTab },
    setCurrentDelivery,
  } = useUserData();

  useMemo(() => {
    map && init(); // use-places-autocomplete
  }, [map]);

  const onChange = async (value: React.SetStateAction<Address | string | null>) => {
    if (typeof value === "string") {
      setValue(value, false); // it always returns string as it changed by user input
      clearSuggestions();
      const result = await getGeocode({
        address: value,
        // location: {lat: 0, lng: 0}
      });
      const { lat, lng } = await getLatLng(result[0]);
      setCurrentDelivery({ address: value, lat, lng, type: "delivery" });
    }
    if (typeof value === "object") {
      value && setCurrentDelivery(value);
    }
  };

  let filtered;
  if (deliveryTab === "delivery") {
    filtered =
      value === ""
        ? allDeliveryAddresses
        : allDeliveryAddresses?.filter((item) =>
            item.address.toLowerCase().includes(value.toLowerCase())
          );
  }

  if (deliveryTab === "pick-up") {
    filtered =
      value === ""
        ? pickUpAddresses
        : pickUpAddresses?.filter((item) =>
            item.address.toLowerCase().includes(value.toLowerCase())
          );
  }

  return (
    <Combobox value={deliveryTab === delivery?.type ? delivery : null} onChange={onChange}>
      <div className={style["combobox-container"]}>
        <div className={style["input"]}>
          <Combobox.Input
            placeholder="Wprowadź adres"
            displayValue={(item: Address) => (item ? item.address : "")}
            onChange={(event) => setValue(`${event.target.value}`)}
          />
          <Combobox.Button>
            <ChevronDown size={35} aria-hidden="true" className="hover:scale-110 transition" />
          </Combobox.Button>
        </div>
        <Transition
          as={React.Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setValue("")}
        >
          <Combobox.Options className={`${style["options-list"]} divide-y`}>
            {status !== "OK" && value !== "" ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
            ) : (
              [
                ...data.map((e) => (
                  <Combobox.Option
                    key={e.place_id}
                    className={({ active, selected }) =>
                      `${active ? style.active : "text-gray-900"} ${
                        selected && `${style.selected}`
                      }`
                    }
                    value={e.description}
                  >
                    <span className={`block`}>{e.description}</span>
                  </Combobox.Option>
                )),
                ...(filtered !== undefined
                  ? filtered.map((item) => {
                      return (
                        <Combobox.Option
                          key={item.lat * 10000000}
                          className={({ active, selected }) =>
                            `${active ? style.active : "text-gray-900"} ${
                              selected && `${style.selected}`
                            }`
                          }
                          value={item}
                        >
                          <span className={`block`}>{item.address}</span>
                        </Combobox.Option>
                      );
                    })
                  : []),
              ]
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export default MyCombobox;
