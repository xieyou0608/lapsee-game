import React, { useEffect, useState } from "react";
import Card from "./Card";
import classes from "./GameBoard.module.css";

const GameBoard = ({ numCards, setIsPlaying }) => {
  let lapseeImgs = [...Array(numCards / 2).keys()];
  lapseeImgs = lapseeImgs.concat([...lapseeImgs]);
  const lapseeDeck = [];
  for (const img of lapseeImgs) {
    lapseeDeck.push({ img: img, flipped: false, matched: false });
  }
  lapseeDeck.sort(() => Math.random() - 0.5); //shuffle

  const [deck, setDeck] = useState([...lapseeDeck]);
  const [flipped, setFlipped] = useState([]); // record index of flipped card
  const [steps, setSteps] = useState(0);
  const [pairs, setPairs] = useState(0);

  const openOneCard = (cardIdx) => {
    setDeck((prevState) => {
      let newState = [...prevState];
      newState[cardIdx].flipped = true;
      return newState;
    });
  };

  const matchTwoCard = (firstCardIdx, secondCardIdx) => {
    setDeck((prevState) => {
      let newState = [...prevState];
      newState[firstCardIdx].matched = true;
      newState[secondCardIdx].matched = true;
      return newState;
    });
    setPairs((prev) => prev + 1);
  };

  const foldTwoCard = (firstCardIdx, secondCardIdx) => {
    setDeck((prevState) => {
      let newState = [...prevState];
      newState[firstCardIdx].flipped = false;
      newState[secondCardIdx].flipped = false;
      return newState;
    });
  };

  const flipCard = (cardIdx) => {
    if (flipped.length < 2) {
      setSteps((prev) => prev + 1);
      setFlipped((prev) => [...prev, cardIdx]);
      openOneCard(cardIdx);
    }
  };
  console.log(pairs, numCards);

  useEffect(() => {
    let timer;
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (deck[first].img === deck[second].img) {
        matchTwoCard(first, second);
        setFlipped([]);
      } else {
        timer = setTimeout(() => {
          foldTwoCard(first, second);
          setFlipped([]);
        }, 1000);
      }
    }
    if (pairs === numCards / 2) {
      timer = setTimeout(() => {
        alert("恭喜!");
      }, 500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [flipped, deck, steps, pairs]);

  return (
    <section className={classes["game-section"]}>
      <div className={classes.board}>
        {deck.map((card, idx) => (
          <Card key={idx} card={card} idx={idx} flipCard={flipCard} />
        ))}
      </div>
      <div className={classes.score}>
        <h4>次數: {steps}</h4>
      </div>
    </section>
  );
};

export default GameBoard;
