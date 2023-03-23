import React from "react";
import Head from "next/head";

interface PropsExample {
  a: string;
  b: string;
  c?: string;
  d?: boolean;
}

const Example = (props: PropsExample) => {
  return (
    <>
      <Head>
        <title>PAGE EXAMPLE</title>
      </Head>
      <main>{/* HEAD AND MAIN TAGS CAN BE REMOVED IF IT'S A COMPONENT */}</main>
    </>
  );
};

export default Example;
