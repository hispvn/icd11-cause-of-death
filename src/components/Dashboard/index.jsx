import { useEffect, useState } from "react";
import GridLayout from "react-grid-layout";
import { WidthProvider } from "react-grid-layout";
import moment from "moment";
import WidgetContainer from "./WidgetContainer/WidgetContainer";
import { Select, Space } from "antd";

import generateChildChart from "./utils/generateChildChart";
import { AGE_RANGES, SEXES, randomNumber } from "./pages/utils";
import { useTranslation } from "react-i18next";
import "./index.css";
import run from "./run";
const Layout = WidthProvider(GridLayout);
const { Option } = Select;

const OPTIONS = [];
for (let i = moment().year(); i >= 1970; i--) {
  OPTIONS.push(<Option key={i}>{i}</Option>);
}

const ALL_CAUSES = [
  {label: "Tuberculosis", value: "0030"},
  {label: "Sexually transmitted diseases excluding HIV", value: "0040;0050;0060;0070;0080"},
  {label: "HIV", value: "0090"},
  {label: "Diarrhoeal diseases", value: "0100"},
  {label: "Pertussis", value: "0120"},
  {label: "Poliomyelitis", value: "0130"},
  {label: "Diphtheria", value: "0140"},
  {label: "Measles", value: "0150"},
  {label: "Tetanus", value: "0160"},
  {label: "Meningitis", value: "0170"},
  {label: "Hepatitis B", value: "0180"},
  {label: "Hepatitis C", value: "0190"},
  {label: "Malaria", value: "0200"},
  {label: "Tropical-cluster diseases", value: "0210;0220;0230;0240;0250;0260;0270"},
  {label: "Lower respiratory infections", value: "0390"},
  {label: "Maternal conditions", value: "0420;0430;0440;0450;0460;0470;0480"},
  {label: "Conditions arising during the perinatal period", value: "0490;0500;0510;0520"},
  {label: "Nutritional deficiencies", value: "0530;0540;0550;0560;0570;0580"},
  {label: "Mouth and oropharynx cancers", value: "0610"},
  {label: "Oesophagus cancer", value: "0620"},
  {label: "Stomach cancer", value: "0630"},
  {label: "Colon and rectum cancers", value: "0640"},
  {label: "Liver cancer", value: "0650"},
  {label: "Pancreas cancer", value: "0660"},
  {label: "Trachea, bronchus and lung cancers", value: "0670"},
  {label: "Melanoma and other skin cancers", value: "0680"},
  {label: "Breast cancer", value: "0690"},
  {label: "Cervix uteri cancer", value: "0700"},
  {label: "Corpus uteri cancer", value: "0710"},
  {label: "Ovary cancer", value: "0720"},
  {label: "Prostate cancer", value: "0730"},
  {label: "Bladder cancer", value: "0740"},
  {label: "Lymphomas and multiple myeloma", value: "0750"},
  {label: "Leukaemia", value: "0760"},
  {label: "Alzheimer and other dementias", value: "0870"},
  {label: "Parkinson disease", value: "0880"},
  {label: "Hypertensive  disease", value: "1060"},
  {label: "Ischaemic heart disease", value: "1070"},
  {label: "Cerebrovascular disease", value: "1080"},
  {label: "Chronic obstructive pulmonary disease", value: "1120"},
  {label: "Asthma", value: "1130"},
  {label: "Digestive diseases", value: "1150"},
  {label: "Genito-urinary diseases", value: "1200"},
  {label: "Congenital anomalies", value: "1310"},
  {label: "Road traffic accidents", value: "1500"},
  {label: "Suicide", value: "1570"},
  {label: "Homicide", value: "1580"}
];

const Dashboard = () => {
  const { t } = useTranslation();
  const [pages, setPages] = useState(run(t));
  const [selectedPeriods, selectPeriod] = useState(moment().year());
  const [selectedPage, setSelectedPage] = useState(pages[0] ? pages[0].id : "");
  const page = pages.find((page) => page.id === selectedPage);

  const [causes, setCauses] = useState(["0030","0090","0390","0670","0690","1070","1080","1500","1570"]);

  return page ? (
    <div className="dashboard-container">
      <div className="page-selector">
        <Space>
          <Select
            allowClear
            style={{ width: "500px" }}
            placeholder="Please select year"
            value={selectedPeriods}
            onChange={(value) => {
              selectPeriod(value);
            }}
          >
            {OPTIONS}
          </Select>
          <Select
              value={selectedPage}
              style={{ width: 300 }}
              options={pages.map((p) => ({ value: p.id, label: p.label }))}
              onChange={(value) => {
                setSelectedPage(value);
              }}
              disabled={selectedPeriods.length === 0}
            />
        </Space>
      </div>
      { selectedPage === "page2" && <div className="page-selector-cod">
        <Select
          mode="multiple"
          allowClear
          style={{ width: "99%" }}
          placeholder="Search"
          options={[...[{ label: "All", value: "all" }], ...ALL_CAUSES]}
          value={causes}
          onChange={(val) => {
            if (val[val.length - 1] === "all") {
              setCauses(ALL_CAUSES.map(({ value }) => value));
            } else {
              setCauses(val);
            }
          }}
        />
      </div> }
      <div className="layout-container">
      { selectedPage === "page2" ? 
          <Layout 
            id="grid" 
            className="layout" 
            cols={98} 
            rowHeight={1}
            layout={ Array(causes.length).fill().map( (o,index) => ({
              i: `2.${index + 1}`,
              x: index % 3 === 0 ? 0 : index % 3 === 1 ? 32 : 64,
              y: Math.floor(index / 3) * 33,
              w: 32,
              h: 33
            }) )} 
          >
            {
              causes.map( (code, index) => ({
                i: `2.${index + 1}`,
                children: [
                  generateChildChart("line", {
                    title: `Number of Death by ${ALL_CAUSES.find( ({value}) => value === code ).label}`,
                    dataLabels: SEXES,
                    dataSets: AGE_RANGES.map((name) => ({
                      name,
                      data: Array(SEXES.length)
                        .fill()
                        .map(() => randomNumber(0, 30))
                    })),
                    colors: ["#4C7FBC", "#ED7B2E"],
                    codes: code
                  })
                ]
              }))
              .map((widget) => {
                return <WidgetContainer key={widget.i} widget={widget} period={selectedPeriods} />;
              })
            }
          </Layout>
          :
          <Layout id="grid" className="layout" cols={98} layout={page.layout} rowHeight={1}>
            {page.widgets.map((widget) => {
              return <WidgetContainer key={widget.i} widget={widget} period={selectedPeriods} />;
            })}
          </Layout>
      }
        
      </div>
    </div>
  ) : null;
};

export default Dashboard;
