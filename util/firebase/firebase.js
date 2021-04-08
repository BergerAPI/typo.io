import firebase from 'firebase/app';
import 'firebase/database'

if (!firebase.apps.length)
    firebase.initializeApp({
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
        databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_MESSAGE_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_APP_ID
    })

export const db = firebase.database();
export default firebase