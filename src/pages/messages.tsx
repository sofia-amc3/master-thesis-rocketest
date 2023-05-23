import React from "react";
import Head from "next/head";
import PageTemplate from "@/components/PageTemplate";

const Messages = () => {
  return (
    <>
      <Head>
        <title>Messages | Rocketest</title>
      </Head>
      <main>
        <PageTemplate imgSrc="page_templates/messages.png" />
      </main>
    </>
  );
};

export default Messages;
