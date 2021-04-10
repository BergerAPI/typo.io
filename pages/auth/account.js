import Router from "next/router";
import { auth, db } from "../../util/firebase/firebase"

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

            <div>
                <input type="text" name="link" placeholder="Link" />
                <button onClick={async () => {
                    let link = document.querySelector("input[name='link']").value

                    await auth.onAuthStateChanged(async (authUser) => {
                        if (authUser !== null) {
                            await authUser.updateProfile({
                                photoURL: link
                            })

                            const snapshot = await db.collection("stats").get();

                            snapshot.docs.forEach((doc) => {
                                if (doc.data().userUid === authUser.uid)
                                    db.collection("stats").doc(doc.id).update({ photo: link })
                            });
                        }
                    });
                }} type="submit">Save</button>
            </div>
            <div>
                <input type="text" name="username" placeholder="Username" />
                <button onClick={async () => {
                    let username = document.querySelector("input[name='username']").value

                    await auth.onAuthStateChanged(async (authUser) => {
                        if (authUser !== null) {
                            await authUser.updateProfile({
                                displayName: username
                            })

                            const snapshot = await db.collection("stats").get();

                            snapshot.docs.forEach((doc) => {
                                if (doc.data().userUid === authUser.uid)
                                    db.collection("stats").doc(doc.id).update({ displayName: username })
                            });
                        }
                    });
                }} type="submit">Save</button>
            </div>
        </>
    )
}