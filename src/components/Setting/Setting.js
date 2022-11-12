import React from "react";
import classes from "./Setting.module.css";
import SettingButton from "./SettingButton";

const Setting = ({ numCards, setNumCards }) => {
  return (
    <section className={classes["setting-section"]}>
      <div>
        <p>卡牌數量</p>
        <SettingButton setNumber={setNumCards} nums={4} current={numCards} />
        <SettingButton setNumber={setNumCards} nums={8} current={numCards} />
        <SettingButton setNumber={setNumCards} nums={12} current={numCards} />
        <SettingButton setNumber={setNumCards} nums={16} current={numCards} />
      </div>
    </section>
  );
};

export default Setting;
