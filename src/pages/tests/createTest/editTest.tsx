import React from "react";
import Head from "next/head";
import TestsTopMenu from "@/components/tests-components/TestsTopMenu";
import SearchBar from "@/components/SearchBar";
import Breadcrumbs from "@/components/create-test-components/Breadcrumbs";
import Link from "next/link";
import TextInput from "@/components/input-components/TextInput";
import Button from "@/components/Button";

interface PropsExample {
  a: string;
  b: string;
  c?: string;
  d?: boolean;
}

const EditTest = (props: PropsExample) => {
  const testFunction = () => {
    console.log("test");
  };

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
        <br />
        <br />
        <Link href="/tests/createTest/testDetails">TEST DETAILS TEMP</Link>

        <br />
        <br />
        <Button
          text="p large"
          type="primary"
          size="large"
          function={testFunction}
        />
        <Button text="s medium" type="secondary" size="medium" />
        <Button text="t small" type="tertiary" size="small" />
      </main>
    </>
  );
};

export default EditTest;
