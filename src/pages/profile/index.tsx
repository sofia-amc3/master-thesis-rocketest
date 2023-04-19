import React from "react";
import Head from "next/head";
import PageTemplate from "@/components/PageTemplate";

interface PropsExample {
  a: string;
  b: string;
  c?: string;
  d?: boolean;
}

const Profile = (props: PropsExample) => {
  return (
    <>
      <Head>
        <title>Profile | Rocketest</title>
      </Head>
      <main>
        {/* Check User Type */}
        <PageTemplate imgSrc="" />
        {/* Add Edit Profile Btn */}
      </main>
    </>
  );
};

export default Profile;
