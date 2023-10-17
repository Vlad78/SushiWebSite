"use client";

import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import Container from "@/components/ui/container";
import { useUser } from "@/lib/authContext";
import Input from "@/components/ui/input";
import BirthdayListbox from "@/components/ui/listbox-birthday";
import Tooltip from "@/components/ui/tooltip";
import Toggle from "@/components/ui/toggle";
import putUser from "@/actions/put-user";
import { User } from "@/types";

import style from "./page.module.scss";

// TODO user loading plug
// TODO logout

const ProfilePage = () => {
  const { loading, user, forceUpdate } = useUser();
  console.log("🚀 ~ file: page.tsx:24 ~ ProfilePage ~ user:", user);
  const [data, setData] = useState({
    username: "",
    phoneNumber: "",
    birthDay: {
      day: 0,
      month: 0,
    },
    email: "",
    isSubscribedForMail: false,
  });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      username: user?.username || "",
      phoneNumber: user?.phoneNumber || "",
      birthDay: {
        day: user?.birthDay?.day || 0,
        month: user?.birthDay?.month || 0,
      },
      email: user?.email || "",
      isSubscribedForMail: user?.isSubscribedForMail || false,
    }));
  }, [loading]);

  const onChangeHandler = (e: (typeof data)[keyof typeof data], key: keyof typeof data) => {
    setData((pr) => {
      return { ...pr, [key]: e };
    });
  };

  const onSave = async () => {
    setData((data) => {
      if (user) {
        putUser({
          user: { ...user, ...data, BDDay: data.birthDay.day, BDMonth: data.birthDay.month },
        }).then((user) => {
          // TODO handle errors
          forceUpdate && forceUpdate(user);
          toast.success("Zachowane");
        });
      }
      return data;
    });
  };

  return (
    <Container>
      <div className={style["profile-container"]}>
        <h1>Profil</h1>
        <div className={style["log-out"]}>Wylogowanie</div>

        {loading && <div>Loading...</div>}
        <div className={style["profile-content"]}>
          {/* Name */}
          <div className={style["profile-content__row"]}>
            <label htmlFor="name-input">
              <h6>Imię</h6>
              <Input
                onChange={(e) => onChangeHandler(e, "username")}
                value={data.username}
                id="name-input"
                onSave={onSave}
                maxLength={25}
              />
            </label>
          </div>
          {/* Phone */}
          <div className={style["profile-content__row"]}>
            <label htmlFor="phone-input">
              <h6 className="mb-1">Numer telefonu</h6>
              <Input
                onChange={(e) => onChangeHandler(e, "phoneNumber")}
                value={data.phoneNumber}
                id="phone-input"
                onSave={onSave}
                maxLength={16}
              />
            </label>
          </div>
          {/* Birthday */}
          <div className={style["profile-content__row"]}>
            <label className="flex flex-row">
              <h6 className="mb-1">{"Urodziny"}</h6>
              {/* TODO animation bug after first load */}
              <Tooltip
                data="Dajemy prezenty i zniżki na urodziny"
                placement="top-start"
                className="ml-2"
              />
            </label>
            {user?.birthDay ? (
              <>{/* when BD is acquired */}</>
            ) : (
              <div className="">
                <BirthdayListbox onSave={onSave} onChange={(e) => onChangeHandler(e, "birthDay")} />
              </div>
            )}
          </div>
          {/* e-mail */}
          <div className={style["profile-content__row"]}>
            <label htmlFor="email-input">
              <h6 className="mb-1">{"E-mail"}</h6>
              <Input
                onChange={(e) => onChangeHandler(e, "email")}
                value={data.email}
                id="email-input"
                onSave={onSave}
                maxLength={25}
              />
              <div className="flex flex-row mt-4 leading-relaxed">
                <Toggle
                  onChange={(e) => onChangeHandler(e, "isSubscribedForMail")}
                  isSubscribedForMail={data.isSubscribedForMail}
                  onSave={onSave}
                />
                <div className="ml-4 font-medium">Zapisz się do newslettera</div>
                <Tooltip
                  data="Zgoda na otrzymywanie informacji o ofertach specjalnych, nowych produktach i promocjach za pośrednictwem wiadomości SMS, e-mail, powiadomień push, telefonii i Internetu od Timmas Sp Z O O"
                  placement="top"
                  className="ml-2"
                />
              </div>
            </label>
          </div>
        </div>
        {/* Orders history */}
        <h1>Historia zamówień</h1>
        <div className={style["order-history-container"]}></div>
      </div>
    </Container>
  );
};

export default ProfilePage;
