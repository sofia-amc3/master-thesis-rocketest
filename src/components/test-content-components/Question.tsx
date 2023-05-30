import React from "react";
import OptionEntry from "./Option";
import styles from "@/styles/app.module.css";
import { Question } from "@/utils/testCreatorHelper";

export interface QuestionData extends Question {
  answer?: string;
}

interface Props {
  currentQuestionNr: string;
  totalQuestionsNr: string;
  question: QuestionData;
  questionId: number;
  updateOptionAnswer?: (questionId: number, text: string) => void;
}

const QuestionEntry = (props: Props) => {
  return (
    <>
      <span className={styles.testQuestionIndicator}>
        Question {props.currentQuestionNr}/{props.totalQuestionsNr}
      </span>
      <span className={styles.testQuestionTitle}>{props.question.name}</span>
      {props.question.options.map((option, optionKey) => {
        return (
          <OptionEntry
            optionValue={`q${props.currentQuestionNr}`}
            selected={
              props.question.answer
                ? props.question.answer === option.name
                : undefined
            }
            optionData={option}
            questionId={props.questionId}
            updateOptionAnswer={props.updateOptionAnswer}
            key={optionKey}
          />
        );
      })}
    </>
  );
};

export default QuestionEntry;
