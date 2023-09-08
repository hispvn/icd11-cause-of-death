const generatePieChart = (i) => {
  return {
    i,
    children: [
      {
        type: "pie",
        title: "This is a PIE chart",
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
      }
    ]
  };
};
export default generatePieChart;
