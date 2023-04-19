import React from "react";
import Option, { OptionData } from "./Option";
import styles from "@/styles/app.module.css";

export interface QuestionData {
  text: string;
  answer?: string;
  options: OptionData[];
}

interface Props {
  sectionNr: number;
  currentQuestionNr: string;
  totalQuestionsNr: string;
  question: QuestionData;
}

const Question = (props: Props) => {
  return (
    <>
      <span className={styles.testQuestionIndicator}>
        Question {props.currentQuestionNr}/{props.totalQuestionsNr}
      </span>
      <span className={styles.testQuestionTitle}>{props.question.text}</span>
      {props.question.options.map((option, optionKey) => {
        return (
          <Option
            imgSrc={option.src}
            optionLabel={option.name}
            optionValue={`s${props.sectionNr}q${props.currentQuestionNr}`}
            selected={
              props.question.answer
                ? props.question.answer === option.name
                : undefined
            }
            key={optionKey}
          />
        );
      })}
    </>
  );
};

export default Question;
