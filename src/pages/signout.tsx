import React from "react";
import Head from "next/head";
import PopUp from "@/components/PopUp";

const Signout = () => {
  const signOut = () => {
    console.log("Sign Out");
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
          primaryBtnFunction={signOut}
        />
      </main>
    </>
  );
};

export default Signout;
