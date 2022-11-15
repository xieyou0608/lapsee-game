import React, { useState } from "react";
import classes from "./IntroPage.module.css";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

const IntroPage = ({ numPlayers }) => {
  const you = numPlayers === 1 ? "你" : "你們";
  const story = [
    "很久以前，各個媒體擁有自己的村莊，他們愉快地互相配合，將最新資訊傳遞給雲朵下的人們。",
    "不過，自從網際網路村莊的出現，他們也發現，雖然網路資訊可以更快速地傳出，但品質一點也不穩定，老是缺東缺西，甚至在只知道部分資訊下，就急忙地將資訊傳出去。",
    "因此，各村村長決定聯合起來，跟網際網路村長抗議，希望村長可以出面跟村民溝通。",
    "殊不知負責傳遞訊息的網路村民再次因為心急，話都沒聽完就急著送出資訊，意外地引發一場媒體戰爭。",
    "因為各個媒體老是覺得，跟自己不一樣的媒體一點也不好，看不見對方優點的同時，根本無法好好地重新分配工作。",
    `希望能透過${you}的協助，讓各個媒體能夠真正地認識彼此，且願意和平地相處。`,
    `${you}準備好一起改變媒體村莊的命運了嗎？`,
  ];

  const navigate = useNavigate();
  const goToGameIntro = () => {
    navigate("/game-intro");
  };

  const [page, setPage] = useState(0);
  const nextPage = () => {
    setPage((prev) => prev + 1);
  };
  const prevPage = () => {
    setPage((prev) => prev - 1);
  };

  return (
    <div className={classes.intro}>
      <p>{story[page]}</p>
      <div className={classes.footer}>
        {page !== 0 && (
          <IconButton onClick={prevPage} size="large">
            <SkipPreviousIcon fontSize="large" />
          </IconButton>
        )}
        {page !== story.length - 1 && (
          <IconButton onClick={nextPage} size="large">
            <SkipNextIcon fontSize="large" />
          </IconButton>
        )}
        {page === story.length - 1 && (
          <button className={classes.btn} onClick={goToGameIntro}>
            出發!
          </button>
        )}
      </div>
    </div>
  );
};

export default IntroPage;
