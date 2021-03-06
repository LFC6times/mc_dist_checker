const fs = require('fs');

class coords {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

var data = fs.readFileSync('input1.txt', 'utf-8');
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

function distanceFormula(a, b) {
    return Math.sqrt(Math.pow(Math.abs(a.x - b.x), 2) + Math.pow(Math.abs(a.y - b.y), 2));
}

function midPoint(inputArr) {
    var outx = 0, outy = 0;
    for(var i = 0; i < inputArr.length; i++) {
        // console.log(inputArr[i]);
        outx += inputArr[i].x;
        outy += inputArr[i].y;
    }
    return new coords(outx / inputArr.length, outy / inputArr.length);
}

function midPointDistances(inputArr) {
    var midpoint = midPoint(inputArr);
    for(var i = 0; i < inputArr.length; i++) {
        if(distanceFormula(inputArr[i], midpoint)) {
            return false;
        }
    }
    return true;
}

function doubleHutFinder() {
    var doubleHuts = [];
    for(var i = 0; i < data.length - 1; i++) {
        for(var j = i + 1; j < data.length; j++) {
            if(distanceFormula(data[i], data[j]) <= 256 && ((data[i].x != data[j].x) && (data[i].y != data[j].y))) {
		// console.log(data[i] == data[j]);
                doubleHuts.push([data[i],data[j]]);
            }
        }
    }
    return doubleHuts;
}

var doubles = doubleHutFinder();

for(var i = doubles.length - 1; i > 0; i--) {
    if(doubles[i][0].x == doubles[i - 1][0].x && doubles[i][0].y == doubles[i - 1][0].y && doubles[i][1].x == doubles[i - 1][1].x && doubles[i][1].y == doubles[i - 1][1].y) {
        console.log(doubles[i]);
        console.log(doubles[i - 1]);
        console.log(doubles[i].x == doubles[i - 1].x)
        doubles.splice(i, 1)
    }
}

function optimizedTripleHuts(doubleArray) {
    var potentialTriples = [];
    var realTriples = [];
    for(var i = 0; i < doubleArray.length - 1; i++) {
        for(var j = i + 1; j < doubleArray.length; j++) {
            if((doubleArray[i][0].x == doubleArray[j][0].x && doubleArray[i][0].y == doubleArray[j][0].y) || (doubleArray[i][0].x == doubleArray[j][1].x && doubleArray[i][0].y == doubleArray[j][1].y) || (doubleArray[i][1].x == doubleArray[j][0].x && doubleArray[i][1].y == doubleArray[j][0].y) || (doubleArray[i][1].x == doubleArray[j][1].x && doubleArray[i][1].y == doubleArray[j][1].y)) {
                potentialTriples.push([doubleArray[i][0], doubleArray[i][1], doubleArray[j][0], doubleArray[j][1]]);
            }
        }
    }
    /*
    potentialTriples.forEach(element => {
        var temp = [];
        element.forEach(element1 => {
            if(!temp.includes(element1)) {
                temp.push(element1);
            }
        });
        if(midPointDistances(temp)) {
            realTriples.push(temp);
        }
    });
    */
    return potentialTriples;
}

var triples = optimizedTripleHuts(doubles);

// console.log(data);
console.log("The info");
console.log(doubles);
console.log(triples);