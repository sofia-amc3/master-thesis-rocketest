import React from "react";
import Head from "next/head";
import TestsTopMenu from "@/components/tests-components/TestsTopMenu";
import SearchBar from "@/components/SearchBar";
import Button from "@/components/Button";
import styles from "@/styles/app.module.css";

const TestPage = () => {
  return (
    <>
      <Head>
        <title>Test | Rocketest</title>
      </Head>
      <main>
        {/* Falta aviso se clicar em algum sítio irá perder as respostas já dadas */}
        <TestsTopMenu />
        <SearchBar />
        <h1>Test Name</h1>
        <h4>Lorem ipsum dolor sit amet.</h4>
        <span className={styles.testSectionDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </span>
        {/* Section */}
        <span className={styles.testSectionTitle}>Section 01</span>
        <span className={styles.testSectionDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </span>
        {/* Question */}
        <span className={styles.testQuestionIndicator}>Question 01/05</span>
        <span className={styles.testQuestionTitle}>
          Which of these do you prefer?
        </span>
        {/* Options */}
        <div className={styles.testImgAndOptionContainer}>
          <div className={styles.testImgContainer}>
            <img src="/tests_imgs/a-b-testing.jpg" alt="" />
          </div>
          <div className={styles.testOptionContainer}>
            <input type="radio" name="test" />
            <label>Option A</label>
          </div>
        </div>
        <div className={styles.testImgAndOptionContainer}>
          <div className={styles.testImgContainer}>
            <img src="" alt="" />
          </div>
          <div className={styles.testOptionContainer}>
            <input type="radio" name="test" />
            <label>Option B</label>
          </div>
        </div>
        <div className={styles.testImgAndOptionContainer}>
          <div className={styles.testImgContainer}>
            <img src="" alt="" />
          </div>
          <div className={styles.testOptionContainer}>
            <input type="radio" name="test" />
            <label>Option C</label>
          </div>
        </div>
        <div className={styles.testImgAndOptionContainer}>
          <div className={styles.testImgContainer}>
            <img src="" alt="" />
          </div>
          <div className={styles.testOptionContainer}>
            <input type="radio" name="test" />
            <label>Option C</label>
          </div>
        </div>
        <div className={styles.testImgAndOptionContainer}>
          <div className={styles.testImgContainer}>
            <img src="" alt="" />
          </div>
          <div className={styles.testOptionContainer}>
            <input type="radio" name="test" />
            <label>Option C</label>
          </div>
        </div>
        {/* Submit/Cancel */}
        <div className={styles.testButtonsContainer}>
          <Button text="Cancel" size="large" type="secondary" />
          <Button text="Submit" size="large" type="primary" />
        </div>
      </main>
    </>
  );
};

export default TestPage;
