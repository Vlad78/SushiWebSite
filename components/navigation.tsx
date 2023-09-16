import React from "react";
import Image from "next/image";
import styles from "./styles/navigation.module.scss";
import logo from "@/public/Logo_SB.webp";
import menu from "@/public/menu @100.webp";
import cart from "@/public/cart @100.webp";
import contacts from "@/public/contacts.webp";
import profile from "@/public/profile @100.webp";

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
          <Image src={logo} alt="logo" {...imgParams} width={100} height={80}></Image>
        </li>
        <li className={styles.logo}>
          <Image src={menu} alt="menu" {...imgParams}></Image>
          <p>menu</p>
        </li>
        <li className={styles.logo}>
          <Image src={cart} alt="cart" {...imgParams}></Image>
          <p>kosz</p>
        </li>
        <li className={styles.logo}>
          <Image src={contacts} alt="contacts" {...imgParams}></Image>
          <p>kontakty</p>
        </li>
        <li className={styles.logo}>
          <Image src={profile} alt="profile" {...imgParams}></Image>
          <p>profil</p>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
