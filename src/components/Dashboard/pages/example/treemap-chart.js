const generateTreemapChart = (i) => {
  return {
    i,
    children: [
      {
        type: "treemap",
        title: "This is a TREEMAP chart",
        getData: () => {
          return new Promise(async (res, rej) => {
            res({
              data: [
                {
                  name: "Axes askdhfasjkdf najksd asjkf ashjkfg asjkfg askdgas hgaskdhfgasdkhf gasdkhf askdjgas kdfgasjkdfghjkasfgkashjfg kashj",
                  size: 1
                },
                { name: "Axis", size: 2 },
                { name: "AxisGridLine", size: 3 },
                {
                  name: "AxisLabel askdhfasjkdf ajksd asjkf ashjkfg asjkfg askdgas khgaskdhfgasdkhf gasdkhf askdjgas kdfgasjkdfghjkasfgkashjfg kashj",
                  size: 4
                },
                {
                  name: "asdfkjasgf",
                  size: 10
                }
              ],
              colors: ["red", "green", "blue", "teal", "yellow"]
            });
          });
        }
      }
    ]
  };
};
export default generateTreemapChart;
