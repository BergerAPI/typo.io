let currentConfig = {
    mode: "",
    language: "",
    clickSounds: false,
    errorSounds: false
}

export function load() {
    if (localStorage.getItem("config"))
        this.currentConfig = JSON.parse(localStorage.getItem("config"))
    else this.save()
}

export function save() {
    localStorage.setItem("config", currentConfig)
}