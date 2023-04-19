import React from "react";
import Head from "next/head";
import PageTemplate from "@/components/PageTemplate";

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
      <main>
        <PageTemplate imgSrc="" />
      </main>
    </>
  );
};

export default Messages;
