import { Response } from "express";
import type { Language } from "../../types/languages";

import {
  detectSourceLanguage,
  translateTextOpenAI,
} from "../../services/openAi";
import fs from "fs";
import path from "path";
import { saveHistory } from "../../services/history";
import { AuthRequest } from "../../types/auth";

const languagesList = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../../utils/languageList.json"),
    "utf8"
  )
) as Language[];

export const getOpenaiResponse = async (req: AuthRequest, res: Response) => {
  const { fromLang, toLang, text, guestId } = req.body;

  if (!text || text.trim() === "") {
    return res.status(200).json({ error: false, message: "" });
  }

  try {
    const result = await detectSourceLanguage(fromLang, text);

    const suggested = languagesList?.find(
      (lang: Language) => lang.code === result.detectedLang
    );

    if (!result.valid) {
      return res.status(200).json({
        error: true,
        message:
          "Source language is incorrect. Suggested language: " +
          (suggested?.name ?? result.detectedLang),
      });
    }

    if (result.detectedLang === toLang) {
      return res.status(200).json({
        error: false,
        message: text,
      });
    }
    const translated = await translateTextOpenAI({
      fromLang,
      toLang,
      text,
    });

    if (translated) {
      const response = await saveHistory({
        sourceText: text,
        translatedText: translated,
        sourceLang: fromLang,
        targetLang: toLang,
        userId: req.user?.id ?? undefined,
        guestId: req.user ? null : guestId,
      });
      return res.json({ error: false, message: translated });
    }
    return;
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: "An error occurred during translation.",
    });
  }
};
