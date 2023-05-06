"use client";

import { Store } from "@/stores";
import { Button, Textarea } from "@chakra-ui/react";
import { FC, useState } from "react";

export const TextInput: FC = () => {
  const [value, setValue] = useState(Store.getText());

  const onSave = () => {
    Store.setText(value);
    location.reload();
  };

  // TODO: Add instructions
  // TODO: Add default? (buffy script)
  // TODO: Add button to reset to default
  // TODO: Add button to replace by list of learning words

  return (
    <div className="mt-4 flex flex-col gap-4 items-end">
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter the text you want to train on"
      />
      <Button size="sm" onClick={onSave}>
        Save
      </Button>
    </div>
  );
};
