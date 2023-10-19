import React, { useEffect, useState } from "react";
import { isValidPhoneNumber } from "react-phone-number-input/input";
import { toast } from "react-hot-toast";

import style from "./styles/input.module.scss";

type Input = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  onSave?: () => void;
  onChange: (e: string) => void;
};

const Input: React.FC<Input> = ({ onChange, onSave, value, id, maxLength, disabled }) => {
  const [isVirgin, setIsVirgin] = useState(true);
  const [state, setState] = useState(value);

  useEffect(() => {
    setState(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setState(e.target.value);
    setIsVirgin(false);
  };

  const handleSave = () => {
    if (!state) return;
    if (id === "phone-input" && !isValidPhoneNumber(state.toString())) {
      toast.error("niemożliwy numer telefonu");
      return;
    }
    onChange(state.toString());
    onSave && onSave();
    setIsVirgin(true);
  };

  return (
    <div className={style["input-container"]}>
      <input
        type="text"
        id={id}
        value={state}
        onChange={handleChange}
        maxLength={maxLength}
        disabled={disabled}
      />
      {onSave && (
        <button onClick={handleSave} disabled={isVirgin}>
          Zachować
        </button>
      )}
    </div>
  );
};

export default Input;
