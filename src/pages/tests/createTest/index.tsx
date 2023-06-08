import React from "react";
import Head from "next/head";
import TestsTopMenu from "@/components/tests-components/TestsTopMenu";
import SearchBar from "@/components/SearchBar";
import TestTemplateCard from "@/components/create-test-components/TestTemplateCard";
import styles from "@/styles/app.module.css";

const CreateTest = () => {
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
        <h6 className={styles.testCategoryDescription}>
          Content Testing is a category of usability testing that focuses on
          evaluating the effectiveness, clarity, and impact of the content
          within a design or interface. It aims to ensure that the content meets
          user needs, engages users, and communicates information effectively,
          ultimately enhancing the user experience.
        </h6>

        <div
          className={`${styles.dashboardContainer} && ${styles.testCardsContainer}`}
        >
          <TestTemplateCard
            imageSrc="/tests_imgs/a-b-testing.jpg"
            testName="A/B Test"
            testDescription=" Compares two (A and B) or more versions of a design to determine which performs better."
            page="/tests/createTest/editTest?type=A%2FB"
          />
          <TestTemplateCard
            imageSrc="/tests_imgs/5-second-test.jpg"
            testName="5-Second Test"
            testDescription="Measures a user's first impression of a design by showing it for only 5 seconds."
            page=""
            disabled
          />
          <TestTemplateCard
            imageSrc="/tests_imgs/first-click-test.jpg"
            testName="First-Click Test"
            testDescription="Evaluates the effectiveness of a design's navigation by observing the user's first click."
            page=""
            disabled
          />
          <TestTemplateCard
            imageSrc="/tests_imgs/cognitive-walkthrough.jpg"
            testName="Cognitive Walkthrough"
            testDescription="Simulates user thinking to assess the usability of a design's tasks and actions."
            page=""
            disabled
          />
          <TestTemplateCard
            imageSrc="/tests_imgs/eye-tracking.jpg"
            testName="Eye Tracking"
            testDescription="Tracks eye movements to understand where users focus their attention on a design."
            page=""
            disabled
          />
          <TestTemplateCard
            imageSrc="/tests_imgs/focus-groups.jpg"
            testName="Focus Groups"
            testDescription="Brings together a group of participants to gather their opinions, feedback, and insights."
            page=""
            disabled
          />
          <TestTemplateCard
            imageSrc="/tests_imgs/affordances-grid.jpg"
            testName="Affordances Grid"
            testDescription="Analyzes the perceived affordances (potential actions) of elements within a design."
            page=""
            disabled
          />
        </div>

        <h2>Surveys</h2>
        <h6 className={styles.testCategoryDescription}>
          Surveys in usability testing involve gathering user feedback and
          perceptions through structured questionnaires, allowing for
          quantitative and qualitative insights into the user experience. They
          provide a systematic approach to assess various aspects of usability,
          satisfaction, and overall user perception.
        </h6>

        <div
          className={`${styles.dashboardContainer} && ${styles.testCardsContainer}`}
        >
          <TestTemplateCard
            imageSrc="/tests_imgs/feedback.jpg"
            testName="Feedback Survey"
            testDescription="Collecting user feedback through structured questionnaires to gather insights on the user experience."
            page=""
            disabled
          />
          <TestTemplateCard
            imageSrc="/tests_imgs/sus.jpg"
            testName="System Usability Scale"
            testDescription="A standardized questionnaire used to measure the perceived usability of a system or product, allowing for a quantitative evaluation."
            page=""
            disabled
          />
          <TestTemplateCard
            imageSrc="/tests_imgs/heuristic-evaluation.jpg"
            testName="Heuristic Evaluation"
            testDescription="Expert evaluation method where usability experts assess a system based on predefined usability principles."
            page=""
            disabled
          />
          <TestTemplateCard
            imageSrc="/tests_imgs/ueq.jpg"
            testName="UX Questionnaire (UEQ)"
            testDescription="A survey-based method to measure UX by evaluating key factors like attractiveness, perspicuity, and efficiency."
            page=""
            disabled
          />
        </div>

        <h2>Information Architecture</h2>
        <h6 className={styles.testCategoryDescription}>
          Information Architecture is the practice of organizing and structuring
          information to enhance usability and findability, ensuring that users
          can navigate and locate content efficiently within a system or
          website.
        </h6>

        <div
          className={`${styles.dashboardContainer} && ${styles.testCardsContainer}`}
        >
          <TestTemplateCard
            imageSrc="/tests_imgs/card-sorting.jpg"
            testName="Card Sorting"
            testDescription="A method for organizing and categorizing information by allowing users to group related items together based on their mental models."
            page=""
            disabled
          />
          <TestTemplateCard
            imageSrc="/tests_imgs/tree-testing.jpg"
            testName="Tree Test"
            testDescription="Evaluates the findability and navigational structure of a website by asking participants to complete specific tasks within a hierarchical tree structure."
            page=""
            disabled
          />
        </div>
      </main>
    </>
  );
};

export default CreateTest;
