/**
 * @position
 * A Vector that defines the center pont of a GameObject
 * 
 * @velocity
 * A velocity vector
 * 
 * @acceleration
 * An acceleration vector
 * 
 * @color
 * The color of the object
 * 
 * @id
 * A unique identifier
 * 
 * @rotation
 * Angle in degrees of object rotation
 * 
 * @gravity
 * If object should have gravity applied
 * 
 */
class GameObject {
    constructor(x,y,id){
        this.position = createVector(x, y)
        this.velocity = createVector(0,0)
        this.acceleration = createVector(0,0.163)
        this.color = 'black'
        this.id = id
        this.rotation = null
        this.graviy = false
    }

    applyGravity() {
        if (this.gravity) {
            this.velocity.add(this.acceleration)
        }
    }

    move() {
        this.position.add(this.velocity)
    }

    update() {
        this.applyGravity()
        this.move()
    }

    get vertices() {
        // [cos𝜃 −sin𝜃][𝑥]=[𝑥 cos𝜃 − 𝑦 sin𝜃]
        // [sin𝜃  cos𝜃][𝑦]=[𝑥 sin𝜃 + 𝑦 cos𝜃]
        let r = this.rotation
        let vertices = []
        this.distances.forEach(distance => {
            vertices.push(createVector(distance.x * cos(r) - distance.y * sin(r) + this.position.x, distance.x * sin(r) + distance.y * cos(r) + this.position.y))
        })
        return vertices
    }

    checkCollision(objects) {
        let hits = []

        let otherPieces = objects.filter((obj) => {
            return obj != this 
        })

        // projects sides against all axis of 2 objects and determines if all of the sides are overlapping
        // see Separating Axis Theorem (SAT) https://en.wikipedia.org/wiki/Hyperplane_separation_theorems
        otherPieces.forEach(element => {
            let hit = true
            let axes1 = this.normalAxes()
            let axes2 = element.normalAxes()
            for (let i = 0; i < axes1.length; i++) {
                let axis = axes1[i].copy()
            
                let p1 = this.projection(axis);
                let p2 = element.projection(axis);
                
                if (!this.overlap(p1,p2)) {  
                    hit = false
                }
            }
            for (let i = 0; i < axes2.length; i++) {
                let axis2 = axes2[i].copy()
                
                let p1 = this.projection(axis2);
                let p2 = element.projection(axis2);
                
                if (!this.overlap(p1,p2)) {  
                    hit = false
                }
            }
            if (hit) { hits.push(element.id) }
        });
        
        this.handleCollision(hits)      
    }

    normalAxes() {
        // gets an axis so we can project the side against it
        const vertices = this.vertices
        let normalAxis = []
        for (let i = 0; i < vertices.length; i++) {
            let n1 = vertices[i].copy()
            let n2 = vertices[i+1 == vertices.length ? 0 : i+1].copy()
        
            let edge = n1.sub(n2)
            
            let normal = createVector(-edge.y,edge.x)
            
            normalAxis.push(normal)
        }
        return normalAxis
    }

    projection(axis) {
        // projects side against axis
        const vertices = this.vertices
        let min = axis.dot(vertices[0])
        let max = min
        for (let i = 1; i < vertices.length; i++) {
            let p = axis.dot(vertices[i])
            if (p < min) {
                min = p
            } else if (p > max) {
                max = p
            }
        }
        return [min , max]
    }

    overlap(element1,element2) {
        if (Math.max(element1[0], element2[0]) < Math.min(element1[1], element2[1])) { return true }
    }

    handleCollision(hits) {
        if (hits.length > 0) {
            this.color = 'red'
        } else {
            this.color = 'black'
        }
        hits.forEach(hit => {
            let hitPiece = gamePieces.find(piece => {
                return piece.id === hit
            })
            hitPiece.velocity.x = -hitPiece.velocity.x 
            hitPiece.velocity.y = -hitPiece.velocity.y 
        })
    }
}