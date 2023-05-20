import {
  DEFAULT_SIZE,
  DEFAULT_LEARNING_SIZE,
  PREVIOUS_WORD_COUNT,
} from "../constant";
import { get, set } from "../storage";

export namespace Settings {
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
}
