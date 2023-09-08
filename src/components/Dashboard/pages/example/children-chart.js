const generateChildrenChart = (i) => {
  return {
    i,
    children: [
      {
        type: "pie",
        title: "This chart contain multiple children - this is FIRST CHILD",
        getData: () => {
          return new Promise(async (res, rej) => {
            res({
              colors: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
              data: [
                { name: "Group A", value: 7 },
                { name: "Group B", value: 10 },
                { name: "Group C", value: 15 },
                { name: "Group D", value: 30 }
              ]
            });
          });
        }
      },
      {
        type: "statistic",
        title: "This chart contain multiple children - this is SECOND CHILD",
        getData: () => {
          return new Promise(async (res, rej) => {
            res({ value: 78910 });
          });
        }
      },
      {
        type: "combined",
        title: "This chart contain multiple children - this is THIRD CHILD",
        getData: () => {
          return new Promise(async (res, rej) => {
            res({
              colors: ["red", "green", "blue"],
              types: ["bar", "line", "line"],
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
export default generateChildrenChart;
