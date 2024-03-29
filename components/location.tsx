"use client";

import React, { useEffect, useState } from "react";
import usePreviewModal from "../hooks/use-preview-modal";
import useUserData from "../hooks/use-userData";
import Delivery from "./modal-delivery";

import style from "./styles/location.module.scss";

const Location = () => {
  const modal = usePreviewModal();
  const data = useUserData();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={style["location-container"]}
      onClick={() =>
        modal.onOpen(
          <div className={style["delivery-wrap"]}>
            <Delivery />
          </div>
        )
      }
    >
      <div className={style["location-text"]}>Localizacja</div>
      <div className={style["location-adress"]}>
        {data.current.delivery ? data.current.delivery.address : "Wprowadź adres"}
      </div>
    </div>
  );
};

export default Location;
