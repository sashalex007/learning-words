"use client";

import { Store } from "@/stores";
import { FC, useState } from "react";
import { Word } from "./word";
import { Button } from "@chakra-ui/react";

export const LearningWords: FC = () => {
  const [, toggle] = useState(false);
  const render = () => toggle((r) => !r);
  const words = Array.from(Store.getLearningWords().entries());
  words.sort(([, a], [, b]) => b - a);
  return (
    <div className="flex flex-col gap-2 mt-4">
      {words.map(([word, count]) => {
        return (
          <div key={word} className="flex items-center gap-4">
            <Word
              word={count.toString()}
              learningCount={count}
              className="font-medium"
            />

            <Word word={word} learningCount={count} className="font-medium" />

            <Button
              className="ml-auto"
              onClick={() => {
                Store.removeLearningWord(word);
                render();
              }}
              variant="ghost"
              colorScheme="red"
              size="xs"
            >
              x
            </Button>
          </div>
        );
      })}
    </div>
  );
};
