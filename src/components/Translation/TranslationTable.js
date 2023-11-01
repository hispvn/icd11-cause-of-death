import { Table, Input } from "antd";
import { TRANSLATION_KEYS_MAPPING } from "./const";

const TranslationTable = ({ type, translations, changeTranslation, languages }) => {
  const columns = [
    { title: "Key", dataIndex: "key", key: "key" },
    ...languages.map((lang) => {
      return {
        title: lang.label + " (" + lang.key + ")",
        dataIndex: lang.key,
        key: lang.key
      };
    })
  ];
  columns.forEach((column) => {
    if (column.key !== "key" && column.key !== "en") {
      column.render = (text, record, index) => {
        return (
          <Input
            value={text}
            onChange={(event) => {
              changeTranslation(record.key, column.key, event.target.value);
            }}
          />
        );
      };
    }
  });

  const data = TRANSLATION_KEYS_MAPPING[type].map((key) => {
    console.log(key);
    const foundTranslation = translations.find((t) => t.key === key);
    const object = { key };
    languages.forEach((lang) => {
      object[lang.key] = foundTranslation.translation[lang.key];
    });
    return object;
  });

  return (
    <div className="translation-table-container">
      <Table pagination={false} columns={columns} dataSource={data} scroll={{ y: 500 }} />
    </div>
  );
};

export default TranslationTable;
