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

myApp.controller('chatContrl', function ($scope, $http) {
    var socket = io();
    $scope.contacts = ["Arun","Britto","Charlie"];
    
    $scope.sendBtn = function(){
        console.log($scope.chat_input);
        //chat_input
        socket.emit('message', ""+$scope.chat_input);
        
    }
    
});

myApp.controller('gameContrl', function ($scope, $http) {


    $scope.onPlay = function () {
        
        window.location = "#/play";
    }
    
    $scope.onStat = function () {
        
        window.location = "#/stat";
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