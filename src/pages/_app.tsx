import "@/styles/globals.css";
import type { AppProps } from "next/app";
import SideMenu from "@/components/SideMenu";
import styles from "@/styles/app.module.css";
import Head from "next/head";
import BackToTopArrow from "@/components/BackToTopArrow";
import { useEffect, useState } from "react";
import SideMenuAuth from "@/components/SideMenuAuth";
import { NextRouter, useRouter } from "next/router";
import { userAuth, userSession } from "@/utils/user";

const unprotectedRoutes = [
  "/createAccount",
  "/forgottenPassword",
  "/termsAndConditions",
  "/contactUs",
];

const isUnprotectedRoute = (router: NextRouter) => {
  const { pathname } = router;
  let isUnprotected = false;

  // specific verification outside includes bc this expression is included everywhere and had to be checked precisely
  if (pathname === "/") isUnprotected = true;
  else {
    for (let i = 0; i < unprotectedRoutes.length; i++) {
      if (pathname.includes(unprotectedRoutes[i])) isUnprotected = true;
    }
  }

  return isUnprotected;
};

export default function App({ Component, pageProps }: AppProps) {
  const [auth, setAuth] = useState<userAuth | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const loadPage = async () => {
    setLoading(true);
    const authLogin = await userSession.getItem();
    await setAuth(authLogin ? JSON.parse(authLogin) : null);

    // sends user to login page if he's unauthenticated and inside any page that requires authentication
    if (!authLogin && !isUnprotectedRoute(router)) {
      router.push("/");
    }

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
            {auth ? (
              <SideMenu
                userName={auth.name}
                userProfilePhoto={auth.profilePhoto}
              />
            ) : (
              <SideMenuAuth />
            )}
            <Component
              {...pageProps}
              auth={auth}
              userType={auth && auth.type}
            />
            {/* <BackToTopArrow /> */}
          </>
        )}
      </div>
    </>
  );
}
