import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { gameActions } from "../../store/game-slice";

import classes from "./MemoryGame.module.css";
import { Box } from "@mui/material";

import GameContainer from "../Game/GameContainer";
import Player from "../Game/Player";
import Card from "./Card";
import CardModal from "../UI/CardModal";
import EndingModal from "../Game/EndingModal";
import { cardImages } from "../../assets/card-images/CardImages";
import { memoryExtraScore as extra } from "../Game/ExtraScore";

const MemoryGame = () => {
  const dispatch = useDispatch();

  const numPlayers = useSelector((state) => state.game.numPlayers);
  const numCards = useSelector((state) => state.memory.numCards);
  const curPlayer = useSelector((state) => state.game.curPlayer);

  const [deck, setDeck] = useState([]);
  const [chosen, setChosen] = useState([]);
  const [pairs, setPairs] = useState(0);
  const [showCard, setShowCard] = useState(null);

  const [score, setScore] = useState({ A: 0, B: 0 });
  const [combo, setCombo] = useState(0);

  const [endMessage, setEndMessage] = useState("");

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
      dispatch(gameActions.changePlayer());
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

  const layoutPlayerA = <Player role="A" myScore={score.A} />;
  const layoutPlayerB =
    numPlayers == 2 ? <Player role="B" myScore={score.B} /> : null;

  return (
    <GameContainer>
      {!endMessage && (
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
      {endMessage && (
        <EndingModal
          endMessage={endMessage}
          score={score.A}
          gameType="memory"
        />
      )}
    </GameContainer>
  );
};

export default MemoryGame;
