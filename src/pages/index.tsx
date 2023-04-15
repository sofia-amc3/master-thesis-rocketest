import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/app.module.css";
import TextInput from "@/components/input-components/TextInput";
import Button from "@/components/Button";
import { useState } from "react";

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const SignIn = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [rememberMe, setRememberMe] = useState(false);

  //------------------------------------------------

  const [form, setForm] = useState<FormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const updateForm = (valueToUpdate: Partial<FormData>) => {
    setForm({
      ...form,
      ...valueToUpdate,
    });
  };

  return (
    <>
      <Head>
        <title>Rocketest | Sign In</title>
      </Head>
      <main className={styles.bgColorLight}>
        <div className={styles.authContainer}>
          <h1>Welcome to Rocketest</h1>
          <h4>Sign in by entering the information below.</h4>
          <TextInput
            title="E-mail"
            placeholder="e.g. username@rocketest.com"
            size="small"
            // onChange={(e) => setEmail(e.target.value)}
            onChange={(e) => updateForm({ email: e.target.value })}
          />
          <TextInput
            title="Password"
            placeholder=""
            type="password"
            size="small"
            // onChange={(e) => setPassword(e.target.value)}
            onChange={(e) => updateForm({ password: e.target.value })}
          />

          <div className={styles.checkboxAndForgotPwContainer}>
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                name="remember_me"
                value="remember_me"
                // onChange={(e) => setRememberMe(e.target.checked)}
                onChange={(e) => updateForm({ rememberMe: e.target.checked })}
                checked={form.rememberMe}
              />
              <label>Remember Me</label>
            </div>
            <Link href="/forgottenPassword">Forgotten Password</Link>
          </div>

          <Button
            text="Sign In"
            type="primary"
            size="extra-large"
            function={() =>
              console.log(
                // `Email: ${email}`,
                // `Password: ${password}`,
                // `Remember: ${rememberMe}`,
                form
              )
            }
          />

          <span>Don&apos;t have an account?</span>
          <Link href="/createAccount">Register</Link>
        </div>
      </main>
    </>
  );
};

export default SignIn;
