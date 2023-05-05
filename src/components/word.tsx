import { FC } from "react";

const getColor = (count: number): string => {
  switch (count) {
    case 1:
      return "text-pink-300";
    case 2:
      return "text-pink-400";
    case 3:
      return "text-pink-500";
    case 4:
      return "text-pink-600";
    case 5:
      return "text-pink-700";
    case 6:
      return "text-pink-800";
    default:
      return "";
  }
};

export const Word: FC<{
  word: string;
  isPast: boolean;
  isCurrent: boolean;
  isError: boolean;
  learningCount: number;
}> = ({ word, isPast, isCurrent, isError, learningCount }) => {
  let cls = "";
  const isLearning = learningCount > 0;

  if (isCurrent) cls += "underline ";
  if (isPast) cls += "text-gray-500 ";
  if (isLearning) cls += "font-bold " + getColor(learningCount) + " ";
  if (isError) cls += isPast ? "line-through " : "!text-red-400 ";

  return <span className={cls}>{word}</span>;
};
