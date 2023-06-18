import React, { useState } from "react";
import Head from "next/head";
import Button from "@/components/Button";
import styles from "@/styles/app.module.css";
import { useRouter } from "next/router";
import GoBackArrow from "@/components/GoBackArrow";
import TextInput from "@/components/input-components/TextInput";
import Link from "next/link";
import axios from "axios";
import ReactDOMServer from "react-dom/server";

interface FormData {
  email: string;
}

const ForgottenPassword = () => {
  const router = useRouter();

  const [form, setForm] = useState<FormData>({
    email: "",
  });

  const updateForm = (valueToUpdate: Partial<FormData>) => {
    setForm({
      ...form,
      ...valueToUpdate,
    });
  };

  const sendEmail = async () => {
    const subject = "Rocketest | Password Recovery",
      message = ReactDOMServer.renderToString(
        <>
          Please click{" "}
          <a
            href={`http://localhost:3000/forgottenPassword/setPassword?email=${form.email}`}
          >
            here
          </a>{" "}
          to recover your password. <br />
          <br /> If you are receiving this e-mail and no longer require to set a
          new password please ignore it. <br />
          <br />
          <br /> — Rocketest Team
        </>
      );

    if (!form.email) {
      alert("Please provide an e-mail.");
    } else {
      await axios
        .post("api/user/sendEmail", {
          ...form,
          subject,
          message,
        })
        .then(async (res) => {
          alert("An e-mail was sent. Please open it to recover your password.");
          router.push("/");
        })
        .catch((error) => {
          if (error.response?.data?.message) {
            alert(error.response.data.message); // specific error messages
          } else {
            alert(JSON.stringify(error.response.data)); // default error message
          }
        });
    }
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
            onChange={(e) => updateForm({ email: e.target.value })}
          />

          <Button
            text="Send E-mail"
            type="primary"
            size="extra-large"
            function={sendEmail}
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

export default ForgottenPassword;
