import Drawable from "./Drawable.class.js";

class Block extends Drawable {
    /*
    |--------------------------------------------------------------------------------
    | PROPERTIES
    |--------------------------------------------------------------------------------
    */
    #colors = ["red", "blue", "yellow", "orange"]
    // constructor
    constructor(loop, w, h, cor, y) {
        super(loop, w, h, Drawable.TYPE_BLOCK)
        this.pos = {
            x: loop.contextSize.w, 
            y: y - h
        }
        this.color = this.#colors[cor]
    }

    /*
    |--------------------------------------------------------------------------------
    | MOTHODS
    |--------------------------------------------------------------------------------
    */
    // Move block from right to left
    update() {
        this.pos = {
            x: this.x - this.loop.speed,
        }
        //remover do drawable
        if (this.x + this.size.w <= 0) {
            this.remove()
        }
    }
    
    /*
    |--------------------------------------------------------------------------------
    | GETTERS
    |--------------------------------------------------------------------------------
    */

    /*
    |--------------------------------------------------------------------------------
    | SETTERS
    |--------------------------------------------------------------------------------
    */

}

export default Block