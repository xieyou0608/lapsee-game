import React from "react";
import classes from "./SettingButton.module.css";

const SettingButton = (props) => {
  const { setNumber, nums, current } = props;

  let btnClass;
  if (current === nums) {
    btnClass = classes["setting-btn"] + " " + classes["chosen-btn"];
  } else {
    btnClass = classes["setting-btn"];
  }

  const settingHandler = () => {
    setNumber(nums);
  };
  const content = props.children ? props.children : nums;
  return (
    <button onClick={settingHandler} className={btnClass}>
      {content}
    </button>
  );
};

export default SettingButton;
