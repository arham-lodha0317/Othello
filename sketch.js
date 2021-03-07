let tile;
let offset;
let boardSize;
let game;
let whiteScore;
let BlackScore;
let score;
let player;
let restart;

function setup() {
  pixelDensity(2);
  createCanvas(600, 600);
  background("#3b8e69");

  boardSize = 8;
  offset = 25;
  tile = (width - 2 * offset) / boardSize;

  game = new Othello(boardSize, offset, tile);
  score = game.score;
  
  whiteScore = createP("White Score : " + score['White']);
  blackScore = createP("Black Score : " + score['Black']);

  player = new RandomPlayer(game, 2);

  restart = createButton("Restart game")
  restart.mousePressed(restartGame)
}

function draw() {
  background("#3b8e69");
  drawGrid();
  game.drawGameboard();

  score = game.score;
  whiteScore.html("White Score : " + score["White"]);
  blackScore.html("Black Score : " + score["Black"]);

  player.update();
}

drawGrid = () => {
  strokeWeight(3);
  stroke(0);
  noFill();
  rect(offset, offset, width - 2 * offset, height - 2 * offset);

  for (let i = 1; i < boardSize + 1; i++) {
    line(offset + i * tile, offset, offset + i * tile, height - offset);
    line(offset, offset + i * tile, width - offset, offset + i * tile);
  }
};

mousePressed = () => {
  if (mouseX >= offset && mouseX <= width - offset) {
    if (mouseY >= offset && mouseY <= width - offset) {
      game.placePeice(mouseX, mouseY);
    }
  }
};

restartGame = () => {
  print("Game is Restarted");
  game = new Othello(boardSize, offset, tile);
  score = game.score;

  whiteScore.html("White Score : " + score["White"]);
  blackScore.html("Black Score : " + score["Black"]);

  player = new RandomPlayer(game, 2);
}
