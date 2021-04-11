import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/auth'

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
        databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_MESSAGE_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
    })
}

export const db = firebase.firestore();
export const auth = firebase.auth();

/**
 * Opens a popup and tries to auth the user with google
 * @returns the user
 */
export async function registerWithGoogle() {
    let returns;

    await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((result) => returns = result.user)
        .catch(() => returns = undefined);

    return returns;
}

/**
 * Checks if a user already exists
 * @param {User} googleUser 
 * @param {User} firebaseUser 
 * @returns 
 */
function isUserEqual(googleUser, firebaseUser) {
    if (firebaseUser) {
        const providerData = firebaseUser.providerData;
        for (let i = 0; i < providerData.length; i++)
            if (providerData[i].providerId === firebase.auth.GoogleAuthProvider().PROVIDER_ID &&
                providerData[i].uid === googleUser.getBasicProfile().getId()) {
                return true;
            }
    }
    return false;
}

/**
 * Writes the user to the database
 */
export async function createDatabaseUser(user) {
    // In here we update the profile with a basic username and
    // a basic profile picture provided by us.
    await user.updateProfile({
        displayName: user.email.split("@")[0],
        photoURL: "https://firebasestorage.googleapis.com/v0/b/typo-io.appspot.com/o/default-profile.png?alt=media&token=984243f8-947d-4f41-945a-e9fbd3d0825f"
    })

    // Currently we need a second database collection because
    // Firebase doesn't allow us to write extra data into their
    // firebase or google users. Sadly thats the only solution
    // I heard of.
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
}

export default firebase