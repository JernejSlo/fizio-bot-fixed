const fs = require('fs');
const csv = require('csv-parser');
const natural = require('natural');

// Create a new classifier
const classifier = new natural.BayesClassifier();

// Load the training data from the CSV file
fs.createReadStream('FizioDataset.csv')
    .pipe(csv())
    .on('data', (data) => {
        const features = Object.values(data).slice(0, -1);
        const label = Object.values(data)[Object.values(data).length - 1];
        classifier.addDocument(features, label);
    })
    .on('end', () => {
        // Train the classifier
        classifier.train();

        // Classify new examples
        const example1 = ['akutna', 'poškodba', 'a', 'sem', 'da', 'oteklina', 'imam', 'zdravila'];
        const example2 = ['akutna', 'brez', 'a', 'sem', 'ne', 'ni otekline', 'nimam', 'počitek'];

        const result1 = classifier.classify(example1);
        const result2 = classifier.classify(example2);

        console.log('Example 1:', result1);
        console.log('Example 2:', result2);

        // Save the classifier to a file
        const serializedClassifier = JSON.stringify(classifier);
        fs.writeFileSync('classifier.json', serializedClassifier);

        // Load the classifier from the file
        const serializedClassifierLoaded = fs.readFileSync('classifier.json');
        const classifierLoaded = natural.BayesClassifier.restore(JSON.parse(serializedClassifierLoaded));

        // Classify new examples using the loaded classifier
        const example3 = ['kronična', 'brez', 'b', 'nisem', 'da', 'ni otekline', 'imam', 'zdravila'];
        const example4 = ['kronična', 'poškodba', 'c', 'sem', 'ne', 'oteklina', 'nimam', 'počitek'];

        const result3 = classifierLoaded.classify(example3);
        const result4 = classifierLoaded.classify(example4);

        console.log('Example 3:', result3);
        console.log('Example 4:', result4);
    });
