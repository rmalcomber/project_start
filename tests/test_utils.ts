export const StringPromise = (val: string): Promise<string> => {
  return new Promise((resolve) => resolve(val));
};
