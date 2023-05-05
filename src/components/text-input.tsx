"use client";

import { localText } from "@/storage";
import { Button, Textarea } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

export const TextInput: FC = () => {
  const { refresh } = useRouter();
  const [value, setValue] = useState(localText.get());

  const onSave = () => {
    localText.set(value);
    refresh();
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
