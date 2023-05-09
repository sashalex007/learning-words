"use client";

import {
  DEFAULT_SIZE,
  MOBYDICK,
  DEFAULT_LEARNING_SIZE,
  PREVIOUS_WORD_COUNT,
  ENGLISH_1K,
  FRENCH_1K,
} from "@/constant";
import { Store } from "@/stores";
import { CheckIcon, RepeatIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  IconButton,
  Input,
  Switch,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC, ReactNode, useEffect, useState } from "react";

const randomize = (input: string) => {
  const text = input.replace(/(\r\n|\n|\r)/gm, " ");
  const words = text.split(" ");
  const randomized = words.sort(() => Math.random() - 0.5);
  return randomized.join(" ");
};

export const Settings: FC = () => {
  const color = useColorModeValue("gray.700", "gray.300");

  const [text, setText] = useState(Store.getText());

  const [size, setSize] = useState(Store.getSize());
  const [learningSize, setLearningSize] = useState(Store.getLearningSize());
  const [previousCount, setPreviousCount] = useState(Store.getPreviousCount());

  const [isSimpleBackspaceIgnored, setIsSimpleBackspaceIgnored] = useState(
    Store.getIsSimpleBackspaceIgnored()
  );

  useEffect(() => Store.setSize(size), [size]);
  useEffect(() => Store.setLearningSize(learningSize), [learningSize]);
  useEffect(() => Store.setPreviousCount(previousCount), [previousCount]);

  useEffect(() => {
    Store.setIsSimpleBackspaceIgnored(isSimpleBackspaceIgnored);
  }, [isSimpleBackspaceIgnored]);

  const save = () => Store.setText(text);
  const reset = () => setText(Store.getText());

  return (
    <div className="flex flex-col gap-4">
      <Section
        title="Training text"
        instructions="You can set any text you want to train on (list of words, articles, code, etc.)"
        input={
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter the text you want to train on"
            variant="filled"
            color={color}
            rows={5}
          />
        }
        button={
          <div className="flex gap-4 justify-end">
            <Button onClick={() => setText(randomize(ENGLISH_1K))} size="sm">
              English 1k
            </Button>
            <Button onClick={() => setText(randomize(FRENCH_1K))} size="sm">
              French 1k
            </Button>
            <Button onClick={() => setText(MOBYDICK)} size="sm">
              First paragraph of Moby Dick
            </Button>

            <Button
              className="w-44"
              onClick={reset}
              variant="outline"
              size="sm"
            >
              <RepeatIcon className="mr-2" />
              Cancel changes
            </Button>

            <Button
              className="w-44"
              onClick={save}
              colorScheme="blue"
              variant="outline"
              size="sm"
            >
              <CheckIcon className="mr-2" />
              Save
            </Button>
          </div>
        }
      />

      <InlineSection
        title="Number of words per exercise"
        input={
          <Input
            value={size}
            type="number"
            onChange={(e) => setSize(parseInt(e.target.value))}
            variant="filled"
            color={color}
            className="w-24"
          />
        }
        instructions="Words from the text to type per exercise"
        button={
          <IconButton
            onClick={() => setSize(DEFAULT_SIZE)}
            aria-label="Reset to default"
            icon={<RepeatIcon />}
          />
        }
      />

      <InlineSection
        title="Max number of learning words per exercise"
        input={
          <Input
            value={learningSize}
            type="number"
            onChange={(e) => setLearningSize(parseInt(e.target.value))}
            variant="filled"
            color={color}
            className="w-24"
          />
        }
        instructions="Learning words to type at the beginning of each exercise"
        button={
          <IconButton
            onClick={() => setLearningSize(DEFAULT_LEARNING_SIZE)}
            aria-label="Reset to default"
            icon={<RepeatIcon />}
          />
        }
      />

      <InlineSection
        title="Number of previous words shown"
        input={
          <Input
            value={previousCount}
            type="number"
            onChange={(e) => setPreviousCount(parseInt(e.target.value))}
            variant="filled"
            color={color}
            className="w-24"
          />
        }
        instructions="Number of words shown from the previous exercise"
        button={
          <IconButton
            onClick={() => setPreviousCount(PREVIOUS_WORD_COUNT)}
            aria-label="Reset to default"
            icon={<RepeatIcon />}
          />
        }
      />

      <InlineSection
        title="Ignore simple backspace"
        instructions="Forces you to delete the whole world in case of mistake (alt + backspace)"
        input={
          <Switch
            defaultChecked={isSimpleBackspaceIgnored}
            onChange={() =>
              setIsSimpleBackspaceIgnored(!isSimpleBackspaceIgnored)
            }
            color={color}
          />
        }
      />
    </div>
  );
};

const Section: FC<{
  title: string;
  input: ReactNode;
  instructions: string;
  button?: ReactNode;
}> = ({ title, instructions, input, button }) => {
  const color = useColorModeValue("gray.700", "gray.300");
  return (
    <div className={`mt-4 flex flex-col gap-3`}>
      <Box className="text-lg" color={color}>
        {title}
      </Box>
      <Box>{instructions}</Box>
      {input}
      {button}
    </div>
  );
};

const InlineSection: FC<{
  title: string;
  input: ReactNode;
  instructions: string;
  button?: ReactNode;
}> = ({ title, instructions, input, button }) => {
  const color = useColorModeValue("gray.700", "gray.300");
  return (
    <div className={`mt-4 flex flex-col gap-3`}>
      <Box className="text-lg" color={color}>
        {title}
      </Box>
      <div className="flex items-center justify-between gap-4 h-4">
        <div className="flex-1">{instructions}</div>
        <div>{button}</div>
        <div>{input}</div>
      </div>
    </div>
  );
};
