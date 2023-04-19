import React from "react";
import Head from "next/head";
import PageTemplate from "@/components/PageTemplate";

interface PropsExample {
  a: string;
  b: string;
  c?: string;
  d?: boolean;
}

const Settings = (props: PropsExample) => {
  return (
    <>
      <Head>
        <title>Settings | Rocketest</title>
      </Head>
      <main>
        {/* Change Page Height */}
        <PageTemplate imgSrc="" />
      </main>
    </>
  );
};

export default Settings;
