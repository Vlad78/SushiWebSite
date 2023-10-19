import React from "react";
import { Switch } from "@headlessui/react";

import style from "./styles/toggle.module.scss";

type Toggle = Omit<React.ButtonHTMLAttributes<HTMLElement>, "onChange"> & {
  isSubscribedForMail: boolean;
  onChange: (e: boolean) => void;
  onSave: () => void;
};

const Toggle: React.FC<Toggle> = ({ isSubscribedForMail, onChange, onSave, disabled }) => {
  const onChangeHandler = (checked: boolean) => {
    onChange(checked);
    onSave();
  };

  return (
    <Switch
      checked={isSubscribedForMail}
      onChange={onChangeHandler}
      className={`h-[26px] w-[46px] ${isSubscribedForMail ? "bg-amber-600" : "bg-gray-300"} ${
        style["toggle-container"]
      }`}
      disabled={disabled}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${isSubscribedForMail ? "translate-x-5" : "translate-x-0"} ${style.hook}
            h-[23px] w-[23px] shadow-lg ring-0`}
      />
    </Switch>
  );
};

export default Toggle;
