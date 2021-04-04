import '../styles/global/globals.css'
import BaseLayout from "../components/layout/Base-Layout"

/**
 * The main method 😍
 */
function Typo({ Component, pageProps }) {
    return (
        <BaseLayout>
            <Component {...pageProps} />
        </BaseLayout>
    )
}

export default Typo
