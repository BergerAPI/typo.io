import { Button } from '../components/Button.jsx'
import styles from '../styles/modules/Home.module.css'

export default function Home() {
  return (
    <>
        <h1 className={styles.title}>
          Welcome to <a>typo</a>
        </h1>

        <p className={styles.description}>
          Get started typing your a** off
        </p>

        <Button text="start now" href="/app" />
    </>
  )
}
