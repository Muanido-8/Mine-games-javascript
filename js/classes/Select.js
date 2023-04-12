class Select {
    #el = document.createElement("select")
    #min
    #max
    #parent
    template = `{{i}}`
    onChange = (index, evt) => { return null; }
    constructor(parent, min, max) {
        this.#min = min
        this.#max = max
        this.#parent = parent
        this.#el.addEventListener("change", evt => {
            this.#select(evt)
        })
    }

    mount() {
        this.#el.innerHTML = ""
        for(let i = this.#min; i <= this.#max; i++) {
            let opt = document.createElement("option")
            opt.setAttribute("value", i)
            opt.innerHTML = this.template.replaceAll('{{i}}', i)
            opt.innerHTML = opt.innerHTML.replaceAll('{{min}}', this.#min)
            opt.innerHTML = opt.innerHTML.replaceAll('{{max}}', this.#max)
            this.#el.appendChild(opt)
        }

        this.#parent.appendChild(this.#el)
    }

    remount(min, max) {
        this.#parent.removeChild(this.#el)
        this.#min = min
        this.#max = max
        this.mount()
    }

    #select(evt) {
        this.onChange(evt.target.value, evt)
    }

    get val() {
        return this.#el.value
    }
}

export default Select