import React from "react";
import Head from "next/head";
import TestsTopMenu from "@/components/tests-components/TestsTopMenu";
import SearchBar from "@/components/SearchBar";
import styles from "@/styles/app.module.css";
import DashboardCard from "@/components/tests-components/DashboardCard";
import Link from "next/link";

interface PropsExample {
  a: string;
  b: string;
  c?: string;
  d?: boolean;
}

const Overview = (props: PropsExample) => {
  return (
    <>
      <Head>
        <title>Overview | Rocketest</title>
      </Head>
      <main>
        <TestsTopMenu />
        <SearchBar />
        <h1>Dashboard</h1>

        {/* TEMP */}
        <br />
        <Link href={"/tests/testPage"}>TEST EXAMPLE (Tester Only)</Link>

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
          <DashboardCard
            two_col
            title="Test Types"
            imageSrc=""
            page="/wallet"
          />
          <DashboardCard
            three_col
            title="Calendar"
            imageSrc=""
            page="/wallet"
          />
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
      </main>
    </>
  );
};

export default Overview;
