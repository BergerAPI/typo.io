import Head from "next/head";
import Link from "next/link";
import React from "react";
import navStyle from "../styles/components/Navbar.module.css";
import { auth } from "../util/firebase/firebase";

export class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginState: "login",
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((authUser) => {
      this.setState({
        loginState: authUser === null ? "login" : "account",
      });
    })
  }

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
            <Link href="/config">
              <a className={navStyle.link}>Config</a>
            </Link>
            <Link href="/leaderboard">
              <a className={navStyle.link}>Leaderboard</a>
            </Link>
            <Link href={"/auth/" + this.state.loginState}>
              <a className={navStyle.link}>
                {this.state.loginState === "account" ? "Account" : "Login"}
              </a>
            </Link>
            <Link href="/app">
              <a className={navStyle.button}>Play now</a>
            </Link>
          </div>
        </div>
      </>
    );
  }
}
