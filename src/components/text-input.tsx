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

  return (
    <details>
      <summary>Settings</summary>
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
    </details>
  );
};
