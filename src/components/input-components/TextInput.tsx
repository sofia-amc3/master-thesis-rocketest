import React from "react";
import styles from "@/styles/app.module.css";

interface Props {
  title: string;
  placeholder: string;
  size?: "small" | "large";
  type?: "text" | "password";
  mandatory?: boolean;
  isTextarea?: boolean;
}

const TextInput = (props: Props) => {
  return (
    <div className={styles.textInput}>
      <label>{props.title}</label>
      {props.mandatory && <span>*</span>}
      <br />
      {props.isTextarea ? (
        <textarea placeholder={props.placeholder}></textarea>
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
