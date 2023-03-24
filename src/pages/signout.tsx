import React from "react";
import Head from "next/head";

interface PropsExample {
  a: string;
  b: string;
  c?: string;
  d?: boolean;
}

const Signout = (props: PropsExample) => {
  return (
    <>
      <Head>
        <title>Signout | Rocketest</title>
      </Head>
      <main></main>
    </>
  );
};

export default Signout;
