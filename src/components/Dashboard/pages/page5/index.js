import { randomNumber } from "../utils";

const page5 = (t) => {
  const page5Data = [
    {
      icd11Chapter: "01",
      icd11Title: t("Certain infectious or parasitic diseases"),
    },
    {
      icd11Chapter: "02",
      icd11Title: t("Neoplasms"),
    },
    {
      icd11Chapter: "03",
      icd11Title: t("Diseases of the blood or blood-forming organs"),
    },
    {
      icd11Chapter: "04",
      icd11Title: t("Diseases of the immune system"),
    },
    {
      icd11Chapter: "05",
      icd11Title: t("Endocrine, nutritional or metabolic diseases"),
    },
    {
      icd11Chapter: "06",
      icd11Title: t("Mental, behavioural or neurodevelopmental disorders"),
    },
    {
      icd11Chapter: "07",
      icd11Title: t("Sleep-wake disorders"),
    },
    {
      icd11Chapter: "08",
      icd11Title: t("Diseases of the nervous system"),
    },
    {
      icd11Chapter: "09",
      icd11Title: t("Diseases of the visual system"),
    },
    {
      icd11Chapter: "10",
      icd11Title: t("Diseases of the ear or mastoid process"),
    },
    {
      icd11Chapter: "11",
      icd11Title: t("Diseases of the circulatory system"),
    },
    {
      icd11Chapter: "12",
      icd11Title: t("Diseases of the respiratory system"),
    },
    {
      icd11Chapter: "13",
      icd11Title: t("Diseases of the digestive system"),
    },
    {
      icd11Chapter: "14",
      icd11Title: t("Diseases of the skin"),
    },
    {
      icd11Chapter: "15",
      icd11Title: t(
        "Diseases of the musculoskeletal system or connective tissue"
      ),
    },
    {
      icd11Chapter: "16",
      icd11Title: t("Diseases of the genitourinary system"),
    },
    {
      icd11Chapter: "17",
      icd11Title: t("Conditions related to sexual health"),
    },
    {
      icd11Chapter: "18",
      icd11Title: t("Pregnancy, childbirth or the puerperium"),
    },
    {
      icd11Chapter: "19",
      icd11Title: t("Certain conditions originating in the perinatal period"),
    },
    {
      icd11Chapter: "20",
      icd11Title: t("Developmental anomalies"),
    },
    {
      icd11Chapter: "21",
      icd11Title: t(
        "Symptoms, signs or clinical findings, not elsewhere classified"
      ),
    },
    {
      icd11Chapter: "22",
      icd11Title: t(
        "Injury, poisoning or certain other consequences of external causes"
      ),
    },
    {
      icd11Chapter: "23",
      icd11Title: t("External causes of morbidity or mortality"),
    },
    {
      icd11Chapter: "24",
      icd11Title: t(
        "Factors influencing health status or contact with health services"
      ),
    },
    {
      icd11Chapter: "25",
      icd11Title: t("Codes for special purposes"),
    },
  ];

  let finalData = page5Data
    .map((e) => {
      return {
        name: `${e.icd11Chapter} - ${e.icd11Title}`,
        size: randomNumber(100, 10000),
      };
    })
    .sort((a, b) => parseFloat(b.size) - parseFloat(a.size));
  return {
    id: "page5",
    label: `${t("deathsByIcd11Chapter")}`,
    layout: [{ i: "5.1", x: 0, y: 0, w: 100, h: 70 }],
    widgets: [
      {
        i: "5.1",
        children: [
          {
            type: "treemap",
            title: `${t("deathsByIcd11Chapter")}`,
            getData: () => {
              return new Promise(async (res, rej) => {
                res({
                  data: finalData,
                  colors: [
                    "#446892",
                    "#F4813A",
                    "#A5A5A5",
                    "#F9C200",
                    "#559BDA",
                    "#6FB142",
                    "#23427D",
                    "#A64C13",
                    "#636363",
                    "#A2790D",
                    "#215E97",
                    "#486E30",
                    "#5C85CD",
                    "#F79653",
                    "#B7B7B7",
                    "#F9CE25",
                    "#72AADD",
                    "#87C260",
                    "#355DA7",
                    "#D85B06",
                    "#769861",
                    "#BC3FB0",
                    "#ED0475",
                    "#2C5C5C",
                    "#44F08B",
                  ],
                });
              });
            },
          },
        ],
      },
    ],
  };
};

export default page5;
