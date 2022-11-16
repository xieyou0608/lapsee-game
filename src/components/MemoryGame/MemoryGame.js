import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./MemoryGame.module.css";
import { cardImages } from "../../assets/card-images/CardImages";

import { Box } from "@mui/material";
import Card from "./Card";
import CardModal from "../UI/CardModal";
import MessageModal from "../UI/MessageModal";
import Player from "../Game/Player";
import GameContainer from "../Game/GameContainer";
import Rank from "../Game/Rank";
import { memoryExtraScore as extra } from "../Game/ExtraScore";

const MemoryGame = ({ numCards, numPlayers }) => {
  const navigate = useNavigate();
  const [deck, setDeck] = useState([]);
  const [chosen, setChosen] = useState([]);
  const [pairs, setPairs] = useState(0);
  const [showCard, setShowCard] = useState(null);

  const [curPlayer, setCurPlayer] = useState("A");
  const [score, setScore] = useState({ A: 0, B: 0 });
  const [combo, setCombo] = useState(0);

  const [endMessage, setEndMessage] = useState("");
  const nameRef = useRef();
  const [isDone, setIsDone] = useState(false);

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
    setCombo((prev) => prev + 1);
  };

  useEffect(() => {
    if (combo !== 0) {
      setScore((prev) => ({
        ...prev,
        [curPlayer]: prev[curPlayer] + 100 + extra[combo],
      }));
    }
  }, [combo]);

  const failMatch = () => {
    setChosen([]);
    if (numPlayers === 2) {
      setCurPlayer((prev) => (prev == "A" ? "B" : "A"));
    }
    setCombo(0);
  };

  const closeCardModal = () => {
    setShowCard(null);
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
        if (score.A > score.B) setEndMessage("萊西贏了！");
        else if (score.A < score.B) setEndMessage("剖西贏了！");
        else setEndMessage("平手!");
      } else {
        setEndMessage("恭喜你成功配對所有卡片！");
      }
    }
  }, [pairs, showCard, score]);

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
    <Player
      score={score.A}
      playerName="萊西"
      isMyTurn={numPlayers === 2 && curPlayer == "A"}
    />
  );

  const layoutPlayerB =
    numPlayers == 2 ? (
      <Player score={score.B} playerName="剖西" isMyTurn={curPlayer == "B"} />
    ) : null;

  const nameInput = (
    <div>
      <p>{endMessage}</p>
      <label htmlFor="">你的名字</label> <input type="text" ref={nameRef} />
    </div>
  );

  return (
    <GameContainer>
      {endMessage && !isDone && numPlayers === 1 && (
        <MessageModal
          title="過關"
          content={nameInput}
          onConfirm={() => {
            setIsDone(true);
          }}
        />
      )}
      {endMessage && !isDone && numPlayers === 2 && (
        <MessageModal
          title="遊戲結束"
          content={endMessage}
          onConfirm={() => {
            navigate("/");
          }}
        />
      )}
      {isDone && numPlayers === 1 && (
        <Rank
          isDone={isDone}
          name={nameRef.current.value}
          score={score.A}
          gameType={"memory"}
        />
      )}

      {!isDone && (
        <React.Fragment>
          {/* mobile */}
          <Box
            sx={{
              display: { xs: "flex", sm: "none", flexDirection: "column" },
            }}
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
          <Box
            sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}
          >
            {layoutPlayerA}
            {layoutBoard}
            {layoutPlayerB}
          </Box>
        </React.Fragment>
      )}

      {/* Let modal be the last element to fix safari z-index error */}
      {showCard && <CardModal card={showCard} onConfirm={closeCardModal} />}
    </GameContainer>
  );
};

export default MemoryGame;
