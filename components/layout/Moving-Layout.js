import Head from 'next/head'
import { Navbar } from '../Navbar.jsx'
import styles from "../../styles/components/layout/Layout.module.css"

const MovingLayout = ({ children }) => {

    return (
        <div className={styles.content}>
            <Head>
                <title>typo.io</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="color-scheme" content="dark light" />
            </Head>

            <Navbar />

            <main className={styles.main}>
                    {children}
            </main>

            <div className={styles.footer}>
                <p>
                    Powered by{' '}
                    <code>niclas@127.0.0.1</code>
                </p>
            </div>

        </div>
    )
}


export default MovingLayout