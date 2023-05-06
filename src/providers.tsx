"use client";

import "@fontsource/roboto-mono/400.css";

import { CacheProvider } from "@chakra-ui/next-js";
import {
  ChakraBaseProvider,
  ColorModeScript,
  extendBaseTheme,
} from "@chakra-ui/react";
import chakraTheme from "@chakra-ui/theme";

const { Button, Textarea, Input, Tabs } = chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    Button,
    Textarea,
    Input,
    Tabs,
  },
  fonts: {
    body: "Roboto Mono, sans-serif",
  },
  initialColorMode: "dark",
  useSystemColorMode: false,
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraBaseProvider theme={theme}>{children}</ChakraBaseProvider>
    </CacheProvider>
  );
}
