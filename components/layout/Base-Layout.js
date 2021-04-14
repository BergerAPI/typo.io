import Head from 'next/head'
import { Navbar } from '../Navbar.jsx'
import styles from "../../styles/components/layout/Layout.module.css"
import { applyTheme } from '../../util/helper';
import { Config } from '../../util/config';

const BaseLayout = ({ children }) => {

    return (
        <div className={styles.content} style={{
            height: "100vh",
        }}>
            <Head>
                <title>typo.io</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />

            <main className={styles.main} style={{
                position: "absolute",
                top: "50%",
                width: "100%",
                "-ms-transform": "translateY(-50%)",
                "transform": "translateY(-50%)"
            }}>
                {children}
            </main>

            <div className={styles.footer} style={{
                bottom: 0,
                position: "fixed",
            }}>
                <p>
                    Powered by{' '}
                    <code>niclas@127.0.0.1</code>
                </p>
            </div>

        </div >
    )
}


export default BaseLayout