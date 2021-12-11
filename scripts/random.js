//  Function adapted from Chance.js 1.0.16 http://chancejs.com (c) 2013 Victor Quinn
function weightedRandom(arr, weights) {
    if (arr.length !== weights.length) {
        throw new RangeError("Chance: Length of array and weights must match");
    }

    // scan weights array and sum valid entries
    var sum = 0;
    var val;
    for (var weightIndex = 0; weightIndex < weights.length; ++weightIndex) {
        val = weights[weightIndex];
        if (isNaN(val)) {
            throw new RangeError("Chance: All weights must be numbers");
        }

        if (val > 0) {
            sum += val;
        }
    }

    if (sum === 0) {
        throw new RangeError("Chance: No valid entries in array weights");
    }

    // select a value within range
    var selected = Math.random() * sum;

    // find array entry corresponding to selected value
    var total = 0;
    var lastGoodIdx = -1;
    var chosenIdx;
    for (weightIndex = 0; weightIndex < weights.length; ++weightIndex) {
        val = weights[weightIndex];
        total += val;
        if (val > 0) {
            if (selected <= total) {
                chosenIdx = weightIndex;
                break;
            }
            lastGoodIdx = weightIndex;
        }

        // handle any possible rounding error comparison to ensure something is picked
        if (weightIndex === (weights.length - 1)) {
            chosenIdx = lastGoodIdx;
        }
    }

    var chosen = arr[chosenIdx];

    return chosen;
};

function randomInteger(min,max) {
    return Math.random() * (max - min + 1) + min;
}