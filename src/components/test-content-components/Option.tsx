import React from "react";
import styles from "@/styles/app.module.css";

export interface OptionData {
  src: string;
  name: string;
}

interface Props {
  imgSrc: string;
  optionLabel: string;
  optionValue: string;
  selected?: boolean;
}

const Option = (props: Props) => {
  return (
    <div className={styles.testImgAndOptionContainer}>
      <div className={styles.testImgContainer}>
        <img src="" alt="Option Image" />
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

export default Option;
