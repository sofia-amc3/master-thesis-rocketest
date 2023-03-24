import React from "react";
import Link from "next/link";
import styles from "@/styles/app.module.css";
import { useRouter } from "next/router";

const TestsTopMenu = () => {
  const router = useRouter();

  const activeClassName = (url: string) => {
    return router.pathname === url ? styles.topMenuActiveBorder : "";
  };

  return (
    <div className={styles.testsTopMenu}>
      <Link href="/tests" className={activeClassName("/tests")}>
        Overview
        <div></div>
      </Link>

      <Link href="/tests/myTests" className={activeClassName("/tests/myTests")}>
        My Tests
        <div></div>
      </Link>

      <Link
        href="/tests/createTest"
        className={activeClassName("/tests/createTest")}
      >
        Create Test
        <div></div>
      </Link>
    </div>
  );
};

export default TestsTopMenu;
