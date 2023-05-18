const isBrowser = () => typeof window !== "undefined";

export const set = (key: string, value: any): void => {
  if (!isBrowser()) return;

  localStorage.setItem(key, JSON.stringify(value));
};

export const remove = (key: string): void => {
  if (!isBrowser()) return;

  localStorage.removeItem(key);
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

export const listKeys = (): string[] => {
  if (!isBrowser()) return [];

  return Object.keys(localStorage) || [];
};
