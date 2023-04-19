import React from "react";
import Head from "next/head";
import PageTemplate from "@/components/PageTemplate";

interface PropsExample {
  a: string;
  b: string;
  c?: string;
  d?: boolean;
}

const Wallet = (props: PropsExample) => {
  return (
    <>
      <Head>
        <title>Wallet | Rocketest</title>
      </Head>
      <main>
        {/* Check User Type */}
        <PageTemplate imgSrc="" />
      </main>
    </>
  );
};

export default Wallet;
