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

            for (let i = 0; i < (Math.random() * (70 - 40) + 40); i++)
                text += data.words[Math.floor(Math.random() * data.words.length)] + " ";

            response = text.substring(0, text.length - 1);
        });
    console.log(response)
    return response
}

/**
 * Creates a random string
 * @param {number} length 
 * @returns random string
 */
export function randomString(length = 64) {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-';

    let str = '';
    for (let i = 0; i < length; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return str;
}

/**
 * Packages a array into parts
 * @param {strign} text 
 * @param {number} count 
 */
export function packageArray(text, count) {
    const words = text.split(" ");
    const nineLength = Math.round(words.length / count);
    const lines = [];
    const last = [];
    const temp = [];

    for (let i = 0; i < nineLength + 1; i++) {
        if (i == 0) continue;

        let double = i * count;
        let start = double - count;

        if (start < 0) start = 0;

        lines.push(words.slice(start, double));
    }

    if (nineLength * count < words.length) {
        for (let i in lines)
            for (let a of lines[i])
                temp.push(a);

        for (let r of words.slice(temp.length, words.length))
            last.push(r)

        lines.push(last);
    }

    return lines
}