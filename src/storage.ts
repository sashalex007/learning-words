export const set = (key: string, value: any) =>
  localStorage.setItem(key, JSON.stringify(value));

export const get = (key: string) => {
  const raw = localStorage.getItem(key);
  try {
    return JSON.parse(raw || "");
  } catch (e) {
    return raw;
  }
};
