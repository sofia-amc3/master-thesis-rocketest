import React from "react";
import Head from "next/head";

interface PropsExample {
  a: string;
  b: string;
  c?: string;
  d?: boolean;
}

const Settings = (props: PropsExample) => {
  return (
    <>
      <Head>
        <title>Settings | Rocketest</title>
      </Head>
      <main></main>
    </>
  );
};

export default Settings;
