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
}

function draw() {  
  background(200) 
  gamePieces.draw()
  gamePieces.update()
  gamePieces.checkCollision()
}

// create all game pieces
function createGamePieces() {  
  piece = new Block(300,150,100,100, ++idCounter)
  gamePieces.push(piece)
  piece = new Triangle(200,300,300,200,400,300, ++idCounter)
  gamePieces.push(piece)
}