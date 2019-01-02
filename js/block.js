/**
 * @x 
 * @y
 * Defines position Vector of the Block
 * 
 * @w
 * @h
 * Defines width and height of Block
 * 
 * @id
 * Defines Object ID
 * 
 * @axes - getter
 * Returns all 4 axes
 * [topLeft, topRight, bottomRight, bottomLeft]
 * 
 * @rotation
 * Defines Block rotation angle. A positive angle rotates the Block clockwise.
 */


class Block extends gameObject {
    constructor(x,y,w,h,id) {
        super(x,y,id)
        this.width = w
        this.height = h
    }

    shape() {
        noStroke()
        fill(this.color)
        if (this.rotation !== null || this.rotation !== 0){
            push()
            translate(this.position.x, this.position.y)
            rotate(this.rotation)
            rect(0, 0, this.width, this.height)
            pop()
        } else {
            rect(this.position.x, this.position.y, this.width, this.height)
        }
    }

    draw(){
        this.shape()
    }

    update() {
        super.update()
        this.draw()
    }        
}