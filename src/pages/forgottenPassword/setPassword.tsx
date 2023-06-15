import React, { useEffect, useState } from "react";
import Head from "next/head";
import Button from "@/components/Button";
import styles from "@/styles/app.module.css";
import { useRouter } from "next/router";
import GoBackArrow from "@/components/GoBackArrow";
import TextInput from "@/components/input-components/TextInput";
import axios from "axios";

interface FormData {
  password: string;
  confirmPassword: string;
}

const SetPassword = () => {
  const router = useRouter();

  const [form, setForm] = useState<FormData>({
    password: "",
    confirmPassword: "",
  });

  const updateForm = (valueToUpdate: Partial<FormData>) => {
    setForm({
      ...form,
      ...valueToUpdate,
    });
  };

  const handleSetPassword = async () => {
    if (!form.password || !form.confirmPassword) {
      alert("The password fields cannot be empty.");
    } else if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
    } else {
      await axios
        .post("/api/user/setNewPassword", {
          ...form,
          email: router.query.email,
        })
        .then(async (res) => {
          alert("Password was reset successfully.");
          router.push("/");
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            alert(error.response.data.toString()); // specific error messages defined in the setNewPassword.tsx file
          } else {
            alert(error.toString()); // default error message
          }
        });
    }
  };

  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    // will wait for the full load of page AND then checks if an email was provided
    if (router.isReady && !router.query.email) {
      alert("An e-mail should be provided to access this page.");
      router.push("/");
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Set New Password | Rocketest</title>
      </Head>
      <main className={styles.bgColorLight}>
        <div className={`${styles.authContainer} ${styles.authTwoButtonPages}`}>
          <GoBackArrow />

          <h1>Set New Password</h1>

          <TextInput
            type="password"
            title="New Password"
            placeholder=""
            size="small"
            onChange={(e) => updateForm({ password: e.target.value })}
          />

          <TextInput
            type="password"
            title="Confirm Password"
            placeholder=""
            size="small"
            onChange={(e) => updateForm({ confirmPassword: e.target.value })}
          />

          <Button
            text="Set New Password"
            type="primary"
            size="extra-large"
            function={handleSetPassword}
          />

          <Button
            text="Back"
            type="secondary"
            size="extra-large"
            function={goBack}
          />
        </div>
      </main>
    </>
  );
};

export default SetPassword;
