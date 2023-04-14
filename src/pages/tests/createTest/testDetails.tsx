import React from "react";
import Head from "next/head";
import Image from "next/image";
import Button from "@/components/Button";
import TextInput from "@/components/input-components/TextInput";
import TestsTopMenu from "@/components/tests-components/TestsTopMenu";
import SearchBar from "@/components/SearchBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import styles from "@/styles/app.module.css";
import { useRouter } from "next/router";

const TestDetails = () => {
  const router = useRouter();

  const goToEditTestPage = () => {
    router.push("/tests/createTest/editTest");
  };

  const saveTest = () => {
    // Save Test & go to Test Details
    router.push("/tests/myTests/testDetail");
  };

  return (
    <>
      <Head>
        <title>Test Details | Rocketest</title>
      </Head>
      <main>
        <TestsTopMenu></TestsTopMenu>
        <SearchBar />
        <Breadcrumbs
          link="/tests/createTest"
          pageName="Choose Template"
          imageAppears
        />
        <Breadcrumbs
          link="/tests/createTest/editTest"
          pageName="Edit Test"
          imageAppears
        />
        <Breadcrumbs
          link="/tests/createTest/testDetails"
          pageName="Test Details"
          activePage
        />
        <h1>Test Details</h1>

        <div className={styles.testDetailsContainer}>
          <div className={styles.leftSide}>
            <h2>Testers&apos; Criteria</h2>
            <img
              src="/icons/test-information.svg"
              alt="Information Icon"
              title="Info Here"
              className={styles.infoIcon}
            />

            {/* Age Range - Input Range Component */}

            <TextInput
              title="Gender"
              placeholder=""
              isSelect
              option1="Female"
              option2="Male"
              option3="Other"
              size="small"
            />
            <TextInput
              title="Location"
              placeholder="e.g. Porto, Portugal"
              size="small"
            />
            <TextInput
              title="Career"
              placeholder="e.g. Software Engineer"
              size="small"
            />

            {/* Personal Interests - Multiselect Component */}

            {/* Digital Savviness - Ratio Buttons Input Component */}
          </div>

          <div className={styles.rightSide}>
            <h2>Test&apos;s Information</h2>
            {/* Double Input Deadline */}
            {/* Double Input Incentive */}
            {/* Privacy - Ratio Buttons Input Component */}

            <Button
              text="Back"
              size="medium"
              type="secondary"
              function={goToEditTestPage}
            />
            <Button
              text="Save"
              size="medium"
              type="primary"
              function={saveTest}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default TestDetails;
