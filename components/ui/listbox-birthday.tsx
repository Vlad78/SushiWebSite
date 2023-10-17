import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronsUpDown } from "lucide-react";
import { CheckIcon } from "lucide-react";

import style from "./styles/listbox-birthday.module.scss";

// prettier-ignore
const optionDay = [
    "Dzień",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,
  ];
// prettier-ignore
// const optionMonth = ["Miesiąc","Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień",
//   ];
const optionMonth = ["Miesiąc",1,2,3,4,5,6,7,8,9,10,11,12];

type BirthdayListbox = {
  onSave?: () => void;
  onChange: (e: { day: number; month: number }) => void;
};

const BirthdayListbox: React.FC<BirthdayListbox> = ({ onSave, onChange }) => {
  const [selectedDay, setSelectedDay] = useState(optionDay[0]);
  const [selectedMonth, setSelectedMonth] = useState(optionMonth[0]);
  const [isVirgin, setIsVirgin] = useState(true);

  const handleDayChange = (e: number) => {
    setSelectedDay(e);
    setIsVirgin(false);
  };
  const handleMonthChange = (e: number) => {
    setSelectedMonth(e);
    setIsVirgin(false);
  };

  const handleSave = () => {
    if (typeof selectedDay === "number" && typeof selectedMonth === "number") {
      onChange({
        day: selectedDay,
        month: selectedMonth,
      });
      onSave && onSave();
      setIsVirgin(true);
    }
  };

  // TODO check is it works properly on phones in different brousers. Also check for updates
  // promt: mouse wheel doesn't work on dropdown menu headless ui

  return (
    <>
      <Listbox value={selectedDay} onChange={handleDayChange}>
        <div className={style["listbox-container"]}>
          <Listbox.Button className="sm:text-sm">
            <span className="block">{selectedDay}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronsUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="sm:text-sm">
              {optionDay.map((item) => (
                <Listbox.Option
                  key={item.toString()}
                  className={({ active }) =>
                    `${active ? "bg-amber-100 text-amber-900" : "text-gray-900"}`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block ${selected ? "font-medium" : "font-normal"}`}>
                        {item}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      <Listbox value={selectedMonth} onChange={handleMonthChange}>
        <div className={style["listbox-container"]}>
          <Listbox.Button className="sm:text-sm">
            <span className="block">{selectedMonth}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronsUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="sm:text-sm">
              {optionMonth.map((item) => (
                <Listbox.Option
                  key={item.toString()}
                  className={({ active }) =>
                    `${active ? "bg-amber-100 text-amber-900" : "text-gray-900"}`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block ${selected ? "font-medium" : "font-normal"}`}>
                        {item}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      {onSave && (
        <button onClick={handleSave} disabled={isVirgin} className={style["save-button"]}>
          Zachować
        </button>
      )}
    </>
  );
};

export default BirthdayListbox;
