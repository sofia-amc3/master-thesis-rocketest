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

  const updatedFormObj = { ...formData };
  const [answeredStatus, setAnsweredStatus] = useState<boolean[]>([]); // to track the answered status of each question

  // --- function to update the selected option (answer) for each question
  const updateOptionAnswer = (questionId: number, text: string): void => {
    // update the answer in the form data
    (updatedFormObj.question_section[questionId] as QuestionData).answer = text;
    setFormData(updatedFormObj);

    // update the answered status for the question
    const updatedAnsweredStatus = [...answeredStatus];
    updatedAnsweredStatus[questionId] = true;
    setAnsweredStatus(updatedAnsweredStatus);
  };

  // --- function to check if all questions are answered
  const checkAllAnswers = () => {
    // get all questions (excluding sections) from the form data
    const getQuestions = formData.question_section.filter(
      (item) => item.isSection === false
    );
    const questionsCount = getQuestions.length; // total number of questions
    const answeredQsCount = answeredStatus.filter((status) => status).length; // total number of answered questions

    if (questionsCount === answeredQsCount) {
      return true;
    } else {
      return false;
    }
  };

  const goToOverview = () => {
    const answeredQsCount = answeredStatus.filter((status) => status).length; // total number of answered questions

    // check if any answer was given
    if (answeredQsCount > 0) {
      if (confirm("Are you sure you want to cancel? All answers will be lost."))
        router.push("/tests");
    } else {
      router.push("/tests");
    }
  };

  // --- function to fetch the test data
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

  // --- function to submit the test's answers
  const submitAnswers = async () => {
    if (checkAllAnswers()) {
      setLoading(true);

      const params = {
        userId: props.auth.id,
        formData: formData,
      };

      await axios
        .post("/api/tests/test/answerTest", params)
        .then(async (res) => {
          setLoading(false);
          console.log(res);
          alert("Test submitted successfully!");
          router.push("/tests/myTests/");
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            alert(error.response.data); // specific error messages
          } else {
            alert(error.message); // default error message
          }
        });
    } else {
      alert("Please answer all questions before submitting.");
    }
  };

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

        {/* Back/Cancel/Submit Buttons */}
        <div className={styles.testButtonsContainer}>
          {props.auth.type === 0 ? (
            //  UX R.
            <Button
              text="Back"
              size="large"
              type="secondary"
              function={() => router.back()}
            />
          ) : (
            // Tester
            <Button
              text="Cancel"
              size="large"
              type="secondary"
              function={goToOverview}
            />
          )}
          {props.auth.type === 1 && (
            <Button
              text="Submit Answers"
              size="large"
              type="primary"
              function={submitAnswers}
            />
          )}
        </div>
      </main>
    </>
  );
};

export default ToBeAnsweredTest;
