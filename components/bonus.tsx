import React from "react";
import styles from "./styles/bonus.module.scss";

const Bonus = () => {
  return (
    <div className={styles["bonus-container"]}>
      <div className={styles.button}>
        <div className={styles.tally}>100</div>
        <div className={styles.img}></div>
      </div>
    </div>
  );
};

export default Bonus;
