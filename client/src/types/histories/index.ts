export type History = {
  id: string;
  sourceText: string;
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  userId?: string | null;
  guestId?: string | null;
};

export type Histories = History[];
