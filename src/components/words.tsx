import { FC } from "react";
import { Word } from "./word";

interface IWords {
  words: string[];
  previousWords?: string[];
  index: number;
  initialIndex?: number;
  learningWords: Map<string, number>;
  isCurrentShown: boolean;
  hasBrackets?: boolean;
  input?: string;
}

export const Words: FC<IWords> = ({
  words,
  input,
  previousWords = [],
  index: currentIndex,
  initialIndex = 0,
  learningWords,
  isCurrentShown,
  hasBrackets = false,
}) => {
  return (
    <div className="flex gap-3 flex-wrap text-xl font-medium">
      {hasBrackets && <span>[</span>}

      {previousWords.map((word, i) => (
        <Word key={word + i} word={word} isPast={true} />
      ))}
      
      {words.map((word, i) => {
        const index = initialIndex + i;
        const isCurrent = index === currentIndex;
        const isNextCurrent = index + 1 === currentIndex;
        return (
          <Word
            input={isCurrent ? input : ""}
            key={word + index}
            word={word}
            isPast={index < currentIndex}
            isCurrent={isCurrentShown ? isCurrent : false}
            isNextCurrent={isNextCurrent}
            learningCount={learningWords.get(word) ?? 0}
          />
        );
      })}

      {hasBrackets && <span>]</span>}
    </div>
  );
};
