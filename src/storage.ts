const isBrowser = () => typeof window !== "undefined";

export const set = (key: string, value: any) => {
  if (!isBrowser()) return;

  localStorage.setItem(key, JSON.stringify(value));
};

export const get = (key: string) => {
  if (!isBrowser()) return;

  const raw = localStorage.getItem(key);
  try {
    return JSON.parse(raw || "");
  } catch (e) {
    return raw;
  }
};
