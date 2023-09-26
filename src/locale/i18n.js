import i18n from "i18next";
import { initReactI18next } from "react-i18next";



const InitTranslation = async (result,language) => {
  console.log("init translation", language);
  const resources = convertTranslationFormat(result);
  await i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources,
      lng: language ? language : "en",
      keySeparator: false, // we do not use keys in form messages.welcome
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    });
};

const convertTranslationFormat = (result) => {
  let resources = {};
  result.languages.forEach((lang) => {
    resources[lang.key] = {
      translation: {},
    };
    result.translations.forEach((tran) => {
      if (tran.translation[lang.key]) {
        resources[lang.key]["translation"][tran.key] = tran.translation[lang.key];
      }
    });
  });
  return resources;
};

export { InitTranslation, convertTranslationFormat };
