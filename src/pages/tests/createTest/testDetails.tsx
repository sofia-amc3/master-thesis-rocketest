import Head from "next/head";
import Button from "@/components/Button";
import TextInput from "@/components/input-components/TextInput";
import TestsTopMenu from "@/components/tests-components/TestsTopMenu";
import SearchBar from "@/components/SearchBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import styles from "@/styles/app.module.css";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Select from "react-select";
import { HobbiesList } from "@/utils/hobbies";
import { CareersList } from "@/utils/careers";

export interface OptionList {
  value: string;
  label: string;
}

const TestDetails = () => {
  const [selectedOption, setSelectedOption] = useState<
    null | readonly OptionList[]
  >(null);
  const router = useRouter();

  const goToEditTestPage = () => {
    router.push("/tests/createTest/editTest");
  };

  const saveTest = () => {
    // Save Test & Go To Test Details
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

            <div className={styles.doubleInputContainer}>
              <TextInput
                title="Gender"
                placeholder=""
                isSelect
                options={["Female", "Male", "Other"]}
                size="small"
                onChange={(e) => {
                  console.log("gender", e.target.value);
                }}
              />
              <TextInput
                title="Location"
                placeholder="e.g. Porto, Portugal"
                size="small"
                onChange={(e) => {
                  console.log("Location", e.target.value);
                }}
              />
            </div>

            {/* Career - Multiselect Component */}
            <span className={styles.inputLabel}>Career</span>
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={CareersList}
              isMulti
            />

            {/* Personal Interests - Multiselect Component */}
            <span className={styles.inputLabel}>Hobbies</span>
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={HobbiesList}
              isMulti
            />

            {/* Digital Savviness - Checkboxes Input Component */}
          </div>

          <div className={styles.rightSide}>
            <h2>Test&apos;s Information</h2>
            <div className={styles.doubleInputContainer}>
              <TextInput
                title="Deadline"
                placeholder=""
                size="small"
                type="date"
                mandatory
              />
              <TextInput title="Time" placeholder="" size="small" type="time" />
            </div>

            <div className={styles.doubleInputContainer}>
              <TextInput
                title="Incentive"
                placeholder=""
                size="small"
                type="date"
                isSelect
                options={["Money Transfer", "Amazon Voucher"]}
              />
              <TextInput
                title="Amount (€)"
                placeholder="e.g. 25"
                size="small"
                type="number"
              />
            </div>

            {/* Privacy - Ratio Buttons Input Component */}

            <Button
              text="Back"
              size="large"
              type="secondary"
              function={goToEditTestPage}
            />
            <Button
              text="Save"
              size="large"
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
