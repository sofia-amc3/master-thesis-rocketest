import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/app.module.css";
import TextInput from "@/components/input-components/TextInput";
import Button from "@/components/Button";

const SignUp = () => {
  return (
    <>
      <Head>
        <title>Rocketest | Sign Up</title>
      </Head>
      <main className={styles.bgColorLight}>
        <div className={styles.authContainer}>
          <h1>Welcome to Rocketest</h1>
          <h4>Sign in by entering the information below.</h4>
          <TextInput
            title="E-mail"
            placeholder="e.g. username@rocketest.com"
            size="small"
          />
          <TextInput
            title="Password"
            placeholder=""
            type="password"
            size="small"
          />

          <div className={styles.checkboxAndForgotPwContainer}>
            <div className={styles.checkboxContainer}>
              <input type="checkbox" name="remember_me" value="remember_me" />
              <label>Remember Me</label>
            </div>
            <Link href="/forgottenPassword">Forgotten Password</Link>
          </div>

          <Button text="Sign In" type="primary" size="extra-large" />

          <span>Don&apos;t have an account?</span>
          <Link href="/signup">Register</Link>
        </div>
      </main>
    </>
  );
};

export default SignUp;
