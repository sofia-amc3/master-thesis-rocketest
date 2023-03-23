import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/app.module.css";

interface Props {
  link: string;
  text: string;
  icon: string;
  active?: boolean;
}

const MenuBtn = (props: Props) => {
  return (
    <Link href={props.link}>
      <div className={`${styles.menuBtn} ${props.active && styles.active}`}>
        {props.active && <div className={styles.active}></div>}

        <Image
          className={styles.icon}
          src={`/icons/sideMenu-${props.icon}.svg`}
          alt={`${props.icon} icon`}
          width={20}
          height={20}
        />
        <span className={styles.text}>{props.text}</span>
      </div>
    </Link>
  );
};

export default MenuBtn;
