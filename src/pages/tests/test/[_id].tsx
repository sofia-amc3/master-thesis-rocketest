import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Test from "@/components/test-content-components/Test";
import Button from "@/components/Button";
import styles from "@/styles/app.module.css";
import TestsTopMenu from "@/components/tests-components/TestsTopMenu";

const ToBeAnsweredTest = () => {
  const router = useRouter();
  const { _id } = router.query;

  const objectExample = {
    name: "Test Name",
    author: "Sofia",
    type: "A/B Test",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    sections: [
      {
        name: "Section 01",
        description: "section description",
        questions: [
          {
            text: "Which of these do you prefer?",
            options: [
              {
                src: "",
                name: "Option A",
              },
              {
                src: "",
                name: "Option B",
              },
            ],
          },
          {
            text: "Question 02",
            options: [
              {
                src: "",
                name: "Option A",
              },
              {
                src: "",
                name: "Option B",
              },
              {
                src: "",
                name: "Option C",
              },
            ],
          },
        ],
      },
      {
        name: "Section 02",
        description: "section description",
        questions: [
          {
            text: "Which of these do you prefer?",
            options: [
              {
                src: "",
                name: "Option A",
              },
              {
                src: "",
                name: "Option B",
              },
            ],
          },
          {
            text: "Question 02",
            options: [
              {
                src: "",
                name: "Option A",
              },
              {
                src: "",
                name: "Option B",
              },
              {
                src: "",
                name: "Option C",
              },
            ],
          },
        ],
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{objectExample.name} | Rocketest</title>
      </Head>
      <main>
        {/* Falta aviso se clicar em algum sítio irá perder as respostas já dadas */}
        <TestsTopMenu isTester />

        <Test testData={objectExample} />

        {/* Submit/Cancel */}
        <div className={styles.testButtonsContainer}>
          <Button text="Cancel" size="large" type="secondary" />
          <Button text="Submit" size="large" type="primary" />
        </div>
      </main>
    </>
  );
};

export default ToBeAnsweredTest;
