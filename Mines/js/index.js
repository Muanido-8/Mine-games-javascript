import Select from "./classes/Select.js"
import { startGame } from "./start.js"


const select = new Select(document.querySelector("#select"), 3, 10)
select.template = '{{i}} X {{i}}'
const select2 = new Select(document.querySelector("#select2"), 1, 6)
select2.template = '{{i}} minas'

select.onChange = (index, evt) => {
    select2.remount(1, index**2 - 3)
}
select.mount()
select2.mount()

//Start game
document.querySelector("#form").addEventListener("submit", evt => {
    evt.preventDefault()
    const app = document.querySelector("#app")
    app.innerHTML = ""
    startGame(app, select.val, select2.val)
})
