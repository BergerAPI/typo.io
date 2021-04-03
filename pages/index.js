import Head from 'next/head'
import { Button } from '../components/Button.jsx'
import { Navbar } from '../components/Navbar.jsx'
import styles from '../styles/modules/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>typo.io</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="color-scheme" content="dark light" />
      </Head>

      <Navbar />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a>typo</a>
        </h1>

        <p className={styles.description}>
          Get started typing your a** off
        </p>

        <Button text="start now" href="/app" />
      </main>

      <footer className={styles.footer}>
        <p>
          Powered by{' '}
          <code>niclas@127.0.0.1</code>
        </p>
      </footer>
    </div>
  )
}
