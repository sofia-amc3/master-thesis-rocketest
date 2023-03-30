import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/app.module.css";

interface Props {
  title: string;
  placeholder: string;
  mandatory?: boolean;
  isTextarea?: boolean;
}

const TextInput = (props: Props) => {
  return (
    <div className={styles.textInput}>
      <label>{props.title}</label>
      {props.mandatory && <span>*</span>}
      {props.isTextarea ? (
        <textarea placeholder={props.placeholder}></textarea>
      ) : (
        <input type="text" placeholder={props.placeholder} />
      )}
    </div>
  );
};

export default TextInput;
