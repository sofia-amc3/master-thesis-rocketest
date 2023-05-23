import React from "react";
import Head from "next/head";
import PageTemplate from "@/components/PageTemplate";
import { PropsTestPage } from "../tests";
import Link from "next/link";
import styles from "@/styles/app.module.css";

const EditProfile = (props: PropsTestPage) => {
  return (
    <>
      <Head>
        <title>Edit Profile | Rocketest</title>
      </Head>
      <main>
        {props.auth?.type ? (
          // Tester
          <PageTemplate
            imgSrc="../../../page_templates/editProfile-tester.png"
            isScrollable
          />
        ) : (
          // UX Researcher
          <PageTemplate imgSrc="../../../page_templates/editProfile-uxrsc.png" />
        )}

        {/* Back to Profile */}
        <Link href={"../profile"}>
          <img
            src="../../../icons/arrow-left.svg"
            alt="Back to Profile Arrow"
            className={styles.backToProfileArrow}
          />
        </Link>
      </main>
    </>
  );
};

export default EditProfile;
