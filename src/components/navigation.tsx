import { Text } from "@/stores/text";
import { FC } from "react";
import { Button, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";

export const Navigation: FC = () => {
  const { refresh } = useRouter();
  const { progress } = Text.getCurrentText();
  const wordsCount = Text.getCurrentTextWordsCount();
  const next = () => {
    Text.next();
    refresh();
  };
  const back = () => {
    Text.back();
    refresh();
  };
  const reset = () => {
    Text.reset();
    refresh();
  };
  return (
    <div className="flex gap-2 items-center">
      <div>{progress}</div>/<div className="mr-4">{wordsCount}</div>
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
