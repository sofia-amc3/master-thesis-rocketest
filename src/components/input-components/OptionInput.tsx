import React from "react";
import Image from "next/image";
import Button from "../Button";
import styles from "@/styles/app.module.css";

interface Props {
  id: number;
  mandatory?: boolean;
  defaultValue?: string;
  onChangeText: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  plusIcon?: boolean;
  trashIcon?: boolean;
}

const letterConverter = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const OptionInput = (props: Props) => {
  return (
    <div className={styles.optionInput}>
      {/* display the corresponding letter to the option id */}
      <label>{letterConverter[props.id]}</label>
      {props.mandatory && <span>*</span>}
      <input
        type="text"
        placeholder={`Name of Option ${letterConverter[props.id]}`}
        className={props.mandatory ? styles.mandatoryOptInput : ""}
        value={props.defaultValue}
        onChange={props.onChangeText}
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
