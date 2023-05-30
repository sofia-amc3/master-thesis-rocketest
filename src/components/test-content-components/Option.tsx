import React from "react";
import styles from "@/styles/app.module.css";

interface Props {
  imgSrc: string;
  optionLabel: string;
  optionValue: string;
  selected?: boolean;
}

const OptionEntry = (props: Props) => {
  return (
    <div className={styles.testImgAndOptionContainer}>
      <div className={styles.testImgContainer}>
        <img src={props.imgSrc} alt="Option Image" />
      </div>
      <div className={styles.testOptionContainer}>
        <input
          type="radio"
          name={props.optionValue}
          readOnly={props.selected !== undefined}
          checked={props.selected}
        />
        <label>{props.optionLabel}</label>
      </div>
    </div>
  );
};

export default OptionEntry;
