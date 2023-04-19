import React from "react";
import Question, { QuestionData } from "./Question";
import styles from "@/styles/app.module.css";

export interface SectionData {
  name: string;
  description?: string;
  questions: QuestionData[];
}

interface Props {
  sectionNr: number;
  section: SectionData;
}

const Section = (props: Props) => {
  return (
    <>
      <span className={styles.testSectionTitle}>
        {props.section.name || `Section ${props.sectionNr}`}
      </span>
      {props.section.description && (
        <span className={styles.testSectionDescription}>
          {props.section.description}
        </span>
      )}
      {props.section.questions.map((question, questionKey) => {
        return (
          <Question
            sectionNr={props.sectionNr}
            currentQuestionNr={`${questionKey + 1}`}
            totalQuestionsNr={`${props.section.questions.length}`}
            question={question}
            key={questionKey}
          />
        );
      })}
    </>
  );
};

export default Section;
