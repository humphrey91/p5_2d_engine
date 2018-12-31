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
 * @points - getter
 * Returns all 5 block points 
 * [center, topLeft, topRight, bottomRight, bottomLeft]
 * 
 * @rotation
 * Defines Block rotation angle. A positive angle rotates the Block clockwise.
 */


class Block extends gameObject {
    constructor(x,y,w,h,id) {
        super(x,y,id)
        this.width = w
        this.height = h
        this.points = this.calcPoints
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

    get rotation() {
        return this._rotation
    }

    set rotation(rotation) {
        this._rotation = rotation
    }

    draw(){
        this.shape()
    }

    update() {
        super.update()
        this.draw()
    }

    get calcPoints() {
        let a = 0.5 * this.width
        let b = 0.5 * this.height
        return {
            center: createVector(this.position.x,this.position.y),
            topLeft: createVector(this.position.x - a,this.position.y - b),
            topRight: createVector(this.position.x + a,this.position.y - b),
            bottomRight: createVector(this.position.x + a,this.position.y + b),
            bottomLeft: createVector(this.position.x - a,this.position.y + b)
        }
    }

    
}