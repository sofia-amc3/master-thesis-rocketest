import React from "react";
import Head from "next/head";
import PageTemplate from "@/components/PageTemplate";
import { PropsTestPage } from "../tests";
import Link from "next/link";
import styles from "@/styles/app.module.css";

const Profile = (props: PropsTestPage) => {
  return (
    <>
      <Head>
        <title>Profile | Rocketest</title>
      </Head>
      <main>
        {props.auth?.type ? (
          // Tester
          <PageTemplate imgSrc="page_templates/profile-tester.png" />
        ) : (
          // UX Researcher
          <PageTemplate imgSrc="page_templates/profile-uxrsc.png" />
        )}

        {/* Edit Profile Page */}
        <Link href={"../profile/editProfile"}>
          <img
            src="icons/editProfile.svg"
            alt="Edit Profile Icon"
            className={styles.editProfileIcon}
          />
        </Link>
      </main>
    </>
  );
};

export default Profile;
