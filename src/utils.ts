export const getIsMatchingSoFar = (reference: string, input: string) =>
  reference.startsWith(input) || ["^", "¨"].includes(input.slice(-1));
