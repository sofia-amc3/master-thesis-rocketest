import React from "react";
import Head from "next/head";
import Button from "@/components/Button";
import styles from "@/styles/app.module.css";
import { useRouter } from "next/router";
import GoBackArrow from "@/components/GoBackArrow";
import TextInput from "@/components/input-components/TextInput";

const ContactUs = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>Contact Us | Rocketest</title>
      </Head>
      <main className={styles.bgColorLight}>
        <div className={`${styles.authContainer} ${styles.authTwoButtonPages}`}>
          <GoBackArrow />

          <h1>Contact Us</h1>

          <TextInput
            title="Subject"
            placeholder="e.g. Bug Report/Feedback"
            size="small"
          />
          <TextInput
            title="Message"
            placeholder="Write here your message"
            isTextarea
            size="small"
          />

          <Button text="Send Message" type="primary" size="extra-large" />

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
