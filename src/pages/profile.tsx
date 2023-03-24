import React from "react";
import Head from "next/head";

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
      <main></main>
    </>
  );
};

export default Profile;
