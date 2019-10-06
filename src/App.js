import React, { useState, useEffect, useRef } from 'react';
import './App.css';
// import tiger from './img/tiger.jpg';
import * as ml5 from 'ml5';

const App = () => {
  const kith = 'https://aaronadler.com/static/kith-rect.jpg';

  const [predictionsArr, setPredictionsArr] = useState([]);
  const [imageURL, setImageURl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef();

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
    // classifyImg();
    inputRef.current.focus();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    classifyImg();

  };

  const handleInputChange = e => {
    setImageURl(e.target.value);
  };

  let predictions = predictionsArr.map((pred, i) => {
    // round the probability with 2 decimal
    // probability = Math.floor(probability * 10000) / 100 + "%";

    return (
      // Please wait a few seconds as the image is parsed

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
      {/*<img src={tiger} id="image" width="400" alt="" />*/}


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
          // id=""
        />

        <button type="submit">SUBMIT</button>
      </form>

      {
        isLoading
        ?
                  <>
          <div className="loader" />
          <p>🤖Parsing image...🖼</p>
        </>
          :
          null
      }
      <img
        crossOrigin="anonymous"
        src={'https://cors-anywhere.herokuapp.com/' + imageURL}
        id="image"
        width="300"
        alt=""
      />



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
