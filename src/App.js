import React, { useState, useEffect, useRef } from 'react';
import './App.css';
// import tiger from './img/tiger.jpg';
import * as ml5 from 'ml5';

const App = () => {

  const [predictionsArr, setPredictionsArr] = useState([]);
  const [imageURL, setImageURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const inputRef = useRef();

  const classifyImg = () => {
    // ML5 1
    // Initialize the Image Classifier method with MobileNet
    const classifier = ml5.imageClassifier('MobileNet', modelLoaded);
    // When the model is loaded
    function modelLoaded() {
      console.log('Model Loaded!');
    }

    // Put the image to classify inside a variable
    const image = document.getElementById('image');

    // ML5 2
    // Make a prediction with a selected image
    classifier
      // .predict(image, 3, function(err, results) {
      .classify(image, 3, function(err, results) {
        // Return the results
        return results;
      })
      .then(results => {
        // Set the predictions in the state
        setPredictionsArr(results);
            setIsLoading(false);
      });
  };

  const inputStyle = {
    width: '400px',
    height: '30px',
    fontSize: '20px',
    padding: '0 4px'
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    classifyImg();
  };

  const handleInputChange = e => {
    setIsSubmitDisabled(false);
    setImageURL(e.target.value);
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }


  const handleLoadRandom = ()=>{

    setImageURL(`https://source.unsplash.com/random/400x400?sig=${getRandomInt(10)}`);

    setIsLoading(true);

    setTimeout( ()=>{
      classifyImg();
    }, 300);

  };

  let predictions = predictionsArr.map((pred, i) => {
    return (
      <div key={i}>
        <p>
          Prediction {i + 1}: {pred.label}
        </p>
        <p>Confidence: {Math.floor(pred.confidence * 10000) / 100}%</p>
      </div>
    );
  });

  return (
    <div className="App">
      <h1>ML image recognition with ML5.js</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="image-to-identify">
          Type/paste in an image URL to identify
        </label>

        <input
          ref={inputRef}
          value={imageURL}
          style={inputStyle}
          type="text"
          name="image-to-identify"
          onChange={handleInputChange}
        />

        <button disabled={isSubmitDisabled} type="submit">SUBMIT</button>
      </form>

      <p>OR tap below to load an image from the Unsplash API:</p>

      <button onClick={handleLoadRandom} type="button">LOAD RANDOM IMAGE</button>

      <img
        crossOrigin="anonymous"
        // src={'https://cors-anywhere.herokuapp.com/' + imageURL}
        src={imageURL}
        id="image"
        width="300"
        alt=""
      />

      {
        isLoading
        ?
          <>
            <div className="loader" />
            <p><span role={'img'}>🤖</span>Parsing image...<span role={'img'}>🖼</span></p>
          </>
          :
          null
      }

      {predictionsArr.length > 0
        ?
        predictions
       :
        null
      }

    </div>
  );
};

export default App;
