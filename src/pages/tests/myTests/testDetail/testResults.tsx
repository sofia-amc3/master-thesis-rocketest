import React from "react";
import { Chart } from "react-google-charts";
import Head from "next/head";
import TestsTopMenu from "@/components/tests-components/TestsTopMenu";
import SearchBar from "@/components/SearchBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import styles from "@/styles/app.module.css";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import Image from "next/image";

const TestResults = () => {
  const router = useRouter();

  const downloadResults = () => {
    // download results
    console.log("Results Download");
  };

  const goBack = () => {
    router.back();
  };

  const data = [
    ["Options", "Number of Answers"],
    ["Option A", 11],
    ["Option B", 2],
    ["Option C", 2],
    ["Option D", 7],
  ];

  const options = {
    title: "Question 01",
  };

  return (
    <>
      <Head>
        <title>My Tests - Test Results | Rocketest</title>
      </Head>
      <main>
        <TestsTopMenu />
        <SearchBar />
        <Breadcrumbs link="/tests/myTests" pageName="My Tests" imageAppears />
        <Breadcrumbs
          link="/tests/myTests/testDetail"
          pageName="Test Name"
          imageAppears
        />
        <Breadcrumbs link="" pageName="Test Results" activePage />
        <h1>Test Results</h1>
        <div className={styles.noTestersContainer}>
          <Image
            src="/icons/test-testersNumber.svg"
            alt="Testers Icon"
            width={17}
            height={17}
          />
          <span>Testers Number</span>
        </div>

        <div className={styles.pieChartsContainer}>
          <Chart chartType="PieChart" data={data} options={options} />
          <Chart chartType="PieChart" data={data} options={options} />
          <Chart chartType="PieChart" data={data} options={options} />
          <Chart chartType="PieChart" data={data} options={options} />
          <Chart chartType="PieChart" data={data} options={options} />
          <Chart chartType="PieChart" data={data} options={options} />
        </div>

        <Button text="Back" size="large" type="secondary" function={goBack} />
        <Button
          text="Export Results"
          size="large"
          type="primary"
          function={downloadResults}
        />
      </main>
    </>
  );
};

export default TestResults;
