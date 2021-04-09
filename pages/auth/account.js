import Router from "next/router";
import { auth } from "../../util/firebase/firebase"

export default function Account() {
    if (auth.currentUser == null && typeof window !== 'undefined')
        Router.push('/')

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