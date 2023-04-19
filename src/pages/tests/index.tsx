import React from "react";
import Head from "next/head";
import TestsTopMenu from "@/components/tests-components/TestsTopMenu";
import SearchBar from "@/components/SearchBar";
import styles from "@/styles/app.module.css";
import DashboardCard from "@/components/tests-components/DashboardCard";
import Link from "next/link";
import TestsSearch from "@/components/my-tests-components/TestsSearch";
import TestCard from "@/components/my-tests-components/TestCard";
import PagesSlider from "@/components/PagesSlider";

interface PropsExample {
  a: string;
  b: string;
  c?: string;
  d?: boolean;
}

const OverviewUXResearcher = () => {
  return (
    <>
      <TestsTopMenu />
      <SearchBar />
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
  return (
    <>
      <TestsTopMenu isTester />
      <SearchBar />
      <h1>Dashboard</h1>

      <h2>Available Tests</h2>
      <br />
      <TestsSearch
        options={["All Tests", "Matched Criteria"]}
        filters={["Test Name", "Company", "Date", "Test Type"]}
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

const Overview = (props: PropsExample) => {
  return (
    <>
      <Head>
        <title>Overview | Rocketest</title>
      </Head>
      <main>
        {/* Check User Type */}
        {/* <OverviewUXResearcher /> */}
        <OverviewTester />
      </main>
    </>
  );
};

export default Overview;
