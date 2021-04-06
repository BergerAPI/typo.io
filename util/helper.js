/**
 * Gets a random quote from the backend api
 * @param {string} language 
 */
export async function getQuote(language) {
    let response = undefined

    await fetch("api/language/" + language)
        .then((res) => res.json())
        .then((data) =>
            response = data.quotes[Math.floor(Math.random() * data.quotes.length)]
        );
    return response
}

/**
 * Gets a random words from the backend api and puts them together
 * @param {string} language 
 */
export async function getRandomText(language) {
    let response = undefined
    await fetch("api/language/" + language)
        .then((res) => res.json())
        .then((data) => {
            let text = "";

            for (let i = 0; i < (Math.random() * (30 - 20) + 20); i++)
                text += data.words[Math.floor(Math.random() * data.words.length)] + " ";

            response = text.substring(0, text.length - 1);
        });
    console.log(response)
    return response
}