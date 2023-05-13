"use client";

import { Store } from "@/stores";
import { FC, ReactNode, Suspense, useState } from "react";
import { Word } from "./word";
import { IconButton } from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";

export const LearningWords: FC = () => {
  const [, toggle] = useState(false);
  const render = () => toggle((r) => !r);
  const words = Array.from(Store.getLearningWords().entries());

  if (!words.length) {
    return (
      <Layout>
        <div>{`You have no "words to learn" yet.`}</div>
      </Layout>
    );
  }

  words.sort(([, a], [, b]) => b - a);
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        {words.map(([word, count]) => {
          return (
            <div key={word} className="flex items-center gap-4 w-96 max-w-full">
              <Word
                word={count.toString()}
                learningCount={count}
                className="font-medium"
              />

              <Word word={word} learningCount={count} className="font-medium" />

              <IconButton
                className="ml-auto"
                aria-label="Remove"
                onClick={() => {
                  Store.removeLearningWord(word);
                  render();
                }}
                variant="ghost"
                size="xs"
                colorScheme="pink"
                icon={<SmallCloseIcon boxSize={4} />}
              />
            </div>
          );
        })}
      </Suspense>
    </Layout>
  );
};

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col gap-2 mt-4 max-w-fit mx-auto ">
      {children}
    </div>
  );
};
