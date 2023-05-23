import React from "react";
import Head from "next/head";
import PageTemplate from "@/components/PageTemplate";
import { PropsTestPage } from "./tests";

const Wallet = (props: PropsTestPage) => {
  return (
    <>
      <Head>
        <title>Wallet | Rocketest</title>
      </Head>
      <main>
        {props.auth?.type ? (
          // Tester
          <PageTemplate imgSrc="page_templates/wallet-tester.png" />
        ) : (
          // UX Researcher
          <PageTemplate imgSrc="page_templates/wallet-uxrsc.png" />
        )}
      </main>
    </>
  );
};

export default Wallet;
