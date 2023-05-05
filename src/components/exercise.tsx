"use client";

import { LocalWords, localText } from "@/storage";
import { getWords } from "@/utils";
import { FC, useState } from "react";
import { Input } from "@chakra-ui/react";

export const Exercise: FC = () => {
  const [words] = useState<string[]>(getWords(localText.get()));
  const [index, setIndex] = useState(0);
  const [errors, setErrors] = useState(new Set<number>());
  const learningWords = LocalWords.get();

  const currentWord = words[index];

  const [inputValue, setInputValue] = useState("");

  const handleChange = (value: string) => {
    if (value.slice(-1) === " ") {
      submitWord(value);
    } else {
      updateWord(value);
    }
  };

  const updateWord = (word: string) => {
    if (!currentWord.startsWith(word)) {
      setErrors((e) => e.add(index));
      LocalWords.addError(currentWord);
    }
    setInputValue(word);
  };

  const submitWord = (value: string) => {
    if (value.trim() === currentWord) {
      setIndex((i) => i + 1);
      setInputValue("");
      LocalWords.addCorrect(currentWord);
    } else {
      setInputValue(value);
    }
  };

  return (
    <>
      <div className="flex gap-2 flex-wrap">
        {words.map((word, i) => {
          return (
            <Word
              key={word + i}
              word={word}
              isPast={i < index}
              isCurrent={i === index}
              isError={errors.has(i)}
              learningCount={learningWords.get(word) ?? 0}
            />
          );
        })}
      </div>

      <Input
        className="mt-3"
        placeholder="Type here"
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
      />
    </>
  );
};

const getColor = (count: number): string => {
  switch (count) {
    case 1:
      return "text-blue-300";
    case 2:
      return "text-blue-400";
    case 3:
      return "text-blue-500";
    case 4:
      return "text-blue-600";
    case 5:
      return "text-blue-700";
    case 6:
      return "text-blue-800";
    default:
      return "";
  }
};

const Word: FC<{
  word: string;
  isPast: boolean;
  isCurrent: boolean;
  isError: boolean;
  learningCount: number;
}> = ({ word, isPast, isCurrent, isError, learningCount }) => {
  let cls = "";
  const isLearning = learningCount > 0;

  if (isCurrent) cls += "underline ";
  if (isPast) cls += "text-gray-500 ";
  if (isLearning) cls += "font-bold " + getColor(learningCount) + " ";
  if (isError) cls += isPast ? "line-through " : "text-red-400 ";

  return <span className={cls}>{word}</span>;
};
