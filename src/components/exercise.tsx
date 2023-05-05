"use client";

import { localText } from "@/storage";
import { getWords } from "@/utils";
import { FC, useState } from "react";
import { Input } from "@chakra-ui/react";

export const Exercise: FC = () => {
  const [words] = useState<string[]>(getWords(localText.get()));
  const [index, setIndex] = useState(0);
  const currentWord = words[index];

  const [value, setValue] = useState("");

  const handleChange = (value: string) => {
    if (value.slice(-1) === " ") {
      submitWord();
    } else {
      setValue(value);
    }
  };

  const submitWord = () => {
    if (value.trim() === currentWord) {
      setIndex((i) => i + 1);
      setValue("");
    } else {
      setValue((v) => v + " ");
    }
  };

  return (
    <>
      <div className="flex gap-2 flex-wrap">
        {words.map((word, i) => {
          const isCurrent = i === index;
          return (
            <span key={word + i} className={isCurrent ? "text-sky-500" : ""}>
              {word}
            </span>
          );
        })}
      </div>

      <Input
        className="mt-3"
        placeholder="Type here"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
    </>
  );
};
