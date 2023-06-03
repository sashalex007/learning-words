"use client";

import { Data } from "@/stores/data";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";

export const Analytics: FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        Left part is the target, right part are the errors (wrong letters typed)
        and their associated frequencies (filter by date will be added soon).
      </div>
      <div className="flex flex-col gap-8">
        <LettersAnalytics />
        <DigramsAnalytics />
        <TrigramsAnalytics />
        <WordsAnalytics />
      </div>
    </div>
  );
};

const LettersAnalytics = () => (
  <AnalyticsLayout title="Letters" data={Data.getLettersAnalytics()} />
);

const DigramsAnalytics = () => (
  <AnalyticsLayout title="Digrams" data={Data.getDigramsAnalytics()} />
);

const TrigramsAnalytics = () => (
  <AnalyticsLayout title="Trigrams" data={Data.getTrigramsAnalytics()} />
);

const WordsAnalytics = () => (
  <AnalyticsLayout title="Words" data={Data.getWordsAnalytics()} />
);

interface IAnalyticsLayout {
  title: string;
  data: Record<string, Record<string, number>>;
}

const AnalyticsLayout: FC<IAnalyticsLayout> = ({ title, data }) => {
  const color = useColorModeValue("gray.700", "gray.300");
  const targets = Object.entries(data).map(([target, value]) => {
    const count = Object.values(value).reduce((a, b) => a + b, 0);
    return { target, value, count };
  });
  targets.sort((a, b) => b.count - a.count);
  return (
    <div className="flex flex-col gap-2">
      <Box className="font-bold" color={color}>
        {title}
      </Box>
      <ul>
        {targets.map(({ target, value, count }, i) => {
          const isFirstOfCategory = count !== targets[i - 1]?.count;

          return (
            <>
              {isFirstOfCategory && (
                <div key={`cat-${count}`}>{`${count}`}</div>
              )}
              <li key={target} className="flex gap-2 ml-4">
                <Box color={color} className="text-lg">
                  {target}
                </Box>
                -
                <ElementAnalytics {...value} />
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
};

const ElementAnalytics: FC<Record<string, number>> = (data) => (
  <ul className="flex flex-wrap">
    {Object.entries(data).map(([error, count], i) => {
      const isLast = i === Object.entries(data).length - 1;
      return (
        <li className="ml-4" key={error}>{`${error} ${count}${
          isLast ? "" : ","
        }`}</li>
      );
    })}
  </ul>
);
