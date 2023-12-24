import React from "react";
import { Table, Tabs } from "antd";
import withLoading from "../../hocs/withLoading";

const { TabPane } = Tabs;

const Content = ({ data, countryCode }) => {
  return (
    <Tabs type="card">
      {Object.keys(data)
        .sort((a, b) => b - a)
        .map((year) => {
          const yearlyData = data[year];
          return (
            <TabPane tab={year} key={year}>
              <Table
                className="dhis2-table"
                rowKey={"index"}
                bordered={true}
                pagination={false}
                columns={yearlyData.listGrid.headers.map(
                  ({ name, column }, index) => ({
                    title: name,
                    dataIndex: index,
                    width: COLUMN_WIDTH,
                    key: column,
                  })
                )}
                scroll={{
                  x: "max-content",
                  y: "calc(100vh - 245px)",
                }}
                dataSource={yearlyData.listGrid.rows.map( row => {
                  return [
                    ...[
                      countryCode.country,
                      countryCode.code
                    ],
                    ...row.slice(2,row.length)
                  ]
                })}
              />
            </TabPane>
          );
        })}
    </Tabs>
  );
};

export default withLoading(Content);

const COLUMN_WIDTH = 120;
