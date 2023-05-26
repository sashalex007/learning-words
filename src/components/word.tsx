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
  isPreviousCurrent?: boolean;
  learningCount?: number;
  className?: string;
}> = ({
  word,
  input = "",
  isPast = false,
  isPreviousCurrent = false,
  isCurrent = false,
  learningCount = 0,
  className,
}) => {
  const [previousState] = useState({ learningCount, isPast });
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!isCurrent && isPreviousCurrent) {
      setIsDone(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCurrent, learningCount]);

  const isError = isCurrent && input !== word.slice(0, input.length);

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

  const letters = word.split("");
  const excessCount = Math.max(0, input.length - word.length);
  const inExcessLetters = new Array(excessCount).fill("_");
  const displayedLetters = [...letters, ...inExcessLetters];

  return (
    <Box className="relative">
      <Box className={"flex " + lettersCls + className} color={lettersColor}>
        {displayedLetters.map((char, i) => (
          <Letter
            key={i}
            char={char}
            isWordTyped={isDone}
            index={i}
            isLetterTyped={i < input.length}
          />
        ))}
      </Box>
      {isDone && (
        <Box color={color} className={"absolute top-0 " + cls + className}>
          {word}
        </Box>
      )}
    </Box>
  );
};

const Letter: FC<{
  char: string;
  isWordTyped: boolean;
  isLetterTyped: boolean;
  index: number;
}> = ({ char, isWordTyped, index, isLetterTyped }) => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if (isWordTyped) {
      setTimeout(() => setIsAnimated(true), index * 100);
    }
  }, [isWordTyped, index]);

  const animatedCls = isAnimated
    ? `${
        index % 2 === 0 ? "-translate-y-4" : "translate-y-4"
      } opacity-0 -translate-x-2 rotate-180`
    : "";

  const typedCls = isLetterTyped ? "opacity-20" : "";
  const baseCls = `transition-all ease-in-out ${
    isWordTyped ? "duration-1000" : "duration-250"
  } z-10`;
  const cls = baseCls + " " + typedCls + " " + animatedCls;

  return <div className={cls}>{char}</div>;
};
