export class Config {
    constructor() {
        this.currentConfig = new Map()
    }

    /**
     * Sets a value instantly saves the config
     */
    set(key, value) {
        this.load()
        this.currentConfig.set(key, value)
        this.save()
    }

    /**
     * Gets a value from the config
     */
    get(key) {
        this.load()
        return this.currentConfig.get(key)
    }

    /**
     * Saves the current config, or if no config is loaded, 
     * it loads the default config
     */
    save() {
        localStorage.clear()

        if (this.currentConfig.size !== 0) {
            localStorage.setItem("config", JSON.stringify(Object.fromEntries(this.currentConfig)))

            console.log("gg ")
            console.log(this.currentConfig)
        } else {

            console.log("fff")

            // Loading the default config here
            this.currentConfig.set("inputMode", "words")
            this.currentConfig.set("language", "english")
            this.currentConfig.set("clickSounds", false)
            this.currentConfig.set("errorSounds", false)
            this.currentConfig.set("unit", "wpm")
            this.currentConfig.set("mode", "15s")
            this.currentConfig.set("fontSize", "30px")
            this.currentConfig.set("fontFamily", "Source Code Pro")
            localStorage.setItem("config", JSON.stringify(Object.fromEntries(this.currentConfig)))
        }
    }

    /**
     * Loads the Config
     */
    load() {
        if (localStorage.getItem("config") !== null)
            this.currentConfig = new Map(Object.entries(JSON.parse(localStorage.getItem("config"))))
        else this.save()
    }
}