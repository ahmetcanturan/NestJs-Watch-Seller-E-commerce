import md5 from 'md5';
import { customAlphabet } from 'nanoid';
export const hashing = (password: string): string => {
  return md5(password);
};

export const nanoid = customAlphabet(
  '0123456789QAZXSWEDCVFRTGBNHYUJMKILOPqazxswedcvfrtgbnhyujmklopi',
  20,
);
