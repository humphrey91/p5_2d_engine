class gameObject {
    constructor(x,y,id){
        this.position = createVector(x, y)
        this.velocity = createVector(0,0)
        this.acceleration = createVector(0,0.163)
        this.color = 'black'
        this.id = id
        this._rotation = null
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
        let hit = false

        let otherPieces = objects.filter((obj) => {
            return obj != this
        })
        
        otherPieces.forEach(element => {
            if(abs(this.position.x - element.position.x) < (0.5 * (this.width + element.width))) {
                if (abs(this.position.y - element.position.y) < (0.5 * (this.height + element.height))) {
                    hit = true
                }
            }
        });

        this.handleCollision(hit)        
    }

    handleCollision(hit) {
        if (hit === true) {
            this.color = 'red'
        } else {
            this.color = 'black'
        }
    }
}