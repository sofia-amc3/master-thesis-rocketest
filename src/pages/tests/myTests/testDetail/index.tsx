import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import TestsTopMenu from "@/components/tests-components/TestsTopMenu";
import SearchBar from "@/components/SearchBar";
import Button from "@/components/Button";
import Breadcrumbs from "@/components/Breadcrumbs";
import FollowPeople from "@/components/list-cards-components/FollowPeople";
import SmallInfo from "@/components/my-tests-components/SmallInfo";
import PagesSlider from "@/components/PagesSlider";
import { useRouter } from "next/router";
import styles from "@/styles/app.module.css";

interface PropsExample {
  title: string;
  subtitle: string;
}

const TestDetail = (props: PropsExample) => {
  const router = useRouter();

  const goToFindTestersPage = () => {
    router.push("/tests/myTests/testDetail/findTesters");
  };

  const goToTestResultsPage = () => {
    router.push("/tests/myTests/testDetail/testResults");
  };

  return (
    <>
      <Head>
        <title>My Tests - Test Detail | Rocketest</title>
      </Head>
      <main>
        <TestsTopMenu />
        <SearchBar />
        <Breadcrumbs link="/tests/myTests" pageName="My Tests" imageAppears />
        <Breadcrumbs link="" pageName="Test Name" activePage />
        <div className={styles.testDetailContainer}>
          <div className={styles.testDetailLeftContainer}>
            <div className={styles.testDetailTitle}>
              <h1>Name of Test</h1>
              <Link href="">
                <Image
                  src="/icons/editProfile.svg"
                  alt="Edit Test Icon"
                  width={25}
                  height={25}
                />
              </Link>
              <Link href="">
                <Image
                  src="/icons/trash.svg"
                  alt="Delete Test Icon"
                  width={25}
                  height={25}
                />
              </Link>
            </div>
            <div className={styles.testImgContainer}>
              <img src="/tests_imgs/a-b-testing.jpg" alt="Test Image" />
            </div>
            <h2>Test&apos;s Link</h2>
            <a href="">http://www.test-link.com/lorem-ipsum/</a>

            <Button text="Copy Link" size="medium" type="tertiary" />
            <Button text="Share" size="medium" type="tertiary" />
            <h2>Test&apos;s Information</h2>
            <div className={styles.smallInfoContainer}>
              <SmallInfo
                iconSrc="/icons/test-information.svg"
                iconWidth={24}
                text="A/B Test"
              />
              <SmallInfo
                iconSrc="/icons/test-testersNumber.svg"
                iconWidth={24}
                text="100 testers"
              />
            </div>
            <div className={styles.smallInfoContainer}>
              <SmallInfo
                iconSrc="/icons/test-calendar.svg"
                iconWidth={24}
                text="Ends in 16 Mar 2023"
              />
              <SmallInfo
                iconSrc="/icons/money-spent.svg"
                iconWidth={24}
                text="500$ spent"
              />
            </div>

            <div className={styles.testBtnsContainer}>
              <Button
                text="Find Testers"
                type="primary"
                size="extra-extra-large"
                function={goToFindTestersPage}
              />
              <Button
                text="View Results"
                type="secondary"
                size="extra-extra-large"
                function={goToTestResultsPage}
              />
            </div>
          </div>
          <div className={styles.testDetailRightContainer}>
            <h2>People that have taken this test:</h2>
            {/* Follow People Component */}
            <FollowPeople
              userImg="/userExamples/user--05.svg"
              userProfile=""
              userName="Name of Person"
              jobTitle="Job Title"
              location="Location"
            />
            <FollowPeople
              userImg="/userExamples/user--05.svg"
              userProfile=""
              userName="Name of Person"
              jobTitle="Job Title"
              location="Location"
            />
            <FollowPeople
              userImg="/userExamples/user--05.svg"
              userProfile=""
              userName="Name of Person"
              jobTitle="Job Title"
              location="Location"
            />
            <FollowPeople
              userImg="/userExamples/user--05.svg"
              userProfile=""
              userName="Name of Person"
              jobTitle="Job Title"
              location="Location"
            />
            <FollowPeople
              userImg="/userExamples/user--05.svg"
              userProfile=""
              userName="Name of Person"
              jobTitle="Job Title"
              location="Location"
            />
            <FollowPeople
              userImg="/userExamples/user--05.svg"
              userProfile=""
              userName="Name of Person"
              jobTitle="Job Title"
              location="Location"
            />
            <FollowPeople
              userImg="/userExamples/user--05.svg"
              userProfile=""
              userName="Name of Person"
              jobTitle="Job Title"
              location="Location"
            />
            <FollowPeople
              userImg="/userExamples/user--05.svg"
              userProfile=""
              userName="Name of Person"
              jobTitle="Job Title"
              location="Location"
            />

            {/* Pages Component */}
            <PagesSlider
              previousPageArrow
              previousPageSrc=""
              currentPageNr={10}
              totalPagesNr={50}
              nextPageSrc=""
              nextPageArrow
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default TestDetail;
