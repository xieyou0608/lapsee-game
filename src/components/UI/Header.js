import React from "react";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.logo}>
      <h1>Lapsee</h1>
      <h2>Memory Matching Game</h2>
    </header>
  );
};

export default Header;
