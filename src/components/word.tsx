import { Box, useColorModeValue } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

export const useLearningColors = (learningCount: number) => {
  const learningColors = [
    useColorModeValue("blue.200", "cyan.800"),
    useColorModeValue("blue.300", "cyan.700"),
    useColorModeValue("blue.400", "cyan.600"),
    useColorModeValue("blue.500", "cyan.500"),
    useColorModeValue("blue.600", "cyan.400"),
    useColorModeValue("blue.700", "cyan.300"),
  ];

  return learningColors[learningCount - 1];
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

  let cls = "flex transition-all relative ";

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
  const [previousState, setPreviousState] = useState({
    isCurrent,
    learningCount,
    isPast,
    isError,
  });
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!isCurrent && previousState.isCurrent) {
      setIsDone(true);
    }
    setPreviousState({ isCurrent, learningCount, isPast, isError });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCurrent, isError, learningCount]);

  const { color, cls } = useWordStyle({
    isPast,
    isCurrent,
    isError,
    learningCount,
  });
  const { color: previousColor } = useWordStyle({
    isPast: previousState.isPast,
    isCurrent: previousState.isCurrent,
    isError: previousState.isError,
    learningCount: previousState.learningCount,
  });

  return (
    <Box className={cls + className} color={previousColor}>
      {word.split("").map((char, i) => (
        <Letter key={i} char={char} isDone={isDone} index={i} />
      ))}
      <Box color={color} className="absolute top-0">
        {word}
      </Box>
    </Box>
  );
};

const Letter: FC<{ char: string; isDone: boolean; index: number }> = ({
  char,
  isDone,
  index,
}) => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if (isDone) {
      setTimeout(() => setIsAnimated(true), index * 100);
    }
  }, [isDone, index]);

  const animatedCls = `${
    index % 2 === 0 ? "-translate-y-4" : "translate-y-4"
  } opacity-0 -translate-x-2 rotate-180`;

  return (
    <div
      className={`transition-all duration-1000 z-10 ${
        isAnimated ? animatedCls : ""
      }`}
    >
      {char}
    </div>
  );
};
