import React from "react";
import Head from "next/head";
import TestsTopMenu from "@/components/tests-components/TestsTopMenu";
import SearchBar from "@/components/SearchBar";
import Breadcrumbs from "@/components/create-test-components/Breadcrumbs";
import Link from "next/link";
import TextInput from "@/components/input-components/TextInput";

interface PropsExample {
  a: string;
  b: string;
  c?: string;
  d?: boolean;
}

const EditTest = (props: PropsExample) => {
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
          activePage
        />
        <h1>Edit Test</h1>
        <h4>A/B Test</h4>

        <h3>General</h3>
        <TextInput title="title" placeholder="example" mandatory />
        <TextInput title="title" placeholder="example" isTextarea />

        {/* temp */}
        <br></br>
        <br></br>
        <Link href="/tests/createTest/testDetails">TEST DETAILS TEMP</Link>
      </main>
    </>
  );
};

export default EditTest;
