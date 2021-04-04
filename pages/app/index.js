import Head from 'next/head'
import { Navbar } from '../../components/Navbar.jsx'
import { Input } from '../../components/Input.jsx'
import styles from '../../styles/modules/App.module.css'
import { promises as fs } from 'fs'
import path from 'path'

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

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

export async function getStaticProps() {
  const dataPath = path.join(process.cwd(), '/public/data/quotes.json')
  const data = await fs.readFile(dataPath, 'utf8')
  const jsonObject = JSON.parse(data);

  let quoteLenght = jsonObject.messages.length - 1;
  let quote =
    jsonObject.messages[
    Math.floor(randomNumber(0, quoteLenght))
    ];

  return {
    props: {
      text: quote.quote,
      author: quote.author,
    }
  };
}
