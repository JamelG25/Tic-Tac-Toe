angular
    .module('tacApp')
    .controller('TacController', TacController);

TacController.$inject = ['$scope', '$firebaseObject'];

function TacController($scope, $firebaseObject) {

    //firebase new Object
    var ref = new Firebase("https://tic-tac-toe-x.firebaseio.com/");

    //bond scope to with firebase object and created an alias for firebaseObject
    $firebaseObject(ref).$bindTo($scope, "game");

    //
    $scope.playerMove = function (cellIndex) {

        //Bitch it's Game over!! Why are you making more moves
        if ($scope.game.gameOver === true) {
            return;
        }
        //if any cellindex is taken - cant make or replace that index.
        if ($scope.game.board[cellIndex] !== 0) {
            return;//prevent anything else happening in playermove
        }

        //everytime a index is taken it turn it to 1 or -1
        $scope.game.board[cellIndex] = $scope.game.currentPlayer;

        //if currentplayer is -1 then switch to 1. set currentplaey to -1 or 1
        if ($scope.game.currentPlayer === -1) {
            $scope.game.currentPlayer = 1;
        } else {
            $scope.game.currentPlayer = -1;
        }
        //everytime the end of the current player move we want to know if someone has won
        getWinner();
    };

    //this determine all the different way's you could win
    function getWinner() {

        var sum = 0;
        $scope.game.winner = 0;

        //win row by starting with 0 and mult time 3.
        for (var row = 0; row < 3; row++) {
            sum = $scope.game.board[row * 3] + $scope.game.board[row * 3 + 1] + $scope.game.board[row * 3 + 2];
            $scope.game.winner = checkWinner(sum);
            if ($scope.game.winner) {
                vegasWinner();
                return $scope.game.winner;
            }
        }
        //going down by bye bye
        for (var col = 0; col < 3; col++) {
            sum = $scope.game.board[col] + $scope.game.board[col + 3] + $scope.game.board[col + 6];
            $scope.game.winner = checkWinner(sum);
            if ($scope.game.winner) {
                vegasWinner();
                return $scope.game.winner;
            }
        }

        //only 2 way's to win diag so just need to specify the cellIndex.
        sum = $scope.game.board[0] + $scope.game.board[4] + $scope.game.board[8];
        $scope.game.winner = checkWinner(sum);
        if ($scope.game.winner) {
            vegasWinner();
            return $scope.game.winner;
        }

        //only 2 way's to win diag so just need to specify the cellIndex.
        sum = $scope.game.board[6] + $scope.game.board[4] + $scope.game.board[2];
        $scope.game.winner = checkWinner(sum);
        if ($scope.game.winner) {
            vegasWinner();
            return $scope.game.winner;
        }

        //everytime a person makes a move add 1.
        $scope.game.moveCount++;
        //if movecount = 9 then we get a draw because no more move to be made
        if ($scope.game.moveCount === 9){
            $scope.game.winnerDisplay = "Draw";

        }
        //no one won and nothing happened
        return 0;
    }

    //add one to either player1 -1 or player2 1
    function checkWinner(sum) {
        //if the sum = player 1 win. add win and return = spits out -1
        if (sum === -3) {
            $scope.game.score1++;
            $scope.game.gameOver =true;
            return -1;
            //if the sum = player 2 win. add win and return = spits out 1
        } else if (sum === 3) {
            $scope.game.score2++;
            $scope.game.gameOver =true;
            return 1;
        } else {
            //dont have a winner so telling any other function and no one won
            return 0;
        }
    }


    //spits out the actual winner
    function vegasWinner () {
        //winner is = player 1 the n we print out "o" and return just in case we need to use it.
        if ($scope.game.winner === $scope.game.player1) {
            $scope.game.winnerDisplay = "O";
            return $scope.game.winnerDisplay;
        }
        //winner is = player 2 the n we print out "x" and return just in case we need to use it.
        else if ($scope.game.winner === $scope.game.player2) {
            $scope.game.winnerDisplay = "X";
            return $scope.game.winnerDisplay;
        }
    }

    //reset the board, winner, moveCount.
    $scope.reset = function(){

        $scope.game.board = [0,0,0,0,0,0,0,0,0];
        $scope.game.winnerDisplay = "";
        $scope.game.moveCount = 0;
        $scope.game.gameOver=false;
    };

}











