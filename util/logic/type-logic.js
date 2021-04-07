

/**
 * Calculates the wpm and the accuracy
 * @param {number} time 
 * @param {string} typedText 
 * @param {number} errors 
 * @param {Array} words 
 * @returns 
 */
export function calculate(time, typedText, errors, words) {
    const mins = Math.round((time / 1000) * 1) / 1
    let wpm = Math.round((((typedText.length - errors) + (words.length - 2)) * (60 / mins)) / 5)
    let raw = Math.round((typedText.length * (60 / mins)) / 5);
    let cpm = Math.round(((typedText.length - errors) * (60 / mins)));

    const rawAccuracy = (((typedText.length - errors) / typedText.length) * 100)
    let accuracy = Math.round(rawAccuracy)

    if (isNaN(accuracy) || accuracy.toString().includes("-Infinity"))
        accuracy = 100

    if (isNaN(wpm) || wpm.toString().includes("-Infinity") || wpm < 0)
        wpm = 0

    if (isNaN(raw) || raw.toString().includes("-Infinity") || raw < 0)
        raw = 0

    if (isNaN(cpm) || cpm.toString().includes("-Infinity") || cpm < 0)
        cpm = 0

    if (typedText.length < errors) {
        wpm = 0
        accuracy = 0
        raw = 0
    }

    return { wpm, accuracy, raw, cpm }
}