import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/app.module.css";

interface Props {
  imageSrc: string;
  testName: string;
  testDescription: string;
  page: string;
}

const TestTemplateCard = (props: Props) => {
  return (
    <Link href={props.page}>
      <div className={styles.testCardImgContainer}>
        <Image
          src={props.imageSrc}
          alt={`${props.testName} Image`}
          width={270}
          height={142}
        />
      </div>

      <div className={styles.testCardInfoContainer}>
        <span>{props.testName}</span>
        <span>{props.testDescription}</span>
      </div>
    </Link>
  );
};

export default TestTemplateCard;
