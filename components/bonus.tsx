import React from "react";
import styles from "./styles/bonus.module.scss";
import Link from "next/link";

const Bonus = () => {
  return (
    <div className={styles["bonus-container"]}>
      <Link href="/profile" className={styles.button}>
        <div className={styles.tally}>100</div>
        <div className={styles.img}></div>
      </Link>
    </div>
  );
};

export default Bonus;
