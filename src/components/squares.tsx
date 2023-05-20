import { Text } from "@/stores/text";
import { FC, Suspense } from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { useLearningColors } from "./word";

export const CurrentLearningWords: FC<{
  words: Text.LearningWords;
  currentWord: string;
}> = ({ words, currentWord }) => {
  const squares = Array.from(words);
  squares.sort((a, b) => b[1] - a[1]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-wrap gap-1 items-center">
        <span className="mr-4">You have {words.size} words to learn</span>
        {squares.map(([word, score], i) => {
          const isLastOfCategorie = squares[i + 1]?.[1] !== score;
          return (
            <Square
              key={word}
              score={score}
              isCurrent={word === currentWord}
              className={isLastOfCategorie ? "mr-2" : ""}
            />
          );
        })}
      </div>
    </Suspense>
  );
};

const Square: FC<{ score: number; className: string; isCurrent: boolean }> = ({
  score,
  className,
  isCurrent,
}) => {
  const bg = useLearningColors(score);
  const color = useColorModeValue("gray.900", "gray.100");
  const text = useColorModeValue("gray.100", "gray.900");
  return (
    <Box
      bg={bg}
      color={color}
      className={`transition-all h-4 w-4 rounded text-xs flex items-center justify-center ${className} ${
        isCurrent ? "ring-1 ring-current" : ""
      }`}
    >
      <Box color={text}>{score}</Box>
    </Box>
  );
};
