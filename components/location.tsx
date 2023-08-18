import React from "react";
import styles from "./styles/location.module.scss";

const Location = () => {
  return (
    <div className={styles["location-container"]}>
      <div className={styles["location-text"]}>Localizacja</div>
      <div className={styles["location-adress"]}>
        Адрес для примера должен сокращаться до определенного размера
      </div>
    </div>
  );
};

export default Location;
