import React from "react";
import classes from "./ModalContainer.module.css";

const ModalContainer = (props) => {
  return (
    <React.Fragment>
      <div className={classes["backdrop"]} onClick={props.onClose} />
      <div className={classes["modal"]}>
        <header className={classes["title"]}>
          <h2>{props.title}</h2>
        </header>
        {props.children}
      </div>
    </React.Fragment>
  );
};

export default ModalContainer;
