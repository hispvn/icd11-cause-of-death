import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import localeFile from "./locale";
// import { Hooks } from "tracker-capture-app-core";
import { pull, push } from "../utils/fetch";

// const { useApi } = Hooks;


const InitTranslation = async language => {
  console.log("init translation", language);
  // const { metadataApi } = useApi();
  const result = await pull("/api/dataStore/WHO_ICD11_COD/translation");
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

const InitTranslationDataStore = async () => {
  console.log("init translation DataStore");
  // const { metadataApi } = useApi();
  const result = await pull("/api/dataStore/WHO_ICD11_COD/translation");

  if (result.status) {
    let array = [];
    let arrayLanguages = [
      {
        label: "English",
        key: "en",
      },
    ];
    Object.entries(localeFile.en.translation).forEach((value) => {
      let object = {
        key: value[0],
        translation: { en: value[1] },
      };
      array.push(object);
    });
    await push("/api/dataStore/WHO_ICD11_COD/translation", {
      translations: array,
      languages: arrayLanguages,
    });
  }else{
    Object.entries(localeFile.en.translation).forEach((value) => {
      let findKey = result.translations.find(e=>e.key === value[0]);
      if(!findKey){
        let object = {
          key: value[0],
          translation: { en: value[1] },
        };
        result.translations.push(object);
      }else{
        findKey.translation.en = value[1]
      }
    })
    await push("/api/dataStore/WHO_ICD11_COD/translation", {
      translations: result.translations,
      languages: result.languages,
    },"PUT");
  }
};

export { InitTranslation, InitTranslationDataStore, convertTranslationFormat };
