"use client";

import { Settings } from "@/stores/settings";
import { Text } from "@/stores/text";
import { FC, KeyboardEventHandler, Suspense, useRef, useState } from "react";
import { Words } from "./words";
import { Box, Input, useColorModeValue } from "@chakra-ui/react";
import { CurrentLearningWords } from "./squares";
import { getIsMatchingSoFar } from "@/utils";
import { useRouter } from "next/navigation";
import { PracticeFooter } from "./practice-footer";
import { Data } from "@/stores/data";

const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
  const { key, altKey } = e;
  if (key !== "Backspace") return;
  if (!Settings.get().isSimpleBackspaceIgnored || altKey) return;

  e.preventDefault();
};

const useIsFocused = () => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const focusInput = () => {
    inputRef.current?.focus();
    setIsFocused(true);
  };
  return { isFocused, setIsFocused, focusInput, inputRef };
};

const useTyping = ({ words }: { words: string[] }) => {
  const { refresh } = useRouter();
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [errors, setErrors] = useState(new Set<number>());

  const isError = errors.has(index);
  const currentWord = words[index];

  const handleChange = (value: string) => {
    if (value.slice(-1) === " " && value.trim() === currentWord.trim()) {
      submitWord();
    } else {
      updateWord(value);
    }
  };

  const updateWord = (word: string) => {
    setInput(word);
    const isCorrect = getIsMatchingSoFar(currentWord, word);
    if (!isCorrect && !isError) {
      setErrors((e) => e.add(index));
      Text.addLearningWord(currentWord);
      Data.addError(currentWord, word);
    }
  };

  const submitWord = () => {
    setInput("");
    if (!isError) {
      Text.addCorrection(currentWord);
    }
    if (index === words.length - 1) {
      Text.next();
      refresh();
      return;
    }
    setIndex((i) => i + 1);
  };
  return { input, index, handleChange };
};

// this component renders only on refresh
export const Practice: FC = () => {
  const { progress, title } = Text.getCurrentText();
  const textWords = Text.getTextWords();
  const practiceWords = Text.getPracticeWords();
  console.log(practiceWords)
  return (
    <PracticeContent
      key={progress + title}
      textWords={textWords}
      practiceWords={practiceWords}
    />
  );
};

// this component renders on each letter typed
const PracticeContent: FC<{
  practiceWords: string[];
  textWords: { words: string[]; previousWords: string[] };
}> = ({ practiceWords, textWords }) => {
  const learningWords = Text.getLearningWords();
  const words = [...practiceWords, ...textWords.words];
  const { input, index, handleChange } = useTyping({ words });
  const { isFocused, focusInput, inputRef, setIsFocused } = useIsFocused();

  return (
    <div className="flex flex-col gap-12">
      <CurrentLearningWords words={learningWords} currentWord={words[index]} />

      <div className="flex flex-col gap-6 relative">
        {!isFocused && <Mask onClick={focusInput} />}

        <Suspense fallback={<div>Loading...</div>}>
          <PracticeArea
            input={input}
            practiceWords={practiceWords}
            textWords={textWords}
            index={index}
            isCurrentShown={isFocused}
            learningWords={learningWords}
          />
        </Suspense>
      </div>


      <PracticeFooter
        input={
          <Input
            className="max-w-fit"
            placeholder="Type here"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={onKeyDown}
            variant="filled"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            ref={inputRef}
            autoFocus
          />
        }
      />
    </div>
  );
};

const PracticeArea: FC<{
  input: string;
  practiceWords: string[];
  textWords: { words: string[]; previousWords: string[] };
  index: number;
  isCurrentShown: boolean;
  learningWords: Map<string, number>;
}> = ({
  input,
  practiceWords,
  textWords,
  index,
  isCurrentShown,
  learningWords,
}) => {
  return (
    <>
    
      {!!practiceWords.length && (
        <Words
          input={input}
          hasBrackets
          words={practiceWords}
          index={index}
          isCurrentShown={isCurrentShown}
          learningWords={learningWords}
        />
      )}
      

      <Words
        input={input}
        previousWords={textWords.previousWords}
        words={textWords.words}
        initialIndex={practiceWords.length}
        index={index}
        isCurrentShown={isCurrentShown}
        learningWords={learningWords}
      />
    </>
  );
};

const Mask: FC<{ onClick: () => void }> = ({ onClick }) => {
  const color = useColorModeValue("gray.900", "gray.100");
  return (
    <div
      onClick={onClick}
      className="cursor-pointer absolute -top-8 -left-8 -right-8 -bottom-8 backdrop-blur z-20 flex items-center justify-center"
    >
      <Box color={color} className="font-bold">
        Click here
      </Box>
    </div>
  );
};
