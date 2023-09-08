import {
  AGE_RANGES,
  EXPANDED_AGE_RANGES,
  MONTHS,
  SEXES,
  randomNumber,
} from "../utils";
import generateChildChart from "../../utils/generateChildChart";

const page6 = (t) => {
  const TITLES = [
    t("numberOfMalariaDeathsByMonth"),
    t("numberOfMalariaDeathsPlaceOfDeath"),
    t("numberOfMalariaDeathsBySex"),
    t("numberOfMalariaDeathsBySexAndDetailedAgeGroup"),
    t("numberOfMalariaDeathsAndPercentOfAllMalariaDeathsByBroadAgeGroup"),
    t("numberOfMalariaDeathsComparedWithOtherCausesOfDeaths"),
  ];
  return {
    id: "page6",
    label: `${t("malaria")}`,
    // layout: TITLES.map((v, index) => {
    //     return {
    //         i: `6.${index + 1}`,
    //         x: index % 2 ? 49 : 0,
    //         y: Math.floor(index / 2) * 50,
    //         w: 49,
    //         h: 50
    //     };
    // }),
    layout: [
      { i: "6.1", x: 0, y: 0, w: 98, h: 50 },
      { i: "6.3", x: 0, y: 50, w: 49, h: 50 },
      { i: "6.4", x: 49, y: 50, w: 49, h: 50 },
      { i: "6.5", x: 0, y: 100, w: 49, h: 50 },
      { i: "6.6", x: 49, y: 100, w: 49, h: 50 },
    ],
    widgets: [
      {
        i: `6.1`,
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
        //     i: `6.2`,
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
        i: `6.3`,
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
        i: `6.4`,
        children: [
          generateChildChart("pie", {
            title: TITLES[2],
            dataLabels: ["value"],
            dataSets: SEXES.map((name) => ({
              name,
              data: Array(2)
                .fill()
                .map(() => randomNumber(1, 90)),
            })),
            colors: ["#4C7FBC", "#ED7B2E"],
          }),
        ],
      },
      {
        i: `6.5`,
        children: [
          generateChildChart(
            "combined",
            {
              title: TITLES[4],
              dataLabels: [
                t("percentOfTotalMalariaDeaths"),
                t("numberOfMalariaDeaths"),
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
        i: `6.6`,
        children: [
          generateChildChart("stackedBar", {
            title: TITLES[5],
            dataLabels: [`${t("malaria")}`, `${t("otherCauses")}`],
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

export default page6;
