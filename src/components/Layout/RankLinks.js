import React from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip, IconButton } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";

const RankLinks = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Tooltip title="對對碰排行榜" placement="top" arrow>
        <IconButton onClick={() => navigate("/memory-rank")}>
          <BarChartIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="知識王排行榜" placement="top" arrow>
        <IconButton onClick={() => navigate("/quiz-rank")}>
          <BarChartIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default RankLinks;
