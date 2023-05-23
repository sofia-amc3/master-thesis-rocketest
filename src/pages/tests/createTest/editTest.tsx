import React from "react";
import Head from "next/head";
import TestsTopMenu from "@/components/tests-components/TestsTopMenu";
import SearchBar from "@/components/SearchBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import TextInput from "@/components/input-components/TextInput";
import Button from "@/components/Button";
import OptionInput from "@/components/input-components/OptionInput";
import { useRouter } from "next/router";
import styles from "@/styles/app.module.css";
import TestContentsMenu from "@/components/create-test-components/TestContentsMenu";

const EditTest = () => {
  const router = useRouter();

  const goToTestDetailsPage = () => {
    router.push("/tests/createTest/testDetails");
  };

  const goToCreateTestPage = () => {
    router.push("/tests/createTest/");
  };

  return (
    <>
      <Head>
        <title>Edit Test | Rocketest</title>
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
          activePage
        />
        <h1>Edit Test</h1>
        <h4>A/B Test</h4>

        <h3>General</h3>
        <TextInput
          title="Name of the Test"
          placeholder="e.g. A/B Testing for [Name of Aplication]"
          mandatory
        />
        <TextInput
          title="Test Description"
          placeholder="e.g. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
          isTextarea
        />

        {/* Create Test Controls - Side Menu */}
        <TestContentsMenu isVisible={true} />

        <h3>Test Contents</h3>
        <h4>Section 01</h4>
        <TextInput title="Name of Section 01" placeholder="e.g. Section 01" />
        <TextInput
          title="Description of Section 01"
          placeholder="e.g. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
          isTextarea
        />

        <div
          onFocus={() => {
            console.log("focusing");
          }}
          onBlur={() => {
            console.log("leaving");
          }}
        >
          <TextInput
            title="Question 01"
            placeholder="e.g. Which of these do you prefer?"
            mandatory
          />
          <span className={styles.optionsText}>Options:</span>
          <OptionInput letter="A" mandatory />
          <OptionInput letter="B" mandatory plusIcon />
          <OptionInput letter="C" plusIcon trashIcon />
        </div>

        <TextInput
          title="Question 02"
          placeholder="e.g. Which of these do you prefer?"
          mandatory
        />
        <span className={styles.optionsText}>Options:</span>
        <OptionInput letter="A" mandatory />
        <OptionInput letter="B" mandatory plusIcon />

        <br />
        <br />
        <br />
        <br />
        <Button
          text="Back"
          type="secondary"
          size="large"
          function={goToCreateTestPage}
        />
        <Button
          text="Next"
          type="primary"
          size="large"
          function={goToTestDetailsPage}
        />
      </main>
    </>
  );
};

export default EditTest;
