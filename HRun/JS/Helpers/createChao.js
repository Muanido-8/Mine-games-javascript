import Drawable from "../classes/Drawable.class.js"
import Sprite from "../classes/Sprite.js"

const createChao = (loop, url) => {
    const chao = new Drawable(loop, loop.contextSize.w, 50)
    const chaoFake = new Drawable(loop, loop.contextSize.w, 50)
    chao.setImage(new Sprite(url, 50, loop.contextSize.w, 1, chao))
    chaoFake.setImage(new Sprite(url, 50, loop.contextSize.w, 1, chaoFake))
    chao.pos = {
        y: loop.contextSize.h - chao.size.h,
    }
    chaoFake.pos = {
        y: loop.contextSize.h - chaoFake.size.h,
        x: chao.x + chao.size.w - 10
    }

    chao.update = () => {
        if (chao.x <= -loop.contextSize.w) {
            chao.pos = {x: 0}
        }
        chao.pos = {
            x: chao.x - loop.speed
        }
        chaoFake.pos = {x: chao.x + chao.size.w}
    }

    return chao
}

export default createChao