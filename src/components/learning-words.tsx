"use client";

import { Store } from "@/stores";
import { FC, useState } from "react";
import { Word } from "./word";
import { Button } from "@chakra-ui/react";

export const LearningWords: FC = () => {
  const [, toggle] = useState(false);
  const render = () => toggle((r) => !r);
  const words = Array.from(Store.getLearningWords().entries());
  return (
    <details>
      <summary>Learning-words</summary>
      <div className="flex flex-col gap-2 mt-4">
        {words.map(([word, count]) => {
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
