import generateChildChart from "../../utils/generateChildChart";
import { randomNumber } from "../utils";
import "./page4.css";

const generatePage4HtmlChart = (i, t, pageData) => {
  return {
    i,
    children: [
      {
        type: "html",
        title: `${t("mostFrequentCauseOfDeath")}`,
        getData: () => {
          return new Promise(async (res, rej) => {
            res({
              data: (
                <div>
                  <table class="styled-table">
                    <thead>
                      <tr>
                        <th>{t("name")}</th>
                        <th width="30%">{t("points")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageData.map((e) => {
                        return (
                          <tr>
                            <td>{e.name}</td>
                            <td class="valueField">{e.value}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ),
            });
          });
        },
      },
    ],
  };
};

const page4 = (t) => {
  const label = [
    t("pneumonia"),
    t("otherDiseasesOfTheDigestiveSystem"),
    t("otherDirectObstetricDeaths"),
    t("prematurity"),
    t(
      "symptomsSignAndAbnormalClinicalAndLaboratoryFindingsNotElsewhereClassified"
    ),
    t("otherAndUnspecifiedCongenitalMalformations"),
    t("otherAndUnspecifiedPerinatalConditions"),
    t("intrauterineHypoxiaAndBirthAsphyxia"),
  ];

  let pageData = [];

  label.forEach((e) => {
    let object = {
      name: e,
      value: randomNumber(100, 1000),
    };
    pageData.push(object);
  });
  return {
    id: "page4",
    label: `${t("mostFrequentCauseOfDeath")}`,
    layout: [
      { i: "4.1", x: 0, y: 0, w: 49, h: 50 },
      { i: "4.2", x: 49, y: 0, w: 49, h: 50 },
    ],
    widgets: [
      {
        i: "4.1",
        children: [
          generateChildChart("pie", {
            title: `Most frequent causes of death`,
            colors: [
              "#3E95CD",
              "#8E5EA2",
              "#3CBA9F",
              "#E8C3B9",
              "#C45850",
              "#00FF80",
              "#FFAA00",
              "#77B300",
            ],
            dataLabels: ["value"],
            dataSets: pageData.map((e) => ({
              name: e.name,
              data: [e.value],
            })),
          }),
        ],
      },
      generatePage4HtmlChart("4.2", t, pageData),
    ],
  };
};

export default page4;
