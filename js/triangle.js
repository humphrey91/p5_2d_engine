/**
 * @x1 
 * @y1
 * @X2
 * @y2
 * @x3
 * @y3
 * Defines position Vector of the Triangle
 */
class Triangle extends GameObject {
    constructor(x1,y1,x2,y2,x3,y3,id) {
        // Calc the center point of the triangle for its position coordinates
        // (x,y) = (x1 + 2/3(1/2(x2+x3) - x1), y1 + 2/3(1/2(y2+y3) - y1))
        super((x1 + (2/3 * (.5 * (x2 + x3) - x1))),(y1 + (2/3 * (.5 * (y2 + y3) - y1))),id)
        this.sides = 3
        this.distances = this.setDistances([x1,y1,x2,y2,x3,y3]) 
    }

    shape() {
        noStroke()
        fill(this.color)
        push()
        translate(this.position.x, this.position.y)
        rotate(this.rotation)
        triangle(this.distances[0].x,this.distances[0].y,this.distances[1].x,this.distances[1].y,this.distances[2].x,this.distances[2].y)
        pop()
    }

    update() {
        super.update()
        this.shape()
    }

    setDistances(coordinates) {
        let vectors = []
        for (let i = 0; i < coordinates.length; i+=2) {
            vectors.push(createVector(coordinates[i] - this.position.x, coordinates[i+1] - this.position.y))
        }
        return vectors
    }
}