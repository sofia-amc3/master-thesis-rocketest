import React from "react";
import SectionEntry from "@/components/test-content-components/Section";
import styles from "@/styles/app.module.css";
import { Form, Question, Section } from "@/utils/testCreatorHelper";
import QuestionEntry from "./Question";

interface Props {
  testData: Form;
}

const Test = (props: Props) => {
  const getTotalQuestionsNr = () => {
    const questionTemp = [...props.testData.question_section].filter(
      (q) => !q.isSection
    );

    return questionTemp.length;
  };

  const getCurrentQuestion_SectionNr = (
    isSection: boolean,
    q_s: Question | Section
  ) => {
    const questionTemp = [...props.testData.question_section].filter(
      (q) => q.isSection === isSection
    );

    return questionTemp.indexOf(q_s);
  };

  return (
    <>
      <h1>{props.testData.testName}</h1>
      <h4>
        {props.testData.testType} from {props.testData.testCreator}
      </h4>

      {props.testData.testDescription && (
        <span className={styles.testSectionDescription}>
          {props.testData.testDescription}
        </span>
      )}

      {props.testData.question_section.map((q_s, q_sKey) => {
        return q_s.isSection ? (
          <SectionEntry
            sectionNr={getCurrentQuestion_SectionNr(true, q_s) + 1}
            section={q_s}
            key={q_sKey}
          />
        ) : (
          <QuestionEntry
            currentQuestionNr={(
              getCurrentQuestion_SectionNr(false, q_s) + 1
            ).toString()}
            totalQuestionsNr={getTotalQuestionsNr().toString()}
            question={q_s}
            key={q_sKey}
          />
        );
      })}
    </>
  );
};

export default Test;
