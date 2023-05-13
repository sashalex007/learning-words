"use client";

import { Store } from "@/stores";
import { FC, KeyboardEventHandler, Suspense, useState } from "react";
import { Words } from "./words";
import { Navigation } from "./navigation";
import { Input } from "@chakra-ui/react";
import { CurrentLearningWords } from "./squares";

const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
  const { key, altKey } = e;
  if (key !== "Backspace") return;
  if (!Store.getIsSimpleBackspaceIgnored() || altKey) return;

  e.preventDefault();
};

export const Practice: FC = () => {
  const [textWords, setTextWords] = useState<{
    words: string[];
    previousWords: string[];
  }>(Store.getTextWords());
  const [practiceWords, setPracticeWords] = useState<string[]>(
    Store.getPracticeWords()
  );
  const allWords = [...practiceWords, ...textWords.words];
  const [index, setIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [errors, setErrors] = useState(new Set<number>());
  const [learningWords, setLearningWords] = useState(Store.getLearningWords());
  const [isCurrentShown, setIsCurrentShown] = useState(false);

  const resetExercise = () => {
    setTextWords(Store.getTextWords());
    setPracticeWords(Store.getPracticeWords());
    setIndex(0);
    setInputValue("");
    setErrors(new Set<number>());
  };

  const next = () => {
    Store.next();
    resetExercise();
  };

  const currentWord = allWords[index];
  const isError = errors.has(index);

  const handleChange = (value: string) => {
    if (value.slice(-1) === " " && value.trim() === currentWord.trim()) {
      submitWord();
    } else {
      updateWord(value);
    }
  };

  const updateWord = (word: string) => {
    const isCorrect =
      currentWord.startsWith(word) || ["^", "¨"].includes(word.slice(-1));

    if (!isCorrect && !isError) {
      setErrors((e) => e.add(index));
      Store.addLearningWord(currentWord);
      setLearningWords(Store.getLearningWords());
    }
    setInputValue(word);
  };

  const submitWord = () => {
    setInputValue("");
    if (!isError) {
      Store.addCorrection(currentWord);
      setLearningWords(Store.getLearningWords());
    }

    if (index === allWords.length - 1) {
      next();
      return;
    }

    setIndex((i) => i + 1);
  };

  return (
    <div className="flex flex-col gap-12">
      <CurrentLearningWords words={learningWords} currentWord={currentWord} />

      <div className="flex flex-col gap-6">
        <Suspense fallback={<div>Loading...</div>}>
          {!!practiceWords.length && (
            <Words
              hasBrackets
              words={practiceWords}
              index={index}
              isCurrentShown={isCurrentShown}
              errors={errors}
              learningWords={Store.getLearningWords()}
            />
          )}

          <Words
            previousWords={textWords.previousWords}
            words={textWords.words}
            initialIndex={practiceWords.length}
            index={index}
            isCurrentShown={isCurrentShown}
            errors={errors}
            learningWords={learningWords}
          />
        </Suspense>
      </div>

      <div className="flex gap-3 flex-col mt-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <Input
            className="max-w-fit"
            placeholder="Type here"
            value={inputValue}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={onKeyDown}
            variant="filled"
            onFocus={() => setIsCurrentShown(true)}
            onBlur={() => setIsCurrentShown(false)}
            autoFocus
          />

          <Navigation onChange={resetExercise} />
        </div>

        {Store.getIsSimpleBackspaceIgnored() && (
          <div className="text-sm">
            <div> {`Only "alt + backspace" allowed`}</div>
            <div>{`This can be turned off in the settings.`}</div>
          </div>
        )}
      </div>
    </div>
  );
};
