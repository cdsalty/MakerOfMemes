import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';

const Meme = () => {
  const [memes, setMemes] = useState([]); // set to empty array to start off with
  const [memeIndex, setMemeIndex] = useState(0); // will pertain to the skip button, starting with zero;

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

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then((response) => response.json())
      .then((res) => {
        const _memes = res.data.memes; // after creating this constant, next thing is create state with 'useState()'
        shuffleMemes(_memes); // need to shuffle before setting it.
        setMemes(_memes);
      });
  }, []);

  return (
    // make sure the memes length is not a falsey(length=0)
    memes.length ? (
      <div className={styles.container}>
        {/* <button onClick={() => console.log('clicked')} className={styles.skip}> */}
        <button onClick={() => setMemeIndex(memeIndex + 1)} className={styles.skip}>
          Skip
        </button>
        <img src={memes[memeIndex].url} />
      </div>
    ) : (
      <React.Fragment></React.Fragment>
    )
  );
};

export default Meme;

/*
API info:

box_count: will be the number of boxes that are invisible on the image where text will appear (2 box counts means there are two captions you can make; if three,
  then you can make 3)

id: will be the unique identifier.

url: the image

*/
