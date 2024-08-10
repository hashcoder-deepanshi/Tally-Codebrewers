import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    config: {
        initialColoMode: "dark",
        useSystemColorMode: false,
    },
});

export default theme;