import { FC } from "react";
import { Word } from "./word";

interface IWords {
  words: string[];
  errors: Set<number>;
  index: number;
  learningWords: Map<string, number>;
  isCurrentShown: boolean;
}

export const Words: FC<IWords> = ({
  words,
  index,
  errors,
  learningWords,
  isCurrentShown,
}) => {
  return (
    <div className="flex gap-3 flex-wrap text-xl font-medium mb-4">
      {words.map((word, i) => {
        return (
          <Word
            key={word + i}
            word={word}
            isPast={i < index}
            isCurrent={isCurrentShown ? i === index : false}
            isError={errors.has(i)}
            learningCount={learningWords.get(word) ?? 0}
          />
        );
      })}
    </div>
  );
};
