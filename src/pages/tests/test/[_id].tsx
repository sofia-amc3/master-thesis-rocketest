import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Test from "@/components/test-content-components/Test";
import Button from "@/components/Button";
import styles from "@/styles/app.module.css";
import TestsTopMenu from "@/components/tests-components/TestsTopMenu";
import { exampleFormObject, Form } from "@/utils/testCreatorHelper";
import { QuestionData } from "@/components/test-content-components/Question";

const ToBeAnsweredTest = () => {
  const router = useRouter();
  const { _id } = router.query;

  const [formData, setFormData] = useState(exampleFormObject);

  const updateOptionAnswer = (questionId: number, text: string): void => {
    const updatedFormObj = { ...formData };

    (updatedFormObj.question_section[questionId] as QuestionData).answer = text;

    setFormData(updatedFormObj);
  };

  return (
    <>
      <Head>
        <title>{formData.testName} | Rocketest</title>
      </Head>
      <main>
        {/* Falta aviso se clicar em algum sítio irá perder as respostas já dadas */}
        <TestsTopMenu isTester />

        <Test testData={formData} updateOptionAnswer={updateOptionAnswer} />

        {/* Submit/Cancel */}
        <div className={styles.testButtonsContainer}>
          <Button text="Cancel" size="large" type="secondary" />
          <Button
            text="Submit"
            size="large"
            type="primary"
            function={() => {
              console.log(formData);
            }}
          />
        </div>
      </main>
    </>
  );
};

export default ToBeAnsweredTest;
