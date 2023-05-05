"use client";

import { Store } from "@/stores";
import { FC, useState } from "react";
import { Button, Input } from "@chakra-ui/react";
import { Word } from "./word";

export const Exercise: FC = () => {
  const [words, setWords] = useState<string[]>(Store.getExerciseWords());
  const [index, setIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [errors, setErrors] = useState(new Set<number>());

  const resetExercise = () => {
    setWords(Store.getExerciseWords());
    setIndex(0);
    setInputValue("");
    setErrors(new Set<number>());
  };

  const next = () => {
    Store.next();
    resetExercise();
  };
  const back = () => {
    Store.back();
    resetExercise();
  };

  const learningWords = Store.getLearningWords();
  const currentWord = words[index];

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
      Store.addLearningWord(currentWord);
    }
    setInputValue(word);
  };

  const submitWord = (value: string) => {
    if (value.trim() !== currentWord) {
      setInputValue(value);
      return;
    }

    setInputValue("");
    Store.addCorrection(currentWord);

    if (index === words.length - 1) {
      next();
      return;
    }

    setIndex((i) => i + 1);
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

      <Button size="sm" className="self-end" onClick={back}>
        Back
      </Button>
      <Button size="sm" className="self-end" onClick={next}>
        Next
      </Button>
    </>
  );
};
