import React from "react";
import Head from "next/head";

interface PropsExample {
  a: string;
  b: string;
  c?: string;
  d?: boolean;
}

const Messages = (props: PropsExample) => {
  return (
    <>
      <Head>
        <title>Messages | Rocketest</title>
      </Head>
      <main></main>
    </>
  );
};

export default Messages;
