import React from "react";
import Image from "next/image";
import Button from "../Button";
import styles from "@/styles/app.module.css";
import { Option } from "@/utils/testCreatorHelper";

interface Props {
  id: number;
  mandatory?: boolean;
  questionId: number;
  defaultValues: Option;
  onChangeText: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  onChangeImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteImg: () => void;
  plusIcon?: boolean;
  addOption?: () => void;
  trashIcon?: boolean;
  deleteOption?: () => void;
}

const letterConverter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

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
        value={props.defaultValues?.name}
        onChange={props.onChangeText}
        maxLength={11}
      />

      <input
        type="file"
        id={`OptionImg-Q${props.questionId}O${props.defaultValues.id}`}
        accept="image/*"
        style={{ display: "none" }}
        onChange={props.onChangeImg}
      />
      <Button
        text="Upload"
        type="tertiary"
        size="small"
        function={() =>
          document
            .getElementById(
              `OptionImg-Q${props.questionId}O${props.defaultValues.id}`
            )!
            .click()
        }
      />

      <span className={styles.uploadedImgDetails}>
        {props.defaultValues?.imgName || "No image uploaded."}
      </span>
      {props.defaultValues?.imgSrc && (
        <Image
          src="/icons/bin.svg"
          alt="Delete Uploaded Image Icon"
          width={15}
          height={15}
          className={styles.deleteImgIcon}
          onClick={() => {
            props.onDeleteImg();
            (
              document.getElementById(
                `OptionImg-Q${props.questionId}O${props.defaultValues.id}`
              )! as HTMLInputElement
            ).value = "";
          }}
        />
      )}

      {props.plusIcon && (
        <Image
          src="/icons/add.svg"
          alt="Add Option Icon"
          width={20}
          height={20}
          className={styles.addOptionIcon}
          onClick={props.addOption}
        />
      )}
      {props.trashIcon && (
        <Image
          src="/icons/bin.svg"
          alt="Delete Option Icon"
          width={20}
          height={20}
          className={styles.deleteOptionIcon}
          onClick={props.deleteOption}
        />
      )}
    </div>
  );
};

export default OptionInput;
