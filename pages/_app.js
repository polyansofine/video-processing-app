import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AuthProvider } from "../hooks";
import "../styles/globals.css";

const colors = {
  brand: {
    900: "#1a365d",
    900: "#153e75",
    900: "#2a69ac",
  },
};
const theme = extendTheme({ colors });
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
