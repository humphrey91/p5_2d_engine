class Collection extends Array {
    constructor(){
        super()
        this.hero = null
    }

    draw() {
        for (let i = 0; i < this.length; i++) {
            this[i].draw()
        }
    }

    update() {
        for (let i = 0; i < this.length; i++) {
            this[i].update()
        }
    }
}