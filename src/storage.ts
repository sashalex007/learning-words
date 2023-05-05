export const localText = {
  get: () => localStorage.getItem("text") || "",
  set: (value: string) => localStorage.setItem("text", value),
};

export namespace LocalWords {
  type LearningWords = Map<string, number>;

  const getAsRecord = (): Record<string, number> => {
    return JSON.parse(localStorage.getItem("words") || "{}");
  };

  const set = (value: Record<string, number | undefined>): void => {
    const words = JSON.stringify(value);
    console.log({ words });
    localStorage.setItem("words", words);
  };

  export const get = (): LearningWords => {
    const record = getAsRecord();
    return new Map(Object.entries(record));
  };

  export const addError = (word: string): void => {
    const words = getAsRecord();
    const hasError = !!words[word];
    set({ ...words, [word]: hasError ? 6 : 4 });
  };

  export const addCorrect = (word: string): void => {
    const words = getAsRecord();
    const errorCount = words[word] || 0;
    const shouldRemoveWord = errorCount <= 1;
    console.log({ errorCount, shouldRemoveWord });
    set({ ...words, [word]: shouldRemoveWord ? undefined : errorCount - 1 });
  };
}
