import "@/styles/globals.css";
import type { AppProps } from "next/app";
import SideMenu from "@/components/SideMenu";
import styles from "@/styles/app.module.css";
import Head from "next/head";
import BackToTopArrow from "@/components/BackToTopArrow";
import { useEffect, useState } from "react";
import SideMenuAuth from "@/components/SideMenuAuth";

export default function App({ Component, pageProps }: AppProps) {
  const [auth, setAuth] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadPage = async () => {
    setLoading(true);
    await setAuth(localStorage.getItem("auth"));
    console.log(auth);
    setLoading(false);
  };

  useEffect(() => {
    loadPage();
  }, []);

  return (
    <>
      <Head>
        <meta name="description" content="Rocketest App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.app_layout}>
        {loading ? (
          <>Loading...</>
        ) : (
          <>
            {auth ? <SideMenu /> : <SideMenuAuth />}
            <Component {...pageProps} />
            <BackToTopArrow />
          </>
        )}
      </div>
    </>
  );
}
