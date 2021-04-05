let values = new Map()

export function setValue(name, value) {
    this.values.set(name, value)
}

export function getValue(name) {
    return this.value.get(name)
}

export function save(localStorage) {
    localStorage.set("config", JSON.jsonify(values))
}

export function load(localStorage) {
    
}