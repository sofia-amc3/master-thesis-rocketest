import React, { useEffect, useState } from "react";
import Head from "next/head";
import TestsTopMenu from "@/components/tests-components/TestsTopMenu";
import TestsSearch from "@/components/my-tests-components/TestsSearch";
import TestCard from "@/components/my-tests-components/TestCard";
import styles from "@/styles/app.module.css";
import axios from "axios";
import { userAuth } from "@/utils/user";
import { useRouter } from "next/router";
import { PropsTestPage } from ".."; // Main props for wrapper MyTests
import Loading from "@/components/Loading";

export interface MyTestsFilters {
  search: string;
  option: string;
  filter: string;
  sort: string;
}

// info coming from db
export interface TestData {
  testId: number;
  testName: string;
  testType: string;
  testDeadline: string;
  testersCount: number; // for ux r. only
  testPayment: number;
  testCreator: string; // for tester only
}

// secondary Props
interface Props {
  auth: userAuth;
}

const MyTestsUXResearcher = (props: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [originalTests, setOriginalTests] = useState([] as TestData[]); // just for fallback to manage the information
  const [tests, setTests] = useState([] as TestData[]); // to show the information filtered from originalTests
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
  // filters
  useEffect(() => {
    if (originalTests.length > 0) {
      //SEARCH FILTER
      let result = originalTests.filter((testData) =>
        testData.testName
          .toLowerCase()
          .includes(testOptions.search.toLowerCase())
      );

      //IN PROGRESS FILTER
      result = result.filter((testData) => {
        if (testOptions.option === "In Progress")
          return new Date(testData.testDeadline) > new Date();
        else return new Date(testData.testDeadline) <= new Date();
      });

      //SORT BY FILTER
      switch (testOptions.filter) {
        case "No. Testers":
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

  //on loading page functions
  const showTests = async () => {
    const params = {
      userId: props.auth?.id,
    };

    await axios
      .get("/api/tests/myTests/myTestsUxResearcher", { params })
      .then(async (res) => {
        setOriginalTests(res.data);
      })
      .catch((error) => {
        if (error.response?.data?.message) {
          alert(error.response.data.message); // specific error messages
        } else {
          alert(JSON.stringify(error.response.data)); // default error message
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
      <TestsSearch
        options={["In Progress", "Finished"]}
        filters={["Name", "No. Testers", "Date", "Test Type"]}
        testOptions={testOptions}
        onChange={updateOptions}
      />
      <h1>{testOptions.option}</h1>
      <h6>Click in any test to edit it.</h6>
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
              noTesters={testData.testersCount.toString()}
              deadline={new Date(testData.testDeadline).toLocaleDateString(
                "en-us",
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }
              )}
              page={`/tests/myTests/testDetail/${testData.testId}`}
            />
          ))
        ) : (
          <span className={styles.noTestsAvailable}>No tests available.</span>
        )}
      </div>
    </>
  );
};

const MyTestsTester = (props: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [originalTests, setOriginalTests] = useState([] as TestData[]); // just for fallback to manage the information
  const [tests, setTests] = useState([] as TestData[]); // to show the information filtered from originalTests

  const [testOptions, setTestOptions] = useState({
    // default values
    search: "",
    option: "Paid",
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
        testData.testName
          .toLowerCase()
          .includes(testOptions.search.toLowerCase())
      );

      //PAID FILTER
      result = result.filter(() => {
        if (testOptions.option === "Payment Pending") return 0;
        else return 1;
      });

      //SORT BY FILTER
      switch (testOptions.filter) {
        case "Test Creator":
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
          // sort by test name
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
    };

    await axios
      .get("/api/tests/myTests/myTestsTester", { params })
      .then(async (res) => {
        setOriginalTests(res.data);
      })
      .catch((error) => {
        if (error.response?.data?.message) {
          alert(error.response.data.message); // specific error messages
        } else {
          alert(JSON.stringify(error.response.data)); // default error message
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
      <TestsSearch
        options={["Paid", "Payment Pending"]} // as we are not dealing with payments in this stage, we assume all tests have been paid
        filters={["Test Name", "Test Creator", "Date", "Test Type"]}
        testOptions={testOptions}
        onChange={updateOptions}
      />
      <h1>Answered Tests</h1>
      <h6>Click in any test to review it.</h6>
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
              page={`/tests/myTests/testDetail/${testData.testId}`}
              paymentAmount={`${testData.testPayment}$`}
            />
          ))
        ) : (
          <span className={styles.noTestsAvailable}>No tests available.</span>
        )}
      </div>
    </>
  );
};

const MyTests = (props: PropsTestPage) => {
  return (
    <>
      <Head>
        <title>My Tests | Rocketest</title>
      </Head>
      <main>
        <TestsTopMenu isTester={!!props.auth.type} />
        {props.auth.type ? (
          <MyTestsTester auth={props.auth} />
        ) : (
          <MyTestsUXResearcher auth={props.auth} />
        )}
      </main>
    </>
  );
};

export default MyTests;
