
class Drawable {
    /*
    |--------------------------------------------------------------------------------
    | PROPERTIES
    |--------------------------------------------------------------------------------
    */
    #loop
    #ctx
    #x = 0
    #y = 0
    #w
    #h
    #img
    #text
    #fontFamily
    #fontSize
    #TYPE
    #speed
    #key
    color = '#a0a0a0'
    static TYPE_BLOCK = Symbol('Block')
    static TYPE_STATIC = Symbol('default')
    static TYPE_LIFE = Symbol('life')
    static TYPE_PLAYER = Symbol('player')
    // Constructor
    constructor(loop, w, h, type = Drawable.TYPE_STATIC) {
        this.#ctx = loop.context
        this.#loop = loop
        this.#speed = loop.speed
        this.#w = w
        this.#h = h
        this.#TYPE = type
        this.#text = false
        this.#img = false
        this.#add()
    }

    /*
    |--------------------------------------------------------------------------------
    | MOTHODS
    |--------------------------------------------------------------------------------
    */
    // update for statick
    update() {
        // Nothing happen
    }
    // se sprite image
    setImage(sprite) {
        sprite.parent(this)
        this.#img = sprite
    }
    // set text
    setText(text = "", fontFamily = this.#fontFamily, fontSize = this.#fontSize) {
        this.#fontFamily = fontFamily
        this.#text = text
        this.#fontSize = fontSize
    }
    // Adicionar a lista de desenhaveis
    #add() {
        let key = this.#loop.addDrawable(this)
        this.#key = key
    }
    // Draw all drawables
    draw() {
        this.update()
        this.#ctx.fillStyle = this.color
        if (this.#img) {
            // Draw Image
            this.#img.draw(this.#x, this.#y)
        } else if (this.#text) {
            // draw text
            this.#ctx.font = `${this.#fontSize}px ${this.#fontFamily}`
            this.#ctx.fillText(this.#text, this.#x, this.#y)
        } else {
            // Draw rectangle
            this.#ctx.fillRect(this.#x, this.#y, this.#w, this.#h)
        }
    }
    //remover da tela
    remove() {
        this.#loop.removeDrawable(this.#key)
    }
    // Colisao com outro desenhavel
    colideX(other) {
        if (this.x + this.size.w >= other.x && this.x <= other.x + other.size.w) {
            return true
        }
        return false
    }
    colideY(other) {
        if (this.y + this.size.h >= other.y && this.y <= other.y + other.size.h) {
            return true
        }
        return false
    }
    /*
    |--------------------------------------------------------------------------------
    | GETTERS
    |--------------------------------------------------------------------------------
    */
    get x() { return this.#x }
    get y() { return this.#y }
    get size() {
        return { w: this.#w, h: this.#h}
    }
    get speed() { return this.#speed }
    get loop() { return this.#loop }
    get TYPE() { return this.#TYPE }
    get img() { return this.#img }
    get key() { return this.#key }

    /*
    |--------------------------------------------------------------------------------
    | SETTERS
    |--------------------------------------------------------------------------------
    */
    set pos({x = this.#x, y = this.#y}) {
        this.#x = x
        this.#y = y
    }
}



/*
|--------------------------------------------------------------------------------
| EXPORT CLASS
|--------------------------------------------------------------------------------
*/
export default Drawable