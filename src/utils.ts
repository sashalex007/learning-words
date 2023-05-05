export const getWords = (text: string, count?: number) => {
  const usedCount = count || 35;
  const words = text.split(" ").slice(0, usedCount);
  return words;
};
