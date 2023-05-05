export const localText = {
  get: () => localStorage.getItem("text") || "",
  set: (value: string) => localStorage.setItem("text", value),
};
