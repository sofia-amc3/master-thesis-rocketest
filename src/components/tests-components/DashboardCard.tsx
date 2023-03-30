import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/app.module.css";

interface Props {
  oneAndHalf_col?: boolean;
  two_col?: boolean;
  three_col?: boolean;
  title: string;
  imageSrc: string;
  page: string;
}

const DashboardCard = (props: Props) => {
  return (
    <div
      className={`${styles.dashboardCard} ${
        props.oneAndHalf_col && styles.oneAndHalf_col
      } ${props.two_col && styles.two_col} ${
        props.three_col && styles.three_col
      }`}
    >
      <span>{props.title}</span>
      <Link href={props.page}>
        <Image
          src={props.imageSrc}
          alt={`${props.title} Graph`}
          width={437}
          height={237}
        />
      </Link>
    </div>
  );
};

export default DashboardCard;
