import React from "react";
import Head from "next/head";

interface PropsExample {
  a: string;
  b: string;
  c?: string;
  d?: boolean;
}

const Wallet = (props: PropsExample) => {
  return (
    <>
      <Head>
        <title>Wallet | Rocketest</title>
      </Head>
      <main></main>
    </>
  );
};

export default Wallet;
