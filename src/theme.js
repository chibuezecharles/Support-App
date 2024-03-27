import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'DaxlinePro', sans-serif`,
    body: `'DaxlinePro', sans-serif`,
  },
  colors: {
    brand: {
      primary: "#005E39",
    },
  },
  Table: {
    variants: {
      striped: {
        tbody: {
          "tr:nth-child(odd)": {
            bg: "#F5FFFB",
          },
        },
      },
    },
  },
});

export default theme;
