import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Test from "@/components/test-content-components/Test";
import Button from "@/components/Button";
import styles from "@/styles/app.module.css";
import TestsTopMenu from "@/components/tests-components/TestsTopMenu";
import { exampleFormObject } from "@/utils/testCreatorHelper";

const ToBeAnsweredTest = () => {
  const router = useRouter();
  const { _id } = router.query;

  const [formData, setFormData] = useState(exampleFormObject);

  return (
    <>
      <Head>
        <title>{formData.testName} | Rocketest</title>
      </Head>
      <main>
        {/* Falta aviso se clicar em algum sítio irá perder as respostas já dadas */}
        <TestsTopMenu isTester />

        <Test testData={formData} />

        {/* Submit/Cancel */}
        <div className={styles.testButtonsContainer}>
          <Button text="Cancel" size="large" type="secondary" />
          <Button text="Submit" size="large" type="primary" />
        </div>
      </main>
    </>
  );
};

export default ToBeAnsweredTest;
