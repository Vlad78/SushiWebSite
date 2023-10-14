import React from "react";
import Image from "next/image";
import logo from "@/public/Logo_SB.webp";
import menu from "@/public/menu @100.webp";
import contacts from "@/public/contacts.webp";

import Link from "next/link";
import CartIcon from "./icon-cart";
import ProfileIcon from "./icon-profile";

import styles from "./styles/navigation.module.scss";

const Navigation = () => {
  const imgParams = {
    width: 36,
    height: 36,
    quality: 100,
    priority: true,
  };

  return (
    <nav className={styles.navigation}>
      <ul>
        <li className={styles.logo}>
          <Link href="/">
            <Image src={logo} alt="logo" {...imgParams} width={100} height={75}></Image>
          </Link>
        </li>
        <li className={styles.menu}>
          <Image src={menu} alt="menu" {...imgParams}></Image>
          <p>menu</p>
        </li>
        <li className={styles.cart}>
          <CartIcon imgParams={imgParams} />
        </li>
        <li className={styles.contacts}>
          <Image src={contacts} alt="contacts" {...imgParams}></Image>
          <p>kontakty</p>
        </li>
        <li className={styles.profile}>
          <ProfileIcon imgParams={imgParams} />
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
