import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/app.module.css";
import { useRouter } from "next/router";

const SideMenuAuth = () => {
  const router = useRouter();
  return (
    <div className={styles.sideMenuAuth}>
      {/* LOGO */}
      <Link href="/">
        <Image
          src="/logo-darkBg.png"
          alt="Rocketest Logo"
          width={198}
          height={50}
        />
      </Link>
      {/* Introduction Text */}
      <h5>Lorem Ipsum</h5>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore.
      </p>
      <div className={styles.bottomContainer}>
        {/* Social Media */}
        <div className={styles.socialMediaContainer}>
          <a href={"https://www.facebook.com/"} target="_blank">
            <Image
              src="/icons/facebook.png"
              alt="Facebook Icon"
              width={20}
              height={20}
            />
          </a>
          <a href={"https://www.twitter.com/"} target="_blank">
            <Image
              src="/icons/twitter.png"
              alt="Twitter Icon"
              width={20}
              height={20}
            />
          </a>
          <a href={"https://www.instagram.com/"} target="_blank">
            <Image
              src="/icons/instagram.png"
              alt="Instagram Icon"
              width={20}
              height={20}
            />
          </a>
        </div>
        {/* Links */}
        <div className={styles.linksContainer}>
          <Link href="/termsAndConditions">Terms and Conditions</Link>
          <Link href="/contactUs">Contact Us</Link>
          <span>© 2023 Rocketest</span>
        </div>
      </div>
    </div>
  );
};

export default SideMenuAuth;
