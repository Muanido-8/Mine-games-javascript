import Drawable from "../classes/Drawable.class.js"
import Sprite from "../classes/Sprite.js"
import aleatorio from "./aleatorio.js"
import elements from "../../json/elements.js" // assert {type: 'json'}

const insertElements = (loop, time) => {
    if (time <= 0) {
        const element = elements[aleatorio(0, elements.length)]

        const drawable = new Drawable(loop, element.w, element.h)
        drawable.pos = {
            x: loop.contextSize.w,
            y: aleatorio(50, loop.contextSize.h / 2 -element.h)
        }

        const sprite = new Sprite("./assets/sprites/elementos/" + element.url + ".png", 
            element.frame.w / element.frame.sprites, element.frame.h, 
        element.frame.sprites)
        sprite.setSteps(element.frame.sprites * 2)
        
        drawable.setImage(sprite)
        if (element.url == 'bird') {
            // emitir som de passaro
            (new Audio("./assets/sons/Accoes/birds.mp3")).play()
        }

        drawable.update = () => {
            drawable.pos = {
                x: drawable.x - loop.speed / 2.5
            }

            //remover drawable
            if (drawable.x + drawable.size.w <= 0) {
                drawable.remove()
            }
        }
    }
}

export default insertElements
