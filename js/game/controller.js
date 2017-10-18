var colorList = ["lightBlue", "lightGreen", "lightViolet", "yellow", "orange", "red", "pink", "grey"];

var clickableCount = 0;

var colorValueMap = {};

myApp.controller('cntrl', function ($scope, $http) {
    $http.defaults.xsrfCookieName = 'csrftoken';
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';

    colorValueMap = genColValMap(colorValueMap);


    $scope.scoreCount = 50;

    $scope.scoreTrend = "info";



});

myApp.controller('gameContrl', function ($scope, $http) {


    $scope.onPlay = function () {
        
        window.location = "#/play";
    }
    
    $scope.onStat = function () {
        
        window.location = "#/stat";
    }

});

myApp.controller('playContrl', function ($scope, $http) {

    $scope.game = {};
    $scope.game.highscore = getHighScore();
    $scope.game.score = 0;
    $scope.game.msg1 = "Press on a Tile";
    $scope.game.msg2 = "Three tiles Adds Up!!";
    
    $scope.onTileClick = function (name, color, row, col) {

        for (var r = 1; r <= $scope.tileMap.length; r++) {

            for (var c = 1; c <= $scope.tileMap[r - 1]["cols"].length; c++) {
                if (row == r && col == c) {

                    var clickedArr = $scope.tileMap[r - 1]["cols"];
                    var clickedVal = $scope.tileMap[r - 1]["cols"][c - 1];

                    if ($scope.tileMap[r - 1]["cols"].length == 1) {
                        $scope.tileMap[r - 1]["cols"] = [];
                    } else {
                        $scope.tileMap[r - 1]["cols"] = _.without(clickedArr, _.findWhere(clickedArr, {
                            tileUName: clickedVal.tileUName
                        }));
                    }

                    clickableCount = clickableCount - 1;
                    if (clickableCount == 0) {
                        $scope.tileMap = genTiers();
                    }

                    break;
                }
            }
        }


        if ($scope.selectedDots.length == 3) {
            $scope.selectedDots.length = [];
        }

        $scope.selectedDots.push({
            name: name,
            color: color
        });

        if ($scope.selectedDots.length == 3) {

            var diff = calcDiff($scope.selectedDots);

            $scope.scoreCount = $scope.scoreCount + diff;

            if (diff > 0) {
                $scope.scoreTrend = "success";
                $scope.game.score = $scope.game.score + 1;
            } else if (diff < 0) {
                $scope.scoreTrend = "danger";
            } else {
                $scope.scoreTrend = "info";
            }

            if ($scope.scoreCount >= 100) {
                
                $scope.scoreCount = 100;
                
                
                
                if($scope.game.score > $scope.game.highscore){
                    saveHighScore($scope.game.score);
                    $scope.game.highscore = $scope.game.score;
                    $scope.game.msg1 = "Fantastic!";
                    $scope.game.msg2 = "A New Record "+$scope.game.score;
                }else{
                    $scope.game.msg1 = "WoW! Filled Up!";
                    $scope.game.msg2 = "Your Score is "+$scope.game.score;    
                }
                
                colorValueMap = genColValMap(colorValueMap);
                $scope.scoreCount = 50;
                $scope.tileMap = genTiers();
            } else if ($scope.scoreCount <= 0) {
                //                alert("You Lost!");
                $scope.scoreCount = 0;
                $scope.game.msg1 = "Game Over";
                $scope.game.msg2 = "Your score is "+$scope.game.score;
               
                //freeze all the tiles
                $scope.tileMap = [];
                
                window.location = "#/";
                
                
            }

            $scope.tileMap = genTiers();

        }

    }

    var mapArr = [];

    mapArr = genTiers();

    $scope.selectedDots = [];

    $scope.tileMap = mapArr;
    $scope.rowList = [1, 2, 3, 4];
    $scope.colList = [1, 2, 3];

    $scope.onReset = function () {

        $scope.tileMap = genTiers();
    }

});


function genColValMap(map) {

    map = {
        "lightBlue": getRandomInt(-6, -1),
        "lightGreen": getRandomInt(-6, -1),
        "lightViolet": getRandomInt(-6, -1),
        "yellow": getRandomInt(-6, -1),
        "orange": getRandomInt(-6, -1),
        "red": getRandomInt(-6, -1),
        "pink": getRandomInt(-6, -1),
        "grey": getRandomInt(-6, -1)
    };
    
    var posSet = _.sample(colorList,4);
    
    map[posSet[0]] = getRandomInt(1, 5);
    map[posSet[1]] = getRandomInt(1, 5);
    map[posSet[2]] = getRandomInt(1, 5);
    map[posSet[3]] = getRandomInt(1, 5);
    

    return map;
}

function calcDiff(dots) {
    var c1 = dots[0];
    var c2 = dots[1];
    var c3 = dots[2];

    var v1 = colorValueMap[c1.color];
    var v2 = colorValueMap[c2.color];
    var v3 = colorValueMap[c3.color];

    
    return (v1 + v2 + v3);
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genTiers() {

    var mapArr = [];
    var minRow = 4;
    var maxRow = 6;

    clickableCount = 0;

    for (var r = 1; r <= getRandomInt(minRow, maxRow); r++) {
        var rData = {};
        var tDArr = [];

        var minCol = 1;
        var maxCol = 6;

        if (r == 1) {
            minCol = getRandomInt(1, 4);
        }
        for (var c = 1; c <= getRandomInt(minCol, maxCol); c++) {
            var tData = {};
            tData.tileNum = c;
            tData.tileUName = "r" + r + "c" + c;
            tData.color = colorList[getRandomInt(0, colorList.length - 1)];
            tDArr.push(tData);
            clickableCount = clickableCount + 1;
        }
        rData.rowNum = r;
        rData.cols = tDArr;
        mapArr.push(rData);
    }

    return mapArr;
}


function saveHighScore(score) {
    
    window.localStorage.setItem("highscore",score);
}

function getHighScore() {
    
    var hs = window.localStorage.getItem("highscore");
    if(hs == 'undefined' || hs == null){
        hs = 0;
    }
    
    return hs;

}