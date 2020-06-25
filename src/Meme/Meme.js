import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';

const Meme = () => {
  const [memes, setMemes] = useState([]); // set to empty array to start off with
  const [memeIndex, setMemeIndex] = useState(0); // will pertain to the skip button, starting with zero; will cause useEffect to generate box count
  const [captions, setCaptions] = useState([]); // an array of strings; each string will represent the value of the caption for a given input.
  // if box count is two, render two inputs on the screen. input[0] will be the first, etc.

  // Shuffle: (review fisher-yates algorithm)
  const shuffleMemes = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      // console.log({temp});
      array[i] = array[j];
      array[j] = temp;
    }
  };

  // API CALL(on page load and page refresh)
  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then((response) => response.json())
      .then((res) => {
        const _memes = res.data.memes; // after creating this constant, next thing is create state with 'useState()'
        shuffleMemes(_memes); // shuffle before updating state.
        setMemes(_memes); // updating state with the shufffled memes
      });
  }, []);

  // ADD/DISPLAY CAPTION BOXES FOR USER
  useEffect(() => {
    if (memes.length) {
      // initalize the boxes as empty strings to represent empty values for inputs when they're rendered on screen
      // will use captions to loop through and generate the input boxes
      // in order to add these to an array to loop through the captions, you need to CREATE THE ARRAY FIRST.
      // Array constructor: (without fill, will get an undefined value)
      setCaptions(Array(memes[memeIndex].box_count).fill('')); // creating an array of empty strings per the value of box_strings
    }
  }, [memeIndex, memes]);

  // For Testing...
  useEffect(() => {
    console.log(captions);
  }, [captions]);

  return (
    // verify memes length is not a falsey, (length=0)
    memes.length ? (
      <div className={styles.container}>
        <button onClick={() => console.log('gEnErAtE')} className={styles.generate}>
          Generate Meme
        </button>
        {/* <button onClick={() => console.log('clicked')} className={styles.skip}> */}
        <button onClick={() => setMemeIndex(memeIndex + 1)} className={styles.skip}>
          Skip
        </button>
        {// inserting javascript
        captions.map((caption, index) => (
          <input key={index} />
        ))}
        <img src={memes[memeIndex].url} alt={memes.id} />
      </div>
    ) : (
      <React.Fragment></React.Fragment>
    )
  );
};

export default Meme;

/*
API info:

box_count: will be the number of boxes/inputs for each image (2 box counts means there are two captions you can make, etc;

id: will be the unique identifier.

url: the image 

*/
