import { TranslationHistory } from "../../models/history";
import type { SavedHistoryPayload } from "../../types/history";

export const saveHistory = async ({
  sourceText,
  translatedText,
  sourceLang,
  targetLang,
  userId,
  guestId,
}: SavedHistoryPayload) => {
  return await TranslationHistory.create({
    sourceText,
    translatedText,
    sourceLang,
    targetLang,
    userId,
    guestId,
  });
};
