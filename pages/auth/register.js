import { auth, registerWithGoogle } from "../../util/firebase/firebase"
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
              photoURL: "https://www.knack.com/images/about/default-profile.png"
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