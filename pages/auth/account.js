import Router from "next/router";
import { auth } from "../../util/firebase/firebase"

export default function Account() {
    if (typeof window !== 'undefined') {
        auth.onAuthStateChanged((authUser) => {
            Router.push('/')
        })
    }

    return (
        <>
            <button onClick={() => {
                auth.signOut().then(() => {
                    Router.push("/")
                })
            }} type="submit">Logout</button>
        </>
    )
}