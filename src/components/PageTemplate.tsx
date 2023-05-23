import React from "react";
import styles from "@/styles/app.module.css";

interface Props {
  imgSrc: string;
  isScrollable?: boolean;
  isDashboard?: boolean;
}

const PageTemplate = (props: Props) => {
  return (
    <div
      className={`${styles.pageImgContainer} ${
        props.isScrollable && styles.pageImgContainerScrollable
      } ${props.isDashboard && styles.pageImgContainerDashboard}`}
    >
      <img src={props.imgSrc} alt="Page Template" />
    </div>
  );
};

export default PageTemplate;
