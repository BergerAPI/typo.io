import styles from '../../styles/modules/Home.module.css'
import secondaryStyle from '../../styles/modules/Credits.module.css'

export default function Home() {
    return (
        <div className={styles.container}>
                <h1 className={styles.title}>Special Thanks To:</h1>
            
                <p className={styles.user}>
                    Vercel with <a href="https://www.nextjs.com/" target="_blank" className={secondaryStyle.product}>NextJS</a>
                </p>
                <p className={styles.user}>
                    Peu77 with <a href="https://www.devdocs.io/css/" target="_blank" className={secondaryStyle.product}>CSS Support</a>
                </p>
                <p className={styles.user}>
                    Jochebed with the <a href="https://www.psychologytoday.com/us/blog/hot-thought/201005/how-be-creative" target="_blank" className={secondaryStyle.product}>Idea</a>
                </p>
                <p className={styles.user}>
                    Youtube with <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" className={secondaryStyle.product}>Music</a>
                </p>
        </div>
    )
}