import React from "react";
import Link from "next/link";
import Image from "next/image";
import MenuBtn from "./MenuBtn";
import styles from "@/styles/app.module.css";

const SideMenu = () => {
  return (
    <div className={styles.sideMenu}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src="" alt="" />
        </Link>
      </div>
      <div className={styles.profile}>
        <Link href="/profile">
          <Image src="" alt="" />
        </Link>
        <span>Welcome back,</span>
        <span>Lorem Ipsum</span>
      </div>
      <div>
        <MenuBtn text="Tests" icon="tests" link="/tests" active />
        <MenuBtn
          text="Notifications"
          icon="notifications"
          link="/notifications"
        />
      </div>
    </div>
  );
};

export default SideMenu;
