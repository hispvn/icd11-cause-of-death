const generateStackedBarChart = (i) => {
  return {
    i,
    children: [
      {
        type: "stackedBar",
        title: "This is a STACKED bar chart",
        getData: () => {
          return new Promise(async (res, rej) => {
            res({
              colors: ["red", "green", "blue"],
              data: [
                {
                  name: "LABEL 1",
                  cat1: 4000,
                  cat2: 2400,
                  cat3: 2400
                },
                {
                  name: "LABEL 2",
                  cat1: 3000,
                  cat2: 1398,
                  cat3: 2210
                },
                {
                  name: "LABEL 3",
                  cat1: 2000,
                  cat2: 9800,
                  cat3: 2290
                }
              ]
            });
          });
        }
      }
    ]
  };
};
export default generateStackedBarChart;
