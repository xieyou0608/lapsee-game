import { styled } from "@mui/material";

const AppLayout = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: ${(props) => (props.game ? "#fdf3e1" : "#f4d749")};
  // On mobile
  // using vh will size the element as if the URL bar is always hidden
  // while using % will size the element as if the URL bar were always showing.
  position: absolute;
  min-height: 100%;
  width: 100%;
`;

export default AppLayout;
