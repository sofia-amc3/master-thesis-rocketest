import React from "react";
import Head from "next/head";
import PageTemplate from "@/components/PageTemplate";
import { PropsTestPage } from "./tests";

const Notifications = (props: PropsTestPage) => {
  return (
    <>
      <Head>
        <title>Notifications | Rocketest</title>
      </Head>
      <main>
        {props.auth?.type ? (
          // Tester
          <PageTemplate imgSrc="page_templates/notifications-tester.png" />
        ) : (
          // UX Researcher
          <PageTemplate imgSrc="page_templates/notifications-uxrsc.png" />
        )}
      </main>
    </>
  );
};

export default Notifications;
