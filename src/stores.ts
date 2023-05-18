import {
  MOBYDICK,
  DEFAULT_SIZE,
  DEFAULT_LEARNING_SIZE,
  PREVIOUS_WORD_COUNT,
} from "./constant";
import { get, remove, set } from "./storage";

export namespace Store {
  /*
   * text
   */
  export const getText = (key: string): string =>
    get("text-" + key)?.text || "";

  export const listTextsTitles = (): string[] => {
    const keys = Object.keys(localStorage);
    return keys.filter((key) => key.startsWith("text-"));
  };

  export const addText = (key: string, value: string): void =>
    set("text-" + key, { title: key, text: value });

  export const removeText = (key: string): void => remove("text-" + key);

  export const setText = (key: string): void => set("current-text", key);

  export const getCurrentTextKey = (): string => {
    const current = get("current-text");
    if (current) return current;
    const keys = listTextsTitles();
    return keys[0] || "";
  };

  export const getCurrentText = (): string => {
    const key = getCurrentTextKey();
    return getText(key);
  };

  const getWordsCount = (): number => {
    const text = getCurrentText();
    return text.split(/[ :\n]/).length;
  };

  /*
   * size
   */
  export const getSize = (): number => get("size") || DEFAULT_SIZE;

  export const setSize = (value: number): void => set("size", value);

  /*
   * previousCount
   */
  export const getPreviousCount = (): number =>
    get("previous-words-count") || PREVIOUS_WORD_COUNT;

  export const setPreviousCount = (value: number): void =>
    set("previous-words-count", value);

  /*
   * learning size
   */
  export const getLearningSize = (): number =>
    get("learning-size") || DEFAULT_LEARNING_SIZE;

  export const setLearningSize = (value: number): void =>
    set("learning-size", value);

  /*
   * ignore simple backspace
   */
  export const getIsSimpleBackspaceIgnored = (): boolean =>
    get("ignore-simple-backspace") || false;

  export const setIsSimpleBackspaceIgnored = (value: boolean): void =>
    set("ignore-simple-backspace", value);

  /*
   * progress
   */
  export const getProgress = () => get("progress") || 0;

  const setProgress = (value: number) => set("progress", value);

  export const next = () => {
    const size = getSize();
    const progress = getProgress();
    setProgress(progress + size);
  };

  export const back = () => {
    const size = getSize();
    const progress = getProgress();
    const wordsCount = getWordsCount();
    setProgress(Math.min(wordsCount - size, Math.max(0, progress - size)));
  };

  export const reset = () => {
    setProgress(0);
  };

  /*
   * exercise words
   */
  const getWordsFromText = (text: string, skip: number, limit: number) => {
    return text
      .split(/[ :\n]/)
      .slice(skip, skip + limit)
      .filter(Boolean);
  };

  export const getTextWords = () => {
    const progress = getProgress();
    const text = getCurrentText();
    const size = getSize();
    const previousCount = PREVIOUS_WORD_COUNT;
    return {
      words: getWordsFromText(text, progress, size),
      previousWords: getWordsFromText(
        text,
        progress - previousCount,
        previousCount
      ),
    };
  };

  export const getPracticeWords = () => {
    // select number of words to practice
    const count = getLearningSize();

    // get the list of words to practice
    const record = getLearningWordsAsRecord();
    const list = Object.entries(record);
    list.sort(([, a], [, b]) => b - a);
    const words = list.slice(0, count);

    // double the highest error count
    return words.flatMap(([word, count]) => {
      if (count > 3) return [word, word];
      return [word];
    });
  };

  /*
   * words
   */
  export type LearningWords = Map<string, number>;

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
