import { useState, useEffect } from "react";
import { Tabs, Button, Upload, Modal, Select, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { Hooks, Components } from "tracker-capture-app-core";
import TranslationTable from "./TranslationTable";
import { exportingTranslations, importingTranslations } from "../../utils/excel.utility";
import "./index.css";
import { LANGUAGES, TRANSLATIONS, LOCALES } from "./const";
import localeFile from "../../locale/locale";
// import { InitTranslation } from "../../locale/i18n";
import { useTranslation } from "react-i18next";
const { Option } = Select;
const { TabPane } = Tabs;
const { useApi } = Hooks;
const { LoadingMask } = Components;

const Translation = () => {
  const { t } = useTranslation();
  const { metadataApi } = useApi();
  const [loading, setLoading] = useState(true);
  const [translations, setTranslations] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [addLanguageModal, setAddLanguageModal] = useState(false);
  const [exportTranslationModal, setExportTranslationModal] = useState(false);
  const [importTranslationModal, setImportTranslationModal] = useState(false);
  const [selectedAddLanguage, setSelectedAddLanguage] = useState(null);
  const [selectedExportLanguage, setSelectedExportLanguage] = useState(null);
  const [selectedImportTranslations,setSelectedImportTranslations] = useState(null);
  const [uploadMessage,setUploadMessage] = useState(null);

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
        if ( selectedAddLanguage === "fr" || selectedAddLanguage === "ar" ) {
          setTranslations(translations.map( t => {
            const findTranslation = TRANSLATIONS.find( ({key}) => key === t.key );
            return findTranslation ? {
              ...t,
              translation: {
                ...t.translation,
                [selectedAddLanguage]: findTranslation.translation[selectedAddLanguage]
              }
            } : t;
          }))
        }
      }
      setSelectedAddLanguage(null);
    }
    setAddLanguageModal(false);
  };

  const importTranslations = () => {
    let isValidLanguage = true;
    let tempLanguages = [];

    const newTranslations = selectedImportTranslations.map( t => {
      Object.entries(t).forEach( ([key,value]) => {
        if (!tempLanguages.find( l => l === key)) {
          if ( key !== "key" ) {
            tempLanguages.push(key);
          }
        }
      });
      return {
        key: t.key,
        translation: (({ key, ...o }) => o)(t)
      }
    });

    tempLanguages.forEach( k => {
      if ( k !== "key" && k !== "en" ) {
        isValidLanguage = LOCALES[k] ? true : false;
      }
    });

    if (isValidLanguage) {
      setLanguages(tempLanguages.map( l => ({
        key: l,
        label: LOCALES[l]
      })));
      setTranslations(newTranslations);
    }
    else {
      message.error("ERROR!!! One of the locales in the importing is invalid.");
    }
  }

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
    // InitTranslation();
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
            <div style={{ paddingRight: "10px" }}>
              <Button onClick={() => { setAddLanguageModal(true); }}>
                {t("addLanguage")}
              </Button>
            </div>
            <div style={{ paddingRight: "10px" }}>
              <Button onClick={() => { setExportTranslationModal(true) }}>
                Export Translations
              </Button>
            </div>
            <div style={{ paddingRight: "10px" }}>
              <Button onClick={() => { setImportTranslationModal(true) }}>
                Import Translations
              </Button>
            </div>
            <Modal
              title={t("addLanguage")}
              visible={addLanguageModal}
              onOk={addNewLanguage}
              onCancel={() => { setAddLanguageModal(false) }}
              okText={t("add")}
              cancelText={t("cancel")}
              okButtonProps={{
                disabled: selectedAddLanguage === null
              }}
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
            <Modal
              title="Import Translations"
              visible={importTranslationModal}
              onOk={() => { 
                setImportTranslationModal(false); 
                importTranslations();
                setSelectedImportTranslations(null);
                setUploadMessage(null);
              }}
              onCancel={() => { 
                setImportTranslationModal(false);
                setSelectedImportTranslations(null);
                setUploadMessage(null);
              }}
              okText={"Import"}
              cancelText={"Cancel"}
              okButtonProps={{
                disabled: selectedImportTranslations === null
              }}
            >
              <div>
                <Upload
                  accept={".xls, .xlsx, .csv"}
                  maxCount={1}
                  multiple={false}
                  customRequest={({ file, onSuccess }) => {
                    // You can perform your custom file upload logic here
                    // For example, read the file and handle it without a specific action/endpoint
                    // readXLSXFile(file)
                    //   .then(fileData => {
                    //     console.log('Custom file upload logic:', fileData);
                    //     onSuccess(); // Indicate that the upload was successful
                    //   })
                    //   .catch(error => {
                    //     console.error('Error during custom file upload logic:', error);
                    //     message.error('File upload failed.');
                    //   });
                    onSuccess();
                  }}
                  onChange={async info => {
                    if (info.file.status === 'done') {
                      try {
                        const fileData = await importingTranslations(info.file.originFileObj);
                        // Handle the file data (e.g., display it, send it to the server, etc.)
                        setSelectedImportTranslations(fileData);
                        setUploadMessage(info.file.name);
                      } catch (error) {
                        setUploadMessage(`Error reading ${info.file.name} file: ${error.message}`);
                      }
                    } else if (info.file.status === 'error') {
                      setUploadMessage(`${info.file.name} file upload failed.`);
                    }
                  }}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload XLSX</Button>
                </Upload>
              </div>
              <div>
               <i>{uploadMessage}</i>
              </div>
            </Modal>
            <Modal
              title="Export Translations"
              visible={exportTranslationModal}
              onOk={() => { 
                setExportTranslationModal(false);
                exportingTranslations(translations,selectedExportLanguage);
              }}
              onCancel={() => { setExportTranslationModal(false) }}
              okText={"Export"}
              cancelText={"Cancel"}
              okButtonProps={{
                disabled: selectedExportLanguage === null
              }}
            >
              <Select
                placeholder={t("pleaseSelectLanguage")}
                style={{ width: "100%" }}
                showSearch
                allowClear
                onChange={(value) => {
                  setSelectedExportLanguage(value);
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
