
const maxScrore = {
    key: "my-game-maxscore",
    set(score) {
        localStorage.setItem(this.key, score)
    },
    get() {
        return localStorage.getItem(this.key)
    },
    reset() {
        localStorage.removeItem(this.key)
    }
}

export default maxScrore