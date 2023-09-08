import { AGE_RANGES, fillWithRandom, randomNumber } from "../utils";
import generateChildChart from "../../utils/generateChildChart";
const COLORS = ["#3d83bf", "#e07c24", "#bab332", "#48b53a"];


const page1 = (t) => {
  const DATASET_LABELS = [
    t("communicable"),
    t("noCommunicable"),
    t("externalCauses"),
    t("illDefined"),
  ];
  return {
    id: "page1",
    label: `${t("mortalityFromBoardCausesOfDeath")}`,
    layout: [
      { i: "1.1", x: 0, y: 0, w: 49, h: 50 },
      { i: "1.2", x: 49, y: 0, w: 49, h: 50 },
      { i: "1.3", x: 0, y: 50, w: 98, h: 72 },
    ],
    widgets: [
      {
        i: "1.1",
        children: [
          generateChildChart("pie", {
            title: `${t("proportionOfDeathFromBroadCausesAll")}`,
            dataLabels: ["value"],
            dataSets: DATASET_LABELS.map((name) => ({
              name,
              data: Array(1)
                .fill()
                .map(() => {
                  return randomNumber(1, 90);
                }),
            })),
            colors: COLORS,
          }),
        ],
      },
      {
        i: "1.2",
        children: [
          generateChildChart("stackedBar", {
            title: `${t("distributionOfDeathByBroadCausesAndAgeGroups")}`,
            dataLabels: DATASET_LABELS,
            dataSets: AGE_RANGES.map((name) => ({
              name,
              data: fillWithRandom(1, 100, DATASET_LABELS.length, 100),
            })),
            colors: COLORS,
          }),
        ],
      },
      {
        i: "1.3",
        children: [
          {
            title:
              `${t("overViewDistributionOfDeath")}`,
            subTitle: `${t("clickOnBubleForDetail")}`,
            type: "bubble",
            getData: () => {
              return new Promise(async (res, rej) => {
                res({
                  data: [],
                });
              });
            },
          },
        ],
      },
    ],
  };
};

export default page1;
