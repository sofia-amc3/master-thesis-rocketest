import React from "react";
import styles from "@/styles/app.module.css";

interface Props {
  sectionNr: string;
  sectionDescription: string;
}

const Section = (props: Props) => {
  return (
    <>
      <span className={styles.testSectionTitle}>Section {props.sectionNr}</span>
      <span className={styles.testSectionDescription}>
        {props.sectionDescription}
      </span>
    </>
  );
};

export default Section;
