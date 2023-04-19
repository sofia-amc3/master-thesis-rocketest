import React from "react";
import styles from "@/styles/app.module.css";

interface Props {
  imgSrc: string;
}

const PageTemplate = (props: Props) => {
  return (
    <div className={styles.pageImgContainer}>
      <img src={props.imgSrc} alt="Page Template" />
    </div>
  );
};

export default PageTemplate;
