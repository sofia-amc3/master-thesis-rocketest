import React from "react";
import Head from "next/head";
import PageTemplate from "@/components/PageTemplate";

interface PropsExample {
  a: string;
  b: string;
  c?: string;
  d?: boolean;
}

const EditProfile = (props: PropsExample) => {
  return (
    <>
      <Head>
        <title>Edit Profile | Rocketest</title>
      </Head>
      <main>
        {/* Check User Type */}
        <PageTemplate imgSrc="" />
        {/* Add Back to Profile Btn */}
      </main>
    </>
  );
};

export default EditProfile;
