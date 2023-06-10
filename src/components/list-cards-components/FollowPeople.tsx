import React from "react";
import Link from "next/link";
import Button from "../Button";
import styles from "@/styles/app.module.css";

interface Props {
  userImg: string;
  userProfile: string;
  userName: string;
  matchedCriteria?: boolean;
  matchedCriteriaText?: string;
  isFollowing?: boolean;
}

const FollowPeople = (props: Props) => {
  return (
    <div className={styles.followPeopleCard}>
      <div className={styles.leftContent}>
        <Link href={props.userProfile}>
          <div className={styles.userProfilePicContainer}>
            <img
              src={props.userImg}
              alt={`${props.userName} Profile Picture`}
            />
          </div>
        </Link>
        <div className={styles.userMatchedCriteria}>
          <Link href={props.userProfile}>
            <span className={styles.userNameTxt}>{props.userName}</span>
          </Link>
          <br />
          {props.matchedCriteria ? (
            <>
              <span>Matched Criteria</span>
              <img
                src="/icons/test-information.svg"
                alt="Information Icon"
                title={props.matchedCriteriaText}
                className={`${styles.infoIcon}`}
              />
            </>
          ) : (
            <span>No Matched Criteria.</span>
          )}
        </div>
      </div>

      <div className={styles.rightContent}>
        {props.isFollowing ? (
          <Button
            text="Following"
            size="small"
            type="tertiary-secondary"
            disabled
          />
        ) : (
          <Button text="Follow" size="small" type="tertiary" disabled />
        )}
      </div>
    </div>
  );
};

export default FollowPeople;
