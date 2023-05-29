import React, { KeyboardEvent } from "react";
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
  options?: string[];
  defaultValue?: string;
  textareaMaxLength?: number;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  onEnterKey?: () => void;
}

const TextInput = (props: Props) => {
  const keyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (props.onEnterKey !== undefined && e.key === "Enter") {
      console.log("enter key pressed");
      props.onEnterKey();
    }
  };

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
          maxLength={props.textareaMaxLength}
          onChange={props.onChange}
          value={props.defaultValue}
        ></textarea>
      ) : props.isSelect ? (
        <div className={`${styles.selectContainer} ${styles.authSelect}`}>
          <select
            className={
              props.size === "small"
                ? `${styles.inputSmall}`
                : `${styles.inputLarge}`
            }
            onChange={props.onChange}
          >
            {props.options &&
              props.options.map((value, key) => {
                return (
                  <option
                    key={key}
                    value={value}
                    selected={value === props.defaultValue}
                  >
                    {value}
                  </option>
                );
              })}
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
          value={props.defaultValue}
          onChange={props.onChange}
          onKeyUp={keyPress}
        />
      )}
    </div>
  );
};

export default TextInput;
