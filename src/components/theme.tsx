"use client";

import { Box, useColorModeValue } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

export const Theme: FC<{ children: ReactNode }> = ({ children }) => {
  const text = useColorModeValue("gray.500", "gray.500");
  return (
    <Box color={text} className="flex flex-col items-center min-h-full">
      {children}
    </Box>
  );
};
