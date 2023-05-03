import React from "react";
import Head from "next/head";
import PopUp from "@/components/PopUp";
import { useRouter } from "next/router";

const Signout = () => {
  const router = useRouter();

  const signOutHandler = () => {
    localStorage.removeItem("auth");
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Signout | Rocketest</title>
      </Head>
      <main>
        <PopUp
          title="Sign Out"
          content="Are you sure you want to sign out of your account?"
          primaryBtnText="Sign Out"
          primaryBtnFunction={signOutHandler}
        />
      </main>
    </>
  );
};

export default Signout;
