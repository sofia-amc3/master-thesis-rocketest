import React from "react";
import styles from "@/styles/app.module.css";

interface Props {
  imgSrc: string;
  imgAlt: string;
  optionLabel: string;
  optionValue: string;
}

const Option = (props: Props) => {
  return (
    <div className={styles.testImgAndOptionContainer}>
      <div className={styles.testImgContainer}>
        <img src="" alt="" />
      </div>
      <div className={styles.testOptionContainer}>
        <input type="radio" name={props.optionValue} />
        <label>{props.optionLabel}</label>
      </div>
    </div>
  );
};

export default Option;
