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

                    if(!link.match(/\.(jpg|gif|png)$/)) {
                        alert("link is not an image. Please use file format .jpg, .png, .gif")
                        return
                    }

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

                            db.collection("users").doc(authUser.uid).update({ photoURL: link })
                        }
                    });
                }} type="submit">Save</button>
            </div>
            <div>
                <input type="text" name="username" placeholder="Username" />
                <button onClick={async () => {
                    let username = document.querySelector("input[name='username']").value

                    await auth.onAuthStateChanged(async (authUser) => {
                        if (authUser !== null && username.length >= 3 && username.length <= 12 && username.match(/^[a-zA-Z0-9]+$/)) {
                            await authUser.updateProfile({
                                displayName: username
                            })

                            const snapshot = await db.collection("stats").get();

                            snapshot.docs.forEach((doc) => {
                                if (doc.data().userUid === authUser.uid)
                                    db.collection("stats").doc(doc.id).update({ displayName: username })
                            });

                            db.collection("users").doc(authUser.uid).update({ displayName: username })
                        }else {
                            alert("Your username isn't following the name conventions. Your name should only contain letters from a to z in uppercase and lower case and numbers from 0 to 9. Also it should be in the lenght from 3 to 12.")
                        }
                    });
                }} type="submit">Save</button>
            </div>
        </>
    )
}