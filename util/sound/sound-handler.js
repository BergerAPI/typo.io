let sounds = new Map()

/**
 * Loads all sounds.
 */
export function initSounds() {
    let clickSounds = []
    for (let i = 1; i < 6; i++) {
        clickSounds.push(
            new Audio("/sound/click/click_" + i + ".wav")
        );
    }

    sounds.set("click_sounds", clickSounds)
    sounds.set("error_sounds", new Audio("/sound/error.wav"))
}

/**
 * Plays a sound from the sound cache
 * @param {string} name 
 */
export function playSound(name) {
    let key = sounds.get(name)

    if(key instanceof Array) 
        key[Math.floor(Math.random() * key.length)].play()
    else if(key instanceof Audio)
        key.play()
    else 
        console.error("An error occured by loading the sound: " + name)
}

/**
 * Adds a sound to the cache
 * @param {string} name 
 * @param {Audio, Audio[]} audio 
 */
export function initSound(name, audio) {
    sounds.set(name, audio)
}