import React from "react";
import Head from "next/head";
import TestsTopMenu from "@/components/tests-components/TestsTopMenu";
import SearchBar from "@/components/SearchBar";
import TestTemplateCard from "@/components/my-tests-components/TestTemplateCard";
import styles from "@/styles/app.module.css";

interface PropsExample {
  a: string;
  b: string;
  c?: string;
  d?: boolean;
}

const CreateTest = (props: PropsExample) => {
  return (
    <>
      <Head>
        <title>Create Test | Rocketest</title>
      </Head>
      <main>
        <TestsTopMenu></TestsTopMenu>
        <SearchBar />
        <h1>Choose a Test Template</h1>
        <h2>Content Testing</h2>
        <h6>Description</h6>

        <div
          className={`${styles.dashboardContainer} && ${styles.testCardsContainer}`}
        >
          <TestTemplateCard
            imageSrc="/tests_imgs/a-b-testing.jpg"
            testName="A/B Test"
            testDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            page="/tests/createTest/editTest"
          />
          <TestTemplateCard
            imageSrc="/tests_imgs/5-second-test.jpg"
            testName="5-Second Test"
            testDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            page=""
          />
          <TestTemplateCard
            imageSrc="/tests_imgs/first-click-test.jpg"
            testName="First-Click Test"
            testDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            page=""
          />
          <TestTemplateCard
            imageSrc="/tests_imgs/cognitive-walkthrough.jpg"
            testName="Cognitive Walkthrough"
            testDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            page=""
          />
          <TestTemplateCard
            imageSrc="/tests_imgs/eye-tracking.jpg"
            testName="Eye Tracking"
            testDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            page=""
          />
          <TestTemplateCard
            imageSrc="/tests_imgs/focus-groups.jpg"
            testName="Focus Groups"
            testDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            page=""
          />
          <TestTemplateCard
            imageSrc="/tests_imgs/affordances-grid.jpg"
            testName="Affordances Grid"
            testDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            page=""
          />
        </div>

        <h2>Surveys</h2>
        <h6>Description</h6>

        <div
          className={`${styles.dashboardContainer} && ${styles.testCardsContainer}`}
        >
          <TestTemplateCard
            imageSrc="/tests_imgs/feedback.jpg"
            testName="Feedback Survey"
            testDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            page=""
          />
          <TestTemplateCard
            imageSrc="/tests_imgs/sus.jpg"
            testName="System Usability Scale"
            testDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            page=""
          />
          <TestTemplateCard
            imageSrc="/tests_imgs/heuristic-evaluation.jpg"
            testName="Heuristic Evaluation"
            testDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            page=""
          />
          <TestTemplateCard
            imageSrc="/tests_imgs/ueq.jpg"
            testName="UX Questionnaire (UEQ)"
            testDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            page=""
          />
        </div>

        <h2>Information Architecture</h2>
        <h6>Description</h6>

        <div
          className={`${styles.dashboardContainer} && ${styles.testCardsContainer}`}
        >
          <TestTemplateCard
            imageSrc="/tests_imgs/card-sorting.jpg"
            testName="Card Sorting"
            testDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            page=""
          />
          <TestTemplateCard
            imageSrc="/tests_imgs/tree-testing.jpg"
            testName="Tree Test"
            testDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            page=""
          />
        </div>
      </main>
    </>
  );
};

export default CreateTest;
