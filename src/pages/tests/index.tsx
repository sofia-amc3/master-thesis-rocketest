import React, { useState } from "react";
import Head from "next/head";
import TestsTopMenu from "@/components/tests-components/TestsTopMenu";
import SearchBar from "@/components/SearchBar";
import styles from "@/styles/app.module.css";
import DashboardCard from "@/components/tests-components/DashboardCard";
import TestsSearch from "@/components/my-tests-components/TestsSearch";
import TestCard from "@/components/my-tests-components/TestCard";
import PagesSlider from "@/components/PagesSlider";
import { userAuth } from "@/utils/user";
import { MyTestsFilters } from "./myTests";

export interface PropsTestPage {
  auth: userAuth;
}

const OverviewUXResearcher = () => {
  return (
    <>
      <h1>Dashboard</h1>

      <div className={styles.dashboardContainer}>
        <DashboardCard
          two_col
          title="Number of Testers per Test"
          imageSrc=""
          page="/tests/myTests"
        />
        <DashboardCard
          oneAndHalf_col
          title="Latest Transactions"
          imageSrc=""
          page="/wallet"
        />
        <DashboardCard
          oneAndHalf_col
          title="On Going Tests"
          imageSrc=""
          page="/wallet"
        />
        <DashboardCard two_col title="Test Types" imageSrc="" page="/wallet" />
        <DashboardCard three_col title="Calendar" imageSrc="" page="/wallet" />
        <DashboardCard
          two_col
          title="Wallet Information"
          imageSrc=""
          page="/wallet"
        />
        <DashboardCard
          three_col
          title="Payment Activity"
          imageSrc=""
          page="/wallet"
        />
      </div>
    </>
  );
};

const OverviewTester = () => {
  const [testOptions, setTestOptions] = useState({
    // default values
    search: "",
    option: "In Progress",
    filter: "Name",
    sort: "ASC",
  } as MyTestsFilters);

  //update functions
  const updateOptions = (valueToUpdate: Partial<MyTestsFilters>) => {
    setTestOptions({
      ...testOptions,
      ...valueToUpdate,
    });
  };
  // // filters
  // useEffect(() => {
  //   if (originalTests.length > 0) {
  //     //SEARCH FILTER
  //     let result = originalTests.filter((testData) =>
  //       testData.testName.includes(testOptions.search)
  //     );

  //     //IN PROGRESS FILTER
  //     result = result.filter((testData) => {
  //       if (testOptions.option === "In Progress")
  //         return new Date(testData.testDeadline) > new Date();
  //       else return new Date(testData.testDeadline) <= new Date();
  //     });

  //     //SORT BY FILTER
  //     switch (testOptions.filter) {
  //       case "No. Testers":
  //         result = result.sort((nextValue, curValue) => {
  //           const a = nextValue.testersCount;
  //           const b = curValue.testersCount;

  //           if (testOptions.sort === "ASC") {
  //             if (a < b) return -1;
  //             if (a > b) return 1;
  //           } else if (testOptions.sort === "DESC") {
  //             if (a > b) return -1;
  //             if (a < b) return 1;
  //           }
  //           return 0;
  //         });
  //         break;
  //       case "Date":
  //         result = result.sort((nextValue, curValue) => {
  //           const a = new Date(nextValue.testDeadline);
  //           const b = new Date(curValue.testDeadline);

  //           if (testOptions.sort === "ASC") {
  //             if (a < b) return -1;
  //             if (a > b) return 1;
  //           } else if (testOptions.sort === "DESC") {
  //             if (a > b) return -1;
  //             if (a < b) return 1;
  //           }
  //           return 0;
  //         });
  //         break;
  //       case "Test Type":
  //         result = result.sort((nextValue, curValue) => {
  //           const a = nextValue.testType.toLowerCase();
  //           const b = curValue.testType.toLowerCase();

  //           if (testOptions.sort === "ASC") {
  //             if (a < b) return -1;
  //             if (a > b) return 1;
  //           } else if (testOptions.sort === "DESC") {
  //             if (a > b) return -1;
  //             if (a < b) return 1;
  //           }
  //           return 0;
  //         });
  //         break;

  //       default:
  //         // sort by name
  //         result = result.sort((nextValue, curValue) => {
  //           const a = nextValue.testName.toLowerCase();
  //           const b = curValue.testName.toLowerCase();

  //           if (testOptions.sort === "ASC") {
  //             if (a < b) return -1;
  //             if (a > b) return 1;
  //           } else if (testOptions.sort === "DESC") {
  //             if (a > b) return -1;
  //             if (a < b) return 1;
  //           }
  //           return 0;
  //         });
  //         break;
  //     }

  //     setTests(result);
  //   }
  // }, [testOptions, originalTests]);

  return (
    <>
      <h1>Dashboard</h1>

      <h2>Available Tests</h2>
      <br />
      <TestsSearch
        options={["All Tests", "Matched Criteria"]}
        filters={["Test Name", "Company", "Date", "Test Type"]}
        testOptions={testOptions}
        onChange={updateOptions}
      />

      <div
        className={`${styles.dashboardContainer} && ${styles.testCardsContainer}`}
      >
        <TestCard
          imageSrc="/tests_imgs/a-b-testing.jpg"
          testTitle="Test Name"
          testType="A/B Test"
          noTesters="100"
          deadline="16 Mar 2023"
          page="/tests/test/01"
          paymentAmount="5.99€"
        />
      </div>
      <PagesSlider
        currentPageNr={1}
        nextPageSrc=""
        totalPagesNr={10}
        previousPageSrc=""
        nextPageArrow
        previousPageArrow
      />
      <br />
      <br />
      <div className={styles.dashboardContainer}>
        <DashboardCard
          oneAndHalf_col
          title="Current Balance"
          imageSrc=""
          page="/wallet"
        />
        <DashboardCard
          oneAndHalf_col
          title="Latest Transactions"
          imageSrc=""
          page="/wallet"
        />
        <DashboardCard
          two_col
          title="Answered Tests"
          imageSrc=""
          page="/wallet"
        />
      </div>
    </>
  );
};

const Overview = (props: PropsTestPage) => {
  return (
    <>
      <Head>
        <title>Overview | Rocketest</title>
      </Head>
      <main>
        <TestsTopMenu isTester={!!props.auth?.type} />
        <SearchBar />
        {/* Check User Type */}
        {props.auth?.type ? <OverviewTester /> : <OverviewUXResearcher />}
      </main>
    </>
  );
};

export default Overview;
