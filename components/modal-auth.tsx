"use client";

import React, { useEffect, useRef, useState } from "react";
import PhoneInput, { Value } from "react-phone-number-input/input";

import style from "./styles/modal-auth.module.scss";
import Button from "./ui/button";
import axios from "axios";
import { toast } from "react-hot-toast";
import useUserData from "@/hooks/use-userData";
import { User } from "@/types";
import { setToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import usePreviewModal from "@/hooks/use-preview-modal";
import { PrefetchKind } from "next/dist/client/components/router-reducer/router-reducer-types";
import { useUser } from "../lib/authContext";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/local`;

const AuthModal = () => {
  const modal = usePreviewModal();
  const router = useRouter();
  const { forceUpdate } = useUser();
  const [phoneNumber, setPhoneNumber] = useState<Value | undefined>("+48");
  const [code, setCode] = useState("");
  const { isSMSSent, setSMSSent } = useUserData();
  const inputField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputField?.current?.focus();
  }, [inputField.current?.type, isSMSSent, code]);

  //TODO check validity of number
  // TODO refactor code

  const onSubmitNumber = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!phoneNumber) {
      toast.error("Podaj numer telefonu");
      return;
    }
    try {
      const response = await axios.post(URL, { phoneNumber });
      response.status === 200
        ? toast.success(`SMS wysłany do ${phoneNumber}`, { duration: 8000 })
        : toast.error("Nieznany błąd");
      setSMSSent(true);
      router.prefetch("/profile", { kind: PrefetchKind.AUTO });
    } catch (error: any) {
      toast.error(error?.response?.data?.error?.message, { duration: 8000 });
    }
  };

  const onSubmitCode = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!code) {
      toast.error("Podaj kod");
      return;
    }
    try {
      const {
        data: { jwt, user },
        status,
      } = await axios.post<{}, { data: { jwt: string; user: User }; status: number }>(
        URL + "/verifyOTP",
        { code, phoneNumber }
      );
      if (status === 200) {
        toast.success("pomyślnie");
        setToken({ jwt, id: user.id });
        setSMSSent(false);
        forceUpdate(user);
        modal.closeModal();
        router.push("/profile");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error?.message, { duration: 8000 });
    }
  };

  return (
    <div className={style["auth-wrapper"]}>
      {!isSMSSent && (
        <>
          <label>Wprowadź numer</label>
          <PhoneInput value={phoneNumber} onChange={setPhoneNumber} ref={inputField} />
          <Button onClick={onSubmitNumber}>
            <span>Wysyłanie SMS z kodem</span>
          </Button>
        </>
      )}
      {isSMSSent && (
        <>
          <label htmlFor="code">Wprowadź kod</label>
          <input
            type="code"
            name="code"
            id="code"
            onChange={(e) => setCode(e.target.value)}
            ref={inputField}
          />
          <div className="flex w-full justify-evenly">
            <Button onClick={() => setSMSSent(false)} className="border-red-700 text-red-600">
              <span>Anulowanie</span>
            </Button>
            <Button onClick={onSubmitCode} className="border-cyan-700 text-cyan-700">
              <span>Potwierdzać</span>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthModal;
