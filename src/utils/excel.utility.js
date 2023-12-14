const XLSX = require("xlsx");

const readExcelFile = (fileName, sheetIndex = 0) => (options = {}) => {
  const workbook = XLSX.readFile(fileName);
  const sheetNameList = workbook.SheetNames;
  return XLSX.utils.sheet_to_json(
    workbook.Sheets[sheetNameList[sheetIndex]],
    options
  );
};

const jsonToSheet = (jsonData, options) => {
  // return worksheet
  return XLSX.utils.json_to_sheet(jsonData, options);
};

const writeFile = (workbook, fileName) => {
  XLSX.writeFile(workbook, fileName);
};

const createWorkbook = (wsName, wsData) => {
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, wsData, wsName);
  return wb;
};

const exportingTranslations = (translations, language) => {
  const data = translations.map( t => {
    let newTranslation = {
      key: t.key,
      en: t.translation.en
    }; 
    newTranslation[language] = t.translation[language] ? t.translation[language] : "";
    return newTranslation;
  });

  console.log(data);
  XLSX.writeFile({
    Sheets: {
        translations: XLSX.utils.json_to_sheet(data)
    },
    SheetNames: ["translations"]
  }, "translations.xlsx");
};

const importingTranslations = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsBinaryString(file);
  });
}

module.exports = {
  jsonToSheet,
  writeFile,
  createWorkbook,
  readExcelFile,
  exportingTranslations,
  importingTranslations
};
