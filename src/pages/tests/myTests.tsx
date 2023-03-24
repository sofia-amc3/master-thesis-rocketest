import React from "react";
import Head from "next/head";
import TestsTopMenu from "@/components/TestsTopMenu";

interface PropsExample {
  a: string;
  b: string;
  c?: string;
  d?: boolean;
}

const MyTests = (props: PropsExample) => {
  return (
    <>
      <Head>
        <title>My Tests | Rocketest</title>
      </Head>
      <main>
        <TestsTopMenu></TestsTopMenu>
      </main>
    </>
  );
};

export default MyTests;
