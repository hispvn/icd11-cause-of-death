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

module.exports = {
  jsonToSheet,
  writeFile,
  createWorkbook,
  readExcelFile,
};
