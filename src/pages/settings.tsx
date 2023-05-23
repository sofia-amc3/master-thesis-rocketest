import React from "react";
import Head from "next/head";
import PageTemplate from "@/components/PageTemplate";

const Settings = () => {
  return (
    <>
      <Head>
        <title>Settings | Rocketest</title>
      </Head>
      <main>
        <PageTemplate imgSrc="page_templates/settings.png" isScrollable />
      </main>
    </>
  );
};

export default Settings;
