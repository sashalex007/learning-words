import { get, set } from "./storage";

export namespace Store {
  /*
   * text
   */
  export const getText = () => get("text") || "";

  export const setText = (value: string) => set("text", value);

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
    setProgress(Math.max(0, progress + increment));
  };

  /*
   * exercise words
   */
  const getExerciseWordsFromText = (
    text: string,
    skip: number,
    limit: number
  ) => {
    return text.split(" ").slice(skip, skip + limit);
  };

  export const getExerciseWords = () => {
    const text = getText();
    const progress = getProgress();
    return getExerciseWordsFromText(text, progress, 35);
  };

  /*
   * words
   */
  type LearningWords = Map<string, number>;

  const getLearningWordsAsRecord = (): Record<string, number> => {
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
}
