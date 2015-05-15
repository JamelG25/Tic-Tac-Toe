angular
    .module('tacApp')
    .controller('TacController', TacController);

TacController.$inject = ['$scope', '$firebaseObject', '$firebaseArray'];

function TacController($scope, $firebaseObject, $firebaseArray) {

    var ref = new Firebase("https://wakarana1-tic-tac-toe.firebaseio.com/");

    $scope.board = $firebaseArray(ref.child("board"));

    $scope.player1 = -1;
    $scope.player2 = 1;

    var currentPlayer = -1;

    $scope.playerMove = function (cellIndex) {

        $scope.score1 = 0;
        $scope.score2 = 0;

        if ($scope.board[cellIndex].$value !== 0) {
            return;
        }

        $scope.board[cellIndex].$value = currentPlayer;

        $scope.board.$save(cellIndex);

        if (currentPlayer === -1) {
            currentPlayer = 1;
        }else{
            currentPlayer = -1;
        }
    };

    function checkWinner(sum) {
        if ( sum === -3) {
            $scope.score1++;
            return -1;
        }else if (sum === 3) {
            $scope.score2++;
            return 1;
        }else {
            return 0;
        }
    }

    function getWinner() {

        var sum = 0;
        var winner = 0;

        for(var row = 0; row < 3; row++){
            sum = $scope.board[row * 3].$value + $scope.board[row * 3 + 1].$value + $scope.board[row * 3 + 2].$value;
            winner = checkWinner(sum);
            if ( winner ) {
                return winner;
            }
        }

        for(var col = 0; col < 3; col++){
            sum = $scope.board[col].$value + $scope.board[col + 3].$value + $scope.board[col + 6].$value;
            winner = checkWinner(sum);
            if ( winner ) {
                return winner;
            }
        }

        sum = $scope.board[0].$value + $scope.board[4].$value + $scope.board[8].$value;
        winner = checkWinner(sum);
        if ( winner ) {
            return winner; }

        sum = $scope.board[6].$value + $scope.board[4].$value + $scope.board[2].$value;
        winner = checkWinner(sum);
        if ( winner ) {
            return winner;
        }

        return 0;
    }

}












/*TacController.$inject = ['$scope','firebaseObject','firebaseArray'];

function TacController() {

    var ref = new Firebase("https://tic-tac-toe-x.firebaseio.com/");


    $scope.board= $firebaseArray(ref.child("board"));

    $scope.player1 = -1;
    $scope.player1 = -1;

    var currentPlayer= -1;

    $scope.playerMove = function (cellIndex) {

        $scope.score1 = 0;
        $scope.score2 = 0;

        if ($scope.board[cellIndex].$value !== 0) {
            return;
        }

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
   */