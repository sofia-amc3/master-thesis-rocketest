import React from "react";
import Head from "next/head";
import TestsTopMenu from "@/components/TestsTopMenu";
import SearchBar from "@/components/SearchBar";
import TestsSearch from "@/components/TestsSearch";

interface PropsExample {
  a: string;
  b: string;
  c?: string;
  d?: boolean;
}

const MyTests = (props: PropsExample) => {
  return (
    <>
      <Head>
        <title>My Tests | Rocketest</title>
      </Head>
      <main>
        <TestsTopMenu />
        <TestsSearch />
      </main>
    </>
  );
};

export default MyTests;
