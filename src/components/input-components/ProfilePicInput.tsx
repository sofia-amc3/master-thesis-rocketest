import React from "react";
import styles from "@/styles/app.module.css";
import Image from "next/image";
import Button from "../Button";

interface Props {
  title: string;
  src: string;
  imgDetails: string;
  mandatory?: boolean;
  onChange: (e: React.ChangeEvent<HTMLImageElement>) => void;
}

const ProfilePicInput = (props: Props) => {
  return (
    <div className={styles.profilePicInputContainer}>
      <label>{props.title}</label>
      {props.mandatory && <span>*</span>}

      <div className={styles.profilePicContainer}>
        {/* Uploaded image shows here */}
        <img src={props.src} alt="" />
      </div>

      <div className={styles.profilePicUploadContainer}>
        {/* Upload will provide img src */}
        <input
          type="file"
          id="profilePicture"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => console.log(e)}
        />
        <Button
          text="Upload"
          type="tertiary"
          size="small"
          function={() => document.getElementById("profilePicture")!.click()}
        />

        {/* If image was uploaded */}
        {/* File name + format */}
        <span>{props.imgDetails}</span>
        {/* Delete uploaded image */}

        <Image
          src="/icons/bin.svg"
          alt="Delete Profile Picture Icon"
          width={18}
          height={18}
        />
      </div>
    </div>
  );
};

export default ProfilePicInput;
