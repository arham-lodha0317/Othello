class Othello {
  constructor(boardSize, offset, tile) {
    this.boardSize = boardSize;

    this.gameboard = [];

    for (let i = 0; i < boardSize; i++) {
      this.gameboard.push([]);

      for (let j = 0; j < boardSize; j++) {
        this.gameboard[i].push(0);
      }
    }

    this.gameboard[3][3] = 2;
    this.gameboard[3][4] = 1;
    this.gameboard[4][3] = 1;
    this.gameboard[4][4] = 2;

    this.offset = offset + tile / 2;
    this.tile = tile;
    this.turn = 1;

    this.legalMoves = this.getLegalMoves();
    this.score = this.calculateScore();
  }

  drawGameboard = () => {
    noStroke();

    for (let i = 0; i < this.gameboard.length; i++) {
      const arr = this.gameboard[i];

      for (let j = 0; j < this.gameboard.length; j++) {
        const position = arr[j];

        if (position == 0) continue;
        fill(255 * (position - 1));
        circle(this.offset + tile * j, this.offset + tile * i, this.tile * 0.8);
      }
    }

    for (let i = 0; i < this.legalMoves.length; i++) {
      const arr = this.legalMoves[i];
      fill(255 * (this.turn - 1), 255 * 0.4);
      circle(
        this.offset + tile * arr[1],
        this.offset + tile * arr[0],
        this.tile * 0.8
      );
    }
  };

  getLegalMoves = () => {
    let legal = [];

    for (let i = 0; i < this.gameboard.length; i++) {
      const row = this.gameboard[i];
      for (let j = 0; j < row.length; j++) {
        const entry = row[j];
        if (entry != this.turn) continue;

        for (let dy = -1; dy < 2; dy++) {
          if (i + dy < 0 || i + dy == this.gameboard.length) {
            continue;
          }

          for (let dx = -1; dx < 2; dx++) {
            if (j + dx < 0 || j + dx == this.gameboard.length) {
              continue;
            } else if (
              this.gameboard[i + dy][j + dx] == this.turn ||
              this.gameboard[i + dy][j + dx] == 0
            ) {
              continue;
            }

            let moves = this.legalMovesInDirection(i + dy, j + dx, dx, dy);
            if (moves != null) {
              legal.push(moves);
            }
          }
        }
      }
    }

    let t = {}

    return legal.filter((a => !(t[a]=a in t)));
  };

  existsInArray = (array, array1) => {

    if(array.length == 0) return false;

    for (let i = 0; i < array.length; i++) {
        const arr = array[i];
        for (let j = 0; j < arr.length; j++) {
            const element = arr[j];
            const elem = array1[j];
            
            if(element != elem) return false;
        }
    }

    return true;
  }

  legalMovesInDirection = (y, x, dx, dy) => {
    while (
      y >= 0 &&
      y != this.gameboard.length &&
      x >= 0 &&
      x != this.gameboard.length &&
      this.gameboard[y][x] != 0 &&
      this.gameboard[y][x] != this.turn
    ) {
      y += dy;
      x += dx;
    }

    if (
      y >= 0 &&
      y != this.gameboard.length &&
      x >= 0 &&
      x != this.gameboard.length &&
      this.gameboard[y][x] == 0
    ) {
      return [y, x];
    } else return null;
  };

  placePeice = (mouseX, mouseY) => {
    for (let i = 0; i < this.legalMoves.length; i++) {
      const coord = this.legalMoves[i];

      let x = this.offset + this.tile * coord[1];
      let y = this.offset + this.tile * coord[0];
    
    

      if (abs(mouseX - x) <= tile*.5 && abs(mouseY - y) <= tile*.5) {
        //update gameboard
        this.gameboard[coord[0]][coord[1]] = this.turn;
        this.updateBoard(coord[1], coord[0]);

        //change turns and get legal moves
        this.turn = this.turn == 1 ? 2 : 1;
        this.legalMoves = this.getLegalMoves();
        break;
      }
    }
  };

  updateBoard = (x, y) => {
    let captured = [];
    for (let dy = -1; dy < 2; dy++) {
      if (y + dy < 0 || y + dy == this.gameboard.length) {
        continue;
      }

      for (let dx = -1; dx < 2; dx++) {
        if (dy == 0 && dx == 0) continue;


        if (
          x + dx < 0 ||
          x + dx == this.gameboard.length ||
          this.gameboard[y + dy][x + dx] == this.turn ||
          this.gameboard[y + dy][x + dx] == 0
        ) {
          continue;
        }

        captured = captured.concat(this.getCaptured(x + dx, y + dy, dx, dy));
      }
    }

    captured.forEach((element) => {
      this.gameboard[element[0]][element[1]] = this.turn;
    });

    this.score = this.calculateScore();
  };

  getCaptured = (x, y, dx, dy) => {
    let captured = [];


    while (
      y >= 0 &&
      y != this.gameboard.length &&
      x >= 0 &&
      x != this.gameboard.length &&
      this.gameboard[y][x] != 0 &&
      this.gameboard[y][x] != this.turn
    ) {
        captured.push([y, x]);
        y += dy;
        x += dx;
    }

    if (
      y >= 0 &&
      y != this.gameboard.length &&
      x >= 0 &&
      x != this.gameboard.length &&
      this.gameboard[y][x] == this.turn
    ) {
      return captured;
    } else return [];
  };

  calculateScore = () => {
      let score = {"Black" : 0, "White" : 0}
      for(let i = 0; i < this.gameboard.length; i++){
          const arr = this.gameboard[i];
          for(let j = 0; j < arr.length; j++){
              const elem = arr[j];
              if(elem == 1){
                  score['Black']++;
              }
              else if(elem == 2){
                  score['White']++;
              }
          }
      }

      return score;
  }

  get getGameboard(){
      return this.gameboard
  }

  get getScore() {
      return this.score;
  }
}
