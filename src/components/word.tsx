import { Box, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";

interface IWordStyle {
  isPast: boolean;
  isCurrent: boolean;
  isError: boolean;
  learningCount: number;
}

const useWordStyle = ({
  isPast,
  isCurrent,
  isError,
  learningCount,
}: IWordStyle): { color: string; cls: string } => {
  let color = useColorModeValue("gray.900", "gray.100");
  const pastColor = useColorModeValue("gray.300", "gray.600");
  const errorColor = useColorModeValue("pink.500", "pink.400");
  const learning1Color = useColorModeValue("blue.200", "cyan.800");
  const learning2Color = useColorModeValue("blue.300", "cyan.700");
  const learning3Color = useColorModeValue("blue.400", "cyan.600");
  const learning4Color = useColorModeValue("blue.500", "cyan.500");
  const learning5Color = useColorModeValue("blue.600", "cyan.400");
  const learning6Color = useColorModeValue("blue.700", "cyan.300");

  let cls = "transition-all ";

  if (isCurrent) cls += "underline underline-offset-4 ";

  if (learningCount > 0) {
    cls += "font-bold ";
    color = (() => {
      switch (learningCount) {
        case 1:
          return learning1Color;
        case 2:
          return learning2Color;
        case 3:
          return learning3Color;
        case 4:
          return learning4Color;
        case 5:
          return learning5Color;
        case 6:
          return learning6Color;
        default:
          return "";
      }
    })();
  } else if (isPast) {
    color = pastColor;
  }

  if (isError) {
    if (isPast) {
      cls += "line-through ";
    } else {
      color = errorColor;
    }
  }

  return { color, cls };
};

export const Word: FC<{
  word: string;
  isPast?: boolean;
  isCurrent?: boolean;
  isError?: boolean;
  learningCount?: number;
  className?: string;
}> = ({
  word,
  isPast = false,
  isCurrent = false,
  isError = false,
  learningCount = 0,
  className,
}) => {
  const { color, cls } = useWordStyle({
    isPast,
    isCurrent,
    isError,
    learningCount,
  });

  return (
    <Box className={cls + className} color={color}>
      {word}
    </Box>
  );
};
