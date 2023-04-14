import React from "react";
import styles from "@/styles/app.module.css";
import Image from "next/image";

interface Props {
  title: string;
  placeholder: string;
  size?: "small" | "large";
  type?: "text" | "password" | "date" | "time" | "number";
  mandatory?: boolean;
  isTextarea?: boolean;
  isSelect?: boolean;
  option1?: string;
  option2?: string;
  option3?: string;
  option4?: string;
  option5?: string;
  option6?: string;
}

const TextInput = (props: Props) => {
  return (
    <div className={styles.textInput}>
      <label>{props.title}</label>
      {props.mandatory && <span>*</span>}
      <br />
      {props.isTextarea ? (
        <textarea
          placeholder={props.placeholder}
          className={
            props.size === "small"
              ? `${styles.inputSmall}`
              : `${styles.inputLarge}`
          }
        ></textarea>
      ) : props.isSelect ? (
        <div className={`${styles.selectContainer} ${styles.authSelect}`}>
          <select
            className={
              props.size === "small"
                ? `${styles.inputSmall}`
                : `${styles.inputLarge}`
            }
          >
            <option value={props.option1}>{props.option1}</option>
            <option value={props.option2}>{props.option2}</option>
            {props.option3 && (
              <option value={props.option3}>{props.option3}</option>
            )}
            {props.option4 && (
              <option value={props.option4}>{props.option4}</option>
            )}
            {props.option5 && (
              <option value={props.option5}>{props.option5}</option>
            )}
            {props.option6 && (
              <option value={props.option6}>{props.option6}</option>
            )}
          </select>
          <Image
            src="/icons/arrow-left.svg"
            alt="Arrow Icon"
            width={12}
            height={12}
            className={styles.arrowRotate}
          />
        </div>
      ) : (
        <input
          type={props.type ? props.type : "text"}
          placeholder={props.placeholder}
          className={
            props.size === "small"
              ? `${styles.inputSmall}`
              : `${styles.inputLarge}`
          }
        />
      )}
    </div>
  );
};

export default TextInput;
