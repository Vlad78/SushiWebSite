import Link from "next/link";

import styles from "./styles/navbar.module.scss";
import MainNav from "@/components/main-nav";
import Container from "@/components/ui/container";
import NavbarActions from "@/components/navbar-actions";
import getCategories from "@/actions/get-categories";
import Search from "@/components/search";
import Location from "./location";
import Bonus from "./bonus";

const Navbar = async () => {
  const { data: categories } = await getCategories();

  return (
    <Container>
      <div className={`${styles.header} px-4 sm:px-6 lg:px-8`}>
        <Search />
        <Location />
        {/* <MainNav data={categories} /> */}
        {/* <NavbarActions /> */}
        <Bonus />
      </div>
    </Container>
  );
};

export default Navbar;
