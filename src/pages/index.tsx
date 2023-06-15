import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/app.module.css";
import TextInput from "@/components/input-components/TextInput";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { userAuth, userSession } from "@/utils/user";
import Loading from "@/components/Loading";

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}
interface Props {
  auth?: userAuth;
}

const SignIn = (props: Props) => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    setLoading(true);
    if (props.auth) {
      router.push("/tests");
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = async () => {
    await axios
      .post("/api/user/login", form)
      .then(async (res) => {
        await userSession.setItem(JSON.stringify(res.data), form.rememberMe);

        router.push("/tests");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          alert(error.response.data.toString()); // specific error messages defined in the login.tsx file
        } else {
          alert(error.toString()); // default error message
        }
      });
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <Head>
        <title>Sign In | Rocketest</title>
      </Head>
      <main className={styles.bgColorLight}>
        <div className={styles.authContainer}>
          <h1>Welcome to Rocketest</h1>
          <h4>Sign in by entering the information below.</h4>
          <TextInput
            title="E-mail"
            placeholder="e.g. username@rocketest.com"
            size="small"
            onChange={(e) => updateForm({ email: e.target.value })}
          />
          <TextInput
            title="Password"
            placeholder=""
            type="password"
            size="small"
            onChange={(e) => updateForm({ password: e.target.value })}
            onEnterKey={handleLogin}
          />

          <div className={styles.checkboxAndForgotPwContainer}>
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                name="remember_me"
                value="remember_me"
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
            function={handleLogin}
          />

          <span>Don&apos;t have an account?</span>
          <Link href="/createAccount">Register</Link>
        </div>
      </main>
    </>
  );
};

export default SignIn;
