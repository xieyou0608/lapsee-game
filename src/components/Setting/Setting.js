import React from "react";
import classes from "./Setting.module.css";
import SettingButton from "./SettingButton";

const Setting = ({ numCards, setNumCards }) => {
  return (
    <section className={classes["setting-section"]}>
      <div>
        <p>卡牌數量</p>
        <SettingButton nums={4} />
        <SettingButton nums={8} />
        <SettingButton nums={12} />
        <SettingButton nums={16} />
      </div>
    </section>
  );
};

export default Setting;
