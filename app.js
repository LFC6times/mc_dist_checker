const fs = require('fs');

class coords {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

var data = fs.readFileSync('input.txt', 'utf-8');
data = data.split('\r\n');

for(var i = data.length - 1; i >= 0; i--) {
    if(data[i][0] == "[" || data[i][0] == "N") {
        data.splice(i, 1);
    } else {
        data[i] = data[i].split(" ");
        data[i][0] = Number(data[i][0]);
        data[i][1] = Number(data[i][1]);
        data[i] = new coords(data[i][0], data[i][1]);
    }
}
/*
data = data.filter(function(item) {
    return (item[0] != "[" || item[0] != "N");
});
*/
function distanceFormula(a, b) {
    return Math.sqrt(Math.pow(Math.abs(a.x - b.x), 2) + Math.pow(Math.abs(a.y - b.y), 2));
}

function midPoint(inputArr) {
    var outx = 0, outy = 0;
    /*
    inputArr.forEach(element => {
        outx += element.x;
    });
    inputArr.forEach(element => {
        outy += element.y;
    });
    */
    for(var i = 0; i < inputArr.length; i++) {
        console.log(inputArr[i]);
        outx += inputArr[i].x;
        outy += inputArr[i].y;
    }
    return new coords(outx / inputArr.length, outy / inputArr.length);
}

function midPointDistances(inputArr) {
    var midpoint = midPoint(inputArr);
    /*
    inputArr.forEach(element => {
        if(distanceFormula(element, midpoint) > 128) {
            return false;
        }
    });
    */
    for(var i = 0; i < inputArr.length; i++) {
        if(distanceFormula(inputArr[i], midpoint)) {
            return false;
        }
    }
    return true;
}

var doubleHuts = [], tripleHuts = [];

for(var i = 0; i < data.length - 1; i++) {
    for(var j = i + 1; j < data.length; j++) {
        if(distanceFormula(data[i], data[j]) <= 256) {
            doubleHuts.push([data[i],data[j]]);
        }
    }
}

for(var i = 0; i < data.length - 2; i++) {
    for(var j = i + 1; j < data.length - 1; j++) {
        for(var k = j + 1; k < data.length; k++) {
            if(midPointDistances(data[i], data[j], data[k])) {
                tripleHuts.push([data[i], data[j], data[k]]);
            }
        }
    }
}

console.log(data);
console.log(doubleHuts);
console.log(tripleHuts);