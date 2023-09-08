import { randomNumber } from "../utils";
import generateChildChart from "../../utils/generateChildChart";
const allChartTitles = [
  "Mortality rate, all ages",
  "Mortality rate, neonates (0-27 days)",
  "Mortality rate, infant (< 1 year of age)",
  "Mortality rate, children < 5 years of age",
  "Mortality rate, age 0-14 years ",
  "Mortality rate, age 15-49 years ",
  "Mortality rate, 50 years and above",
  "Mortality rate, age 30-70 years"
];
const page1 = {
  id: "page0",
  label: "Mortality levels",
  layout: allChartTitles.map((v, index) => ({
    i: `0.${index + 1}`,
    x: index % 2 ? 49 : 0,
    y: Math.floor(index / 2) * 50,
    w: 49,
    h: 50
  })),

  widgets: allChartTitles.map((keyName, index) =>
    ({
      i: `0.${index + 1}`,
      children: [
        // generateChildChart("bar", {
        //   title: `${keyName} - registration`,
        //   dataLabels: [
        //     `${keyName.split(",")[0]} - Males, ${keyName.split(",")[1].trim()} - registration`,
        //     `${keyName.split(",")[0]} - Females, ${keyName.split(",")[1].trim()} - registration`
        //   ],
        //   dataSets: ["Hospital A", "Hospital B", "Hospital C", "Hospital D"].map((name) => ({
        //     name: name,
        //     data: Array(2)
        //       .fill()
        //       .map((v, index) => {
        //         return randomNumber(1, 90);
        //       })
        //   })),
        //   colors: ["#3E95CD", "#48b53a"]
        // })
        generateChildChart("no_data",{
          title: `${keyName} - registration`,
        })
      ]
    })
  )
};
export default page1;
