// GLOBALS
gamePieces = new Collection()
screenSize = .85
idCounter = 0
canvas = null

function setup() {
  rectMode(CENTER)
  angleMode(DEGREES)  
  canvas = createCanvas(window.innerWidth * screenSize, window.innerHeight * screenSize)
  piece = new Block(0, canvas.height / 2, 10, canvas.height - 11, ++idCounter)
  gamePieces.push(piece)
  piece = new Block(canvas.width, canvas.height / 2, 10, canvas.height - 11, ++idCounter)
  gamePieces.push(piece)
  piece = new Block(canvas.width / 2, 0, canvas.width - 11, 10, ++idCounter)
  gamePieces.push(piece)
  piece = new Block(canvas.width / 2, canvas.height , canvas.width - 11, 10, ++idCounter)
  gamePieces.push(piece)
  createGamePieces()
  gamePieces.hero = gamePieces[0]
}

function draw() {  
  background(200) 
  gamePieces.draw()
  gamePieces.update()
  gamePieces.forEach(piece => {
    piece.checkCollision(gamePieces)

    if (piece.position.x > canvas.width || piece.position.x < 0) {
      gamePieces = gamePieces.filter(block => {
        return block.id != piece.id
      })
    }
  })
  if (gamePieces.length === 1) {
    createGamePieces()
  }
}

// create all game pieces
function createGamePieces() {  
  for (let i = 0; i < 5; i++) {
    piece = new Block(random(200,400), random(300,500),10,10, ++idCounter)
    gamePieces.push(piece)
    piece.rotation = random(0,180)
    piece.velocity = createVector(random(-5,5),random(-5,5))
  }
}