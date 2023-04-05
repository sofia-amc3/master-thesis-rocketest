import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/app.module.css";
import TextInput from "@/components/input-components/TextInput";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SignUpUxResearcher = () => {
  return (
    <div className={styles.authContainer}>
      <h1>Create an Account</h1>
      <h4>Sign up by entering the information below.</h4>
      <TextInput
        title="E-mail"
        placeholder="e.g. username@rocketest.com"
        size="small"
      />
      <TextInput title="Password" placeholder="" type="password" size="small" />

      <Button text="Sign Up" type="primary" size="extra-large" />

      <span>Already have an account?</span>
      <Link href="/">Login</Link>
    </div>
  );
};

const SignUp = () => {
  const router = useRouter();
  const [userType, setUserType] = useState(""); // 0 = ux researcher, 1 = tester

  useEffect(() => {
    const temp_userType = router.query.userType as string;

    if (temp_userType === undefined || temp_userType === "") {
      router.push({ pathname: "/createAccount" });
    }
    setUserType(temp_userType);
  }, []);

  return (
    <>
      <Head>
        <title>Rocketest | Sign Up</title>
      </Head>
      <main className={styles.bgColorLight}>
        {userType === "1" ? <>TESTER</> : <SignUpUxResearcher />}
      </main>
    </>
  );
};

export default SignUp;
