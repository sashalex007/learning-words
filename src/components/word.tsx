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
  isFlashing: boolean;
}

const useWordStyle = ({
  isPast,
  isCurrent,
  isError,
  learningCount,
  isFlashing,
}: IWordStyle): { color: string; cls: string } => {
  let color = useColorModeValue("gray.900", "gray.100");
  const pastColor = useColorModeValue("gray.300", "gray.600");
  const errorColor = useColorModeValue("pink.500", "pink.400");
  const flashColor = useColorModeValue("blue.800", "cyan.200");
  const learningColor = useLearningColors(learningCount);

  let cls = "transition-all ";

  if (isCurrent) cls += "underline underline-offset-4 ";

  if (learningCount > 0) {
    cls += "font-bold ";
    color = learningColor;
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

  if (isFlashing) {
    color = flashColor;
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
  });
  const [isFlashing, setIsFlashing] = useState(false);

  const flash = () => {
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 200);
  };

  useEffect(() => {
    if (
      !isCurrent &&
      previousState.isCurrent &&
      !isError &&
      previousState.learningCount > 0
    ) {
      flash();
    }
    setPreviousState({ isCurrent, learningCount });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCurrent, isError, learningCount]);

  const { color, cls } = useWordStyle({
    isPast,
    isCurrent,
    isError,
    learningCount,
    isFlashing,
  });

  return (
    <Box className={cls + className} color={color}>
      {word}
    </Box>
  );
};
