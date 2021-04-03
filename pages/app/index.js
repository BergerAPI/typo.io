import Head from 'next/head'
import { Navbar } from '../../components/Navbar.jsx'
import { Input } from '../../components/Input.jsx'
import styles from '../../styles/modules/App.module.css'

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
        <Input text="Murder with care.">
        </Input>
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
