import React from "react";
import styles from "@/styles/app.module.css";

interface SingleOption {
  value: string;
  description?: string;
}

interface Props {
  title: string;
  name: string;
  type: "checkbox" | "radio";
  options: SingleOption[];
  mandatory?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxRatioBtnInput = (props: Props) => {
  return (
    <div className={styles.textInput}>
      <label>{props.title}</label>
      {props.mandatory && <span>*</span>}
      <br />
      {props.options &&
        props.options.map((value, key) => {
          return (
            <div className={styles.checkboxInputContainer} key={key}>
              <label>
                <input
                  type={props.type}
                  className={styles.checkboxInput}
                  onChange={props.onChange}
                  name={props.name}
                />
                {value.value}
              </label>
              {value.description && (
                <span className={styles.description}>{value.description}</span>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default CheckboxRatioBtnInput;
