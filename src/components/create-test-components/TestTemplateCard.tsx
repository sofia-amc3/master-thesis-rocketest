import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/app.module.css";

interface Props {
  imageSrc: string;
  testName: string;
  testDescription: string;
  page: string;
  disabled?: boolean;
}

const TestTemplateCard = (props: Props) => {
  return (
    <a href={props.page}>
      <div
        className={`${styles.testCardImgContainer} ${
          props.disabled && styles.disabled
        }`}
      >
        <Image
          src={props.imageSrc}
          alt={`${props.testName} Image`}
          width={270}
          height={142}
        />
      </div>

      <div
        className={`${styles.testCardInfoContainer} ${
          props.disabled && styles.disabled
        }`}
      >
        <span>{props.testName}</span>
        <span>{props.testDescription}</span>
      </div>
    </a>
  );
};

export default TestTemplateCard;
