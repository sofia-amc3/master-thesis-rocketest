import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
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

const TestDetailUXResearcher = () => {
  const router = useRouter();

  const goToFindTestersPage = () => {
    router.push("/tests/myTests/testDetail/findTesters");
  };

  const goToTestResultsPage = () => {
    router.push("/tests/myTests/testDetail/testResults");
  };

  return (
    <>
      <TestsTopMenu />
      <SearchBar />
      <Breadcrumbs link="/tests/myTests" pageName="My Tests" imageAppears />
      <Breadcrumbs link="" pageName="Test Name" activePage />
      <div className={styles.testDetailContainer}>
        <div className={styles.testDetailLeftContainer}>
          <div className={styles.testDetailTitle}>
            <h1>Name of Test</h1>
            <Link href="">
              <Image
                src="/icons/trash.svg"
                alt="Delete Test Icon"
                width={25}
                height={25}
              />
            </Link>
          </div>
          <div className={styles.testImgContainer}>
            <img src="/tests_imgs/a-b-testing.jpg" alt="Test Image" />
          </div>
          <h2>Test&apos;s Link</h2>
          <a href="">http://www.test-link.com/lorem-ipsum/</a>

          <Button text="Copy Link" size="medium" type="tertiary" />
          <Button text="Share" size="medium" type="tertiary" />
          <h2>Test&apos;s Information</h2>
          <div className={styles.smallInfoContainer}>
            <SmallInfo
              iconSrc="/icons/test-information.svg"
              iconWidth={24}
              text="A/B Test"
            />
            <SmallInfo
              iconSrc="/icons/test-testersNumber.svg"
              iconWidth={24}
              text="100 testers"
            />
          </div>
          <div className={styles.smallInfoContainer}>
            <SmallInfo
              iconSrc="/icons/test-calendar.svg"
              iconWidth={24}
              text="Ends in 16 Mar 2023"
            />
            <SmallInfo
              iconSrc="/icons/money-spent.svg"
              iconWidth={24}
              text="500$ spent"
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
            previousPageSrc=""
            currentPageNr={10}
            totalPagesNr={50}
            nextPageSrc=""
            nextPageArrow
          />
        </div>
      </div>
    </>
  );
};

const TestDetailTester = () => {
  const router = useRouter();
  const { _id } = router.query;

  const goToMyTestsPage = () => {
    router.push("/tests/myTests/");
  };

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
            answer: "Option A",
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
            answer: "Option B",
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
            answer: "Option B",
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
            answer: "Option C",
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
      <TestsTopMenu isTester />
      <SearchBar />
      <Breadcrumbs link="/tests/myTests" pageName="My Tests" imageAppears />
      <Breadcrumbs link="" pageName="Test Name" activePage />

      {/* Return Test with Answers Here */}
      <Test testData={objectExample} />

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

const TestDetail = () => {
  return (
    <>
      <Head>
        <title>My Tests - Test Detail | Rocketest</title>
      </Head>
      <main>
        {/* Check User Type */}
        {/* <TestDetailUXResearcher /> */}
        <TestDetailTester />
      </main>
    </>
  );
};

export default TestDetail;
