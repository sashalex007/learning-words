"use client";

import { IconButton, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { FC } from "react";

export const Header: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <header className="flex items-center justify-end w-full  p-2">
      <IconButton
        onClick={toggleColorMode}
        aria-label="Toggle color mode"
        icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
        variant="outline"
        size="sm"
      />
    </header>
  );
};
