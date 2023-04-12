import React from "react";
import styles from "../../styles/app.module.css";

interface Props {
  userImgSrc: string;
  userName: string;
  description: string;
  userProfileLink: string;
  wasContacted?: boolean;
}

const TestersCheckboxCard = (props: Props) => {
  return (
    <div
      className={`${styles.testerCheckboxCard} ${
        props.wasContacted && styles.testerCheckboxCardContacted
      }`}
    >
      {props.wasContacted ? (
        <input type="checkbox" value="selectTesters" disabled />
      ) : (
        <input type="checkbox" value="selectTesters" />
      )}
      <a
        href={props.userProfileLink}
        className={styles.testerSmallCard}
        target="_blank"
      >
        <div>
          <img
            src={props.userImgSrc}
            alt={`${props.userName} Profile Picture`}
          />
        </div>
        <span>{props.userName}</span>
        <br />
        {props.wasContacted ? (
          <span>Already Contacted</span>
        ) : (
          <span>{props.description}</span>
        )}
      </a>
    </div>
  );
};

export default TestersCheckboxCard;
