import React from "react";
import Head from "next/head";
import TestsTopMenu from "@/components/TestsTopMenu";
import SearchBar from "@/components/SearchBar";

interface PropsExample {
  a: string;
  b: string;
  c?: string;
  d?: boolean;
}

const Overview = (props: PropsExample) => {
  return (
    <>
      <Head>
        <title>Overview | Rocketest</title>
      </Head>
      <main>
        <TestsTopMenu></TestsTopMenu>
        <SearchBar></SearchBar>
      </main>
    </>
  );
};

export default Overview;
