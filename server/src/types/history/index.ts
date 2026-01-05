export type SavedHistoryPayload = {
  sourceText: string;
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  userId?: string;
  guestId?: string;
};
