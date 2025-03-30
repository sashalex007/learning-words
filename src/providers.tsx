"use client";

import "@fontsource/roboto-mono/400.css";

import { CacheProvider } from "@chakra-ui/next-js";
import {
  ChakraBaseProvider,
  ColorModeScript,
  extendBaseTheme,
} from "@chakra-ui/react";

import { Button, Switch, Textarea, Input, Tabs, Link } from "@chakra-ui/react";

export const theme = extendBaseTheme({
  components: {
    Button,
    Textarea,
    Input,
    Tabs,
    Switch,
    Link,
  },
  fonts: {
    body: "Roboto Mono, sans-serif",
  },
  initialColorMode: "dark",
  useSystemColorMode: true,
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      
        <ChakraBaseProvider theme={theme}>{children}</ChakraBaseProvider>
    
      <ColorModeScript initialColorMode="dark" />
    </>
  );
}
9