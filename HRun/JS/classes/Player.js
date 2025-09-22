import Drawable from "./Drawable.class.js";

class Player extends Drawable {
    /*
    |--------------------------------------------------------------------------------
    | PROPERTIES
    |--------------------------------------------------------------------------------
    */
    #jumps = 0
    #maxJumps = 1
    impulse = 17
    #speed = 1
    #chao
    #runImg = null
    #jumpImg = null
    #fallImg = null
    #downImg = null
    #speed0
    #score
    #lifes = 3
    // constructor
    constructor(loop, w, h, chao) {
        super(loop, w, h, Drawable.TYPE_PLAYER)
        this.pos = {
            x: 40, 
            y: chao.y - this.size.h
        }
        this.color = "#00ff00"
        this.#chao = chao
        this.#speed0 = loop.speed
        this.score = 0
    }

    /*
    |--------------------------------------------------------------------------------
    | MOTHODS
    |--------------------------------------------------------------------------------
    */
    // Set gravity
    update() {
        this.#speed += this.loop.gravity
        let y = this.y + this.#speed
        this.pos = {
            y: y
        }
        if (this.colideY(this.#chao)) {
            this.#speed = 0
            this.#jumps = this.#maxJumps
            this.pos = {
                y: this.#chao.y - this.size.h
            }
            if(this.#runImg) {
                this.setImage(this.#runImg)
            }
        } else if (this.#speed >= 0) {
            if(this.#fallImg) {
                this.setImage(this.#fallImg)
            }
        }
    }

    jump() {
        if (this.#jumps > 0) {
            this.#speed += -this.impulse
            this.#jumps -= 1
            new Audio("./assets/sons/Accoes/jump.wav").play()
            if (this.#jumpImg) {
                this.#runImg = this.img
                this.setImage(this.#jumpImg)
            }
        }
    }
    noJump() {
        this.#maxJumps = 0
        // this.#jumps = 0
    }
    
    /*
    |--------------------------------------------------------------------------------
    | GETTERS
    |--------------------------------------------------------------------------------
    */
    get lifes() {
        return this.#lifes
    }
    get score() {
        return this.#score
    }
    get runImg() {
        return this.#runImg
    }
    get jumps() {
        return this.#jumps
    }
    get fallImg() {
        return this.#fallImg
    }
    get jumpImg() {
        return this.#jumpImg
    }
    get downImg() {
        return this.#downImg
    }
    /*
    |--------------------------------------------------------------------------------
    | SETTERS
    |--------------------------------------------------------------------------------
    */
    set jumpImg(img) {
        this.#jumpImg = img
    }
    set fallImg(img) {
        this.#fallImg = img
    }
    set downImg(img) {
        this.#downImg = img
    }
    set lifes(lifes) {
        // lifes 0 - 7
        let lfs = parseInt(lifes)
        if (isNaN(lfs) || lfs < 0 || lfs > 7) {
            return false
        } else {
            this.#lifes = lifes
            return true
        }
    }
    set score(newScore) {
        this.#score = newScore 
    }
}

export default Player