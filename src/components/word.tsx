import { Box, useColorModeValue } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { WordWithLetters } from "./letters";
import { getIsMatchingSoFar } from "@/utils";

export const useLearningColors = (learningCount: number) => {
  const learningColors = [
    useColorModeValue("blue.200", "cyan.800"),
    useColorModeValue("blue.300", "cyan.700"),
    useColorModeValue("blue.400", "cyan.600"),
    useColorModeValue("blue.500", "cyan.500"),
    useColorModeValue("blue.600", "cyan.400"),
    useColorModeValue("blue.700", "cyan.300"),
  ];

  return learningColors[5];
};

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
  const pastColor = useColorModeValue("gray.200", "gray.700");
  const errorColor = useColorModeValue("pink.500", "pink.400");
  const learningColor = useLearningColors(learningCount);

  let cls = "";

  if (isCurrent) cls += "underline underline-offset-4 ";

  if (learningCount > 0) {
    cls += "font-bold ";
    color = learningColor;
  }

  if (isPast) {
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
  input?: string;
  word: string;
  isPast?: boolean;
  isCurrent?: boolean;
  isNextCurrent?: boolean;
  learningCount?: number;
  className?: string;
}> = ({
  word,
  input = "",
  isPast = false,
  isNextCurrent = false,
  isCurrent = false,
  learningCount = 0,
  className,
}) => {
  const [previousState] = useState({ learningCount, isPast });
  const [isTyped, setIsTyped] = useState(false);

  useEffect(() => {
    if (!isCurrent && isNextCurrent) {
      setIsTyped(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCurrent, learningCount]);

  const isError = isCurrent && !getIsMatchingSoFar(word, input);

  const { color, cls } = useWordStyle({
    isPast,
    isCurrent,
    isError,
    learningCount,
  });
  const { color: lettersColor, cls: lettersCls } = useWordStyle({
    isPast: previousState.isPast,
    isCurrent,
    isError,
    learningCount: previousState.learningCount,
  });

  return (
    <Box className="relative">
      <WordWithLetters
        word={word}
        input={input}
        isTyped={isTyped}
        className={lettersCls + className}
        color={lettersColor}
      />

      {isTyped && (
        <Box color={color} className={"absolute top-0 " + cls + className}>
          {word}
        </Box>
      )}
    </Box>
  );
};
