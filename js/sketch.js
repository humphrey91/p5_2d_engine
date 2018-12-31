// GLOBALS
gamePieces = []
screenSize = .85
idCounter = 0
canvas = null

function setup() {
  rectMode(CENTER)
  angleMode(DEGREES)  
  canvas = createCanvas(window.innerWidth * screenSize, window.innerHeight * screenSize)
  createGamePieces()
}

function draw() {  
  background(200)
  
  gamePieces.forEach(piece => {
    piece.update()
  })
  
  gamePieces[0].position.x = mouseX
  gamePieces[0].position.y = mouseY
  gamePieces[0].checkCollision(gamePieces)
   
}

// create all game pieces
function createGamePieces() {  
  for (i = 0; i < 5; i++) {
    piece = new Block(random(200,400),random(200,400),30, 30, ++idCounter)
    gamePieces.push(piece)
  }
  piece = new Block(400,400, 100,10, ++idCounter)
  gamePieces.push(piece)
  piece = new Block(400, 700, 100, 3, ++idCounter)
  piece.rotation = 10
  gamePieces.push(piece)
}