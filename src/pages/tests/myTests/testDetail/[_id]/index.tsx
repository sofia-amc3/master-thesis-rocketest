import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import TestsTopMenu from "@/components/tests-components/TestsTopMenu";
import SearchBar from "@/components/SearchBar";
import Button from "@/components/Button";
import Breadcrumbs from "@/components/Breadcrumbs";
import FollowPeople from "@/components/list-cards-components/FollowPeople";
import SmallInfo from "@/components/my-tests-components/SmallInfo";
import PagesSlider from "@/components/PagesSlider";
import Test from "@/components/test-content-components/Test";
import { useRouter } from "next/router";
import styles from "@/styles/app.module.css";
import axios from "axios";
import { userAuth } from "@/utils/user";
import { PropsTestPage } from "@/pages/tests";
import { TestData } from "../..";
import Loading from "@/components/Loading";
import { exampleFormObject, Form } from "@/utils/testCreatorHelper";

interface Props {
  auth: userAuth;
}

const TestDetailUXResearcher = (props: Props) => {
  const router = useRouter();
  const { _id } = router.query; // access the test ID from the URL parameter

  const [loading, setLoading] = useState(true);
  const [testData, setTestData] = useState({} as TestData);

  const goToFindTestersPage = () => {
    router.push(`/tests/myTests/testDetail/${_id}/findTesters`);
  };

  const goToTestResultsPage = () => {
    router.push(`/tests/myTests/testDetail/${_id}/testResults`);
  };

  const showTestDetail = async () => {
    const params = {
      userId: props.auth?.id,
      testId: _id,
    };

    await axios
      .get("/api/tests/myTests/testDetail/testDetailUxResearcher", { params })
      .then(async (res) => {
        if (res.data.length === 1) {
          setTestData(res.data[0]);
          setLoading(false);
        } else {
          alert("There is no test available.");
          router.push("/tests/myTests/");
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          alert(error.response.data); // specific error messages
        } else {
          alert(error.message); // default error message
        }
        router.push("/tests/myTests/");
      });
  };
  useEffect(() => {
    setLoading(true);
    if (router.isReady) {
      showTestDetail();
    }
  }, [router]);

  const deleteTest = async () => {
    // confirm alert
    if (
      confirm(
        "Are you sure you want to delete this test? This action is irreversible."
      )
    ) {
      setLoading(true);

      await axios
        .post("/api/tests/myTests/testDetail/deleteTestUxResearcher", {
          userId: props.auth?.id,
          testId: Number(_id),
        })
        .then(async (res) => {
          router.push("/tests/myTests/");
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            alert(error.response.data); // specific error messages
          } else {
            alert(error.message); // default error message
          }
        });

      setLoading(false);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <TestsTopMenu />
      <SearchBar />
      <Breadcrumbs link="/tests/myTests" pageName="My Tests" imageAppears />
      <Breadcrumbs link="" pageName={testData.testName} activePage />
      <div className={styles.testDetailContainer}>
        <div className={styles.testDetailLeftContainer}>
          <div className={styles.testDetailTitle}>
            <h1>{testData.testName}</h1>
            <Image
              src="/icons/trash.svg"
              alt="Delete Test Icon"
              width={25}
              height={25}
              onClick={deleteTest}
            />
          </div>
          <div className={styles.testImgContainer}>
            <img src="/tests_imgs/a-b-testing.jpg" alt="Test Image" />
          </div>
          <h2>Test&apos;s Link</h2>
          <a href={`/tests/test/${testData.id}`}>Preview Test</a>

          <Button text="Copy Link" size="medium" type="tertiary" />
          <Button text="Share" size="medium" type="tertiary" />
          <h2>Test&apos;s Information</h2>
          <div className={styles.smallInfoContainer}>
            <SmallInfo
              iconSrc="/icons/test-information.svg"
              iconWidth={24}
              text={testData.testType}
            />
            <SmallInfo
              iconSrc="/icons/test-testersNumber.svg"
              iconWidth={24}
              text={`${testData.testersCount} Contacted Testers`}
            />
            <SmallInfo
              iconSrc="/icons/test-calendar.svg"
              iconWidth={24}
              text={`Ends in ${new Date(
                testData.testDeadline
              ).toLocaleDateString("en-us", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}`}
            />
            <SmallInfo
              iconSrc="/icons/money-spent.svg"
              iconWidth={24}
              text={`${testData.testPayment}$ per Test`}
            />
          </div>

          <div className={styles.testBtnsContainer}>
            <Button
              text="Find Testers"
              type="primary"
              size="extra-extra-large"
              function={goToFindTestersPage}
            />
            <Button
              text="View Results"
              type="secondary"
              size="extra-extra-large"
              function={goToTestResultsPage}
            />
          </div>
        </div>
        <div className={styles.testDetailRightContainer}>
          <h2>People that have taken this test:</h2>
          {/* Follow People Component */}
          <FollowPeople
            userImg="/userExamples/user--05.svg"
            userProfile=""
            userName="Name of Person"
            jobTitle="Job Title"
            location="Location"
          />
          <FollowPeople
            userImg="/userExamples/user--05.svg"
            userProfile=""
            userName="Name of Person"
            jobTitle="Job Title"
            location="Location"
          />
          <FollowPeople
            userImg="/userExamples/user--05.svg"
            userProfile=""
            userName="Name of Person"
            jobTitle="Job Title"
            location="Location"
          />
          <FollowPeople
            userImg="/userExamples/user--05.svg"
            userProfile=""
            userName="Name of Person"
            jobTitle="Job Title"
            location="Location"
          />
          <FollowPeople
            userImg="/userExamples/user--05.svg"
            userProfile=""
            userName="Name of Person"
            jobTitle="Job Title"
            location="Location"
          />
          <FollowPeople
            userImg="/userExamples/user--05.svg"
            userProfile=""
            userName="Name of Person"
            jobTitle="Job Title"
            location="Location"
          />
          <FollowPeople
            userImg="/userExamples/user--05.svg"
            userProfile=""
            userName="Name of Person"
            jobTitle="Job Title"
            location="Location"
          />
          <FollowPeople
            userImg="/userExamples/user--05.svg"
            userProfile=""
            userName="Name of Person"
            jobTitle="Job Title"
            location="Location"
          />

          {/* Pages Component */}
          <PagesSlider
            previousPageArrow
            currentPageNr={10}
            totalPagesNr={50}
            nextPageArrow
            nextPageFunction={() => {}}
            previousPageFunction={() => {}}
          />
        </div>
      </div>
    </>
  );
};

