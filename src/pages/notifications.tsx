import React from "react";
import Head from "next/head";

interface PropsExample {
  a: string;
  b: string;
  c?: string;
  d?: boolean;
}

const Notifications = (props: PropsExample) => {
  return (
    <>
      <Head>
        <title>Notifications | Rocketest</title>
      </Head>
      <main></main>
    </>
  );
};

export default Notifications;
