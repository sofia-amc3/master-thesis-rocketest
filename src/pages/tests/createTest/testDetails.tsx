import React from "react";
import Head from "next/head";
import TestsTopMenu from "@/components/tests-components/TestsTopMenu";
import SearchBar from "@/components/SearchBar";
import Breadcrumbs from "@/components/create-test-components/Breadcrumbs";

interface PropsExample {
  a: string;
  b: string;
  c?: string;
  d?: boolean;
}

const TestDetails = (props: PropsExample) => {
  return (
    <>
      <Head>
        <title>PAGE EXAMPLE</title>
      </Head>
      <main>
        <TestsTopMenu></TestsTopMenu>
        <SearchBar />
        <Breadcrumbs
          link="/tests/createTest"
          pageName="Choose Template"
          imageAppears
        />
        <Breadcrumbs
          link="/tests/createTest/editTest"
          pageName="Edit Test"
          imageAppears
        />
        <Breadcrumbs
          link="/tests/createTest/testDetails"
          pageName="Test Details"
          activePage
        />
        <h1>Test Details</h1>
      </main>
    </>
  );
};

export default TestDetails;
