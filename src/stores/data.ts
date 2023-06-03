import { get, set } from "@/storage";

const ERROR_KEY = "errors";

export namespace Data {
  type Error = [target: string, position: number, error: string, time: number];

  const getErrors = (): Error[] => {
    const errors = get(ERROR_KEY) || [];
    return errors;
  };

  export const addError = (target: string, input: string): void => {
    const errors = getErrors();
    const position = input.length;
    const error = input[position - 1];
    const time = Math.floor(Date.now() / 1000);
    errors.push([target, position, error, time]);
    set(ERROR_KEY, errors);
  };

  const getAnalytics = (letterCount: number | null) => {
    const errors = getErrors();
    const analytics = errors.reduce<Record<string, Record<string, number>>>(
      (acc, [target, position, error]) => {
        const cat = letterCount
          ? target.slice(position - letterCount, position)
          : target;

        if (letterCount && cat.length < letterCount) return acc;

        const start = -target.length + (letterCount || 0) - 1;
        const end = position - 1;
        const fullError = target.slice(start, end) + error;

        acc[cat] ??= {};
        acc[cat][fullError] ??= 0;
        acc[cat][fullError] += 1;
        return acc;
      },
      {}
    );
    return analytics;
  };

  export const getLettersAnalytics = () => getAnalytics(1);
  export const getDigramsAnalytics = () => getAnalytics(2);
  export const getTrigramsAnalytics = () => getAnalytics(3);
  export const getWordsAnalytics = () => getAnalytics(null);
}
