import React from "react";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

import { Address } from "@/types";
import style from "./styles/combobox.module.scss";

const MyCombobox: React.FC<{
  // сюда приходит последний адрес из хранилища, если он был. Он выбран на карте
  selected: Address | null;

  // здесь мы устанавливаем новый адрес на карте
  setSelected: (data: Address) => void;

  // это массив всех адресов в хранилище. Нужно их добавить дополнительным списком
  addressesFromLS: Address[];
}> = ({ selected, setSelected, addressesFromLS }) => {
  const {
    ready,
    // это текущая фраза в инпуте. Сразу она пустая
    value = "",
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
    requestOptions: {
      // locationBias: "pl",
      // region: "pl",
      componentRestrictions: { country: ["pl"] },
    },
  });

  const onChange = async (value: React.SetStateAction<Address | string | null>) => {
    if (typeof value === "string") {
      setValue(value, false); // it always returns string as it changed by user input
      clearSuggestions();
      const result = await getGeocode({
        address: value,
        // location: {lat: 0, lng: 0}
      });
      const { lat, lng } = await getLatLng(result[0]);
      setSelected({ address: value, lat, lng, type: "delivery" });
    }
    if (typeof value === "object") {
      value && setSelected(value);
    }
  };

  const filtered =
    value === ""
      ? addressesFromLS
      : addressesFromLS.filter((item) => {
          return item.address.toLowerCase().includes(value.toLowerCase());
        });

  return (
    <Combobox value={selected} onChange={onChange} disabled={!ready}>
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
                ...filtered.map((item) => {
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
                }),
              ]
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export default MyCombobox;
