import React, { useEffect, useState } from "react";
import Card from "./Card";
import classes from "./GameBoard.module.css";
import lapseeImgs from "./LapseeImgs";

const GameBoard = ({ numCards, setIsPlaying }) => {
  const [deck, setDeck] = useState([]);
  const [chosen, setChosen] = useState([]);
  const [steps, setSteps] = useState(0);
  const [pairs, setPairs] = useState(0);

  const shuffleCards = () => {
    const slicedImgs = lapseeImgs.slice(0, numCards / 2);
    const cards = [
      ...JSON.parse(JSON.stringify(slicedImgs)),
      ...JSON.parse(JSON.stringify(slicedImgs)),
    ]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, matched: false, id: Math.random() }));

    setDeck(cards);
    setChosen([]);
    setSteps(0);
    setPairs(0);
  };

  const flipCard = (card) => {
    setChosen((prev) => {
      // 防止連點兩下同一張牌，或連點三張牌
      if ((prev.length === 1 && prev[0].id === card.id) || prev.length === 2) {
        return prev;
      } else {
        return [...prev, card];
      }
    });
  };

  const matchTwoCard = (mark) => {
    setDeck((prevDeck) =>
      prevDeck.map((card) =>
        card.mark === mark ? { ...card, matched: true } : card
      )
    );
    setChosen([]);
    setPairs((prev) => prev + 1);
  };

  useEffect(shuffleCards, []);

  useEffect(() => {
    let timer;
    if (chosen.length === 2) {
      const [first, second] = chosen;
      if (first.id === second.id) {
        setChosen([first]);
        return;
      }
      setSteps((prev) => prev + 1);
      if (first.mark === second.mark) {
        matchTwoCard(first.mark);
      } else {
        timer = setTimeout(() => {
          setChosen([]);
        }, 1000);
      }
    }

    return () => {
      clearTimeout(timer);
    };
  }, [chosen]);

  useEffect(() => {
    if (pairs === numCards / 2) {
      setTimeout(() => {
        alert("恭喜!");
      }, 500);
    }
  }, [pairs]);

  return (
    <section className={classes["game-section"]}>
      <div className={classes.board}>
        {deck.map((card) => (
          <Card
            key={card.id}
            card={card}
            flipCard={flipCard}
            isOpened={chosen.includes(card) || card.matched}
          />
        ))}
      </div>
      <div className={classes.score}>
        <h4>次數: {steps}</h4>
      </div>
    </section>
  );
};

export default GameBoard;
