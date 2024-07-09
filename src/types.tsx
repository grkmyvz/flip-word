export type Word = {
  en: string;
  tr: string;
};

export type GetWordResponse = {
  data?: Word;
  error?: string;
};
