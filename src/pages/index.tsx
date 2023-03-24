import Head from "next/head";
import Image from "next/image";

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
        <title>PAGE EXAMPLE</title>
      </Head>
      <main>{/* HEAD AND MAIN TAGS CAN BE REMOVED IF IT'S A COMPONENT */}</main>
    </>
  );
};

export default Home;

/*export default function Home() {
  return (
    <>
      <Head>
        <title>Rocketest</title>
      </Head>
      <main></main>
    </>
  );
}*/
