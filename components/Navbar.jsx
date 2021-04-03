import Head from "next/head";
import Link from "next/link";
import React from "react";
import navStyle from "./Navbar.css";

export class Navbar extends React.Component {
  render() {
    return (
      <>
        <Head>
          <meta name="color-scheme" content="dark light" />
        </Head>
        <div className={navStyle.navigation}>
          <div className={navStyle.logo}>
            <h1>Typo</h1>
          </div>

          <div className={navStyle.links}>
            <Link href="/">
              <a className={navStyle.link}>Home</a>
            </Link>
            <Link href="/credits">
              <a className={navStyle.link}>Credits</a>
            </Link>
            <Link href="/changelog">
              <a className={navStyle.link}>Changelog</a>
            </Link>
            <Link href="/app">
              <a className={navStyle.button}>Play now 🥳</a>
            </Link>
          </div>
        </div>
      </>
    );
  }
}
