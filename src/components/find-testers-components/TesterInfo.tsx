import React from "react";
import styles from "../../styles/app.module.css";

interface Props {
  iconSrc: string;
  info: string;
  outsideCard?: boolean;
}

const TesterInfo = (props: Props) => {
  return (
    <div
      className={`${styles.testerInfoWrapper} ${
        props.outsideCard && styles.testerInfoWrapperOutsideCard
      }`}
    >
      <div className={styles.testerInfoIcon}>
        <img src={props.iconSrc} alt="Icon" />
      </div>
      <span className={styles.testerInfoText}>{props.info}</span>
    </div>
  );
};

export default TesterInfo;
