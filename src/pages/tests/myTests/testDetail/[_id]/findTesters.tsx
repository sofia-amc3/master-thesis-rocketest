import React, { useEffect, useState } from "react";
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
import { TestData } from "../..";
import { userAuth } from "@/utils/user";
import axios from "axios";
import Loading from "@/components/Loading";

interface Props {
  auth?: userAuth;
}

const FindTesters = (props: Props) => {
  const router = useRouter();
  const { _id } = router.query; // access the test ID from the URL parameter
  const [loading, setLoading] = useState(true);
  const [testData, setTestData] = useState({} as TestData);

  const goBack = () => {
    router.back();
  };

  const showTestDetail = async () => {
    const params = {
      userId: props.auth?.id,
      testId: _id,
    };

    await axios
      .get("/api/tests/testDetailUxResearcher", { params })
      .then(async (res) => {
        if (res.data.length === 1) {
          setTestData(res.data[0]);
          setLoading(false);
        } else {
          alert("There is no test available.");
          router.push("/tests/myTests/");
        }
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
      showTestDetail();
    }
  }, [router]);

  return loading ? (
    <Loading />
  ) : (
    <>
      <Head>
        <title>My Tests - Find Testers | Rocketest</title>
      </Head>
      <main className={styles.findTestersMain}>
        <TestsTopMenu />
        <Breadcrumbs link="/tests/myTests/" pageName="My Tests" imageAppears />
        <Breadcrumbs
          link={`/tests/myTests/testDetail/${_id}`}
          pageName={testData.testName}
          imageAppears
        />
        <Breadcrumbs link="" pageName="Find Testers" activePage />

        <h1>{testData.testName}</h1>
        <h6>Find testers using an external platform.</h6>

        <div className={styles.findTestersSearch}>
          <TextInput
            title="Select the Platform"
            placeholder=""
            size="small"
            isSelect
            options={["Custom API", "LinkedIn", "Facebook", "Instagram"]}
            onChange={(e) => console.log(e)}
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
          nextPageFunction={() => {}}
          previousPageFunction={() => {}}
        />

        <div className={styles.findTestersMsg}>
          <TextInput
            title="Send a message to the selected testers:"
            placeholder="e.g. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
            size="small"
            isTextarea
            onChange={(e) => console.log(e)}
          />
          <img
            src="/icons/test-information.svg"
            alt="Information Icon"
            title="Ensure that the usability testing method is easily understood by the participants: they will have to register on Rocketest to respond to it. If there is some kind of monetary incentive, it could be a good way to convince users to participate in this task. Another important aspect to take into account is the confidentiality of the information present in the test, and, if necessary, you can send a document to the participant to sign before taking the test."
            className={styles.infoIcon}
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
