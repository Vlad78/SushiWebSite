// import Link from "next/link";

import styles from "./styles/header.module.scss";
// import MainNav from "@/components/main-nav";
// import Container from "@/components/ui/container";
// import NavbarActions from "@/components/navbar-actions";
// import getCategories from "@/actions/get-categories";
import Search from "@/components/search";
import Location from "./location";
import Bonus from "./bonus";

const Header = async () => {
  return (
    // <Container>
    <header className={styles.header}>
      <Search />
      <Location />
      {/* <MainNav data={categories} /> */}
      {/* <NavbarActions /> */}
      <Bonus />
    </header>
    // </Container>
  );
};

export default Header;
