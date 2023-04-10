/* eslint-disable @next/next/no-img-element */
import { LeftNav } from "@/components/LeftNav/LeftNav";
import styles from "./app.module.scss";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <script
          async
          defer
          src="https://scripts.simpleanalyticscdn.com/latest.js"
        />
        <noscript>
          <img
            src="https://queue.simpleanalyticscdn.com/noscript.gif"
            alt="no"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </noscript>
        <title>Alpha Iota</title>
      </Head>

      <main className={styles.main}>
        <LeftNav />
        <Component {...pageProps} />
      </main>
    </>
  );
}
