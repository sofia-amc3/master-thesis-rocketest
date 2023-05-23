import React from "react";
import Image from "next/image";
import styles from "@/styles/app.module.css";

const TestContentsMenu = ({ isVisible }: { isVisible: boolean }) => {
  const menuClassName = isVisible
    ? styles.testContentsMenu
    : styles.testsContentsMenuInvisible;

  return (
    <div className={menuClassName}>
      <div className={styles.testContentsMenuRow}>
        <Image
          src="/icons/plus.svg"
          alt="Add Question Icon"
          width={30}
          height={30}
        />
        <span>Add Question</span>
      </div>

      <div className={styles.testContentsMenuRow}>
        <Image
          src="/icons/plus.svg"
          alt="Add Section Icon"
          width={30}
          height={30}
        />
        <span>Add Section</span>
      </div>

      <div className={styles.testContentsMenuRow}>
        <Image
          src="/icons/trash.svg"
          alt="Delete Icon"
          width={30}
          height={30}
        />
        <span>Delete</span>
      </div>

      <div className={styles.testContentsMenuRow}>
        <Image
          src="/icons/arrow.svg"
          alt="Arrow Up Icon"
          width={30}
          height={30}
        />
        <span>Move Up</span>
      </div>

      <div className={styles.testContentsMenuRow}>
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
