const generateStatistic = (i) => {
  return {
    i,
    children: [
      {
        type: "statistic",
        title: "This is a statistic widget",
        getData: () => {
          return new Promise(async (res, rej) => {
            res({ value: 123456 });
          });
        }
      }
    ]
  };
};
export default generateStatistic;
