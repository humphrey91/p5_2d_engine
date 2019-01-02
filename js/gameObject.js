class gameObject {
    constructor(x,y,id){
        this.position = createVector(x, y)
        this.velocity = createVector(0,0)
        this.acceleration = createVector(0,0.163)
        this.color = 'black'
        this.id = id
        this.rotation = null
    }

    applyGravity() {
        this.velocity.add(this.acceleration)
    }

    move() {
        this.position.add(this.velocity)
    }

    update() {
        // this.applyGravity()
        this.move()
    }

    checkCollision(objects) {
        let hits = []

        let otherPieces = objects.filter((obj) => {
            return obj != this 
        })
        
        // let closestPieces = otherPieces.sort((a,b) => {this.position.dist(a.position) < this.position.dist(b.position)}).slice(0,5)

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

    get vertices() {
        let Ox = 0.5 * this.width
        let Oy = 0.5 * this.height

        if (this.rotation === null || this.rotation === 0) {
            return [
                createVector(this.position.x - Ox,this.position.y - Oy),
                createVector(this.position.x + Ox,this.position.y - Oy),
                createVector(this.position.x + Ox,this.position.y + Oy),
                createVector(this.position.x - Ox,this.position.y + Oy)
            ]
        } else {
            return [
                createVector(this.position.x + (Oy * sin(this.rotation)) - (Ox * cos(this.rotation)), this.position.y - (Oy * cos(this.rotation)) - (Ox * sin(this.rotation))),
                createVector(this.position.x + (Ox * cos(this.rotation)) + (Oy * sin(this.rotation)), this.position.y + (Ox * sin(this.rotation)) - (Oy * cos(this.rotation))),
                createVector(this.position.x + (Ox * cos(this.rotation)) - (Oy * sin(this.rotation)), this.position.y + (Ox * sin(this.rotation)) + (Oy * cos(this.rotation))),
                createVector(this.position.x - (Ox * cos(this.rotation)) - (Oy * sin(this.rotation)), this.position.y - (Ox * sin(this.rotation)) + (Oy * cos(this.rotation)))
            ]
        }
    }

    normalAxes() {
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
        if (Math.max(element1[0], element2[0]) <= Math.min(element1[1], element2[1])) { return true }
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