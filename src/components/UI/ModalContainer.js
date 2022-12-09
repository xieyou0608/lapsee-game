import React from "react";
import classes from "./ModalContainer.module.css";

const ModalContainer = (props) => {
  return (
    <div className={classes["modal-layout"]}>
      <div className={classes["backdrop"]} onClick={props.onClose} />
      <div className={classes["modal"]}>
        <header
          className={classes["title"]}
          style={{ backgroundColor: props.titleColor }}
        >
          <h2>{props.title}</h2>
        </header>
        {props.children}
      </div>
    </div>
  );
};

export default ModalContainer;
