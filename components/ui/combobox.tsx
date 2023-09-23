import React, { useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

import style from "./styles/combobox.module.scss";

interface TempInterface {
  id: number;
  name: string;
  fullAdress: string;
  shortAdress: string;
  img: string;
  workingHours: string;
}

const MyCombobox: React.FC<{
  selected: TempInterface;
  setSelected: React.Dispatch<React.SetStateAction<TempInterface>>;
  places: TempInterface[];
}> = ({ selected, setSelected, places }) => {
  const [query, setQuery] = useState("");

  const filtered =
    query === ""
      ? places
      : places.filter((place) => {
          return place.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox value={selected} onChange={setSelected}>
      <div className={style["combobox-container"]}>
        <div className={style["input"]}>
          <Combobox.Input
            displayValue={(place: TempInterface) => place.name}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button>
            <ChevronDown size={25} aria-hidden="true" className="hover:scale-110 transition" />
          </Combobox.Button>
        </div>
        <Transition
          as={React.Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className={`${style["options-list"]} divide-y`}>
            {filtered.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filtered.map((place) => (
                <Combobox.Option
                  key={place.id}
                  className={({ active, selected }) =>
                    `${active ? style.active : "text-gray-900"} ${selected && `${style.selected}`}`
                  }
                  value={place}
                >
                  <span className={`block`}>{place.name}</span>
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export default MyCombobox;
