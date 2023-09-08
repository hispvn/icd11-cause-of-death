import { AGE_RANGES_SHORT, SEXES, randomNumber } from "../utils";
import generateChildChart from "../../utils/generateChildChart";

const page9 = (t) => {
  const TITLES = [
    t("numberOfDeathsFromTbAidsMalariaAndOtherCausesAgeGroup"),
    t("distributionOfDeathsByTbAidsAndMalariaBySexAndAge"),
    t(
      "percentageOfDeathsFromTbAidsAndMalariaOutOfAllDeathsFromCommunicableDiseases"
    ),
    t(
      "numberOfTbAndAidsDeathsAndPercentOfTheseDeathsOutOfAllDeaths15YearsAndAbove"
    ),
  ];
  return {
    id: "page9",
    label: `${t("malaria")} - ${t("tb")} - ${t("aids")}`,
    layout: TITLES.map((v, index) => {
      return {
        i: `9.${index + 1}`,
        x: index % 2 ? 49 : 0,
        y: Math.floor(index / 2) * 50,
        w: 49,
        h: 50,
      };
    }),
    widgets: [
      {
        i: "9.1",
        children: [
          generateChildChart("verticalStackedBar", {
            title: TITLES[0],
            dataLabels: [t("tb"), t("aids"), t("malaria"), t("other")],
            dataSets: AGE_RANGES_SHORT.map((name) => ({
              name,
              data: Array(4)
                .fill()
                .map(() => randomNumber(1, 2000)),
            })),
            colors: ["#4C7FBC", "#ED7B2E", "#CBCBCB", "#E0DF40"],
          }),
        ],
      },
      {
        i: "9.2",
        children: [
          generateChildChart("doubleStackedBar", {
            title: TITLES[1],
            dataLabels: [
              "Male - TB",
              "Male - AIDS",
              "Male - Malaria",
              "Female - TB",
              "Female - AIDS",
              "Female - Malaria",
            ],
            dataSets: AGE_RANGES_SHORT.map((name) => ({
              name,
              data: Array(6)
                .fill()
                .map(() => randomNumber(1, 2000)),
            })),
            colors: [
              "#225FAD",
              "#79A4DA",
              "#BFD7F5",
              "#7F1590",
              "#C971D7",
              "#F4CCFA",
            ],
          }),
        ],
      },
      {
        i: "9.3",
        children: [
          generateChildChart("bar", {
            title: TITLES[2],
            dataLabels: [t("numberOfDeath")],
            dataSets: AGE_RANGES_SHORT.map((name) => ({
              name,
              data: [randomNumber(1, 100)],
            })),
            colors: ["#3F6EC3"],
          }),
        ],
      },
      {
        i: "9.4",
        children: [
          generateChildChart(
            "combined",
            {
              title: TITLES[3],
              dataLabels: [
                t("percentOfTotalDeathAllCauses"),
                t("tb"),
                t("aids"),
              ],
              dataSets: ["15 - 24", "35 - 49", "50 - 74", "75+"].map((name) => {
                const number1 = randomNumber(0, 600);
                const number2 = randomNumber(0, 600);
                return {
                  name,
                  data: [
                    ((number1 + number2) /
                      (number1 + number2 + randomNumber(0, 600))) *
                      100,
                    number1,
                    number2,
                  ],
                };
              }),
              colors: ["#21272D", "#4C7FBC", "#ED7B2E"],
            },
            ["line", "stackedBar", "stackedBar"]
          ),
        ],
      },
    ],
  };
};

export default page9;
