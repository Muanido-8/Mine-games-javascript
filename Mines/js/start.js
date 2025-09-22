import Campo from "./classes/Campo.js"

const startGame = (parent, sqaures, mines) => {
    const campo = new Campo(parent, "campo1")
    campo.mines = mines
    campo.mount(sqaures, 60)

    let time = 0
    //Montar dados do jogo
    const html = `
        <h1> Dados </h1>
        <p> Total quadrados: <b id='squares'>${campo.length}</b> </p>
        <p> Quadrados clicados: <b id='clicks'>0</b> </p>
        <p> Quadrados restantes: <b id='diff'>${campo.length - campo.mines}</b> </p>
        <p> Minas: <b id='mines'>${campo.mines}</b> </p>
        <p> Tempo: <b id='time'>0</b> </p>
    `
    const dados = document.createElement("div")
    dados.setAttribute("class", "dados")
    dados.innerHTML = html
    parent.appendChild(dados)

    //Ao clicar em cada quadrado
    campo.onClick = (pos, valid, mine, value, clicksQuantity) => {
        //verificar se foi um click valido
        if (valid) {
            //verifica se foi o primeiro click para iniciar o jogo
            if (clicksQuantity == 1) {
                setInterval(() => { 
                    time++
                    document.getElementById("time").innerText = `${time} segundos` 
                }, 1000)
            }
            //verifica se foi uma mina
            if (mine) {
                //emitir um alerta sonoro
                alert(`Voce perdeu\nAinda faltam ${(campo.length - campo.mines) - clicksQuantity} campos sem minas\nO seu tempo foi de ${time} segundos`)
                location.reload()
            } else {
                //actualizar cliques
                document.getElementById("clicks").innerText = clicksQuantity
                //actualizar restantes
                document.getElementById("diff").innerText = (campo.length - campo.mines) - clicksQuantity
                //verificar se venceu
                if (clicksQuantity >= campo.length - campo.mines) {
                    alert(`PARABENS!!!\n\n\nVoce venceu\nSeu tempo foi de ${time} segundos`)
                    location.reload()
                }
            }
        } else {
            //Enviar um alerta com som
        }
    }
}

export { startGame }