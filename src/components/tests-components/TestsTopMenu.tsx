import React from "react";
import Link from "next/link";
import styles from "@/styles/app.module.css";
import { useRouter } from "next/router";

interface Props {
  isTester?: boolean;
}

const TestsTopMenu = (props: Props) => {
  const router = useRouter();

  const activeClassName = (url: string) => {
    return router.pathname.includes(url) ? styles.topMenuActiveBorder : "";
  };

  return (
    <div className={styles.testsTopMenu}>
      <Link
        href="/tests"
        className={
          router.pathname === "/tests" ? styles.topMenuActiveBorder : ""
        }
      >
        Overview
        <div></div>
      </Link>

      <Link href="/tests/myTests" className={activeClassName("/tests/myTests")}>
        My Tests
        <div></div>
      </Link>

      {!props.isTester && (
        <Link
          href="/tests/createTest"
          className={activeClassName("/tests/createTest")}
        >
          Create Test
          <div></div>
        </Link>
      )}
    </div>
  );
};

export default TestsTopMenu;
