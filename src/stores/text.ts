import {
  PREVIOUS_WORD_COUNT,
  PERMANENT_KEYS,
  FRENCH_1K,
  ENGLISH_1K,
  MOBYDICK,
} from "../constant";
import { get, listKeys, remove, set } from "../storage";
import { Settings } from "./settings";

const randomize = (input: string) => {
  const text = input.replace(/(\r\n|\n|\r)/gm, " ");
  const words = text.split(" ");
  const randomized = words.sort(() => Math.random() - 0.5);
  return randomized.join(" ");
};

export namespace Text {
  /*
   * text
   */
  export type Text = {
    title: string;
    text: string;
    progress: number;
  };

  export const getText = (key: string): Text => {
    const text = get("text-" + key);

    if (text) return text;

    switch (key) {
      case PERMANENT_KEYS[0]:
        return {
          title: key,
          progress: 0,
          text: randomize(ENGLISH_1K),
        };
      case PERMANENT_KEYS[1]:
        return {
          title: key,
          progress: 0,
          text: randomize(FRENCH_1K),
        };
      case PERMANENT_KEYS[2]:
        return {
          title: key,
          progress: 0,
          text: MOBYDICK,
        };
      default:
        return {
          title: key,
          progress: 0,
          text: "",
        };
    }
  };

  export const listTextsTitles = (): string[] => {
    const keys = listKeys();
    const list = keys
      .filter((key) => key.startsWith("text-"))
      .map((key) => key.replace("text-", ""));
    const set = new Set([...PERMANENT_KEYS, ...list]);
    return Array.from(set);
  };

  export const setText = (key: string, value: string): void => {
    const existing = getText(key);
    set("text-" + key, {
      title: key,
      text: value,
      progress: 0 || existing.progress,
    });
  };

  export const removeText = (key: string): void => remove("text-" + key);

  export const setCurrentText = (key: string): void => set("current-text", key);

  export const getCurrentTextKey = (): string => {
    const current = get("current-text");
    if (current) return current;
    const keys = listTextsTitles();
    return keys[0] || "";
  };

  export const getCurrentText = (): Text => {
    const key = getCurrentTextKey();
    return getText(key);
  };

  export const getCurrentTextWordsCount = (): number => {
    const text = getCurrentText().text;
    return text.split(/[ :\n]/).length;
  };

  const getWordsCount = (): number => {
    const text = getCurrentText().text;
    return text.split(/[ :\n]/).length;
  };

  /*
   * progress
   */
  const getProgress = (): number => getCurrentText().progress;

  const setCurrentTextProgress = (progress: number) => {
    const { text, title } = getCurrentText();
    set("text-" + title, { text, title, progress });
  };

  export const next = () => {
    const size = Settings.get().size;
    const progress = getProgress();
    setCurrentTextProgress(progress + size);
  };

  export const back = () => {
    const size = Settings.get().size;
    const progress = getProgress();
    const wordsCount = getWordsCount();
    setCurrentTextProgress(
      Math.min(wordsCount - size, Math.max(0, progress - size))
    );
  };

  export const reset = () => {
    setCurrentTextProgress(0);
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
    const { text, progress } = getCurrentText();
    const size = Settings.get().size;
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
    const count = Settings.get().learningSize;

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
