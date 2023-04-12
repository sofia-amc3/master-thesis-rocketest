import React from "react";
import Head from "next/head";
import TestsTopMenu from "@/components/tests-components/TestsTopMenu";
import Breadcrumbs from "@/components/Breadcrumbs";
import TextInput from "@/components/input-components/TextInput";
import TestersSearch from "@/components/find-testers-components/TestersSearch";
import TestersCheckboxCard from "@/components/find-testers-components/TesterCheckboxCard";
import Button from "@/components/Button";
import PagesSlider from "@/components/PagesSlider";
import { useRouter } from "next/router";
import styles from "@/styles/app.module.css";

interface PropsExample {
  title: string;
  subtitle: string;
}

const FindTesters = (props: PropsExample) => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>My Tests - Find Testers | Rocketest</title>
      </Head>
      <main className={styles.findTestersMain}>
        <TestsTopMenu />
        <Breadcrumbs link="/tests/myTests" pageName="My Tests" imageAppears />
        <Breadcrumbs
          link="/tests/myTests/testDetail"
          pageName="Test Name"
          imageAppears
        />
        <Breadcrumbs link="" pageName="Find Testers" activePage />

        <h1>Name of Test</h1>
        <h6>Find testers using an external platform.</h6>

        <div className={styles.findTestersSearch}>
          <TextInput
            title="Select the Platform"
            placeholder=""
            size="small"
            isSelect
            option1="LinkedIn"
            option2="Facebook"
            option3="Instagram"
          />
          <Button text="Search" size="small" type="tertiary" />
        </div>

        {/* Only appears after search */}
        <span className={styles.labelSpan}>
          We found the following results:
        </span>
        <TestersSearch />

        <div className={styles.testersResultsContainer}>
          <TestersCheckboxCard
            userImgSrc="/userExamples/user--05.svg"
            userName="Name of Person"
            description="Job Title"
            userProfileLink="https://www.linkedin.com/in/sofiaamc3/"
          />
          <TestersCheckboxCard
            userImgSrc="/userExamples/user--05.svg"
            userName="Name of Person"
            description="Job Title"
            userProfileLink=""
          />
          <TestersCheckboxCard
            userImgSrc="/userExamples/user--05.svg"
            userName="Name of Person"
            description="Job Title"
            userProfileLink=""
          />
          <TestersCheckboxCard
            userImgSrc="/userExamples/user--05.svg"
            userName="Name of Person"
            description="Job Title"
            userProfileLink=""
          />
          <TestersCheckboxCard
            userImgSrc="/userExamples/user--05.svg"
            userName="Name of Person"
            description="Job Title"
            userProfileLink=""
          />
          <TestersCheckboxCard
            userImgSrc="/userExamples/user--05.svg"
            userName="Name of Person"
            description="Job Title"
            userProfileLink=""
            wasContacted
          />
        </div>

        <PagesSlider
          currentPageNr={10}
          totalPagesNr={50}
          nextPageArrow
          previousPageArrow
          nextPageSrc=""
          previousPageSrc=""
        />

        <div className={styles.findTestersMsg}>
          <TextInput
            title="Send a message to the selected testers:"
            placeholder="e.g. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
            size="small"
            isTextarea
          />
          <Button text="Send Message" size="medium" type="tertiary" />
        </div>

        <Button text="Back" size="large" type="secondary" function={goBack} />
        <Button text="Clear Search" size="large" type="primary" />
      </main>
    </>
  );
};

export default FindTesters;
