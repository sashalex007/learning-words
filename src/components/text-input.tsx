"use client";

import { Store } from "@/stores";
import { Box, Button, Textarea, useColorModeValue } from "@chakra-ui/react";
import { FC, useState } from "react";

export const TextInput: FC = () => {
  const color = useColorModeValue("gray.800", "whiteAlpha.900");
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
    <Box color={color} className="mt-4 flex flex-col gap-4 items-end">
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter the text you want to train on"
        variant="filled"
        rows={10}
      />
      <Button onClick={onSave}>Save</Button>
    </Box>
  );
};
