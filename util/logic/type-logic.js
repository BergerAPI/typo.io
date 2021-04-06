
export function calculate(time, typedText, errors, words) {
    const mins = Math.round((time / 1000) * 1) / 1
    let wpm = Math.round(((typedText.length - errors + words.length - 2) * (60 / mins)) / 5)

    const rawAccuracy = (((typedText.length - errors) / typedText.length) * 100)
    let accuracy = Math.round(rawAccuracy)

    if (isNaN(accuracy) || accuracy.toString().includes("-Infinity"))
        accuracy = 100

    if (isNaN(wpm) || wpm.toString().includes("-Infinity"))
        wpm = 0

    if (typedText.length < errors) {
        wpm = 0
        accuracy = 0
    }

    return { wpm, accuracy }
}