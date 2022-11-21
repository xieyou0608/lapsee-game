import React, { useState } from "react";
import { useEffect } from "react";
import RankService from "../../services/Rank.service";
import classes from "./Rank.module.css";
import StartButton from "../UI/StartButton";
import { useNavigate } from "react-router-dom";

const Rank = ({ gameType }) => {
  const [rank, setRank] = useState(null);
  const navigate = useNavigate();

  const loadData = async () => {
    const curRank = await RankService.loadRank(gameType);
    setRank(curRank.map((record, idx) => ({ ...record, place: idx })));
  };

  useEffect(() => {
    loadData();
  }, []);

  const gameTitle = {
    memory: "媒體對對碰",
    quiz: "媒體知識王",
  };

  return (
    <div className={classes["rank-page"]}>
      <header className={classes.rankTitle}>
        <h1>{gameTitle[gameType]}</h1>
        <h2>榮耀排行榜</h2>
      </header>
      <div className={classes.rank}>
        {rank &&
          rank.map((record) => (
            <div className={classes.record} key={record.place}>
              <div className={classes["left-circle"]}>{record.place + 1}</div>
              {/* <div className={classes["left-triangle"]}></div>
              <div className={classes["right-triangle"]}></div> */}
              <div className={classes["right-circle"]}>
                <p>{record.name}</p>
                <p>{record.score}</p>
              </div>
            </div>
          ))}
      </div>
      <StartButton
        onClick={() => {
          navigate("/");
        }}
      >
        回首頁
      </StartButton>
    </div>
  );
};

export default Rank;
