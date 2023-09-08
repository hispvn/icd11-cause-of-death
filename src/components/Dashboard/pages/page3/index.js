import { EXPANDED_AGE_RANGES, MONTHS, randomNumber, SEXES } from "../utils";
import generateChildChart from "../../utils/generateChildChart";

const page3 = (t) => {
  const TITLES = [
    t("malignantNeoplasms"),
    t("diabetesMellitus"),
    t("cardiovascularDiseases"),
    t("respiratoryDiseases")
  ];
  return {
    id: "page3",
    label: `${t("mortaliryFromNcds")}`,
    layout: Array(TITLES.length * 2)
      .fill()
      .map((v, index) => {
        return {
          i: `3.${index + 1}`,
          x: index % 2 ? 49 : 0,
          y: Math.floor(index / 2) * 50,
          w: 49,
          h: 50,
        };
      }),
    widgets: Array(TITLES.length * 2)
      .fill()
      .map((v, index) => {
        const baseTitle = TITLES[Math.floor(index / 2)];
        if (index % 2 === 0) {
          return {
            i: `3.${index + 1}`,
            children: [
              generateChildChart("line", {
                title: `${t("numberOfDeathBySexAndAge")} - ${baseTitle}`,
                dataLabels: SEXES,
                dataSets: EXPANDED_AGE_RANGES.map((name) => ({
                  name,
                  data: Array(SEXES.length)
                    .fill()
                    .map(() => randomNumber(0, 8000)),
                })),
                colors: ["#3F6EC3", "#ED7B2E"],
              }),
            ],
          };
        }
        return {
          i: `3.${index + 1}`,
          children: [
            generateChildChart("stackedBar", {
              title: `${t("numberOfDeathByMonth")} - ${baseTitle}`,
              dataLabels: SEXES,
              dataSets: MONTHS.map((name) => ({
                name,
                data: Array(SEXES.length)
                  .fill()
                  .map(() => randomNumber(0, 350)),
              })),
              colors: ["#4C7FBC", "#ED7B2E"],
            }),
          ],
        };
      }),
  };
};

export default page3;
