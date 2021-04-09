import Router from "next/router";
import { auth } from "../../util/firebase/firebase"

export default function Login() {
    const inputCss = {
        width: "100%",
        cursor: "pointer"
    }

    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: 0
            }}>
                <input style={inputCss} name="email" type="email" placeholder="Email" />
                <input style={inputCss} name="password" type="password" placeholder="Password" />
                <button style={inputCss} onClick={() => {
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
            </div>
            <p style={{ cursor: "pointer", fontFamily: "monospace" }} onClick={() => {
                Router.push("/auth/register")
            }}>No account yet?</p>
        </>
    )
}