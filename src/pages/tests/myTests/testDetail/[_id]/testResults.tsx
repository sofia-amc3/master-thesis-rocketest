import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import Head from "next/head";
import TestsTopMenu from "@/components/tests-components/TestsTopMenu";
import SearchBar from "@/components/SearchBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import styles from "@/styles/app.module.css";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { testResultsResponse } from "@/pages/api/tests/myTests/testDetail/getTestResultsUxResearcher";
import Loading from "@/components/Loading";
import { CSVLink } from "react-csv";

const TestResults = () => {
  const router = useRouter();
  const { _id } = router.query; // access the test ID from the URL parameter

  const [loading, setLoading] = useState(true);
  const [testResults, setTestResults] = useState({} as testResultsResponse);

  const goBack = () => {
    router.back();
  };

  const getTestResults = async () => {
    const params = {
      testId: _id,
    };

    await axios
      .get("/api/tests/myTests/testDetail/getTestResultsUxResearcher", {
        params,
      })
      .then(async (res) => {
        setTestResults(res.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          alert(error.response.data); // specific error messages
        } else {
          alert(error.message); // default error message
        }
        router.push("/tests/myTests/");
      });
  };

  useEffect(() => {
    setLoading(true);
    if (router.isReady) {
      getTestResults();
    }
  }, [router]);

  return loading ? (
    <Loading />
  ) : (
    <>
      <Head>
        <title>My Tests - Test Results | Rocketest</title>
      </Head>
      <main>
        <TestsTopMenu />
        <SearchBar />
        <Breadcrumbs link="/tests/myTests" pageName="My Tests" imageAppears />
        <Breadcrumbs
          link={`/tests/myTests/testDetail/${testResults.testId}`}
          pageName={testResults.testName}
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
          <span>Number of Testers: {testResults.testersCount}</span>
        </div>
        {testResults.success ? (
          <>
            <div className={styles.pieChartsContainer}>
              {testResults.questions?.map((q, key) => {
                const resultsData = [["Options", "Number of Answers"]] as [
                  string,
                  string | number
                ][];

                q.options.forEach((opts) => {
                  resultsData.push([opts.optionName, opts.answerCount]);
                });

                return (
                  <Chart
                    key={key}
                    chartType="PieChart"
                    data={resultsData}
                    options={{
                      title: q.questionName,
                    }}
                    className={styles.pieChart}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <>
            <br />
            <br />
            <span>There are no questions available.</span>
            <br />
            <br />
          </>
        )}

        <Button text="Back" size="large" type="secondary" function={goBack} />
        {testResults.success && (
          <CSVLink
            data={testResults.rawData}
            filename={`ExportedResultsForTest.csv`}
          >
            <Button text="Export Results" size="large" type="primary" />
          </CSVLink>
        )}
      </main>
    </>
  );
};

export default TestResults;
