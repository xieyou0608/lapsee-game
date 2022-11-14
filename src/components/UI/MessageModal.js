import React from "react";
import classes from "./MessageModal.module.css";
import ModalContainer from "./ModalContainer";

const MessageModal = (props) => {
  const { title, content, onConfirm } = props;
  return (
    <ModalContainer onClose={onConfirm} title={title}>
      <div className={classes["content"]}>
        <p>{content}</p>
      </div>
      <footer className={classes["action"]}>
        <button className={classes["confirm-btn"]} onClick={onConfirm}>
          OK
        </button>
      </footer>
    </ModalContainer>
  );
};

export default MessageModal;
