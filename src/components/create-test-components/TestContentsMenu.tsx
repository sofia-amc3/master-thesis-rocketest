import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import styles from "@/styles/app.module.css";
import {
  Form,
  Question,
  Section,
  question_sectionCreator,
  question_sectionDelete,
} from "@/utils/testCreatorHelper";

interface Props {
  isVisible: boolean;
  formData: Form;
  setForm: Dispatch<SetStateAction<Form>>;
  q_sKey: number;
}

/* Side Menu Controls for Creating a Test -> Add Question, Add Section, Delete, Move Up and Move Down */
const TestContentsMenu = (props: Props) => {
  const menuClassName = `${styles.testContentsMenu} ${
    !props.isVisible ? styles.invisible : ""
  }`;

  return (
    <div className={menuClassName} tabIndex={-1}>
      <div
        className={styles.testContentsMenuRow}
        onMouseDown={() =>
          props.setForm(question_sectionCreator(props.formData, false))
        }
      >
        <Image
          src="/icons/plus.svg"
          alt="Add Question Icon"
          width={30}
          height={30}
        />
        <span>Add Question</span>
      </div>

      <div
        className={styles.testContentsMenuRow}
        onMouseDown={() =>
          props.setForm(question_sectionCreator(props.formData, true))
        }
      >
        <Image
          src="/icons/plus.svg"
          alt="Add Section Icon"
          width={30}
          height={30}
        />
        <span>Add Section</span>
      </div>

      <div
        className={styles.testContentsMenuRow}
        onMouseDown={() =>
          props.setForm(question_sectionDelete(props.formData, props.q_sKey))
        }
      >
        <Image
          src="/icons/trash.svg"
          alt="Delete Icon"
          width={30}
          height={30}
        />
        <span>Delete</span>
      </div>

      {/* Disabled */}
      <div className={`${styles.testContentsMenuRow} ${styles.disabled}`}>
        <Image
          src="/icons/arrow.svg"
          alt="Arrow Up Icon"
          width={30}
          height={30}
        />
        <span>Move Up</span>
      </div>

      <div className={`${styles.testContentsMenuRow} ${styles.disabled}`}>
        <Image
          src="/icons/arrow.svg"
          alt="Arrow Down Icon"
          width={30}
          height={30}
          className={styles.rotateArrow}
        />
        <span>Move Down</span>
      </div>
    </div>
  );
};

export default TestContentsMenu;
