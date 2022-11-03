import React from "react";
import classes from "./Setting.module.css";
import SettingButton from "./SettingButton";

const Setting = ({ numCards, setNumCards, numPlayers, setNumPlayers }) => {
  return (
    <section className={classes["setting-section"]}>
      <div>
        <h3>卡牌數量</h3>
        <SettingButton setNumber={setNumCards} nums={4} current={numCards} />
        <SettingButton setNumber={setNumCards} nums={8} current={numCards} />
        <SettingButton setNumber={setNumCards} nums={12} current={numCards} />
        <SettingButton setNumber={setNumCards} nums={16} current={numCards} />
      </div>
      <div className={classes["player-setting"]}>
        <h3>人數</h3>
        <SettingButton setNumber={setNumPlayers} nums={1} current={numPlayers}>
          單人
        </SettingButton>
        <SettingButton setNumber={setNumPlayers} nums={2} current={numPlayers}>
          雙人
        </SettingButton>
      </div>
    </section>
  );
};

export default Setting;
