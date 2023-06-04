import React, { useEffect, useState } from "react";
import Head from "next/head";
import TestsTopMenu from "@/components/tests-components/TestsTopMenu";
import styles from "@/styles/app.module.css";
import TestsSearch from "@/components/my-tests-components/TestsSearch";
import TestCard from "@/components/my-tests-components/TestCard";
import PagesSlider from "@/components/PagesSlider";
import { userAuth } from "@/utils/user";
import { MyTestsFilters, TestData } from "./myTests";
import PageTemplate from "@/components/PageTemplate";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import axios from "axios";

export interface PropsTestPage {
  auth: userAuth;
}

// secondary Props
interface Props {
  auth: userAuth;
  matchCriteria: boolean;
}

const OverviewUXResearcher = () => {
  return (
    <PageTemplate imgSrc="page_templates/overview-uxrsc.png" isDashboard />
  );
};

const OverviewTester = (props: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [originalTests, setOriginalTests] = useState([] as TestData[]); // just for fallback to manage the information
  const [tests, setTests] = useState([] as TestData[]); // to show the information filtered from originalTests

  const [testOptions, setTestOptions] = useState({
    // default values
    search: "",
    option: "All Tests",
    filter: "Test Name",
    sort: "ASC",
  } as MyTestsFilters);

  //update functions
  const updateOptions = (valueToUpdate: Partial<MyTestsFilters>) => {
    setTestOptions({
      ...testOptions,
      ...valueToUpdate,
    });
  };

  // filters
  useEffect(() => {
    if (originalTests.length > 0) {
      //SEARCH FILTER
      let result = originalTests.filter((testData) =>
        testData.testName.includes(testOptions.search)
      );

      //ALL TESTS/MATCHED CRITERIA FILTER
      result = result.filter(() => {
        if (testOptions.option === "All Tests") return !props.matchCriteria;
        else props.matchCriteria;
      });

      //SORT BY FILTER
      switch (testOptions.filter) {
        case "Test Creator":
          result = result.sort((nextValue, curValue) => {
            const a = nextValue.testersCount;
            const b = curValue.testersCount;

            if (testOptions.sort === "ASC") {
              if (a < b) return -1;
              if (a > b) return 1;
            } else if (testOptions.sort === "DESC") {
              if (a > b) return -1;
              if (a < b) return 1;
            }
            return 0;
          });
          break;
        case "Date":
          result = result.sort((nextValue, curValue) => {
            const a = new Date(nextValue.testDeadline);
            const b = new Date(curValue.testDeadline);

            if (testOptions.sort === "ASC") {
              if (a < b) return -1;
              if (a > b) return 1;
            } else if (testOptions.sort === "DESC") {
              if (a > b) return -1;
              if (a < b) return 1;
            }
            return 0;
          });
          break;
        case "Test Type":
          result = result.sort((nextValue, curValue) => {
            const a = nextValue.testType.toLowerCase();
            const b = curValue.testType.toLowerCase();

            if (testOptions.sort === "ASC") {
              if (a < b) return -1;
              if (a > b) return 1;
            } else if (testOptions.sort === "DESC") {
              if (a > b) return -1;
              if (a < b) return 1;
            }
            return 0;
          });
          break;

        default:
          // sort by name
          result = result.sort((nextValue, curValue) => {
            const a = nextValue.testName.toLowerCase();
            const b = curValue.testName.toLowerCase();

            if (testOptions.sort === "ASC") {
              if (a < b) return -1;
              if (a > b) return 1;
            } else if (testOptions.sort === "DESC") {
              if (a > b) return -1;
              if (a < b) return 1;
            }
            return 0;
          });
          break;
      }

      setTests(result);
    }
  }, [testOptions, originalTests]);

  // on loading page functions
  const showTests = async () => {
    const params = {
      userId: props.auth?.id,
      matchCriteria: props.matchCriteria,
    };

    await axios
      .get("/api/tests/overviewTester", { params })
      .then(async (res) => {
        setOriginalTests(res.data);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          alert(error.response.data); // specific error messages
        } else {
          alert(error.message); // default error message
        }
      });

    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    if (router.isReady) {
      showTests();
    }
  }, [router]);

  return loading ? (
    <Loading />
  ) : (
    <>
      <PageTemplate imgSrc="page_templates/overview-tester.png" isDashboard />

      <div className={styles.toTop}>
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
          {tests.length > 0 ? (
            tests.map((testData, key) => (
              <TestCard
                key={key}
                imageSrc="/tests_imgs/a-b-testing.jpg"
                testTitle={testData.testName}
                testType={testData.testType}
                company={testData.testCreator}
                deadline={new Date(testData.testDeadline).toLocaleDateString(
                  "en-us",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                )}
                page={`/test/${testData.id}`}
                paymentAmount={`${testData.testPayment}€`}
              />
            ))
          ) : (
            <span className={styles.noTestsAvailable}>No tests available.</span>
          )}
        </div>
        <PagesSlider
          currentPageNr={1}
          nextPageSrc=""
          totalPagesNr={10}
          previousPageSrc=""
          nextPageArrow
          previousPageArrow
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
        {/* Check User Type */}
        {props.auth?.type ? (
          <OverviewTester auth={props.auth} />
        ) : (
          <OverviewUXResearcher />
        )}
      </main>
    </>
  );
};

export default Overview;
