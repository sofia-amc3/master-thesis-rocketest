import React from "react";
import Head from "next/head";
import TestsTopMenu from "@/components/tests-components/TestsTopMenu";
import TestsSearch from "@/components/my-tests-components/TestsSearch";
import TestCard from "@/components/my-tests-components/TestCard";
import styles from "@/styles/app.module.css";

interface PropsExample {
  title: string;
  subtitle: string;
}

const MyTests = (props: PropsExample) => {
  return (
    <>
      <Head>
        <title>My Tests | Rocketest</title>
      </Head>
      <main>
        <TestsTopMenu />
        <TestsSearch />
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
          <TestCard
            imageSrc="/tests_imgs/a-b-testing.jpg"
            testTitle="Test Name"
            testType="A/B Test"
            noTesters="100"
            deadline="16 Mar 2023"
            page=""
          />
        </div>
      </main>
    </>
  );
};

export default MyTests;
