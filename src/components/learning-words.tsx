"use client";

import { Store } from "@/stores";
import { FC, ReactNode, useState } from "react";
import { Word } from "./word";
import { Button } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

export const LearningWords: FC = () => {
  const [, toggle] = useState(false);
  const render = () => toggle((r) => !r);
  const words = Array.from(Store.getLearningWords().entries());

  if (!words.length) {
    return (
      <Layout className="m-auto">
        <div>You have no learning words yet.</div>
      </Layout>
    );
  }

  words.sort(([, a], [, b]) => b - a);
  return (
    <Layout>
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
              <CloseIcon />
            </Button>
          </div>
        );
      })}
    </Layout>
  );
};

const Layout: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={"flex flex-col gap-2 mt-4 max-w-fit " + className}>
      {children}
    </div>
  );
};
