import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/app.module.css";
import { useRouter } from "next/router";

const SideMenuAuth = () => {
  const router = useRouter();
  return <div className={styles.sideMenu}>Login Side Menu</div>;
};

export default SideMenuAuth;
