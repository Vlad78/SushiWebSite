import React from "react";

import styles from "./styles/search.module.scss";
import Image from "next/image";
import Link from "next/link";

const Search = () => {
  return (
    <div className={styles["search-container"]}>
      <div className={styles.img}>
        <Link href="./search">
          <Image src="/loupe_icon.png" alt="search" width={24} height={24} />
        </Link>
      </div>
    </div>
  );
};

export default Search;
