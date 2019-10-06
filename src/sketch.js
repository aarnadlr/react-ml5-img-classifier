import * as p5 from 'p5';
import * as ml5 from 'ml5';
// import P5Wrapper from 'react-p5-wrapper';
// const p = p5;

export default function sketch(p) {
  // Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
  let classifier;

  // A variable to hold the image we want to classify
  let img;

  p.preload = async function() {
    classifier = await ml5.imageClassifier('MobileNet');
    img = p.loadImage('img/doberman1.jpg');
  };

  p.setup = async function() {
    await p.createCanvas(400, 400);
    // debugger;
    await classifier.classify(img, gotResult);
    p.image(img, 0, 0);
  };

  // A function to run when we get any errors and the results
  function gotResult(error, results) {
    // Display error in the console
    if (error) {
      console.error(error);
    } else {
      // The results are in an array ordered by confidence.
      console.log(results);
      p.createDiv('Label: ' + results[0].label);
      p.createDiv('Confidence: ' + p.nf(results[0].confidence, 0, 2));
    }
  }
}
