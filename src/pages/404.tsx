import React from "react";
import Head from "next/head";
import styles from "@/styles/app.module.css";
import Button from "@/components/Button";
import { useRouter } from "next/router";

const PageNotFound = () => {
  const router = useRouter();

  const backToIndex = () => {
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>404 Error | Rocketest</title>
      </Head>
      <main>
        <div className={styles.error404Container}>
          <div className={styles.leftContent}>
            {/* white background */}
            <div></div>
            <img src="/icons/astronaut-404.svg" alt="Astronaut Illustration" />
          </div>
          <div className={styles.rightContent}>
            <span className={styles.redText01}>404</span>
            <span className={styles.redText02}>Oops! Page Not Found.</span>
            <span className={styles.blueText}>
              Click below to return to the application.
            </span>
            <Button
              size="large"
              text="Go Back"
              type="primary"
              function={backToIndex}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default PageNotFound;
