import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';

const Meme = () => {
  const [memes, setMemes] = useState([]); // set to empty array to start off with

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then((res) => res.json())
      .then((res) => {
        const memes = res.data.memes; // by creating this constant, next thing to do is create the state with 'useState()'
        setMemes(memes);
      });
  }, []);

  return (
    // make sure the memes length is not a falsey, length=0
    memes.length ? (
      <div className={styles.container}>
        <button className={styles.skip}>Skip</button>
        <img src={memes[0].url} />
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
