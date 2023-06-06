import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Test from "@/components/test-content-components/Test";
import Button from "@/components/Button";
import styles from "@/styles/app.module.css";
import TestsTopMenu from "@/components/tests-components/TestsTopMenu";
import { Form } from "@/utils/testCreatorHelper";
import { QuestionData } from "@/components/test-content-components/Question";
import axios from "axios";
import Loading from "@/components/Loading";
import { PropsTestPage } from "..";

const ToBeAnsweredTest = (props: PropsTestPage) => {
  const router = useRouter();
  const { _id } = router.query;

  const [formData, setFormData] = useState({} as Form);
  const [loading, setLoading] = useState(true);

  const updateOptionAnswer = (questionId: number, text: string): void => {
    const updatedFormObj = { ...formData };

    (updatedFormObj.question_section[questionId] as QuestionData).answer = text;

    setFormData(updatedFormObj);
  };

  //on loading page functions
  const getTestData = async () => {
    const params = {
      testId: _id,
    };

    await axios
      .get("/api/tests/test/getTestForm", { params })
      .then(async (res) => {
        setFormData(res.data);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          alert(error.response.data); // specific error messages
        } else {
          alert(error.message); // default error message
        }
      });

    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    if (router.isReady) {
      getTestData();
    }
  }, [router]);

  return loading ? (
    <Loading />
  ) : (
    <>
      <Head>
        <title>{formData.testName} | Rocketest</title>
      </Head>
      <main>
        {props.auth.type === 1 ? <TestsTopMenu isTester /> : <TestsTopMenu />}

        <div className={styles.testContainer}>
          <Test testData={formData} updateOptionAnswer={updateOptionAnswer} />
        </div>

        {/* Submit/Cancel */}
        <div className={styles.testButtonsContainer}>
          <Button text="Cancel" size="large" type="secondary" />
          <Button
            text="Submit"
            size="large"
            type="primary"
            disabled={props.auth.type === 0}
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
