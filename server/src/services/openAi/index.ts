import OpenAI from "openai";
import langdetect from "langdetect";

console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY ? "OK" : "MISSING");

const apenAIKey = process.env.OPENAI_API_KEY;

if (!apenAIKey) {
  throw new Error("OpenAI API key is not defined in environment variables.");
}

export const openai = new OpenAI({
  apiKey: apenAIKey,
});

interface TranslateProps {
  fromLang: string;
  toLang?: string;
  text: string;
}

export const translateTextOpenAI = async ({
  fromLang,
  toLang,
  text,
}: TranslateProps): Promise<string | undefined> => {
  try {
    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      temperature: 0,
      input: [
        {
          role: "system",
          content: `
            You are a VERY LITERAL translator.
            - Translate from ${fromLang} to ${toLang}.
            - Do NOT add information.
            - Do NOT rewrite or interpret.
            - Preserve sentence structure when possible.
            - Only translate the text.
          `,
        },
        {
          role: "user",
          content: text,
        },
      ],
    });
    return response.output_text;
  } catch (error) {
    console.error("Error translating text with OpenAI:", error);
  }
};

export const detectLanguageOpenAI = async (
  text: string
): Promise<string | undefined> => {
  try {
    const language = await openai.responses.create({
      model: "gpt-4o-mini",
      temperature: 0,
      input: [
        {
          role: "system",
          content:
            "Detect the language of the following text. Respond ONLY with the ISO 639-1 language code (e.g., 'en', 'es', 'fr').",
        },
        {
          role: "user",
          content: text,
        },
      ],
    });
    return language.output_text.trim();
  } catch (error) {
    console.error("Error detecting language with OpenAI:", error);
  }
};

export const detectSourceLanguage = async (
  fromLang: string,
  text: string
): Promise<{
  detectedLang: string;
  valid: boolean;
  reason?: string;
}> => {
  const localDetection = langdetect.detectOne(text);

  if (localDetection === fromLang) {
    return {
      detectedLang: localDetection,
      valid: true,
      reason: "Local detection matched source language",
    };
  }

  let aiDetection: string | undefined;
  try {
    aiDetection = await detectLanguageOpenAI(text);
  } catch (err) {
    return {
      detectedLang: localDetection,
      valid: false,
      reason: "Error detecting language with AI",
    };
  }

  if (aiDetection === undefined || aiDetection === "") {
    return {
      detectedLang: localDetection,
      valid: false,
      reason: "AI did not return a valid language code",
    };
  }

  const isValid = aiDetection === fromLang;

  return {
    detectedLang: aiDetection,
    valid: isValid,
    reason: isValid
      ? "AI detection matched source language"
      : "AI detected a different language",
  };
};
