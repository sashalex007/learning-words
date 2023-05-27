import { Settings } from "@/stores/settings";
import { Box } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

interface IWordWithLetters {
  word: string;
  input: string;
  isTyped: boolean;
  className?: string;
  color?: string;
}

export const WordWithLetters: FC<IWordWithLetters> = ({
  word,
  input,
  isTyped,
  className,
  color,
}) => {
  const letters = word.split("");
  const excessCount = Math.max(0, input.length - word.length);
  const inExcessLetters = new Array(excessCount).fill("_");
  const displayedLetters = [...letters, ...inExcessLetters];
  const { isLetterHighlightEnabled } = Settings.get();

  return (
    <Box className={"flex " + className} color={color}>
      {displayedLetters.map((char, i) => (
        <Letter
          key={i}
          char={char}
          isWordTyped={isTyped}
          index={i}
          isLetterTyped={isLetterHighlightEnabled ? i < input.length : false}
        />
      ))}
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
