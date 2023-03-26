import "@/styles/globals.css";
import type { AppProps } from "next/app";
import SideMenu from "@/components/SideMenu";
import styles from "@/styles/app.module.css";
import Head from "next/head";
import BackToTopArrow from "@/components/BackToTopArrow";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="description" content="Rocketest App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.app_layout}>
        <SideMenu />
        <Component {...pageProps} />
        <BackToTopArrow />
      </div>
    </>
  );
}
