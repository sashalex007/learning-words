"use client";

import { DEFAULT_SIZE, DEFAULT_TEXT } from "@/constant";
import { Store } from "@/stores";
import { CheckIcon, RepeatIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Input,
  Switch,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC, ReactNode, useEffect, useState } from "react";

export const Settings: FC = () => {
  const color = useColorModeValue("gray.700", "gray.300");
  const [text, setText] = useState(Store.getText());
  const [size, setSize] = useState(Store.getSize());
  const [isSimpleBackspaceIgnored, setIsSimpleBackspaceIgnored] = useState(
    Store.getIsSimpleBackspaceIgnored()
  );

  useEffect(() => {
    Store.setSize(size);
  }, [size]);

  useEffect(() => {
    Store.setIsSimpleBackspaceIgnored(isSimpleBackspaceIgnored);
  }, [isSimpleBackspaceIgnored]);

  const save = () => {
    Store.setText(text);
  };

  const reset = () => {
    setText(Store.getText());
  };

  // TODO: Max number of learning words at the beginning
  // TODO: Randomize learning words
  // TODO: Add a button to 1000 most common words english

  return (
    <div className="flex flex-col gap-4">
      <Section
        title="Training text"
        isInline={false}
        instructions="You can set any text you want to train on (list of words, articles, code, etc.)"
        input={
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter the text you want to train on"
            variant="filled"
            color={color}
            rows={10}
          />
        }
        button={
          <div className="flex gap-4 justify-end">
            <Button onClick={() => setText(DEFAULT_TEXT)} size="sm">
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

      <Section
        title="Number of words per exercise"
        input={
          <Input
            value={size}
            type="number"
            onChange={(e) => setSize(parseInt(e.target.value))}
            variant="filled"
            color={color}
            className="max-w-fit"
          />
        }
        instructions="(not including learning words repetitons)"
        button={
          <Button onClick={() => setSize(DEFAULT_SIZE)} size="sm">
            {`Reset to default (${DEFAULT_SIZE})`}
          </Button>
        }
      />

      <Section
        title="Ignore simple backspace"
        instructions="Forces you to delete the whole world in case of mistake (alt + backspace)"
        input={
          <Switch
            defaultChecked={isSimpleBackspaceIgnored}
            onChange={() =>
              setIsSimpleBackspaceIgnored(!isSimpleBackspaceIgnored)
            }
            color={color}
            className="max-w-fit"
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
  isInline?: boolean;
}> = ({ title, isInline = true, instructions, input, button }) => {
  const color = useColorModeValue("gray.700", "gray.300");
  return isInline ? (
    <div className={`mt-4 flex flex-col gap-3`}>
      <Box className="text-lg" color={color}>
        {title}
      </Box>
      <div className="flex items-center justify-between gap-4 h-4">
        <Box>{instructions}</Box>
        {input}
      </div>
    </div>
  ) : (
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