const TestDetailTester = (props: Props) => {
  const router = useRouter();
  const { _id } = router.query;

  const [formData, setFormData] = useState({} as Form);
  const [loading, setLoading] = useState(true);

  const goToMyTestsPage = () => {
    router.push("/tests/myTests/");
  };

  //on loading page functions
  const getTestData = async () => {
    const params = {
      testId: _id,
      userId: props.auth.id,
    };

    await axios
      .get("/api/tests/test/getAnsweredTestForm", { params })
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
      <TestsTopMenu isTester />
      <SearchBar />
      <Breadcrumbs link="/tests/myTests" pageName="My Tests" imageAppears />
      <Breadcrumbs link="" pageName={formData.testName} activePage />

      {/* Return Test with Answers Here */}
      <Test testData={formData} />

      <div className={styles.testButtonsContainer}>
        <Button
          text="Back"
          size="large"
          type="secondary"
          function={goToMyTestsPage}
        />
      </div>
    </>
  );
};

const TestDetail = (props: PropsTestPage) => {
  return (
    <>
      <Head>
        <title>My Tests - Test Detail | Rocketest</title>
      </Head>
      <main>
        {/* Check User Type */}
        {props.auth.type ? (
          <TestDetailTester auth={props.auth} />
        ) : (
          <TestDetailUXResearcher auth={props.auth} />
        )}
      </main>
    </>
  );
};

export default TestDetail;
