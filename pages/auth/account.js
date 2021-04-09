import Router from "next/router";
import { auth } from "../../util/firebase/firebase"

export default function Account() {
    if (typeof window !== 'undefined') {
        auth.onAuthStateChanged((authUser) => {
            if (authUser === null)
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

            <input type="text" name="link" placeholder="Link" />
            <button onClick={async () => {
                let link = document.querySelector("input[name='link']").value

                await auth.onAuthStateChanged(async (authUser) => {
                    if (authUser !== null)
                        await authUser.updateProfile({
                            photoURL: link
                        })
                });
            }} type="submit">Save</button>
        </>
    )
}