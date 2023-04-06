import React from "react";
import styles from "@/styles/app.module.css";
import Image from "next/image";
import Button from "../Button";

interface Props {
  title: string;
  src: string;
  imgDetails: string;
  mandatory?: boolean;
}

const ProfilePicInput = (props: Props) => {
  return (
    <div className={styles.profilePicInputContainer}>
      <label>{props.title}</label>
      {props.mandatory && <span>*</span>}

      <div className={styles.profilePicInputContent}>
        <div className={styles.profilePicContainer}>
          <img src={props.src} alt="Profile Picture" />
        </div>

        <div className={styles.profilePicUploadContainer}>
          <Button text="Upload" type="tertiary" size="small" />

          <span>{props.imgDetails}</span>
          <Image
            src="/icons/bin.svg"
            alt="Delete Profile Picture Icon"
            width={18}
            height={18}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePicInput;
