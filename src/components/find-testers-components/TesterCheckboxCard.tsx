import React from "react";
import TesterInfo from "./TesterInfo";
import styles from "../../styles/app.module.css";

interface Props {
  userImgSrc?: string;
  userName: string;
  wasContacted?: boolean;
  userInfo?: UserInfo;
}

interface UserInfo {
  age?: number;
  gender?: string;
  location?: string;
  career?: string;
  hobbies?: string[];
  digitalSavviness?: string;
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
      <div className={styles.testerSmallCard}>
        <div className={styles.profilePicWrapper}>
          <img
            src={props.userImgSrc || "/userExamples/user--02.svg"}
            alt={`User Profile Picture`}
          />
        </div>
        <span>{props.userName}</span>
        <span className={styles.wasContacted}>
          {props.wasContacted ? "Already Contacted" : "Not Contacted"}
        </span>
        <br />
        <div className={styles.testerInfoContainer}>
          <TesterInfo
            iconSrc="/icons/testerInfo-age.svg"
            info={props.userInfo?.age?.toString() || "N.A."}
          />
          <TesterInfo
            iconSrc="/icons/testerInfo-gender.svg"
            info={props.userInfo?.gender || "N.A."}
          />
        </div>
        <TesterInfo
          iconSrc="/icons/profile-location.svg"
          info={props.userInfo?.location || "N.A."}
        />
        <TesterInfo
          iconSrc="/icons/testerInfo-career.svg"
          info={props.userInfo?.career || "N.A."}
        />
        <TesterInfo
          iconSrc="/icons/testerInfo-ds.svg"
          info={props.userInfo?.digitalSavviness || "N.A."}
        />
        <TesterInfo iconSrc="/icons/testerInfo-hobbies.svg" info={"N.A."} />
      </div>
    </div>
  );
};

export default TestersCheckboxCard;
