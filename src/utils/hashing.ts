import md5 from 'md5';

export const hashing = (password: string): string => {
  return md5(password);
};
