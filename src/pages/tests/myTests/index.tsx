import React from "react";
import Head from "next/head";
import TestsTopMenu from "@/components/tests-components/TestsTopMenu";
import TestsSearch from "@/components/my-tests-components/TestsSearch";
import TestCard from "@/components/my-tests-components/TestCard";
import styles from "@/styles/app.module.css";
import { PropsTestPage } from "..";

const MyTestsUXResearcher = () => {
  return (
    <>
      <TestsSearch
        options={["In Progress", "Finished"]}
        filters={["Name", "No. Testers", "Date", "Test Type"]}
      />
      <h1>In Progress</h1>
      <h6>Click in any test to edit it.</h6>
      <div
        className={`${styles.dashboardContainer} && ${styles.testCardsContainer}`}
      >
        <TestCard
          imageSrc="/tests_imgs/a-b-testing.jpg"
          testTitle="Test Name"
          testType="A/B Test"
          noTesters="100"
          deadline="16 Mar 2023"
          page="/tests/myTests/testDetail/01"
        />
        <TestCard
          imageSrc="/tests_imgs/a-b-testing.jpg"
          testTitle="Test Name"
          testType="A/B Test"
          noTesters="100"
          deadline="16 Mar 2023"
          page=""
        />
        <TestCard
          imageSrc="/tests_imgs/a-b-testing.jpg"
          testTitle="Test Name"
          testType="A/B Test"
          noTesters="100"
          deadline="16 Mar 2023"
          page=""
        />
        <TestCard
          imageSrc="/tests_imgs/a-b-testing.jpg"
          testTitle="Test Name"
          testType="A/B Test"
          noTesters="100"
          deadline="16 Mar 2023"
          page=""
        />
        <TestCard
          imageSrc="/tests_imgs/a-b-testing.jpg"
          testTitle="Test Name"
          testType="A/B Test"
          noTesters="100"
          deadline="16 Mar 2023"
          page=""
        />
        <TestCard
          imageSrc="/tests_imgs/a-b-testing.jpg"
          testTitle="Test Name"
          testType="A/B Test"
          noTesters="100"
          deadline="16 Mar 2023"
          page=""
        />
        <TestCard
          imageSrc="/tests_imgs/a-b-testing.jpg"
          testTitle="Test Name"
          testType="A/B Test"
          noTesters="100"
          deadline="16 Mar 2023"
          page=""
        />
        <TestCard
          imageSrc="/tests_imgs/a-b-testing.jpg"
          testTitle="Test Name"
          testType="A/B Test"
          noTesters="100"
          deadline="16 Mar 2023"
          page=""
        />
        <TestCard
          imageSrc="/tests_imgs/a-b-testing.jpg"
          testTitle="Test Name"
          testType="A/B Test"
          noTesters="100"
          deadline="16 Mar 2023"
          page=""
        />
      </div>
    </>
  );
};

const MyTestsTester = () => {
  return (
    <>
      <TestsSearch
        options={["Paid", "Payment Pending"]}
        filters={["Test Name", "Company", "Date", "Test Type"]}
      />
      <h1>Answered Tests</h1>
      <h6>Click in any test to review it.</h6>
      <div
        className={`${styles.dashboardContainer} && ${styles.testCardsContainer}`}
      >
        <TestCard
          imageSrc="/tests_imgs/a-b-testing.jpg"
          testTitle="Test Name"
          testType="A/B Test"
          noTesters="100"
          deadline="16 Mar 2023"
          page="/tests/myTests/testDetail/01"
          paymentAmount="5.99€"
        />
      </div>
    </>
  );
};

const MyTests = (props: PropsTestPage) => {
  return (
    <>
      <Head>
        <title>My Tests | Rocketest</title>
      </Head>
      <main>
        <TestsTopMenu isTester={!!props.type} />
        {/* Check User Type */}
        {props.type ? <MyTestsTester /> : <MyTestsUXResearcher />}
      </main>
    </>
  );
};

export default MyTests;
