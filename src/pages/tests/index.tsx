import React from "react";
import Head from "next/head";

interface PropsExample {
  a: string;
  b: string;
  c?: string;
  d?: boolean;
}

const Overview = (props: PropsExample) => {
  return (
    <>
      <Head>
        <title>Overview | Rocketest</title>
      </Head>
      <main></main>
    </>
  );
};

export default Overview;
