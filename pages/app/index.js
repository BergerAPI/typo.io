import Head from 'next/head'
import { Navbar } from '../../components/Navbar.jsx'
import { Input } from '../../components/Input.jsx'
import styles from '../../styles/modules/App.module.css'

export default function App({ text, author }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>typo.io</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="color-scheme" content="dark light" />
      </Head>

      <Navbar />

      <main className={styles.main}>
        <Input text={text} author={author}>
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

export async function getStaticProps() {
  const response = await fetch("http://0.0.0.0:3000/data/quotes.json")
  const jsonObject = await response.json();

  let quoteLenght = jsonObject.messages.length;
  let quote =
    jsonObject.messages[
    Math.floor(Math.random() * (quoteLenght - 1 - -1) + 0)
    ];
  return {
    props: {
      text: quote.quote,
      author: quote.author,
    }
  };
}
