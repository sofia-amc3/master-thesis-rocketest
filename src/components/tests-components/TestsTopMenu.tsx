import React from "react";
import Link from "next/link";
import styles from "@/styles/app.module.css";
import { useRouter } from "next/router";

interface Props {
  isTester?: boolean;
}

const TestsTopMenu = (props: Props) => {
  const router = useRouter();

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

      <Link
        href="/tests/myTests"
        className={
          router.pathname.includes("/tests/myTests") ||
          (!props.isTester && router.pathname.includes("/tests/test"))
            ? styles.topMenuActiveBorder
            : ""
        }
      >
        My Tests
        <div></div>
      </Link>

      {!props.isTester && (
        <Link
          href="/tests/createTest"
          className={
            router.pathname.includes("/tests/createTest")
              ? styles.topMenuActiveBorder
              : ""
          }
        >
          Create Test
          <div></div>
        </Link>
      )}
    </div>
  );
};

export default TestsTopMenu;
