import Head from 'next/head'
import { Navbar } from '../../components/Navbar.jsx'
import styles from '../../styles/modules/Home.module.css'
import secondaryStyle from '../../styles/modules/Credits.module.css'

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
                <h1 className={styles.title}>Special Thanks To:</h1>

                <p className={styles.user}>
                    Vercel with <a href="https://www.nextjs.com/" className={secondaryStyle.product}>NextJS</a>
                </p>
                <p className={styles.user}>
                    Peu77 with <a href="https://www.devdocs.io/css/" className={secondaryStyle.product}>CSS Support</a>
                </p>
                <p className={styles.user}>
                    Jochebed with the <a href="https://www.psychologytoday.com/us/blog/hot-thought/201005/how-be-creative" className={secondaryStyle.product}>Idea</a>
                </p>
                <p className={styles.user}>
                    Youtube with <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" className={secondaryStyle.product}>Music</a>
                </p>
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