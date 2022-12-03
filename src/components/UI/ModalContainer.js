import React from "react";
import classes from "./ModalContainer.module.css";

const ModalContainer = (props) => {
  return (
    <div className={classes["modal-layout"]}>
      <div className={classes["backdrop"]} onClick={props.onClose} />
      <div className={classes["modal"]}>
        <header className={classes["title"]}>
          <h2>{props.title}</h2>
        </header>
        {props.children}
      </div>
    </div>
  );
};

export default ModalContainer;
