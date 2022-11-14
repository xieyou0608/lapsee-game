import React from "react";
import classes from "./IntroPage.module.css";
import StartButton from "../components/UI/StartButton";
import { useNavigate } from "react-router-dom";

const IntroPage = () => {
  const navigate = useNavigate();
  const goToGameIntro = () => {
    navigate("/game-intro");
  };
  return (
    <div className={classes.intro}>
      <p>
        很久以前，各個媒體擁有自己的村莊，他們愉快地互相配合，將最新資訊傳遞給雲朵下的人們。不過，自從網際網路村莊的出現，他們也發現，雖然網路資訊可以更快速地傳出，但品質一點也不穩定，老是缺東缺西，甚至在只知道部分資訊下，就急忙地將資訊傳出去。因此，各村村長決定聯合起來，跟網際網路村長抗議，希望村長可以出面跟村民溝通。殊不知負責傳遞訊息的網路村民再次因為心急，話都沒聽完就急著送出資訊，意外地引發一場媒體戰爭。因為各個媒體老是覺得，跟自己不一樣的媒體一點也不好，看不見對方優點的同時，根本無法好好地重新分配工作，所以希望能透過你的協助，讓各個媒體能夠真正地認識彼此，且願意和平地相處。
      </p>
      <div className={classes.footer}>
        <p>你準備好一起改變媒體村莊的命運了嗎？</p>
        <StartButton onClick={goToGameIntro}>出發!</StartButton>
      </div>
    </div>
  );
};

export default IntroPage;
