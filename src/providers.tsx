"use client";

import "@fontsource/roboto-mono/400.css";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraBaseProvider, extendBaseTheme } from "@chakra-ui/react";
import chakraTheme from "@chakra-ui/theme";

const { Button, Textarea, Input } = chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    Button,
    Textarea,
    Input,
  },
  fonts: {
    body: "Roboto Mono, sans-serif",
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraBaseProvider theme={theme}>{children}</ChakraBaseProvider>
    </CacheProvider>
  );
}
