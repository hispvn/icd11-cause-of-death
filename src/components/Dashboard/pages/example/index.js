import generateStatistic from "./statistic";
import generateBarChart from "./bar-chart";
import generateStackedBarChart from "./stacked-bar-chart";
import generateLineChart from "./line-chart";
import generateCombinedChart from "./combined-chart";
import generatePieChart from "./pie-chart";
import generateChildrenChart from "./children-chart";
import generateHtmlChart from "./html-chart";
import generateTreemapChart from "./treemap-chart";

const example = {
  id: "example",
  label: "EXAMPLE DASHBOARD PAGE",
  layout: [
    { i: "e.1", x: 0, y: 0, w: 98, h: 20 }, //statistic
    { i: "e.2", x: 0, y: 20, w: 49, h: 40 }, //barchart
    { i: "e.3", x: 49, y: 20, w: 49, h: 40 }, //stacked bar chart
    { i: "e.4", x: 0, y: 60, w: 49, h: 40 }, //line  chart
    { i: "e.5", x: 49, y: 60, w: 49, h: 40 }, //combined  chart
    { i: "e.6", x: 0, y: 100, w: 49, h: 40 }, //pie chart
    { i: "e.7", x: 49, y: 100, w: 49, h: 40 }, //children
    { i: "e.8", x: 0, y: 140, w: 49, h: 40 }, //html chart
    { i: "e.9", x: 0, y: 180, w: 100, h: 50 } //treemap chart
  ],
  widgets: [
    generateStatistic("e.1"),
    generateBarChart("e.2"),
    generateStackedBarChart("e.3"),
    generateLineChart("e.4"),
    generateCombinedChart("e.5"),
    generatePieChart("e.6"),
    generateChildrenChart("e.7"),
    generateHtmlChart("e.8"),
    generateTreemapChart("e.9")
  ]
};

export default example;
