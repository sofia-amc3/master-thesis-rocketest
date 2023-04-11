import React from "react";
import Image from "next/image";
import styles from "@/styles/app.module.css";

interface Props {
  iconSrc: string;
  iconWidth: number;
  text: string;
}

const SmallInfo = (props: Props) => {
  return (
    <div className={styles.testInfoSmall}>
      <Image
        src={props.iconSrc}
        alt="Informative Icon"
        width={props.iconWidth}
        height={props.iconWidth}
      />
      <span>{props.text}</span>
    </div>
  );
};

export default SmallInfo;
