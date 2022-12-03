import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: `"Noto Sans TC", sans-serif`,
    },
  },
  breakpoints: {
    values: {
      xs: 0, //default
      sm: 768, //modified (default 600px)
      md: 900, //default
      lg: 1200, //default
      xl: 1536, //default
    },
  },
});

export default theme;
