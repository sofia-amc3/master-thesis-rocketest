import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/app.module.css";

interface Props {
  imageSrc: string;
  testTitle: string;
  testType: string;
  noTesters: string;
  deadline: string;
  page: string;
}

const DashboardCard = (props: Props) => {
  return (
    <Link href={props.page}>
      <div className={styles.testCardImgContainer}>
        <Image
          src={props.imageSrc}
          alt={`${props.testTitle} Image`}
          width={270}
          height={142}
        />
      </div>

      <div className={styles.testCardInfoContainer}>
        <span>{props.testTitle}</span>

        <div className={styles.testInfo}>
          <Image
            src="/icons/test-information.svg"
            alt="Test Type Icon"
            width={15}
            height={15}
          />
          <span>{props.testType}</span>
        </div>
        <div className={styles.testInfo}>
          <Image
            src="/icons/test-testersNumber.svg"
            alt="Number of Testers Icon"
            width={15}
            height={15}
          />
          <span>{`${props.noTesters} testers`}</span>
        </div>
        <div className={styles.testInfo}>
          <Image
            src="/icons/test-calendar.svg"
            alt="Test Deadline Icon"
            width={15}
            height={15}
          />
          <span>{`Ends in ${props.deadline}`}</span>
        </div>
      </div>
    </Link>
  );
};

export default DashboardCard;
