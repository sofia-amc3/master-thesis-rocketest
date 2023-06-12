import React, { ChangeEvent } from "react";
import TesterInfo from "./TesterInfo";
import styles from "../../styles/app.module.css";
import { digitalSavvinessText } from "@/pages/tests/myTests/testDetail/[_id]";

interface UserInfo {
  withinAge: boolean;
  age: number;
  withinGender: boolean;
  gender: string;
  withinLocation: boolean;
  location: string;
  withinCareer: boolean;
  career: string;
  withinHobbies: boolean;
  hobbies: string[];
  withinDigiSav: boolean;
  digitalSavviness: number;
}

interface Props {
  userImgSrc?: string;
  userName: string;
  wasContacted?: boolean;
  userInfo?: UserInfo;
  selected: boolean;
  onSelect: (e: ChangeEvent<HTMLInputElement>) => void;
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
        <input
          type="checkbox"
          value="selectTesters"
          checked={props.selected}
          onChange={(e) => props.onSelect(e)}
        />
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
            info={
              props.userInfo?.withinAge
                ? props.userInfo?.age.toString()
                : "N.A."
            }
          />
          <TesterInfo
            iconSrc="/icons/testerInfo-gender.svg"
            info={
              props.userInfo?.withinGender ? props.userInfo?.gender : "N.A."
            }
          />
        </div>
        <TesterInfo
          iconSrc="/icons/profile-location.svg"
          info={
            props.userInfo?.withinLocation ? props.userInfo?.location : "N.A."
          }
        />
        <TesterInfo
          iconSrc="/icons/testerInfo-career.svg"
          info={props.userInfo?.withinCareer ? props.userInfo?.career : "N.A."}
        />
        <TesterInfo
          iconSrc="/icons/testerInfo-ds.svg"
          info={
            props.userInfo?.digitalSavviness
              ? digitalSavvinessText[props.userInfo?.digitalSavviness]
              : "N.A."
          }
        />
        <TesterInfo
          iconSrc="/icons/testerInfo-hobbies.svg"
          info={
            props.userInfo?.withinHobbies
              ? props.userInfo?.hobbies.toString()
              : "N.A."
          }
        />
      </div>
    </div>
  );
};

export default TestersCheckboxCard;
