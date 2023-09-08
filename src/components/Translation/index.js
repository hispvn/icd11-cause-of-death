import { useState, useEffect } from "react";
import { Tabs, Button, Modal, Select } from "antd";
import { Hooks, Components } from "tracker-capture-app-core";
import TranslationTable from "./TranslationTable";
import "./index.css";
import { TRANSLATIONS, LOCALES } from "./const";
import localeFile from "../../locale/locale";
import { InitTranslation } from "../../locale/i18n";
import { useTranslation } from "react-i18next";
const { Option } = Select;
const { TabPane } = Tabs;
const { useApi } = Hooks;
const { LoadingMask } = Components;

const Translation = () => {
  const { t } = useTranslation();
  const { metadataApi } = useApi();
  const [translations, setTranslations] = useState(null);
  const [addLanguageModal, setAddLanguageModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [languages, setLanguages] = useState(null);
  const [selectedAddLanguage, setSelectedAddLanguage] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      let result = await metadataApi.get(
        "/api/dataStore/WHO_ICD11_COD/translation"
      );
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
        setTranslations(array);
        setLanguages(arrayLanguages);
        await metadataApi.push("setLanguages", {
          translations: array,
          languages: arrayLanguages,
        });
        setLoading(false);
      } else {
        setTranslations(result.translations);
        setLanguages(result.languages);
        setLoading(false);
      }
    })();
  }, []);

  const changeTranslation = (key, lang, value) => {
    const foundIndex = translations.findIndex((t) => t.key === key);
    translations[foundIndex].translation[lang] = value;
    setTranslations([...translations]);
  };

  const addNewLanguage = () => {
    if (selectedAddLanguage) {
      let findExistLanguage = languages.find(
        (e) => e.key === selectedAddLanguage
      );
      if (!findExistLanguage) {
        languages.push({
          label: LOCALES[selectedAddLanguage],
          key: selectedAddLanguage,
        });
        setLanguages(languages);
      }
      setSelectedAddLanguage(null);
    }
    setAddLanguageModal(false);
  };

  const closeAddLanguageModal = () => {
    setAddLanguageModal(false);
  };

  const saveTranslation = async () => {
    setLoading(true);
    await metadataApi.push(
      "/api/dataStore/WHO_ICD11_COD/translation",
      {
        translations: translations,
        languages: languages,
      },
      "PUT"
    );
    InitTranslation();
    setLoading(false);
  };

  return (
    <div className="translation-wrapper">
      {loading ? (
        <LoadingMask />
      ) : (
        <div className="translation-container">
          <Tabs defaultActiveKey="1">
            <TabPane tab={t("dataEntry")} key="1">
              <TranslationTable
                type="dataEntry"
                translations={translations}
                changeTranslation={changeTranslation}
                languages={languages}
              />
            </TabPane>
            <TabPane tab={t("anacodExport")} key="2">
              <TranslationTable
                type="anacodExport"
                translations={translations}
                changeTranslation={changeTranslation}
                languages={languages}
              />
            </TabPane>
            <TabPane tab={t("dashboard")} key="3">
              <TranslationTable
                type="dashboard"
                translations={translations}
                changeTranslation={changeTranslation}
                languages={languages}
              />
            </TabPane>
            <TabPane tab={t("administration")} key="4">
              <TranslationTable
                type="administration"
                translations={translations}
                changeTranslation={changeTranslation}
                languages={languages}
              />
            </TabPane>
            <TabPane tab={t("translation")} key="5">
              <TranslationTable
                type="translation"
                translations={translations}
                changeTranslation={changeTranslation}
                languages={languages}
              />
            </TabPane>
          </Tabs>
          <div className="translation-buttons-container">
            <div style={{ paddingRight: "10px" }}>
              <Button type="primary" onClick={saveTranslation}>
                {t("save")}
              </Button>
            </div>
            <Button
              onClick={() => {
                setAddLanguageModal(true);
              }}
            >
              {t("addLanguage")}
            </Button>
            <Modal
              title={t("addLanguage")}
              visible={addLanguageModal}
              onOk={addNewLanguage}
              onCancel={closeAddLanguageModal}
              okText={t("add")}
              cancelText={t("cancel")}
            >
              <Select
                placeholder={t("pleaseSelectLanguage")}
                style={{ width: "100%" }}
                showSearch
                allowClear
                onChange={(value) => {
                  setSelectedAddLanguage(value);
                }}
              >
                {Object.keys(LOCALES).map((key) => {
                  return <Option value={key}>{LOCALES[key]}</Option>;
                })}
              </Select>
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
};

export default Translation;
