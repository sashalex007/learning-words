import { Store } from "@/stores";
import { FC } from "react";
import { Button, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

interface INavigation {
  onChange: () => void;
}

export const Navigation: FC<INavigation> = ({ onChange }) => {
  const next = () => {
    Store.next();
    onChange();
  };
  const back = () => {
    Store.back();
    onChange();
  };
  const reset = () => {
    Store.reset();
    onChange();
  };
  return (
    <div className="flex gap-2">
      <Button onClick={reset} size="sm">
        back to the start
      </Button>
      <IconButton
        onClick={back}
        aria-label="previous exercise"
        icon={<ArrowBackIcon boxSize={5} />}
        size="sm"
      />
      <IconButton
        onClick={next}
        aria-label="next exercise"
        icon={<ArrowForwardIcon boxSize={5} />}
        size="sm"
      />
    </div>
  );
};
