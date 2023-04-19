import React from "react";
import Button from "@/components/Button";
import Section from "@/components/test-content-components/Section";
import Question from "@/components/test-content-components/Question";
import Option from "@/components/test-content-components/Option";
import styles from "@/styles/app.module.css";

interface Props {
  testName: string;
  testAuthor: string;
  testDescription: string;
}

const Test = (props: Props) => {
  return (
    <>
      <h1>{props.testName}</h1>
      <h4>A/B Test from {props.testAuthor}</h4>

      <span className={styles.testSectionDescription}>
        {props.testDescription}
      </span>

      {/* Test Content: Sections, Questions, Answers */}

      {/* Submit / Cancel  */}
      <div className={styles.testButtonsContainer}>
        <Button text="Cancel" size="large" type="secondary" />
        <Button text="Submit" size="large" type="primary" />
      </div>
    </>
  );
};

export default Test;
