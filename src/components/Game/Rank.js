import React, { useState } from "react";
import { useEffect } from "react";
import RankService from "../../services/Rank.service";
import classes from "./Rank.module.css";
import StartButton from "../UI/StartButton";
import { useNavigate } from "react-router-dom";

const Rank = ({ isDone, name, score, gameType }) => {
  const [rank, setRank] = useState(null);
  const navigate = useNavigate();

  const loadData = async () => {
    const curRank = await RankService.loadRank(gameType);
    setRank(curRank.map((record, idx) => ({ ...record, place: idx })));
  };

  const recordNewRank = async () => {
    let curRank = await RankService.loadRank(gameType);
    if (!curRank) {
      curRank = [{ name, score }];
    } else {
      let inserted = false;
      for (let i = 0; i < curRank.length; i++) {
        if (score >= curRank[i].score) {
          curRank.splice(i, 0, { name, score });
          inserted = true;
          break;
        }
        if (!inserted && curRank.length < 10) curRank.push({ name, score });
      }
    }
    curRank = curRank.slice(0, 10);
    const putResponse = await RankService.updateRank(curRank, gameType);
    setRank(curRank.map((record, idx) => ({ ...record, place: idx })));
  };

  useEffect(() => {
    if (isDone) recordNewRank();
    if (!isDone) loadData();
  }, [isDone]);

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
