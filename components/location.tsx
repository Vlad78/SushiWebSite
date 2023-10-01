"use client";

import React from "react";
import usePreviewModal from "../hooks/use-preview-modal";
import useUserData from "../hooks/use-userData";
import Delivery from "./delivery";

import style from "./styles/location.module.scss";

const Location = () => {
  const modal = usePreviewModal();
  const data = useUserData();

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
        {data.addressesHistoty.lastDeliveryAddress
          ? data.addressesHistoty.lastDeliveryAddress.address
          : "Wprowadź adres"}
      </div>
    </div>
  );
};

export default Location;
