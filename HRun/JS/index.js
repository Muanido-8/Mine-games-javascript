import maxScrore from "./score.js"
import startGame from "./start.js"
import showText from "./Helpers/showText.js"
import players from "../json/players.js" //assert { type: 'json'}


window.state = 0
// create canvas
const canvas = document.createElement("canvas")
canvas.width = 800
canvas.height = 500
canvas.id = "canvas"
canvas.classList.add("game-area")
document.body.appendChild(canvas)

// show max score text
showText(canvas, `potuacao maxima: ${maxScrore.get() ? maxScrore.get():'---'}`)


addEventListener("keydown", evt => {
    if (evt.key == " ") {
        switch(window.state) {
            case 2:
                canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height)
                // mostrar pontuacao maxima
                showText(canvas, `potuacao maxima: ${maxScrore.get() ? maxScrore.get():'---'}`)
                showPlayers(canvas)
                window.state = 0
                break
        }
    }
})

// choose player div
const showPlayers = (canvas) => {
    const div = document.createElement("div")
    div.classList.add("choose-player")
    div.innerHTML = '<h3> Selecione seu corredor</h3>'
    players.forEach((player) => {
        const playerContainer = document.createElement("div")
        playerContainer.id = player.src
        playerContainer.classList.add("player")

        // Image
        const image = document.createElement("img")
        image.src = "./assets/sprites/personagens/" + player.src + "/main.png"
        image.width = 100
        image.height = 100
        playerContainer.appendChild(image)

        // Label name
        const label = document.createElement("label")
        label.innerHTML = player.name
        playerContainer.appendChild(label)

        // click to select
        playerContainer.addEventListener("click", evt => {
            canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height)
            let count = 0
            div.remove()
            showText(canvas, `Vamos correr em: ${count}`)
            const t = setInterval(() => {
                count--
                canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height)
                showText(canvas, `Vamos correr em: ${count}`)
                if (count < 0) {
                    startGame(canvas, player)
                    clearInterval(t)
                }
            }, 1000)
        })

        // add container player to div
        div.appendChild(playerContainer)

        document.body.appendChild(div)
    });
}

showPlayers(canvas)
