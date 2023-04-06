import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/app.module.css";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { useState } from "react";

const CreateAccount = () => {
  const router = useRouter();
  const [userType, setUserType] = useState(0); // 0 = ux researcher, 1 = tester

  const selectedUserType = (type: number) => {
    setUserType(type);
  };

  const goToNextPage = () => {
    router.push({ pathname: "/createAccount/signup", query: { userType } });
  };

  return (
    <>
      <Head>
        <title>Rocketest | Sign Up</title>
      </Head>
      <main className={styles.bgColorLight}>
        <div className={styles.authContainer}>
          <h1>Create an Account</h1>
          <h4>Sign up by answering the information below.</h4>

          <h3>Which type of user are you?</h3>

          <div className={styles.userTypeBtnContainer}>
            <button
              className={`${styles.userTypeBtn} ${
                !userType ? styles.selected : ""
              }`}
              onClick={() => selectedUserType(0)}
            >
              <Image
                src="/icons/ux-researcher.svg"
                alt="UX Designer/Researcher Icon"
                width={117}
                height={117}
              />
              <span className={styles.userTypeTitle}>
                UX Designer/ Researcher
              </span>
              <span className={styles.userTypeDescription}>
                My mission is to create usability tests.
              </span>
            </button>
            <button
              className={`${styles.userTypeBtn} ${
                userType ? styles.selected : ""
              }`}
              onClick={() => selectedUserType(1)}
            >
              <Image
                src="/icons/tester.svg"
                alt="Tester Icon"
                width={117}
                height={117}
              />
              <span className={styles.userTypeTitle}>Tester</span>
              <span className={styles.userTypeDescription}>
                My mission is to participate in tests.
              </span>
            </button>
          </div>

          <Button
            text="Next"
            type="primary"
            size="extra-large"
            function={goToNextPage}
          />

          <span>Already have an account?</span>
          <Link href="/">Login</Link>
        </div>
      </main>
    </>
  );
};

export default CreateAccount;
