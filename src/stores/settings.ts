import {
  DEFAULT_SIZE,
  DEFAULT_LEARNING_SIZE,
  PREVIOUS_WORD_COUNT,
} from "../constant";
import { get as getValue, set } from "../storage";

const DEFAULT_SETTINGS = {
  size: DEFAULT_SIZE,
  previousCount: PREVIOUS_WORD_COUNT,
  learningSize: DEFAULT_LEARNING_SIZE,
  isSimpleBackspaceIgnored: false,
  isLetterHighlightEnabled: true,
};

export namespace Settings {
  interface Settings {
    size: number;
    previousCount: number;
    learningSize: number;
    isSimpleBackspaceIgnored: boolean;
    isLetterHighlightEnabled: boolean;
  }

  export const get = (): Settings => getValue("settings") || DEFAULT_SETTINGS;

  export const update = (value: Partial<Settings>): void => {
    const settings = get();
    set("settings", { ...settings, ...value });
  };
}
