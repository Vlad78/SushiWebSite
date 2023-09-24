import Search from "@/components/search";
import Location from "./location";
import Bonus from "./bonus";

import styles from "./styles/header.module.scss";

const Header = async () => {
  return (
    <header className={styles.header}>
      <Search />
      <Location />
      <Bonus />
    </header>
  );
};

export default Header;
