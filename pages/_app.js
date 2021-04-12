import '../styles/global/globals.css'
import BaseLayout from "../components/layout/Base-Layout"

/**
 * The main method 😍
 */
function Typo({ Component, pageProps }) {
    const Layout = Component.Layout || BaseLayout;

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}

export default Typo
