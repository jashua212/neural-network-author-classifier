
let trainedNet = train(trainingData);

function encode(arg) {
    return arg.split('').map(function (x) {
		return x.charCodeAt(0) / 256;
	});
}

// helper function
// encodes the 'input' property of each object contained in the training data (array)
function processTrainingData(data) {
    return data.map(function (obj) {
        return {
            input: encode(obj.input),
            output: obj.output
        };
    });
}

// trains the neural network, using the provided training data (array)
function train(data) {
    let net = new brain.NeuralNetwork();
    net.train(processTrainingData(data));

	// return the trained neural network as a function
    return net.toFunction();
}

function execute(tweet) {
    let results = trainedNet(encode(tweet));
    console.dir(results);

    let output;
    let certainty;

    if (results.trump > results.kardashian) {
        output = 'Donald Trump';
        certainty = Math.floor(results.trump * 100);

	} else {
        output = 'Kim Kardashian';
        certainty = Math.floor(results.kardashian * 100);
    }

    return "I'm " + certainty + "% sure that the tweet was written by " + output;
}

let tweetInp = document.querySelector('.tweet');
let conclusion = document.querySelector('.conclusion');

document.querySelector('.run').addEventListener('click', function () {
	conclusion.textContent = execute(tweetInp.value);
});
