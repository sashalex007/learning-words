"use client";

import { DEFAULT_SIZE, DEFAULT_TEXT } from "@/constant";
import { Store } from "@/stores";
import { CheckIcon, RepeatIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Input,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC, ReactNode, useState } from "react";

export const Settings: FC = () => {
  const color = useColorModeValue("gray.700", "gray.300");
  const [text, setText] = useState(Store.getText());
  const [size, setSize] = useState(Store.getSize());

  const save = () => {
    Store.setText(text);
    Store.setSize(size);
    location.reload();
    // TODO: remove the reload but reload on tab change
  };

  const reset = () => {
    setText(Store.getText());
    setSize(Store.getSize());
  };

  // TODO: Repetition of learning words
  // TODO: Repetition of failed learning words

  return (
    <div className="flex flex-col gap-4">
      <div className="self-center flex gap-4">
        <Button className="w-44" onClick={reset} variant="outline" size="sm">
          <RepeatIcon className="mr-2" />
          Cancel changes
        </Button>

        <Button
          className="w-44"
          onClick={save}
          colorScheme="blue"
          variant="solid"
          size="sm"
        >
          <CheckIcon className="mr-2" />
          Save
        </Button>
      </div>

      <Section title="Training text">
        <Box>
          You can set any text you want to train on (list of words, articles,
          code, etc.)
        </Box>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter the text you want to train on"
          variant="filled"
          color={color}
          rows={10}
        />
        <Button onClick={() => setText(DEFAULT_TEXT)} size="sm">
          Reset to default (first paragraph of Moby Dick)
        </Button>
      </Section>

      <Section title="Number of words per exercise">
        <div className="flex gap-4 items-center">
          <Input
            value={size}
            type="number"
            onChange={(e) => setSize(parseInt(e.target.value))}
            variant="filled"
            color={color}
            className="max-w-fit"
          />
          <Box>(not including learning words repetitons)</Box>
        </div>
        <Button onClick={() => setSize(DEFAULT_SIZE)} size="sm">
          {`Reset to default (${DEFAULT_SIZE})`}
        </Button>
      </Section>
    </div>
  );
};

const Section: FC<{ title: string; children: ReactNode }> = ({
  title,
  children,
}) => {
  const color = useColorModeValue("gray.700", "gray.300");
  return (
    <div className="mt-4 flex flex-col gap-4">
      <Box className="text-lg" color={color}>
        {title}
      </Box>
      {children}
    </div>
  );
};
