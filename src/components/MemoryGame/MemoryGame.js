import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./MemoryGame.module.css";
import { cardImages } from "../../assets/card-images/CardImages";

import { Box } from "@mui/material";
import Card from "./Card";
import CardModal from "../UI/CardModal";
import MessageModal from "../UI/MessageModal";
import Player from "../Game/Player";
import GameContainer from "../Game/GameContainer";

const MemoryGame = ({ numCards, numPlayers }) => {
  const navigate = useNavigate();
  const [deck, setDeck] = useState([]);
  const [chosen, setChosen] = useState([]);
  const [steps, setSteps] = useState(0);
  const [pairs, setPairs] = useState(0);
  const [showCard, setShowCard] = useState(null);
  const [isDone, setIsDone] = useState(false);

  const [curPlayer, setCurPlayer] = useState("A");
  const [score, setScore] = useState({ A: 0, B: 0 });
  const [endMessage, setEndMessage] = useState("恭喜你成功配對所有卡片！");

  const shuffleCards = () => {
    const slicedImgs = cardImages.slice(0, numCards / 2);
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
    setScore({ A: 0, B: 0 });
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

  const matchTwoCard = (matchedCard) => {
    setDeck((prevDeck) =>
      prevDeck.map((card) =>
        card.mark === matchedCard.mark ? { ...card, matched: true } : card
      )
    );
    setChosen([]);
    setPairs((prev) => prev + 1);
    setShowCard(matchedCard);
    setScore((prev) => ({
      ...prev,
      [curPlayer]: prev[curPlayer] + 1,
    }));
  };

  const failMatch = () => {
    setChosen([]);
    if (numPlayers === 2) {
      setCurPlayer((prev) => (prev == "A" ? "B" : "A"));
    }
  };

  const closeCardModal = () => {
    setShowCard(null);
  };

  const finishGame = () => {
    setIsDone(false);
    navigate("/");
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
        timer = setTimeout(() => {
          matchTwoCard(first);
        }, 500);
      } else {
        timer = setTimeout(() => {
          failMatch();
        }, 1000);
      }
    }

    return () => {
      clearTimeout(timer);
    };
  }, [chosen]);

  useEffect(() => {
    if (pairs === numCards / 2 && !showCard) {
      if (numPlayers === 2) {
        setEndMessage((prev) => {
          if (score.A > score.B) prev = "玩家 A 贏了！";
          else if (score.A < score.B) prev = "玩家 B 贏了！";
          else prev = "平手!";
          return prev;
        });
      }
      setIsDone(true);
    }
  }, [pairs, showCard, score, numPlayers]);

  const boardSytle = classes.board + " " + classes[`board${numCards}`];
  const layoutBoard = (
    <div className={boardSytle}>
      {deck.map((card) => (
        <Card
          key={card.id}
          card={card}
          flipCard={flipCard}
          isOpened={chosen.includes(card)}
        />
      ))}
    </div>
  );

  const layoutPlayerA = (
    <Player score={score.A} player="A" isMyTurn={curPlayer == "A"} />
  );

  const layoutPlayerB =
    numPlayers == 2 ? (
      <Player score={score.B} player="B" isMyTurn={curPlayer == "B"} />
    ) : null;

  return (
    <GameContainer>
      {showCard && <CardModal card={showCard} onConfirm={closeCardModal} />}
      {isDone && (
        <MessageModal
          title="過關"
          content={endMessage}
          onConfirm={finishGame}
        />
      )}

      {/* mobile */}
      <Box
        sx={{ display: { xs: "flex", sm: "none", flexDirection: "column" } }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          {layoutPlayerA}
          {layoutPlayerB}
        </Box>
        {layoutBoard}
      </Box>

      {/* PC */}
      <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}>
        {layoutPlayerA}
        {layoutBoard}
        {layoutPlayerB}
      </Box>
    </GameContainer>
  );
};

export default MemoryGame;
