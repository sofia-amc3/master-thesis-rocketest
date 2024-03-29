import Head from "next/head";
import Button from "@/components/Button";
import styles from "@/styles/app.module.css";
import React, { useState } from "react";
import { useRouter } from "next/router";
import GoBackArrow from "@/components/GoBackArrow";
import TextInput from "@/components/input-components/TextInput";

interface ContactUsFormData {
  subject: string;
  message: string;
}

const ContactUs = () => {
  const router = useRouter();

  const [form, setForm] = useState<ContactUsFormData>({
    subject: "",
    message: "",
  });

  const updateForm = (valueToUpdate: Partial<ContactUsFormData>) => {
    setForm({
      ...form,
      ...valueToUpdate,
    });
  };

  const sendEmail = () => {
    const { subject, message } = form;
    const email = "rocketest.team@outlook.com";

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(message)}`;

    if (!subject || !message) {
      alert("Please provide both a subject and a message.");
    } else {
      window.open(mailtoLink); // opens user's default e-mail app to send e-mail
    }
  };

  const goBack = () => {
    router.back();
  };

  const goBackVerifications = () => {
    const { subject, message } = form;

    if (!subject && !message) {
      goBack();
    } else {
      if (confirm("By going back, all text fields will be lost.")) goBack();
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us | Rocketest</title>
      </Head>
      <main className={styles.bgColorLight}>
        <div className={`${styles.authContainer} ${styles.authTwoButtonPages}`}>
          <GoBackArrow function={goBackVerifications} />

          <h1>Contact Us</h1>

          <TextInput
            title="Subject"
            placeholder="e.g. Bug Report/Feedback"
            size="small"
            onChange={(e) => {
              updateForm({ subject: e.target.value });
            }}
          />
          <TextInput
            title="Message"
            placeholder="Write here your message"
            isTextarea
            size="small"
            onChange={(e) => {
              updateForm({ message: e.target.value });
            }}
          />

          <Button
            text="Send Message"
            type="primary"
            size="extra-large"
            function={sendEmail}
          />

          <Button
            text="Back"
            type="secondary"
            size="extra-large"
            function={goBackVerifications}
          />
        </div>
      </main>
    </>
  );
};

export default ContactUs;
