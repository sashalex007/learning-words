import { get, set } from "@/storage";

const ERROR_KEY = "errors";

export namespace Data {
  export const addError = (target: string, input: string) => {
    const errors = get(ERROR_KEY) || [];
    const position = input.length;
    const error = input[position - 1];
    const time = Math.floor(Date.now() / 1000);
    errors.push([target, position, error, time]);
    set(ERROR_KEY, errors);
  };
}
