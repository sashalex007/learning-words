"use client";

import { Store } from "@/stores";
import { FC, KeyboardEventHandler, useState } from "react";
import { Input } from "@chakra-ui/react";
import { Words } from "./words";
import { Navigation } from "./navigation";

// TODO: (nice to have)  Add tada animation if learningCount decrease from 1 to 0

const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
  const { key, metaKey, shiftKey, altKey, ctrlKey } = e;
  if (key !== "Backspace") return;
  if (!Store.getIsSimpleBackspaceIgnored()) return;
  if (metaKey || shiftKey || altKey || ctrlKey) return;

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
  const [learningCount, setLearningCount] = useState(
    Store.getLearningWords().size
  );
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

  const learningWords = Store.getLearningWords();
  const currentWord = allWords[index];

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

    if (!isCorrect) {
      setErrors((e) => e.add(index));
      Store.addLearningWord(currentWord);
      setLearningCount(Store.getLearningWords().size);
    }
    setInputValue(word);
  };

  const submitWord = () => {
    setInputValue("");
    Store.addCorrection(currentWord);
    setLearningCount(Store.getLearningWords().size);

    if (index === allWords.length - 1) {
      next();
      return;
    }

    setIndex((i) => i + 1);
  };

  return (
    <div className="flex flex-col gap-12">
      <div>You have {learningCount} learning words</div>

      <div className="flex flex-col gap-6">
        {!!practiceWords.length && (
          <Words
            hasBrackets
            words={practiceWords}
            index={index}
            isCurrentShown={isCurrentShown}
            errors={errors}
            learningWords={learningWords}
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
            <div> {`Only "shift / alt + backspace" allowed`}</div>
            <div>{`This can be turned off in the settings.`}</div>
          </div>
        )}
      </div>
    </div>
  );
};
