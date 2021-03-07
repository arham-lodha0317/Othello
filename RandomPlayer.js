class RandomPlayer{
    constructor(game, turn){

        this.game = game;
        this.turn = turn;

    }

    update = () => {
        if(this.game.turn == this.turn){
            let possible = this.game.legalMoves;
            if(possible.length == 0){
                this.game.endgame=true
                return;
            }
            let index = floor(Math.random() * possible.length);

            this.game.placePeiceAtIndex(possible[index][0], possible[index][1]);
        }
    }
}