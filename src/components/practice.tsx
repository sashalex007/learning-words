"use client";

import { Settings } from "@/stores/settings";
import { Text } from "@/stores/text";
import { FC, KeyboardEventHandler, Suspense, useRef, useState } from "react";
import { Words } from "./words";
import { Navigation } from "./navigation";
import { Box, Input, useColorModeValue } from "@chakra-ui/react";
import { CurrentLearningWords } from "./squares";

const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
  const { key, altKey } = e;
  if (key !== "Backspace") return;
  if (!Settings.get().isSimpleBackspaceIgnored || altKey) return;

  e.preventDefault();
};

export const Practice: FC = () => {
  const [textWords, setTextWords] = useState<{
    words: string[];
    previousWords: string[];
  }>(Text.getTextWords());
  const [practiceWords, setPracticeWords] = useState<string[]>(
    Text.getPracticeWords()
  );
  const allWords = [...practiceWords, ...textWords.words];
  const [index, setIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [errors, setErrors] = useState(new Set<number>());
  const [learningWords, setLearningWords] = useState(Text.getLearningWords());
  const [isCurrentShown, setIsCurrentShown] = useState(false);

  const resetExercise = () => {
    setTextWords(Text.getTextWords());
    setPracticeWords(Text.getPracticeWords());
    setIndex(0);
    setInputValue("");
    setErrors(new Set<number>());
  };

  const next = () => {
    Text.next();
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
      Text.addLearningWord(currentWord);
      setLearningWords(Text.getLearningWords());
    }
    setInputValue(word);
  };

  const submitWord = () => {
    setInputValue("");
    if (!isError) {
      Text.addCorrection(currentWord);
      setLearningWords(Text.getLearningWords());
    }

    if (index === allWords.length - 1) {
      next();
      return;
    }

    setIndex((i) => i + 1);
  };
  const color = useColorModeValue("gray.900", "gray.100");
  const inputRef = useRef<HTMLInputElement>(null);
  const focusInput = () => {
    inputRef.current?.focus();
    setIsCurrentShown(true);
  };

  return (
    <div className="flex flex-col gap-12">
      <CurrentLearningWords words={learningWords} currentWord={currentWord} />

      <div className="flex flex-col gap-6 relative">
        {!isCurrentShown && (
          <div
            onClick={focusInput}
            className="cursor-pointer absolute -top-8 -left-8 -right-8 -bottom-8 backdrop-blur z-10 flex items-center justify-center"
          >
            <Box color={color} className="font-bold">
              Click here
            </Box>
          </div>
        )}

        <Suspense fallback={<div>Loading...</div>}>
          {!!practiceWords.length && (
            <Words
              hasBrackets
              words={practiceWords}
              index={index}
              isCurrentShown={isCurrentShown}
              errors={errors}
              learningWords={Text.getLearningWords()}
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
            ref={inputRef}
            autoFocus
          />

          <Navigation onChange={resetExercise} />
        </div>

        {Settings.get().isSimpleBackspaceIgnored && (
          <div className="text-sm">
            <div> {`Only "alt + backspace" allowed`}</div>
            <div>{`This can be turned off in the settings.`}</div>
          </div>
        )}
      </div>
    </div>
  );
};
