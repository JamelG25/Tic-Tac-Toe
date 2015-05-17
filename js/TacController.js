angular
    .module('tacApp')
    .controller('TacController', TacController);

TacController.$inject = ['$scope', '$firebaseObject'];

function TacController($scope, $firebaseObject) {

    var ref = new Firebase("https://tic-tac-toe-x.firebaseio.com/");


    $firebaseObject(ref).$bindTo($scope,"game");

    $scope.player1 = -1
    $scope.player2 = 1

    var currentPlayer = -1;


    $scope.playerMove = function (cellIndex) {

        $scope.score1 = 0;
        $scope.score2 = 0;

        if ($scope.game.board[cellIndex] !== 0) {
            return;
        }

        $scope.game.board[cellIndex] = currentPlayer;

        if (currentPlayer === -1) {
            currentPlayer = 1;
        }else{
            currentPlayer = -1;
        }
    };

    $scope.reset = function(){

        $scope.game.board = [0,0,0,0,0,0,0,0,0];
    };



    function getWinner() {

        var sum = 0;
        var winner = 0;

        for(var row = 0; row < 3; row++){
            sum = $scope.game.board[row * 3] + $scope.game.board[row * 3 + 1] + $scope.game.board[row * 3 + 2];
            winner = checkWinner(sum);
            if ( winner ) {
                return winner;
            }
        }

        for(var col = 0; col < 3; col++){
            sum = $scope.game.board[col] + $scope.game.board[col + 3] + $scope.game.board[col + 6];
            winner = checkWinner(sum);
            if ( winner ) {
                return winner;
            }
        }

        sum = $scope.game.board[0] + $scope.game.board[4] + $scope.game.board[8];
        winner = checkWinner(sum);
        if ( winner ) {
            return winner; }

        sum = $scope.game.board[6] + $scope.game.board[4] + $scope.game.board[2];
        winner = checkWinner(sum);
        if ( winner ) {
            return winner;
        }
        return 0;
    }


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

}











