import GameLoop from "./classes/GameLoop.class.js";
import Block from "./classes/Block.class.js";
import Drawable from "./classes/Drawable.class.js";
import Player from "./classes/Player.js";
import aleatorio from "./Helpers/aleatorio.js";
import createChao from "./Helpers/createChao.js";
import Sprite from "./classes/Sprite.js";
import showText from "./Helpers/showText.js";
import maxscore from './score.js'
import insertElements from "./Helpers/staticElements.js";

/*
|-------------------------------------------------------------------------------------------------------
|    INSERT ENEMIES AND DRAW
|-------------------------------------------------------------------------------------------------------
*/
const draw = (data) => {
    const {loop, player, speed0, chao} = data

    window.loop = loop
    let timeInsere = data.timeInsere
    if (loop.draw()) {
        if (timeInsere <= 0  && loop.insertEnemies) {
            new Block(loop, aleatorio(20, 40), aleatorio(40, 70), aleatorio(0, 4), chao.y)
            // const sprite = new Sprite("./assets/sprites/objectos/picos.png", block.size.w, block.size.h, 1);
            // block.setImage(sprite)
            timeInsere = speed0 * aleatorio(40 + loop.speed, 90 + loop.speed)
        } else {
            timeInsere -= loop.speed
            loop.speed += loop.speed <= 20 ? 0.0005:0
            player.img.setSteps(5 * (speed0 / loop.speed))
            player.fallImg.setSteps(5 * (speed0 / loop.speed)) 
            player.jumpImg.setSteps(5 * (speed0 / loop.speed))
            loop.audio.playbackRate += loop.audio.playbackRate < 1.6 ? 0.00005:0
        }
        // Inserir elementos aleatorios de animacao na tela
        insertElements(loop, data.elementTime)
    }
    requestAnimationFrame(() => {
        data.timeInsere = timeInsere
        if (!data.elementTime || data.elementTime <= 0) {
            data.elementTime = aleatorio(50, 160)
        } else {
            data.elementTime -= 1/3
        }
        draw(data)
    })
}

const startGame = (canvas, playerInfo) => {
    window.state = 1
    const loop = new GameLoop(canvas, 6)
    let colisions = []
    const chao = createChao(loop, "./assets/chao.png")
    loop.backGround({
        url: "./assets/fundo.jpg",
        w: loop.contextSize.w,
        h: loop.contextSize.h - chao.size.h
    })
    loop.audio = new Audio("./assets/sons/Tema/run.mp3")

    /*
    |-------------------------------------------------------------------------------------------------------
    |    PLAYER
    |-------------------------------------------------------------------------------------------------------
    */
    const player = new Player(loop, 50, 50, chao)
    // Sprites do player
    const img = new Sprite("./assets/sprites/personagens/" + playerInfo.src + "/run.png", 
        playerInfo.run.w / playerInfo.run.sprites, playerInfo.run.h, playerInfo.run.sprites
    )
    player.setImage(img)

    const imgJump = new Sprite("./assets/sprites/personagens/" + playerInfo.src + "/jump.png", 
        playerInfo.jump.w / playerInfo.jump.sprites, playerInfo.jump.h, playerInfo.jump.sprites
    )
    player.jumpImg = imgJump
    const imgFall = new Sprite("./assets/sprites/personagens/" + playerInfo.src + "/fall.png", 
        playerInfo.fall.w, playerInfo.fall.h, 1
    )
    player.fallImg = imgFall
    // vidas
    player.lifes = 3;



    /*
    |-------------------------------------------------------------------------------------------------------
    |    PLAYER LIFES
    |-------------------------------------------------------------------------------------------------------
    */
    (() => {
        const life = new Drawable(loop, 30, 30, Drawable.TYPE_LIFE)
        // const lifeImg = new Sprite("./assets/sprites/personagens/ninja/head.png", 80, 80, 1, life)
        const lifeImg = new Sprite("./assets/sprites/personagens/" + playerInfo.src + "/head.png", 
            playerInfo.head.w, playerInfo.head.h, 1, life
        )
        life.setImage(lifeImg)
        life.pos = {
            x: loop.contextSize.w - 130,
            y: 25
        }
        const lifes = new Drawable(loop, 100, 30, Drawable.TYPE_LIFE)
        lifes.pos = {x: loop.contextSize.w - 100, y: 45}
        lifes.color = "#1f872c"
        lifes.update = () => {
            lifes.setText(`x ${player.lifes}`,  "sans-serif", 25)
        }
    })();


    /*
    |-------------------------------------------------------------------------------------------------------
    |    PLAYER SCORE
    |-------------------------------------------------------------------------------------------------------
    */
    (() => {
        const score = new Drawable(loop, 200, 30)
        score.pos = {x: 20, y: 40}
        score.color = "#1f872c"
        score.update = () => {
            score.setText(`${player.score} pontos`, "sans serif", 25)
        }
    })();


    /*
    |-------------------------------------------------------------------------------------------------------
    |    VERIFY COLISION & BLOCK OUTSIDE
    |-------------------------------------------------------------------------------------------------------
    */
    loop.onDrawing = (drawable, key) => {
        if (drawable.TYPE == Drawable.TYPE_BLOCK) {
            if (!colisions.includes(key)) {
                if (player.colideX(drawable) && player.colideY(drawable)) {
                    player.lifes--
                    if (player.lifes <= 0) {
                        window.state = 2
                        loop.insertEnemies = false
                        for(const drb_key in loop.drawables) {
                            const drb = loop.drawables[drb_key]
                            if (drb.TYPE != Drawable.TYPE_PLAYER && drb.TYPE != Drawable.TYPE_LIFE) {
                                drb.update = () => null
                            }
                        }
                        drawable.update = () => {
                            showText(canvas, `Pontuacao: ${player.score}`)
                            if (player.score > maxscore.get()) {
                                maxscore.set(player.score)
                                // new high score
                                const high = new Drawable(loop, 100, 30, Drawable.TYPE_LIFE)
                                high.pos = {x: loop.contextSize.w / 2 - high.size.w - 35, y: 50 }
                                high.color = "#1f872c"
                                high.setText(`Nova pontuacao maxima`,  "sans-serif", 25)
                                high.draw()
                            }
                        }

                        if (player.jumps <= 0) {
                            // esta pulando
                            player.runImg.stopAnimation()
                        } else {
                            player.img.stopAnimation()
                        }
                        // impedir que pule
                        player.noJump()

                        // parar loop
                        loop.stop(true)
                    }
                    colisions.push(key)
                }
            }
        } 
        // else if (drawable.TYPE == Drawable.TYPE_STATIC) {
        //     // eliminar elementos aleatorios de animacao
        //     if (drawable.x - drawable.size.w <= 0) {
        //         drawable.remove()
        //     }
        // }
    }
    loop.onRemove = (drawable, key) => {
        if (drawable.TYPE == Drawable.TYPE_BLOCK) {
            player.score++
            if (colisions.includes(key)) {
                colisions.splice(colisions.indexOf(key), 1)
            }
        }
    }

    /*
    |-------------------------------------------------------------------------------------------------------
    |    LISTEN SPACE CLICK
    |-------------------------------------------------------------------------------------------------------
    */
    addEventListener("keydown", evt => {
        if (["ArrowUp", " "].includes(evt.key)) {
            player.jump()
        }
    })
    const timeInsere = 15
    const speed0 = loop.speed
    draw({
        loop: loop, 
        timeInsere: timeInsere, 
        player: player, 
        speed0: speed0, 
        chao: chao
    })
}


export default startGame
