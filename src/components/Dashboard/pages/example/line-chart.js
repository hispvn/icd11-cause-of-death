const generateLineChart = (i) => {
  return {
    i,
    children: [
      {
        type: "line",
        title: "This is a LINE chart",
        getData: () => {
          return new Promise(async (res, rej) => {
            res({
              colors: ["red", "green", "blue"],
              data: [
                {
                  name: "LABEL 1",
                  cat1: 4000,
                  cat2: 200,
                  cat3: 8000
                },
                {
                  name: "LABEL 2",
                  cat1: 7000,
                  cat2: 10000,
                  cat3: 1000
                },
                {
                  name: "LABEL 3",
                  cat1: 1000,
                  cat2: 3000,
                  cat3: 8000
                },
                {
                  name: "LABEL 4",
                  cat1: 999,
                  cat2: 333,
                  cat3: 5555
                }
              ]
            });
          });
        }
      }
    ]
  };
};
export default generateLineChart;
