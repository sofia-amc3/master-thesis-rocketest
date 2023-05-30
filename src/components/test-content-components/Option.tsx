import React from "react";
import styles from "@/styles/app.module.css";
import { Option } from "@/utils/testCreatorHelper";

interface Props {
  optionValue: string;
  selected?: boolean;
  optionData: Option;
  questionId: number;
  updateOptionAnswer?: (questionId: number, text: string) => void;
}

const OptionEntry = (props: Props) => {
  return (
    <div className={styles.testImgAndOptionContainer}>
      <div className={styles.testImgContainer}>
        <img src={props.optionData.imgSrc} alt="Option Image" />
      </div>
      <div className={styles.testOptionContainer}>
        <input
          type="radio"
          name={props.optionValue}
          checked={props.selected || false}
          value={props.optionData.name}
          onChange={(e) => {
            props.updateOptionAnswer &&
              props.updateOptionAnswer(props.questionId, e.target.value);
          }}
        />
        <label>{props.optionData.name}</label>
      </div>
    </div>
  );
};

export default OptionEntry;
