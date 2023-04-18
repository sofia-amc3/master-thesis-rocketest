import React from "react";
import Head from "next/head";
import PopUp from "@/components/PopUp";
import { useRouter } from "next/router";

const RecoverPassword = () => {
  const router = useRouter();

  const goToLogIn = () => {
    router.push("../");
  };

  return (
    <>
      <Head>
        <title>Forgotten Password | Rocketest</title>
      </Head>
      <main>
        <PopUp
          title="Recover Password"
          content="An e-mail was sent. Please open it to recover your password."
          primaryBtnText=""
          primaryBtnFunction={goToLogIn}
          isInformative
        />
      </main>
    </>
  );
};

export default RecoverPassword;
