const randomNumber = (minimum, maximum) => Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

const generateDataChartJS = ({ dataSets, dataLabels, colors }) => ({
  labels: dataSets.map( ({name}) => name ),
  datasets: dataLabels.map( (label,index) => {
    return {
      label: label,
      backgroundColor: colors[index],
      borderColor: colors[index],
      data: dataSets.map( dv => dv.data[index]),
      tension: 0.1
    }
  })
});

const generateDataDoubleStackedBarChartJS = ({ dataSets, dataLabels, colors }) => ({
  labels: dataSets.map( ({name}) => name ),
  datasets: dataLabels.map( (label,index) => {
    return {
      label: label,
      backgroundColor: colors[index],
      data: dataSets.map( dv => (index < dataLabels.length / 2) ? dv.data[index] * (-1) : dv.data[index]),
      stack: label.split(" - ")[0]
    }
  })
});

const generateDataPieChartJS = ({ dataSets, dataLabels, colors }) => ({
  labels: dataSets.map( ({name}) => name ),
  datasets: dataLabels.map( (label,index) => {
    return {
      label: label,
      backgroundColor: dataSets.map( (dv,i) => colors[i]),
      borderColor: dataSets.map( (dv,i) => colors[i]),
      data: dataSets.map( dv => dv.data[index]),
      // borderWidth: 1
    }
  })
});

const generateDataCombinedChartJS = ({ dataSets, dataLabels, colors, types }) => ({
    labels: dataSets.map( ({name}) => name ),
    datasets: types.map( (type,index) => {
      return type === "line" ? {
        label: dataLabels[index],
        type: type,
        borderColor: colors[index],
        data: dataSets.map( dv => dv.data[index]),
        yAxisID: 'y1',
        tension: 0.1
      } :
      type === "stackedBar" ? {
        label: dataLabels[index],
        type: "bar",
        backgroundColor: colors[index],
        data: dataSets.map( dv => dv.data[index]),
        yAxisID: 'y'
      } :
      {
        label: dataLabels[index],
        type: type,
        backgroundColor: colors[index],
        data: dataSets.map( dv => dv.data[index]),
        yAxisID: 'y'
      }
      
    })
  });

function fillWithRandom(min, max, length, sum) {
  return Array.from({ length }, (_, i) => {
    var smin = (length - i - 1) * min,
      smax = (length - i - 1) * max,
      offset = Math.max(sum - smax, min),
      random = 1 + Math.min(sum - offset, max - offset, sum - smin - min),
      value = Math.floor(Math.random() * random + offset);

    sum -= value;
    return value;
  });
}

const AGE_RANGES_SHORT = [
  "0 - 4",
  "5 - 14",
  "15 - 49",
  "50 - 74",
  "75+",
];
const AGE_RANGES_SHORT_ID = [
  "uIX27VLNGob",
  "jduZwN42ZIh",
  "HjeEqTwpCMI",
  "Y7qyb6tyOUH",
  "wsDGiP9nDun",
];

const AGE_RANGES = [
  "0 - 4",
  "5 - 14",
  "15 - 24",
  "25 - 34",
  "35 - 44",
  "45 - 54",
  "55 - 64",
  "65+",
];
const AGE_RANGES_ID = [
  "EBqs11eCY9M",
  "xEgJqELraF1",
  "SL8sNJYRTsC",
  "YD8huHSUpgh",
  "LxxjrX0X2wo",
  "d2gO6m8sZKv",
  "Jwj62V6QXJv",
  "b1EYeMmOhPJ",
];

const SEXES = ["Male", "Female"];

const EXPANDED_AGE_RANGES = [
  "0",
  "1 - 4",
  "5 - 9",
  "10 - 14",
  "15 - 19",
  "20 - 24",
  "25 - 29",
  "30 - 34",
  "35 - 39",
  "40 - 44",
  "45 - 49",
  "50 - 54",
  "55 - 59",
  "60 - 64",
  "65 - 69",
  "70 - 74",
  "75 - 79",
  "80 - 84",
  "85+",
];
const EXPANDED_AGE_RANGES_ID = [
  "PgNRfUIUnkV",
  "GY3trMXpiVb",
  "bYEYsp7h3Av",
  "S6BPCHbRSi8",
  "VVE7PA54iOh",
  "yoi16djJsjT",
  "hekunVFDmSs",
  "bXNgEqcTsZw",
  "YKEos681ecL",
  "ZiREy70YLQL",
  "jmdJb6hLZ1d",
  "kLBeKjO5oGH",
  "PWsWTS0noi3",
  "ZM72JESylkO",
  "wM5lkbWemzT",
  "PbYhVtjpuot",
  "zPkWO0SbiQf",
  "nREUPpuW5AX",
  "lXtoq1mBYes",
];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export {
  randomNumber,
  // generateData,
  generateDataChartJS,
  generateDataPieChartJS,
  generateDataCombinedChartJS,
  generateDataDoubleStackedBarChartJS,
  fillWithRandom,
  AGE_RANGES_SHORT,
  AGE_RANGES_SHORT_ID,
  AGE_RANGES,
  AGE_RANGES_ID,
  SEXES,
  EXPANDED_AGE_RANGES,
  EXPANDED_AGE_RANGES_ID,
  MONTHS
};
