import React from "react";
import Head from "next/head";
import TestsTopMenu from "@/components/tests-components/TestsTopMenu";
import SearchBar from "@/components/SearchBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import styles from "@/styles/app.module.css";

interface PropsExample {
  title: string;
  subtitle: string;
}

const TestResults = (props: PropsExample) => {
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
      </main>
    </>
  );
};

export default TestResults;
