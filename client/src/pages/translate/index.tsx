import { useEffect, useState } from "react";
import { LuArrowRightLeft } from "react-icons/lu";
import { FaTrashCan } from "react-icons/fa6";

import type { Language } from "../../types/languages";

import { handleTranslation as handleStranslationAction } from "../../store/translateStore";
import { useTranslateStore } from "../../store/translateStore";
import { handleLanguages, useLanguageStore } from "../../store/languageStore";

const Translate = () => {
  const languagesList = useLanguageStore((state) => state.languages);

  const translatedTextFromStore = useTranslateStore(
    (state) => state.translatedText
  );

  const setCleanTranslatedText = useTranslateStore(
    (state) => state.setCleanTranslatedText
  );

  const [fromLanguage, setFromLanguage] = useState<string>(
    languagesList[0]?.code
  );
  const [toLanguage, setToLanguage] = useState<string>(languagesList[1]?.code);

  const [textToTranslate, setTextToTranslate] = useState<string>("");

  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTextToTranslate(value);
  };

  const handleClearText = () => {
    setCleanTranslatedText();
    setTextToTranslate("");
  };

  const handleFromLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFromLanguage(value);
  };

  const handleToLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setToLanguage(value);
  };

  const handleReverseLanguages = () => {
    const previousFromLanguage = fromLanguage;
    setFromLanguage(toLanguage);
    setToLanguage(previousFromLanguage);
  };

  useEffect(() => {
    if (textToTranslate) {
      const handler = setTimeout(() => {
        handleTranslation();
      }, 1000);

      return () => clearTimeout(handler);
    }
  }, [textToTranslate, fromLanguage, toLanguage]);

  useEffect(() => {
    if (languagesList.length >= 2) {
      setFromLanguage(languagesList[0].code);
      setToLanguage(languagesList[1].code);
    }
  }, [languagesList]);

  useEffect(() => {
    handleLanguages();
  }, []);

  const handleTranslation = async () => {
    await handleStranslationAction({
      fromLang: fromLanguage,
      toLang: toLanguage,
      text: textToTranslate,
    });
  };

  return (
    <div className="flex flex-row w-full justify-around h-1/3 p-15">
      <div className="flex flex-col m-5 w-1/3 h-2/3 gap-4 relative">
        <select
          onChange={handleFromLanguage}
          id="totranslate"
          value={fromLanguage}
          className="appearance-none border border-gray-300 rounded-md pl-5 pt-2 pb-2 cursor-pointer"
        >
          {languagesList?.map((language: Language) => (
            <option
              className="cursor-pointer"
              key={language.code}
              value={language.code}
              disabled={language.code === toLanguage}
            >
              {language.name}
            </option>
          ))}
        </select>
        <svg
          className="absolute top--2 translate-y-1/2 right-5 pointer-events-none"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M5.75 7.5l4.25 4.25L14.25 7.5H5.75z" />
        </svg>
        <textarea
          className="h-full mh-200 border border-gray-300 rounded-md p-2"
          placeholder="Enter text to translate"
          onChange={handleText}
          id="textToTranslate"
          value={textToTranslate}
        >
          {textToTranslate}
        </textarea>
      </div>
      <div className="flex flex-col m-auto">
        <button
          onClick={handleReverseLanguages}
          className="cursor-pointer h-10 mt-auto mb-auto"
        >
          <LuArrowRightLeft fontSize={24} />
        </button>
        <button
          onClick={handleClearText}
          className="cursor-pointer h-10 m-auto"
        >
          <FaTrashCan fontSize={18} />
        </button>
      </div>
      <div className="flex flex-col m-5 w-1/3 h-2/3 gap-4 relative">
        <select
          onChange={handleToLanguage}
          id="translated"
          value={toLanguage}
          className="appearance-none border border-gray-300 rounded-md pl-5 pt-2 pb-2 cursor-pointer"
        >
          {languagesList?.map((language: Language) => (
            <option
              className="cursor-pointer"
              key={language.code}
              value={language.code}
              disabled={language.code === fromLanguage}
            >
              {language.name}
            </option>
          ))}
        </select>
        <svg
          className="absolute top--2 translate-y-1/2 right-5 pointer-events-none"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M5.75 7.5l4.25 4.25L14.25 7.5H5.75z" />
        </svg>
        <textarea
          className="border border-gray-300 rounded-md p-2 w-full h-full"
          placeholder="Here you translation"
          disabled={true}
          id="translatedText"
          value={translatedTextFromStore}
        >
          {translatedTextFromStore}
        </textarea>
      </div>
    </div>
  );
};
export default Translate;
