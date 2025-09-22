
class GameLoop {
    /*
    |--------------------------------------------------------------------------------
    | PROPERTIES
    |--------------------------------------------------------------------------------
    */
    #ctx
    #drawables = {}
    gravity = 0.95
    onDrawing = () => {}
    onRemove = (drawable) => {}
    #canvas
    #index = 0
    #draw = true
    #backGround
    #audio
    
    static TYPE_BLOCK = Symbol('Drwable block type')
    static TYPE_PLAYER = Symbol('Drwable block type')
    static TYPE_CENARY = Symbol('Drwable block type')
    // Constructor
    constructor(canvas, speed = 6) {
        this.#ctx = canvas.getContext("2d")
        this.#canvas = canvas
        this.speed = speed
        this.insertEnemies = true
        this.#backGround =  false
    }

    /*
    |--------------------------------------------------------------------------------
    | MOTHODS
    |--------------------------------------------------------------------------------
    */
    // Draw all drawables
    draw() {
        if (this.#draw) {
            this.context.clearRect(0,0,this.contextSize.w,this.contextSize.h)
            // Desenhar o fundo
            if (this.#backGround) {
                this.context.drawImage(this.#backGround.img, 0, 0, this.#backGround.w, this.#backGround.h)
            }
            for(let key in this.#drawables) {
                let drawable = this.#drawables[key]
                this.onDrawing(drawable, key)
                drawable.draw()
            }
            if (this.#audio && this.#audio.paused) {
                this.#audio.play()
            }
        } else {
            this.#audio.pause()
        }

        return true
    }
    // Adicionar a lista de desenhaveis
    addDrawable(drawable) {
        this.#index++
        this.#drawables[`drawable${this.#index}`] = drawable

        return `drawable${this.#index}`
    }
    // Remover da lista de desenho
    removeDrawable(key) {
        const drawable = this.#drawables[key]
        this.onRemove(drawable, key)
        delete this.#drawables[key]
        return true
    }
    // stop loop drawing
    stop(stop = true) {
        this.#draw = !stop
        if (this.#audio) {
            this.#audio.pause()
        }
    }
    // Set bg Image
    backGround(options) {
        const img = new Image()
        img.src = options.url
        options.img = img
        this.#backGround = options
    }

    /*
    |--------------------------------------------------------------------------------
    | GETTERS
    |--------------------------------------------------------------------------------
    */
    get context() {
        return this.#ctx
    }
    get contextSize() {
        return {
            w: this.#canvas.width, 
            h: this.#canvas.height
        }
    }
    get drawables() {
        return this.#drawables
    }
    get audio() {
        return this.#audio
    }

    /*
    |--------------------------------------------------------------------------------
    | SETTERS
    |--------------------------------------------------------------------------------
    */
    set audio(audio) {
        this.#audio = audio
    }
}



/*
|--------------------------------------------------------------------------------
| EXPORT CLASS
|--------------------------------------------------------------------------------
*/
export default GameLoop
