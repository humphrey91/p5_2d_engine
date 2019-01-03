class Triangle extends GameObject {
    constructor(x1,y1,x2,y2,x3,y3,id) {
        // (x,y) = (x1 + 2/3(1/2(x2+x3) - x1), y1 + 2/3(1/2(y2+y3) - y1))
        super((x1 + (2/3 * (.5 * (x2 + x3) - x1))),(y1 + (2/3 * (.5 * (y2 + y3) - y1))),id)
        this.sides = 3
        this.distance1 = this.vertexDistance(x1,y1)
        this.distance2 = this.vertexDistance(x2,y2)
        this.distance3 = this.vertexDistance(x3,y3)
    }

    shape() {
        noStroke()
        fill(this.color)
        push()
        translate(this.position.x, this.position.y)
        rotate(this.rotation)
        triangle(this.distance1.x,this.distance1.y,this.distance2.x,this.distance2.y,this.distance3.x,this.distance3.y)
        pop()
    }

    draw(){
        this.shape()
    }

    update() {
        super.update()
        this.draw()
    }

    vertexDistance(x,y) {
        return createVector(x - this.position.x, y - this.position.y)
    }

    get vertices() {
        // [cos𝜃 −sin𝜃][𝑥]=[𝑥 cos𝜃 − 𝑦 sin𝜃]
        // [sin𝜃  cos𝜃][𝑦]=[𝑥 sin𝜃 + 𝑦 cos𝜃]
        let r = this.rotation
    
        return [
            createVector(this.distance1.x * cos(r) - this.distance1.y * sin(r) + this.position.x, this.distance1.x * sin(r) + this.distance1.y * cos(r) + this.position.y),
            createVector(this.distance2.x * cos(r) - this.distance2.y * sin(r) + this.position.x, this.distance2.x * sin(r) + this.distance2.y * cos(r) + this.position.y),
            createVector(this.distance3.x * cos(r) - this.distance3.y * sin(r) + this.position.x, this.distance3.x * sin(r) + this.distance3.y * cos(r) + this.position.y)
        ]
    }
}