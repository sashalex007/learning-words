import { get, set } from "./storage";

export namespace Store {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }
  /*
   * text
   */
  export const getText = (): string => get("text") || "";

  export const setText = (value: string): void => set("text", value);

  const getWordsCount = (): number => {
    const text = getText();
    return text.split(/[ :\n]/).length;
  };

  /*
   * progress
   */
  export const getProgress = () => get("progress") || 0;

  const setProgress = (value: number) => set("progress", value);

  export const next = () => {
    const increment = 35;
    const progress = getProgress();
    setProgress(progress + increment);
  };

  export const back = () => {
    const increment = -35;
    const progress = getProgress();
    const wordsCount = getWordsCount();
    setProgress(Math.min(wordsCount - 35, Math.max(0, progress + increment)));
  };

  export const reset = () => {
    setProgress(0);
  };

  /*
   * exercise words
   */
  const getExerciseWordsFromText = (
    text: string,
    skip: number,
    limit: number
  ) => {
    return text.split(/[ :\n]/).slice(skip, skip + limit);
  };

  const getExerciseWordsFromProgress = (progress: number) => {
    const text = getText();
    const words = getExerciseWordsFromText(text, progress, 35);
    const learningWordsCount = Math.max(10, 35 - words.length);
    const learningWords = getWorseLearningWords(learningWordsCount);
    return [...learningWords, ...words];
  };

  export const getExerciseWords = () => {
    const progress = getProgress();
    return getExerciseWordsFromProgress(progress);
  };

  /*
   * words
   */
  type LearningWords = Map<string, number>;

  export const getLearningWordsAsRecord = (): Record<string, number> => {
    return get("words") || {};
  };

  const setLearningWords = (
    value: Record<string, number | undefined>
  ): void => {
    set("words", value);
  };

  export const getLearningWords = (): LearningWords => {
    const record = getLearningWordsAsRecord();
    return new Map(Object.entries(record));
  };

  const getWorseLearningWords = (count: number): string[] => {
    const record = getLearningWordsAsRecord();
    const list = Object.entries(record);
    list.sort(([, a], [, b]) => b - a);
    return list.slice(0, count).map(([word]) => word);
  };

  export const addLearningWord = (word: string): void => {
    const words = getLearningWordsAsRecord();
    const hasError = !!words[word];
    setLearningWords({ ...words, [word]: hasError ? 6 : 4 });
  };

  export const addCorrection = (word: string): void => {
    const words = getLearningWordsAsRecord();
    const errorCount = words[word] || 0;
    const shouldRemoveWord = errorCount <= 1;
    setLearningWords({
      ...words,
      [word]: shouldRemoveWord ? undefined : errorCount - 1,
    });
  };

  export const removeLearningWord = (word: string): void => {
    const words = getLearningWordsAsRecord();
    setLearningWords({ ...words, [word]: undefined });
  };
}
