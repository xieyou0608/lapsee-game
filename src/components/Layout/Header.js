import React from "react";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.appTitle}>
      <h1>糟了！媒體小鎮</h1>
      <h2>媒體大考驗</h2>
    </header>
  );
};

export default Header;
