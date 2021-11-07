import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import Script from "next/script";
import {observer} from "mobx-react-lite";
import theme from "../store/theme";
import {useEffect} from "react";
import {useRouter} from "next/router";
import {URL} from "../constants/url";
import {axiosJWT} from "../utils/axios/axios";

const MyApp = observer(({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  useEffect(() => {
    const themeValue = window.localStorage.getItem("theme")
    document.body.className = themeValue!;
    theme.setTheme(themeValue!);
  }, [theme.theme]);
  useEffect(() => {
    if (router.pathname !== "/login" && router.pathname !== "/registration" && router.pathname !== "/forgot-password" && router.pathname !== "/reset-password/[id]/[token]") {
      axiosJWT.get(`${URL}/auth/check`, {withCredentials: true});
    }
  }, [router.pathname]);
  return (
      <>
        <Head>
          <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          {/*<link*/}
          {/*    href="//fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap"*/}
          {/*    rel="stylesheet"*/}
          {/*/>*/}
          {/*<link*/}
          {/*    href="//fonts.googleapis.com/icon?family=Material+Icons"*/}
          {/*    rel="stylesheet"*/}
          {/*/>*/}
        </Head>
        <NextNProgress
            color={theme.theme === "dark" ? "#fa6ba4" : "#fc1100"}
            startPosition={0.3}
            stopDelayMs={200}
            height={5}
            showOnShallow={true}
        />
        <Component {...pageProps} />
      </>
  );
})

export default MyApp;