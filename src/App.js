import React, { useState, useEffect } from 'react';
import './App.css';
import tiger from './img/tiger.jpg';
import * as ml5 from 'ml5';

const App = () => {
  const [predictionsArr, setPredictionsArr] = useState([]);

  const classifyImg = () => {
    // Initialize the Image Classifier method with MobileNet
    const classifier = ml5.imageClassifier('MobileNet', modelLoaded);
    // When the model is loaded
    function modelLoaded() {
      console.log('Model Loaded!');
    }

    // Put the image to classify inside a variable
    const image = document.getElementById('image');

    // Make a prediction with a selected image
    classifier
      .predict(image, 3, function(err, results) {
        // Return the results
        return results;
      })
      .then(results => {
        // Set the predictions in the state
        setPredictionsArr(results);
      });
  };

  useEffect(() => {
    classifyImg();
  }, []);

  // First set the predictions to a default value while loading


  let predictions = <div className="loader"/>;


  // Map over the predictions and return each prediction with probability
  if (predictionsArr.length > 0) {
    predictions = predictionsArr.map((pred, i) => {

      // round the probability with 2 decimal
      // probability = Math.floor(probability * 10000) / 100 + "%";
      return (
        // Please wait a few seconds as the image is parsed

        <div key={i + ''}>
          {i + 1}. Prediction: {JSON.stringify(pred)}{' '}
        </div>
      );
    });
  }

  return (
    <div className="App">
      <h1>Image classification with ML5.js</h1>
      <img src={tiger} id="image" width="400" alt="" />
      {predictions}
    </div>
  );
};

export default App;
