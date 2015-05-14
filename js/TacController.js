angular
    .module('tacApp')
    .controller('TacController', TacController);




function TacController() {

    var ref = new Firebase("https://tic-tac-toe-x.firebaseio.com/");



    var score1 = 0;
    var score2 = 0;
    initBoard();



    var boxes = [-1,0,-1,1,-1,1,-1,0,1];

    function getWinner () {

        for(var row = 0; row < 3; row++){
            var sum = boxes[row * 3] + boxes[row * 3 + 1] + boxes[row * 3 + 2];
            var winner = checkWinner(sum);
            if ( winner ) { return winner; }
        }

        for(var col = 0; col < 3; col++){
            sum = boxes[col] + boxes[col + 3] + boxes[col + 6];
            winner = checkWinner(sum);
            if ( winner ) { return winner; }
        }

        sum = boxes[0] + boxes[4] + boxes[8];
        winner = checkWinner(sum);
        if ( winner ) { return winner; }

        sum = boxes[6] + boxes[4] + boxes[2];
        winner = checkWinner(sum);
        if ( winner ) { return winner; }

        return 0;

    }

    function checkWinner(sum) {
        if ( sum === 3 || sum === -3 ) {
            score1 += sum < 0 ? 0 :1;
            score2 += sum < 0 ? 0 :1;
            initBoard();
            return sum < 0 ? -1 : 1;
        } else {
            return 0;
        }
    }

    function initBoard() {
        var board = [0,0,0,0,0,0,0,0,0];
    }



    console.log(getWinner());
    getWinner();


}//end of GameController