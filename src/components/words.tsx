import { FC } from "react";
import { Word } from "./word";

interface IWords {
  words: string[];
  errors: Set<number>;
  index: number;
  initialIndex?: number;
  learningWords: Map<string, number>;
  isCurrentShown: boolean;
}

export const Words: FC<IWords> = ({
  words,
  index: currentIndex,
  initialIndex = 0,
  errors,
  learningWords,
  isCurrentShown,
}) => {
  return (
    <div className="flex gap-3 flex-wrap text-xl font-medium mb-4">
      {words.map((word, i) => {
        const index = initialIndex + i;
        return (
          <Word
            key={word + index}
            word={word}
            isPast={index < currentIndex}
            isCurrent={isCurrentShown ? index === currentIndex : false}
            isError={errors.has(index)}
            learningCount={learningWords.get(word) ?? 0}
          />
        );
      })}
    </div>
  );
};
