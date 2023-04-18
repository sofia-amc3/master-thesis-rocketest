import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Button from "./Button";
import styles from "@/styles/app.module.css";

interface Props {
  title: string;
  content: string;
  primaryBtnText: string;
  primaryBtnFunction: Function;
  isInformative?: boolean;
}

const PopUp = (props: Props) => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <>
      <div className={styles.popUpOpacityLens} />
      <div className={styles.popUpContent}>
        <div className={styles.topPart}>
          <span>{props.title}</span>
          <button type="button" onClick={goBack} className={styles.closeBtn}>
            <Image
              src="/icons/close.svg"
              alt="Close Icon"
              width={12}
              height={12}
            />
          </button>
        </div>
        <div className={styles.bottomPart}>
          <span>{props.content}</span>
          {props.isInformative ? (
            <Button
              text="Ok"
              size="extra-extra-large"
              type="primary"
              function={props.primaryBtnFunction}
            />
          ) : (
            <>
              <Button
                text="Cancel"
                size="large"
                type="secondary"
                function={goBack}
              />
              <Button
                text={props.primaryBtnText}
                size="large"
                type="primary"
                function={props.primaryBtnFunction}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PopUp;
