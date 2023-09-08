import { generateDataChartJS, generateDataPieChartJS, generateDataCombinedChartJS, generateDataDoubleStackedBarChartJS } from "../pages/utils";

const generateChildChart = (type, { title, colors, dataSets, dataLabels, codes }, types) => { 
  return type === "bar" ||  type === "stackedBar" ||  type === "line" || type === "verticalStackedBar"
  ? {
    type,
    title,
    codes,
    getData: () => {
      return new Promise(async (res, rej) => {
        res({
          data: generateDataChartJS({
            dataSets,
            dataLabels,
            colors
          }),
        });
      });
    }
  } 
  : type === "doubleStackedBar" ? {
    type,
    title,
    getData: () => {
      return new Promise(async (res, rej) => {
        res({
          data: generateDataDoubleStackedBarChartJS({
            dataSets,
            dataLabels,
            colors
          }),
        });
      });
    }
  }
  : type === "pie" ? {
    type,
    title,
    getData: () => {
      return new Promise(async (res, rej) => {
        res({
          data: generateDataPieChartJS({
            dataSets,
            dataLabels,
            colors
          }),
        });
      });
    }
  } 
  : type === "combined" ? {
    type,
    title,
    getData: () => {
      return new Promise(async (res, rej) => {
        res({
          data: generateDataCombinedChartJS({
            dataSets,
            dataLabels,
            colors,
            types
          }),
        });
      });
    }
  } 
  : {
    type,
    title,
    getData: () => {
      return new Promise(async (res, rej) => {
        res({
          data: null,
        })
      });
    }
  }
};

export default generateChildChart;
