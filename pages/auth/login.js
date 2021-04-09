import Router from "next/router";
import { auth } from "../../util/firebase/firebase"

export default function Register() {
  return (
    <>
      <input name="email" type="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <button onClick={() => {
        let email = document.querySelector("input[name='email']").value
        let password = document.querySelector("input[name='password']").value

        auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
          Router.push("/app")
        })
          .catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage)
          });
      }} type="submit">Submit</button>
    </>
  )
}