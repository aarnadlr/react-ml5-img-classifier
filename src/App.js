import React, { Component } from 'react';
import './App.css';
import tiger from './img/tiger.jpg';
import * as ml5 from 'ml5';

class App extends Component {

  //1
  state = {
    predictionsArr: []
  };

  setPredictions = pred => {
    // Set the prediction state with the model predictions
    this.setState({
      predictionsArr: pred
    });
  };

  classifyImg = () => {
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
        this.setPredictions(results);
      });
  };

  componentDidMount() {
    // once the component has mount, start the classification
    this.classifyImg();
  }

  render() {
    // First set the predictions to a default value while loading
    let predictions = <div className="loader"></div>;
    // Map over the predictions and return each prediction with probability
    if (this.state.predictionsArr.length > 0) {
      predictions = this.state.predictionsArr.map((pred, i) => {

        // let { className, probability } = pred;
        // round the probability with 2 decimal
        // probability = Math.floor(probability * 10000) / 100 + "%";

        return (
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
  }
}

export default App;
