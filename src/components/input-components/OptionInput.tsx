import React from "react";
import Image from "next/image";
import Button from "../Button";
import styles from "@/styles/app.module.css";

interface Props {
  letter: string;
  mandatory?: boolean;
  plusIcon?: boolean;
  trashIcon?: boolean;
}

const OptionInput = (props: Props) => {
  return (
    <div className={styles.optionInput}>
      <label>{props.letter}</label>
      {props.mandatory && <span>*</span>}
      <input
        type="text"
        placeholder={`Name of Option ${props.letter}`}
        className={props.mandatory ? styles.mandatoryOptInput : ""}
      />

      <Button text="Upload" type="tertiary" size="small" />
      <span className={styles.uploadedImgDetails}>image01.jpg</span>
      <Image
        src="/icons/bin.svg"
        alt="Delete Uploaded Image Icon"
        width={15}
        height={15}
        className={styles.deleteImgIcon}
      />

      {props.plusIcon && (
        <Image
          src="/icons/add.svg"
          alt="Add Option Icon"
          width={20}
          height={20}
          className={styles.addOptionIcon}
        />
      )}
      {props.trashIcon && (
        <Image
          src="/icons/bin.svg"
          alt="Delete Option Icon"
          width={20}
          height={20}
          className={styles.deleteOptionIcon}
        />
      )}
    </div>
  );
};

export default OptionInput;
