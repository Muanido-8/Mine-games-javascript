class Sprite {
    #framew
    #frameh
    #frame
    #frames
    #parent
    #steps = 0
    #step = 1
    #loop
    #img
    #animate = true
    constructor(img, framew, frameh, frames) {
        this.#img = new Image()
        this.#img.src = img
        this.#framew = frameh
        this.#frameh = framew
        this.#frames = frames - 1
        this.#frame = 0
    }

    parent(parent) {
        this.#loop = parent.loop
        this.#parent = parent
    }
    #update() {
        if (this.#animate) {
            if (this.#step <= 0) {
                if (this.#frame >= this.#frames) {
                    this.#frame = 0
                } else {
                    this.#frame += 1
                }
                this.#step = this.#steps
            } else {
                this.#step -= 1
            }
        }
    }

    draw(x, y) {
        this.#update()
        this.#loop.context.drawImage(this.#img, this.#frame * this.#framew, 0,
            this.#framew, this.#frameh, x, y, this.#parent.size.w, this.#parent.size.h)
    }

    stopAnimation(stop = true, frame = 1) {
        this.#animate = !stop
        this.#frame = frame - 1
    }

    setSteps(steps = 1) {
        this.#steps = steps
    }

    get frames() {
        return this.#frames
    }

    get steps() {
        return this.#steps
    }
}

export default Sprite