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
  const [learningCount, setLearningCount] = useState(
    Store.getLearningWords().size
  );

  // TODO: Add management of double letters like ^

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
      setLearningCount(Store.getLearningWords().size);
    }
    setInputValue(word);
  };

  const submitWord = (value: string) => {
    if (value.trim() !== currentWord.trim()) {
      setInputValue(value);
      return;
    }

    setInputValue("");
    Store.addCorrection(currentWord);
    setLearningCount(Store.getLearningWords().size);

    if (index === words.length - 1) {
      next();
      return;
    }

    setIndex((i) => i + 1);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>You have {learningCount} learning words</div>
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

      <div className="flex gap-4 items-center justify-between">
        <Input
          placeholder="Type here"
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
        />

        <Navigation next={next} back={back} />
      </div>
    </div>
  );
};

const Navigation: FC<{ next: () => void; back: () => void }> = ({
  next,
  back,
}) => {
  return (
    <div className="flex gap-2">
      <Button size="sm" className="self-end" onClick={back}>
        Back
      </Button>
      <Button size="sm" className="self-end" onClick={next}>
        Next
      </Button>
    </div>
  );
};
