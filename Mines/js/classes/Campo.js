class Campo {
    #parent
    #length
    #key
    #table
    #weight
    #mines = 1
    #campo = []
    #clicks = []
    onClick = (pos, valid, mine = false, value, clicksQuantity) => { return null }
    
    constructor(parent, key) {
        this.#parent = parent
        this.#key = key
    }
    #embaralhar(pos) {
        pos -= 1
        this.#campo.splice(pos, 1)
        let arr = []
        for(let i = 0; i < this.#campo.length; i++) {
            let nr = Math.floor(Math.random() * (this.#campo.length - 0) + 0)
            arr.push( this.#campo[nr])
            this.#campo.splice(nr, 1)
            i--
        }
        arr.splice(pos, 0, "no-mine")
        this.#campo = arr

        this.#verifyClick(pos + 1)
    }

    #clicked(pos) {
        return this.#clicks.includes(pos)
    }

    #haveMine(pos) {
        return this.#campo[pos-1] === "mine"
    }

    #minesAround(pos) {
        if (this.#haveMine(pos)) {
            return "M"
        }
        let counter = 0
        const line = Math.ceil(pos / this.#length)
        const col = pos - (line - 1) * this.#length
        //percorer desde a coluna anterior ate a coluna segunte
        for(let i = col - 1; i <= col + 1; i++) {
            //para cada coluna, percorrer desde a linha anterior a linha seguinte
            for(let k = line - 1; k <= line + 1; k++) {
                if (i >= 1 && i <= this.#length && k >= 1 && k <= this.#length) {
                    let x = i + (k - 1) * this.#length
                    if (this.#haveMine(x)) {
                        counter++
                    }
                }
            }
        }
        return counter
    }

    #mountCampo(pos) {
        let mines = 0
        for(let i = 1; i <= this.#length * this.#length; i++) {
            //Montar o back do campo minado
            let $mina = mines < this.#mines ? "mine":"no-mine"
            if (i == pos) {
                $mina = "no-mine"
            }
            mines += $mina == "mine" ? 1:0
            this.#campo.push($mina)
        }
        //Embaralhar o campo minado
        this.#embaralhar(pos)
    }

    #verifyClick(pos, evt) {
        if (this.#campo.length > 0) {
            let obj = {}
            //Verificar se ja foi clicado
            if (this.#clicked(pos)) {
                obj.valid = false
            } else {
                //adicionar clique
                this.#clicks.push(pos)
                obj.valid = true
                document.getElementById(`${this.#key}-${pos}`).setAttribute("clicked", 1)
                if (this.#haveMine(pos)) {
                    obj.mined = true
                    document.getElementById(`${this.#key}-${pos}`).setAttribute("mine", 1)
                } else {
                    obj.mined = false
                }
            }
            const value = this.#minesAround(pos)
            document.getElementById(`${this.#key}-${pos}`).innerHTML = value
            this.onClick(pos, obj.valid, obj.mined, value, this.#clicks.length)
        } else {
            //Primeiro clique, montar campo e clicar novamente
            this.#mountCampo(pos)
        }
    }

    mount(rows, weight = 80) {
        if (parseInt(rows) ** 2 <= this.#mines) {
            throw new Error(`{-- the square of the parameter rows must be an int greater than ${this.#mines} --}`)
        }
        this.#weight = weight
        this.#length = parseInt(rows)
        this.#table = document.createElement("table")
        this.#table.setAttribute("border", 1)
        this.#table.id = this.#key

        for(let i = 1; i <= this.#length; i++) {
            let tr = document.createElement("tr")
            for(let id = 1; id <= this.#length; id++) {
                let td = document.createElement("td")
                let tdid = (i - 1) * rows + id
                td.setAttribute("clicked", 0)
                td.id = `${this.#key}-${tdid}`
                td.addEventListener("click", evt => {
                    this.#verifyClick(tdid, evt)
                })
                tr.appendChild(td)
            }
            this.#table.style.width = `${this.#length * this.#weight}px`
            this.#table.style.height = `${this.#length * this.#weight}px`
            this.#table.appendChild(tr)
        }

        //adicionar a table ao app
        this.#parent.appendChild(this.#table)
    }

    /*
    *************************************************************************
    SETTERS
    *************************************************************************
    */
    set mines(mines = 1) {
        if (isNaN(parseInt(mines)) || parseInt(mines) < 1) {
            throw new Error(`{-- The property mines must be an int greater than 1 --}`)
        }
        this.#mines = parseInt(mines)
    }

    /*
    *************************************************************************
    GETTERS
    *************************************************************************
    */
    get length() {
        return this.#length ** 2
    }

    get mines() {
        return this.#mines
    }
}

export default Campo