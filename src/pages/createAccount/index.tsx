import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/app.module.css";
import TextInput from "@/components/input-components/TextInput";
import Button from "@/components/Button";

const CreateAccount = () => {
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
          <Link href="">
            <Image
              src="/icons/ux-researcher.svg"
              alt="UX Designer/Researcher Icon"
              width={117}
              height={117}
            />
            <span>UX Designer/Researcher</span>
            <span>My mission is to create usability tests.</span>
          </Link>
          <Link href="">
            <Image
              src="/icons/tester.svg"
              alt="Tester Icon"
              width={117}
              height={117}
            />
            <span>Tester</span>
            <span>My mission is to participate in tests.</span>
          </Link>

          <Button text="Next" type="primary" size="extra-large" />

          <span>Already have an account?</span>
          <Link href="/">Login</Link>
        </div>
      </main>
    </>
  );
};

export default CreateAccount;
