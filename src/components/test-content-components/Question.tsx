import React from "react";
import styles from "@/styles/app.module.css";

interface Props {
  currentQuestionNr: string;
  totalQuestionsNr: string;
  question: string;
}

const Question = (props: Props) => {
  return (
    <>
      <span className={styles.testQuestionIndicator}>
        Question {props.currentQuestionNr}/{props.totalQuestionsNr}
      </span>
      <span className={styles.testQuestionTitle}>{props.question}</span>
    </>
  );
};

export default Question;
