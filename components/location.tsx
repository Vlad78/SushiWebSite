"use client";

import React from "react";
import styles from "./styles/location.module.scss";
import usePreviewModal from "../hooks/use-preview-modal";
import useUserData from "../hooks/use-userData";
import Search from "./search";

const Location = () => {
  const modal = usePreviewModal();
  const data = useUserData();

  return (
    <div className={styles["location-container"]} onClick={() => modal.onOpen(<Search />)}>
      <div className={styles["location-text"]}>Localizacja</div>
      <div className={styles["location-adress"]}>{data.orderOptions.lastAdress}</div>
    </div>
  );
};

export default Location;
