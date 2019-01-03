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
 * @vertices - getter
 * Returns all 4 vertices
 * [topLeft, topRight, bottomRight, bottomLeft]
 * 
 * @rotation
 * Defines Block rotation angle. A positive angle rotates the Block clockwise.
 */


class Block extends GameObject {
    constructor(x,y,w,h,id) {
        super(x,y,id)
        this.width = w
        this.height = h
        this.sides = 4
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

    draw(){
        this.shape()
    }

    update() {
        super.update()
        this.draw()
    }        

    get vertices() {
        let Ox = 0.5 * this.width
        let Oy = 0.5 * this.height

        return [
            createVector(this.position.x + (Oy * sin(this.rotation)) - (Ox * cos(this.rotation)), this.position.y - (Oy * cos(this.rotation)) - (Ox * sin(this.rotation))),
            createVector(this.position.x + (Ox * cos(this.rotation)) + (Oy * sin(this.rotation)), this.position.y + (Ox * sin(this.rotation)) - (Oy * cos(this.rotation))),
            createVector(this.position.x + (Ox * cos(this.rotation)) - (Oy * sin(this.rotation)), this.position.y + (Ox * sin(this.rotation)) + (Oy * cos(this.rotation))),
            createVector(this.position.x - (Ox * cos(this.rotation)) - (Oy * sin(this.rotation)), this.position.y - (Ox * sin(this.rotation)) + (Oy * cos(this.rotation)))
        ]
        
    }
}