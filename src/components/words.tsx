import { FC } from "react";
import { Word } from "./word";

interface IWords {
  words: string[];
  previousWords?: string[];
  errors: Set<number>;
  index: number;
  initialIndex?: number;
  learningWords: Map<string, number>;
  isCurrentShown: boolean;
  hasBrackets?: boolean;
}

export const Words: FC<IWords> = ({
  words,
  previousWords = [],
  index: currentIndex,
  initialIndex = 0,
  errors,
  learningWords,
  isCurrentShown,
  hasBrackets = false,
}) => {
  return (
    <div className="flex gap-3 flex-wrap text-xl font-medium">
      {hasBrackets && <span>[</span>}
      {previousWords.map((word, i) => {
        return <Word key={word + i} word={word} isPast={true} />;
      })}
      {words.map((word, i) => {
        const index = initialIndex + i;
        return (
          <Word
            key={word + index}
            word={word}
            isPast={index < currentIndex}
            isCurrent={isCurrentShown ? index === currentIndex : false}
            isPreviousCurrent={
              isCurrentShown
                ? index === currentIndex - 1 ||
                  (index === 0 && currentIndex === 0)
                : false
            }
            isError={errors.has(index)}
            learningCount={learningWords.get(word) ?? 0}
          />
        );
      })}
      {hasBrackets && <span>]</span>}
    </div>
  );
};
