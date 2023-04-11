import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
import styles from "@/styles/app.module.css";

interface Props {
  userImg: string;
  userProfile: string;
  userName: string;
  jobTitle?: string;
  location?: string;
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
        <Link href={props.userProfile}>
          <span className={styles.userNameTxt}>{props.userName}</span>
        </Link>
        <br />
        {props.jobTitle && <span>{props.jobTitle}</span>}
        {props.jobTitle && props.location ? (
          <span className={styles.bullet}>•</span>
        ) : (
          ""
        )}
        {props.location && <span>{props.location}</span>}
      </div>

      <div className={styles.rightContent}>
        {props.isFollowing ? (
          <Button text="Following" size="small" type="tertiary-secondary" />
        ) : (
          <Button text="Follow" size="small" type="tertiary" />
        )}
      </div>
    </div>
  );
};

export default FollowPeople;
