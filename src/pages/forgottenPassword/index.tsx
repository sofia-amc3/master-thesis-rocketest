import React from "react";
import Head from "next/head";
import Button from "@/components/Button";
import styles from "@/styles/app.module.css";
import { useRouter } from "next/router";
import GoBackArrow from "@/components/GoBackArrow";
import TextInput from "@/components/input-components/TextInput";

const ContactUs = () => {
  const router = useRouter();

  const sendNewPassword = () => {
    // Verify if e-mail exists
    // Send an e-mail with the new password
    // Update database with new password when clicking on e-mail link?
    router.push("/forgottenPassword/recoverPassword");
  };

  const goBack = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>Forgotten Password | Rocketest</title>
      </Head>
      <main className={styles.bgColorLight}>
        <div className={`${styles.authContainer} ${styles.authTwoButtonPages}`}>
          <GoBackArrow />

          <h1>Forgotten Password</h1>

          <TextInput
            title="E-mail"
            placeholder="e.g. user@rocketest.com"
            size="small"
            onChange={(e) => {
              console.log("E-mail", e.target.value);
            }}
          />

          <Button
            text="Send New Password"
            type="primary"
            size="extra-large"
            function={sendNewPassword}
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

export default ContactUs;
