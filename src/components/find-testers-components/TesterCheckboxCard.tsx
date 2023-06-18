import React, { ChangeEvent } from "react";
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
          <img
            src="/icons/testerInfo-age.svg"
            alt="Age Icon"
            title={
              props.userInfo?.withinAge ? props.userInfo?.age.toString() : ""
            }
            className={props.userInfo?.withinAge ? "" : styles.disabled}
          />
          <img
            src="/icons/testerInfo-gender.svg"
            alt="Gender Icon"
            title={props.userInfo?.withinGender ? props.userInfo?.gender : ""}
            className={props.userInfo?.withinGender ? "" : styles.disabled}
          />
          <img
            src="/icons/profile-location.svg"
            alt="Location Icon"
            title={
              props.userInfo?.withinLocation ? props.userInfo?.location : ""
            }
            className={props.userInfo?.withinLocation ? "" : styles.disabled}
          />
          <img
            src="/icons/testerInfo-career.svg"
            alt="Career Icon"
            title={props.userInfo?.withinCareer ? props.userInfo?.career : ""}
            className={props.userInfo?.withinCareer ? "" : styles.disabled}
          />
          <img
            src="/icons/testerInfo-hobbies.svg"
            alt="Hobbies Icon"
            title={
              props.userInfo?.withinHobbies
                ? props.userInfo?.hobbies.toString()
                : ""
            }
            className={props.userInfo?.withinHobbies ? "" : styles.disabled}
          />
          <img
            src="/icons/testerInfo-ds.svg"
            alt="Digital Savviness Icon"
            title={
              props.userInfo?.withinDigiSav
                ? digitalSavvinessText[props.userInfo?.digitalSavviness]
                : ""
            }
            className={props.userInfo?.withinDigiSav ? "" : styles.disabled}
          />
        </div>
      </div>
    </div>
  );
};

export default TestersCheckboxCard;
