"use client";

import { Store } from "@/stores";
import { FC, useState } from "react";
import { Word } from "./word";
import { Button } from "@chakra-ui/react";

export const LearningWords: FC = () => {
  const [, toggle] = useState(false);
  const render = () => toggle((r) => !r);
  const words = Store.getLearningWords().entries();
  const array = Array.from(words);
  return (
    <details>
      <summary>Learning-words</summary>
      <div className="flex flex-col gap-2 mt-4">
        {array.map(([word, count]) => {
          return (
            <div key={word}>
              <Word key={word} word={word} learningCount={count} />
              <Button
                onClick={() => {
                  Store.removeLearningWord(word);
                  render();
                }}
                size="xs"
              >
                X
              </Button>
            </div>
          );
        })}
      </div>
    </details>
  );
};
