import moment from "moment";
/* REDUX */
import { connect } from "react-redux";
/*       */
import { Button, Col, Row, Select } from "antd";
import { CaretRightOutlined, FileExcelOutlined } from "@ant-design/icons";
import "./index.css";
import { useState } from "react";
import { writeFile } from "../../utils/excel.utility";
import { Hooks } from "tracker-capture-app-core";
import Content from "./Content";
import XLSX from "xlsx";
import { useTranslation } from "react-i18next";

const { useApi } = Hooks;

const { Option } = Select;
const OPTIONS = [];
for (let i = moment().year(); i >= 1970; i--) {
  OPTIONS.push(<Option key={i}>{i}</Option>);
}

const Export = ({ route }) => {
  const { t } = useTranslation();
  const { dataApi } = useApi();
  const getData = async (year) =>
    dataApi.pull(
      `/api/sqlViews/XpI2kVApPIH/data?paging=false&var=year:${year}`
    );
  const [periodType, setPeriodType] = useState("Yearly");
  const [selectedPeriods, selectPeriod] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [data, setData] = useState(null);
  const [isEnableExport, setIsEnableExport] = useState(false);
  return (
    <div className="export-wrapper">
      <div className="export-container">
        <Row style={{ width: "100%", padding: 9 }} gutter={5}>
          <Col>
            {/* <Select
              style={{ width: 200 }}
              value={periodType}
              placeholder="Select period type"
              onChange={setPeriodType}
            >
              {OPTIONS.map((option) => (
                <Option value={option.value}>{option.label}</Option>
              ))}
            </Select> */}
            <Select
              mode="multiple"
              allowClear
              style={{ width: "500px" }}
              placeholder={t("pleaseSelectYear")}
              onChange={(value) => {
                selectPeriod(value);
              }}
            >
              {OPTIONS}
            </Select>
          </Col>
          {/* <Col>
            <D2PeriodPicker
              selectedPeriod={selectedPeriod ? selectedPeriod : null}
              openFuturePeriods={0}
              periodType={periodType}
              onPickPeriod={(value) => {
                selectPeriod(parsePeriod(value));
              }}
            />
          </Col> */}
          <Col>
            <Button
              loading={isRunning}
              disabled={!selectedPeriods || isRunning}
              onClick={async () => {
                setIsRunning(true);
                setData(null);
                const data = {};
                for (let i = 0; i < selectedPeriods.length; i++) {
                  const year = selectedPeriods[i];
                  data[year] = await getData(year);
                }
                // const totalRows = _(data).toPairs().map(([year, yearlyData]) => yearlyData.listGrid.rows).map()
                // data.total = Object.values(data).map(([year, yearlyData]) =>
                //   _(data).toPairs()
                //     .groupBy(function ([code]) {
                //       return code;
                //     })
                //     .map(
                //       (values, code) =>
                //         console.log("values", values) ||
                //         _.zipWith(...values, function (...params) {
                //           return _.sum(params);
                //         })
                //     )
                //     .value()
                // );
                // console.log("data", data);
                // await new Promise((rs) => setTimeout(() => rs(), 1000));
                setData(data);
                setIsRunning(false);
                setIsEnableExport(true);
              }}
              type="primary"
              icon={<CaretRightOutlined />}
            >
              {t("run")}
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              disabled={!isEnableExport}
              icon={<FileExcelOutlined />}
              onClick={() => {
                var wb = XLSX.utils.book_new();
                Object.entries(data)
                  .sort(([a], [b]) => b - a)
                  .map(
                    ([
                      year,
                      {
                        listGrid: { rows, headers },
                      },
                    ]) => {
                      const heads = headers.map(({ name }) => name);
                      const ws = XLSX.utils.json_to_sheet(
                        rows.map((row) =>
                          row.reduce((result, cell, index) => {
                            result[heads[index]] = cell;
                            return result;
                          }, {})
                        ),
                        {
                          header: heads,
                        }
                      );
                      return XLSX.utils.book_append_sheet(wb, ws, year);
                    }
                  );
                writeFile(wb, "ANACOD.xlsx");
              }}
            >
              {t("anacodExportExcel")}
            </Button>
          </Col>
        </Row>
        <Content loading={isRunning} loaded={!!data} data={data} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    route: state.route,
  };
};

export default connect(mapStateToProps)(Export);
