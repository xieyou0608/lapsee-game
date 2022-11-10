import React from "react";
import classes from "./MessageModal.module.css";

const MessageModal = (props) => {
  const { title, content, onConfirm } = props;
  return (
    <React.Fragment>
      <div className={classes["backdrop"]} onClick={onConfirm} />
      <div className={classes["modal"]}>
        <header className={classes["title"]}>
          <h2>{title}</h2>
        </header>
        <div className={classes["content"]}>
          <p>{content}</p>
        </div>
        <footer className={classes["action"]}>
          <button className={classes["confirm-btn"]} onClick={onConfirm}>
            OK
          </button>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default MessageModal;
