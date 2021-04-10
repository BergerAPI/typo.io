import { auth, registerWithGoogle, db } from "../../util/firebase/firebase"
import Router from "next/router";

export default function Register() {
  const inputCss = {
    width: "100%",
    cursor: "pointer"
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: 0
    }}>
      <input style={inputCss} name="email" type="email" placeholder="Email" />
      <input style={inputCss} name="password" type="password" placeholder="Password" />

      <button style={inputCss} onClick={async () => {
        let email = document.querySelector("input[name='email']").value
        let password = document.querySelector("input[name='password']").value

        await auth.createUserWithEmailAndPassword(email, password)
        .then(async (cred) => {
            let user = cred.user

            await user.updateProfile({
              displayName: email.split("@")[0],
              photoURL: "https://firebasestorage.googleapis.com/v0/b/typo-io.appspot.com/o/default-profile.png?alt=media&token=984243f8-947d-4f41-945a-e9fbd3d0825f"
            })

            await db.collection("users").doc(user.uid).set({
              displayName: user.displayName,
              photoURL: user.photoURL,
              banned: false,
              badges: [],
              stats: [],
              nameChanges: [],
              pictureChanges: [],
              keyboard: "😭"
            })
        })
          .catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage)
          });

        Router.push("/app")
      }} type="submit">Submit</button>

      <button style={inputCss} onClick={async () => {
        let result = await registerWithGoogle()

        if (result !== undefined)
          Router.push("/app")
      }} type="submit">Register with Google</button>
    </div>
  )
}