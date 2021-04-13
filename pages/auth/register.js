import { auth, registerWithGoogle, createDatabaseUser, db } from "../../util/firebase/firebase"
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
          .then(async (cred) => createDatabaseUser(cred.user))
          .catch((error) => alert("An error occured: " + error.message));

        Router.push("/")
      }} type="submit">Submit</button>

      <button style={inputCss} onClick={async () => {
        let user = await registerWithGoogle()

        if (user !== undefined) {

          // I need a snapshot here to check if the document exists 😭
          let existingDoc = await db.collection("users").doc(user.uid).get()

          // The user is already authed. No need to create
          // a new database entry.
          if (!existingDoc.exists)
            await createDatabaseUser(user)

          Router.push("/")
        }
      }} type="submit">Register with Google</button>
    </div>
  )
}