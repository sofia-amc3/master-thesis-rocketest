import "@/styles/globals.css";
import type { AppProps } from "next/app";
import SideMenu from "@/components/SideMenu";
import styles from "@/styles/app.module.css";
import Head from "next/head";
import BackToTopArrow from "@/components/BackToTopArrow";
import { useEffect, useState } from "react";
import SideMenuAuth from "@/components/SideMenuAuth";
import { useRouter } from "next/router";

interface userAuth {
  id: number;
  email: string;
  password: string;
  type: number;
}

export default function App({ Component, pageProps }: AppProps) {
  const [auth, setAuth] = useState<userAuth | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const loadPage = async () => {
    setLoading(true);
    const authLogin = await localStorage.getItem("auth");
    await setAuth(authLogin ? JSON.parse(authLogin) : null);
    setLoading(false);
  };

  useEffect(() => {
    loadPage();
  }, [router.pathname]);

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
            <Component {...pageProps} userType={auth && auth.type} />
            {/* <BackToTopArrow /> */}
          </>
        )}
      </div>
    </>
  );
}
