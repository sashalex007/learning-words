"use client";

import { Data } from "@/stores/data";
import { FC } from "react";

export const Analytics: FC = () => {
  return (
    <div>
      <LettersAnalytics />
      <DigramsAnalytics />
      <TrigramsAnalytics />
      <WordsAnalytics />
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
  return (
    <div>
      <div>{title}</div>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};
