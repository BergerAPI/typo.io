import styles from '../styles/modules/Home.module.css'
import { UserList } from "../components/leaderboard/User-List.jsx"

export default function Leaderboard() {

    return (
        <>
            <h1 className={styles.title}>Leaderboards</h1>
            <UserList />
        </>
    )
}
