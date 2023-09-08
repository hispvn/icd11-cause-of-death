import generateLineChart from "./line-chart";
import generateStackedBarChart from "./stackedBar-chart";

const page2 = (t) => {
  return {
    id: "page2",
    label: `${t("mortalityByCauseAgeAndSex")}`,
    layout: [
      { i: "2.1", x: 0, y: 0, w: 49, h: 50 }, //statistic
      { i: "2.2", x: 49, y: 0, w: 49, h: 50 },
    ],
    widgets: [generateLineChart("2.1", t), generateStackedBarChart("2.2", t)],
  };
};

export default page2;
