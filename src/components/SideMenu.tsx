import React from "react";
import Link from "next/link";
import Image from "next/image";
import MenuBtn from "./MenuBtn";
import styles from "@/styles/app.module.css";
import { useRouter } from "next/router";

const SideMenu = () => {
  const router = useRouter();
  return (
    <div className={styles.sideMenu}>
      {/* LOGO */}
      <div className={styles.logoContainer}>
        <Link href="/">
          <Image
            className={styles.logo}
            src="/logo-lightBg.png"
            alt="Rocketest Logo"
            fill
          />
        </Link>
      </div>
      {/* PROFILE PICTURE AND WELCOME TEXT */}
      <div className={styles.profile}>
        <Link href="/profile">
          <Image
            className={styles.profilePic}
            src=""
            alt="Profile Picture"
            fill
          />
        </Link>
        <span>Welcome back,</span>
        <span>User Name</span>
      </div>
      {/* MENU PAGES */}
      <div>
        <MenuBtn
          text="Tests"
          icon="tests"
          link="/tests"
          active={router.pathname.includes("/tests")}
        />
        <MenuBtn
          text="Notifications"
          icon="notifications"
          link="/notifications"
          active={router.pathname.includes("/notifications")}
        />
        <MenuBtn
          text="Messages"
          icon="messages"
          link="/messages"
          active={router.pathname.includes("/messages")}
        />
        <MenuBtn
          text="Wallet"
          icon="wallet"
          link="/wallet"
          active={router.pathname.includes("/wallet")}
        />
        <MenuBtn
          text="Profile"
          icon="profile"
          link="/profile"
          active={router.pathname.includes("/profile")}
        />
        <MenuBtn
          text="Settings"
          icon="settings"
          link="/settings"
          active={router.pathname.includes("/settings")}
        />
        <div className={styles.signoutContainer}>
          <MenuBtn
            text="Sign Out"
            icon="signout"
            link="/signout"
            active={router.pathname.includes("/signout")}
          />
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
