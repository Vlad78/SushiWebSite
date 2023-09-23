import React from "react";
import Image from "next/image";
import logo from "@/public/Logo_SB.webp";
import menu from "@/public/menu @100.webp";
import contacts from "@/public/contacts.webp";
import profile from "@/public/profile @100.webp";

import styles from "./styles/navigation.module.scss";
import Link from "next/link";
import CartIcon from "./cart-icon";

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
          <Image src={profile} alt="profile" {...imgParams}></Image>
          <p>profil</p>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
