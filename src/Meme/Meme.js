import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';
import {useHistory} from 'react-router-dom';

const Meme = () => {
  const [memes, setMemes] = useState([]); // set to empty array to start off with
  const [memeIndex, setMemeIndex] = useState(0); // will pertain to the skip button, starting with zero; will cause useEffect to generate box count
  const [captions, setCaptions] = useState([]); // an array of strings; each string will represent the value of the caption for a given input.

  // useHistory()
  const history = useHistory();

  // UPDATE CAPTION (coming from the onChange event listener; passing in the event and index of the current index on
  const updateCaption = (e, index) => {
    const text = e.target.value || ''; // if we get something we don't expect, get ""
    setCaptions(
      // map over, passing in the caption and index; if index is the same as index caption, return the event's text
      captions.map((c, i) => {
        // if the index of the function matches the current index of the caption looping
        if (index === i) {
          return text;
        } else {
          return c; // return the caption that already exist
        }
      })
    );
  };

  // GENERATE A MEME (will be called once you click on the generate button)
  const generateMeme = () => {
    // get the current meme
    const currentMeme = memes[memeIndex];
    // ** CREATE THE FORM DATA OBJECT TO MAKE POST REQUEST **
    const formData = new FormData();
    // append: takes the name of the item being set, the second is the value
    formData.append('username', 'cdsalty');
    formData.append('password', 'love');
    formData.append('template_id', currentMeme.id);
    // loop through captions and set a value for each one.
    captions.forEach((c, index) => {
      console.log(index, c); /// VERIFY
      formData.append(`boxes[${index}][text]`, c);

      // Fetching the Meme back from the server
      fetch('https://api.imgflip.com/caption_image', {
        method: 'POST',
        body: formData
      })
        .then((res) => res.json())
        // .then((responseFromServer) => console.log(responseFromServer));
        .then((responseFromServer) => {
          // whatever is pushed will be appended to the url of the current page.
          // history.push(`./generated`); // (will go from localhost:3000 to localhost:300/generated) to verify it works
          history.push(`/generated?url=${responseFromServer.data.url}`);
        });
    });
  };

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
    // initalize the boxes as empty strings to represent empty values for inputs when they're rendered on screen
    // will use captions to loop through and generate the input boxes
    // in order to add these to an array to loop through the captions, you need to CREATE THE ARRAY FIRST.
    // Array constructor: (without fill, will get an undefined value)
    if (memes.length) {
      setCaptions(Array(memes[memeIndex].box_count).fill('')); // creating an array of empty strings per the value of box_strings
    }
  }, [memeIndex, memes]);

  return (
    // verify memes length is not a falsey, (length=0)
    memes.length ? (
      <div className={styles.container}>
        <button onClick={generateMeme} className={styles.generate}>
          Create Meme
        </button>
        {/* <button onClick={() => console.log('clicked')} className={styles.skip}> */}
        <button onClick={() => setMemeIndex(memeIndex + 1)} className={styles.skip}>
          Skip Image
        </button>
        {// inserting javascript
        captions.map((caption, index) => (
          <input onChange={(e) => updateCaption(e, index)} key={index} />
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
