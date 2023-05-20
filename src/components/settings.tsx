"use client";

import {
  DEFAULT_SIZE,
  DEFAULT_LEARNING_SIZE,
  PREVIOUS_WORD_COUNT,
} from "@/constant";
import { Text } from "@/stores/text";
import { Settings } from "@/stores/settings";
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

export const SettingsTab: FC = () => {
  const color = useColorModeValue("gray.700", "gray.300");
  const currentText = Text.getCurrentText();

  const [text, setText] = useState<Text.Text>(currentText);

  const [size, setSize] = useState(Settings.getSize());
  const [learningSize, setLearningSize] = useState(Settings.getLearningSize());
  const [previousCount, setPreviousCount] = useState(
    Settings.getPreviousCount()
  );

  const [isSimpleBackspaceIgnored, setIsSimpleBackspaceIgnored] = useState(
    Settings.getIsSimpleBackspaceIgnored()
  );

  useEffect(() => Settings.setSize(size), [size]);
  useEffect(() => Settings.setLearningSize(learningSize), [learningSize]);
  useEffect(() => Settings.setPreviousCount(previousCount), [previousCount]);

  useEffect(() => {
    Settings.setIsSimpleBackspaceIgnored(isSimpleBackspaceIgnored);
  }, [isSimpleBackspaceIgnored]);

  const save = () => Text.setText(text.title, text.text);
  const reset = () => setText(Text.getCurrentText());
  const select = (key: string) => {
    const text = Text.getText(key);
    setText(text);
    Text.setText(key, text.text);
    Text.setCurrentText(key);
  };
  const list = Text.listTextsTitles();

  return (
    <div className="flex flex-col gap-4">
      <Section
        title="Training text"
        instructions="You can set any text you want to train on (list of words, articles, code, etc.)"
        input={
          <div className="flex flex-col gap-6 items-start">
            <div className="flex gap-4 justify-end">
              {list.map((key) => {
                const isSelected = key === currentText.title;
                return (
                  <Button
                    key={key}
                    onClick={() => select(key)}
                    size="sm"
                    variant={isSelected ? "outline" : "ghost"}
                  >
                    {key}
                  </Button>
                );
              })}
            </div>
            <Textarea
              value={text.text}
              onChange={(e) => setText((t) => ({ ...t, text: e.target.value }))}
              placeholder="Enter the text you want to train on"
              variant="filled"
              color={color}
              rows={5}
            />
          </div>
        }
        button={
          <div className="flex gap-4 justify-end">
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
        title={`Max number of "words to learn" per exercise`}
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
        instructions={`"Words to learn" to type at the beginning of each exercise`}
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
