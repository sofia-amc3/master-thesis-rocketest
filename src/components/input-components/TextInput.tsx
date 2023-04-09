import React from "react";
import styles from "@/styles/app.module.css";
import Image from "next/image";

interface Props {
  title: string;
  placeholder: string;
  size?: "small" | "large";
  type?: "text" | "password" | "date";
  mandatory?: boolean;
  isTextarea?: boolean;
  isSelect?: boolean;
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
            name="gender"
            className={
              props.size === "small"
                ? `${styles.inputSmall}`
                : `${styles.inputLarge}`
            }
          >
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
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
