import {
  AGE_RANGES,
  EXPANDED_AGE_RANGES,
  MONTHS,
  SEXES,
  randomNumber,
} from "../utils";
import generateChildChart from "../../utils/generateChildChart";

const page7 = (t) => {
  const TITLES = [
    t("numberOfTuberculosisDeathsByMonth"),
    t("numberOfTuberculosisDeathsByPlaceOfDeath"),
    t("numberOfTuberculosisDeathsBySex"),
    t("numberOfTuberculosisDeathsBySexAndDetailedAgeGroup"),
    t(
      "numberOfTuberculosisDeathsAndPercentOfAllTuberculosisDeathsByBroadAgeGroup"
    ),
    t("numberOfTuberculosisDeathsComparedWithOtherCausesOfDeaths"),
  ];
  return {
    id: "page7",
    label: `${t("tuberculosis")}`,
    // layout: TITLES.map((v, index) => {
    //     return {
    //         i: `7.${index + 1}`,
    //         x: index % 2 ? 49 : 0,
    //         y: Math.floor(index / 2) * 50,
    //         w: 49,
    //         h: 50
    //     };
    // }),
    layout: [
      { i: "7.1", x: 0, y: 0, w: 98, h: 50 },
      { i: "7.3", x: 0, y: 50, w: 49, h: 50 },
      { i: "7.4", x: 49, y: 50, w: 49, h: 50 },
      { i: "7.5", x: 0, y: 100, w: 49, h: 50 },
      { i: "7.6", x: 49, y: 100, w: 49, h: 50 },
    ],
    widgets: [
      {
        i: `7.1`,
        children: [
          generateChildChart("line", {
            title: TITLES[3],
            dataLabels: SEXES,
            dataSets: EXPANDED_AGE_RANGES.map((name) => ({
              name,
              data: Array(SEXES.length)
                .fill()
                .map(() => randomNumber(0, 8000)),
            })),
            colors: ["#4C7FBC", "#ED7B2E"],
          }),
        ],
        // }, {
        //     i: `7.2`,
        //     children: [
        //         // generateChildChart("bar", {
        //         //     title: TITLES[1],
        //         //     dataLabels: ["Home", "Health Facilities"],
        //         //     dataSets: ["Iringa", "Domino", "Cattle", "Pigeon", "Cow", "Squirel", "Owl", "Bird"].map((name) => ({
        //         //         name,
        //         //         data: Array(2)
        //         //         .fill()
        //         //         .map(() => randomNumber(0, 700))
        //         //     })),
        //         //     colors: ["#4C7FBC", "#ED7B2E"]
        //         // })
        //         generateChildChart("no_data",{
        //             title: TITLES[1]
        //         })
        //     ]
      },
      {
        i: `7.3`,
        children: [
          generateChildChart("stackedBar", {
            title: TITLES[0],
            dataLabels: SEXES,
            dataSets: MONTHS.map((name) => ({
              name,
              data: Array(SEXES.length)
                .fill()
                .map(() => randomNumber(0, 400)),
            })),
            colors: ["#4C7FBC", "#ED7B2E"],
          }),
        ],
      },
      {
        i: `7.4`,
        children: [
          generateChildChart("pie", {
            title: TITLES[2],
            dataLabels: ["value"],
            dataSets: SEXES.map((name) => ({
              name,
              data: Array(1)
                .fill()
                .map(() => randomNumber(1, 90)),
            })),
            colors: ["#4C7FBC", "#ED7B2E"],
          }),
        ],
      },
      {
        i: `7.5`,
        children: [
          generateChildChart(
            "combined",
            {
              title: TITLES[4],
              dataLabels: [
                t("percentOfTotalTuberculosisDeaths"),
                t("numberOfTuberculosisDeaths"),
              ],
              dataSets: [
                "0-6 days",
                "7-27 days",
                "28-365 days",
                "1-4 years",
                "5-14 years",
                "15+ years",
              ].map((name) => {
                const number = randomNumber(0, 300);
                return {
                  name,
                  data: [(number / 300) * 100, number],
                };
              }),
              colors: ["#ED7B2E", "#4C7FBC"],
            },
            ["line", "bar"]
          ),
        ],
      },
      {
        i: `7.6`,
        children: [
          generateChildChart("stackedBar", {
            title: TITLES[5],
            dataLabels: [`${t("tuberculosis")}`, `${t("otherCauses")}`],
            dataSets: AGE_RANGES.map((name) => ({
              name,
              data: Array(2)
                .fill()
                .map(() => randomNumber(0, 400)),
            })),
            colors: ["#4C7FBC", "#ED7B2E"],
          }),
        ],
      },
    ],
  };
};

export default page7;
