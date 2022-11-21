import React from "react";
import classes from "./SettingButton.module.css";
import { useSelector, useDispatch } from "react-redux";
import { memoryActions } from "../../store/memory-slice";

const SettingButton = ({ nums }) => {
  const currentNumCards = useSelector((state) => state.memory.numCards);
  const dispatch = useDispatch();
  const settingHandler = () => {
    dispatch(memoryActions.setNumCards(nums));
  };

  let btnClass;
  if (currentNumCards === nums) {
    btnClass = classes["setting-btn"] + " " + classes["chosen-btn"];
  } else {
    btnClass = classes["setting-btn"];
  }

  return (
    <button onClick={settingHandler} className={btnClass}>
      {nums}
    </button>
  );
};

export default SettingButton;
