/**
 * @x 
 * @y
 * Defines position Vector of the Block
 * 
 * @w
 * @h
 * Defines width and height of Block
 */
class Block extends GameObject {
    constructor(x,y,w,h,id) {
        super(x,y,id)
        this.width = w
        this.height = h
        this.sides = 4
        this.distances = this.setDistances()
    }

    shape() {
        noStroke()
        fill(this.color)    
        push()
        translate(this.position.x, this.position.y)
        rotate(this.rotation)
        rect(0, 0, this.width, this.height)
        pop()
    }

    update() {
        super.update()
        this.shape()
    }

    setDistances() {
        return [
            createVector(-this.width / 2,this.height / 2),
            createVector(-this.width / 2,-this.height / 2),
            createVector(this.width / 2,-this.height / 2),
            createVector(this.width / 2,this.height / 2)
        ]
    }
}