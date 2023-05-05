"use client";

import { localText } from "@/storage";
import { Button, Textarea } from "@chakra-ui/react";
import { FC, useState } from "react";

export const TextInput: FC = () => {
  const [value, setValue] = useState(localText.get());

  const onSave = () => {
    localText.set(value);
    location.reload();
  };

  return (
    <>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter the text you want to train on"
      />
      <Button className="mt-3" onClick={onSave}>
        Save
      </Button>
    </>
  );
};
