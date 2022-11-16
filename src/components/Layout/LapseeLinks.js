import React from "react";
import { Tooltip, IconButton, Link } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import HomeIcon from "@mui/icons-material/Home";

const LapseeLinks = () => {
  return (
    <div>
      <Tooltip title="Facebook" arrow>
        <IconButton>
          <Link
            href="https://www.facebook.com/lapseetheworld.tw"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon />
          </Link>
        </IconButton>
      </Tooltip>
      <Tooltip title="Instagram" arrow>
        <IconButton>
          <Link
            href="https://www.instagram.com/thisislapsee/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
          </Link>
        </IconButton>
      </Tooltip>
      <Tooltip title="Lapsee官方網站" arrow>
        <IconButton>
          <Link
            href="https://lapsee.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <HomeIcon />
          </Link>
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default LapseeLinks;
