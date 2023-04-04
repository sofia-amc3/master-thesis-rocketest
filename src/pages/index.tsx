import Head from "next/head";
import Link from "next/link";

interface PropsExample {
  a: string;
  b: string;
  c?: string;
  authenticated?: boolean;
}

const Home = (props: PropsExample) => {
  return (
    <>
      <Head>
        <title>Rocketest | Sign In</title>
      </Head>
      <main>{/* Sign In */}</main>
    </>
  );
};

export default Home;
