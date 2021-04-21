<h1 align="center">Typo.io</h1>

<p align="center">This is a simple type education app made for learning some Next.js and React.js</p>

# Warning

The purpose of this little project is not to compete with other typing platforms, just to teach myself, a little Next.js. For this reason it would be nice not to judge me for the code. As I said before, I'm still learning.

# Contributing

The first and only step to set up the project, after you cloned it, is to create a firebase app and link it to the projects.
To do this just go to [Firebase](https://firebase.google.com) and create a new project, that you call for example ```typo-io-contributing```. After that you create a web app inside the firebase project and copy the api information. And to finaly setup the project, create a next.config.js in the project root directory with following content: 
```
module.exports = {
    env: {
        NEXT_PUBLIC_API_KEY: "your-api-key",
        NEXT_PUBLIC_AUTH_DOMAIN: "your-auth-domain",
        NEXT_PUBLIC_PROJECT_ID: "your-project-id",
        NEXT_PUBLIC_STORAGE_BUCKET: "your-storage-bucket",

        NEXT_PUBLIC_MESSAGE_SENDER_ID: "your-message-sender-id",
        NEXT_PUBLIC_APP_ID: "your-app-id",
    }
}
```
Now you are ready to contribute.
