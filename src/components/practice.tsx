"use client";

import { Store } from "@/stores";
import { FC, useState } from "react";
import { Button, IconButton, Input } from "@chakra-ui/react";
import { Word } from "./word";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

export const Practice: FC = () => {
  const [words, setWords] = useState<string[]>(Store.getExerciseWords());
  const [index, setIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [errors, setErrors] = useState(new Set<number>());
  const [learningCount, setLearningCount] = useState(
    Store.getLearningWords().size
  );

  // TODO: Add tada animation if learningCount decrease from 1 to 0

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
    const isCorrect =
      currentWord.startsWith(word) || ["^", "¨"].includes(word.slice(-1));

    if (!isCorrect) {
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
    <div className="flex flex-col gap-8 mt-8">
      <div>You have {learningCount} learning words</div>

      <Words
        words={words}
        index={index}
        errors={errors}
        learningWords={learningWords}
      />

      <div className="flex gap-4 items-center justify-between">
        <Input
          className="max-w-fit"
          placeholder="Type here"
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
          variant="filled"
        />

        <Navigation onChange={resetExercise} />
      </div>
    </div>
  );
};

interface IWords {
  words: string[];
  errors: Set<number>;
  index: number;
  learningWords: Map<string, number>;
}

const Words: FC<IWords> = ({ words, index, errors, learningWords }) => {
  return (
    <div className="flex gap-3 flex-wrap text-xl font-medium">
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
  );
};

interface INavigation {
  onChange: () => void;
}

const Navigation: FC<INavigation> = ({ onChange }) => {
  const next = () => {
    Store.next();
    onChange();
  };
  const back = () => {
    Store.back();
    onChange();
  };
  const reset = () => {
    Store.reset();
    onChange();
  };
  return (
    <div className="flex gap-2">
      <Button onClick={reset} size="sm">
        back to the start
      </Button>
      <IconButton
        onClick={back}
        aria-label="previous exercise"
        icon={<ArrowBackIcon boxSize={5} />}
        size="sm"
      />
      <IconButton
        onClick={next}
        aria-label="next exercise"
        icon={<ArrowForwardIcon boxSize={5} />}
        size="sm"
      />
    </div>
  );
};
