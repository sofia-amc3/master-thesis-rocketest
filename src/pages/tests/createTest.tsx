import React from "react";
import Head from "next/head";
import TestsTopMenu from "@/components/TestsTopMenu";

interface PropsExample {
  a: string;
  b: string;
  c?: string;
  d?: boolean;
}

const CreateTest = (props: PropsExample) => {
  return (
    <>
      <Head>
        <title>Create Test | Rocketest</title>
      </Head>
      <main>
        <TestsTopMenu></TestsTopMenu>
      </main>
    </>
  );
};

export default CreateTest;
