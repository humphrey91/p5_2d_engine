// GLOBALS
gamePieces = new Collection()
screenSize = .85
idCounter = 0
canvas = null

function setup() {
  rectMode(CENTER)
  angleMode(DEGREES)  
  canvas = createCanvas(window.innerWidth * screenSize, window.innerHeight * screenSize)
  createGamePieces()
  rotation = 0
}

function draw() {  
  rotation += 1
  background(200) 
  gamePieces.draw()
  gamePieces.update()
  gamePieces.checkCollision()
  gamePieces[1].rotation = rotation
  gamePieces[0].position.x = mouseX
  gamePieces[0].position.y = mouseY
}

// create all game pieces
function createGamePieces() {  
  piece = new Block(300,150,100,100, ++idCounter)
  gamePieces.push(piece)
  piece = new Triangle(200,300,300,0,400,300, ++idCounter)
  gamePieces.push(piece)
}