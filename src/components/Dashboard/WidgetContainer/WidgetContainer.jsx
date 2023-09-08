import React, { useState, useEffect } from "react";
import { SyncLoader } from "react-spinners";
import { IoChevronDown } from "react-icons/io5";
import { Bar, StackedBarChart, VerticalStackedBarChart, DoubleStackedBarChart, CombinedChart, Map, Statistic, Line, Pie, Html, Treemap, Bublemap, Nodata } from "../Widget";
import { Menu, Dropdown, Tooltip } from "antd";
import IconButton from "../IconButton";
import "./WidgetContainer.css";

import { connect } from "react-redux";

import generateChildCharts from "../utils/generateChildCharts";
import { analyticData } from "../../../utils/const";
import { Hooks } from "tracker-capture-app-core";
const { useApi } = Hooks;

//Why using forward ref: https://github.com/react-grid-layout/react-grid-layout#custom-child-components-and-draggable-handles
const WidgetContainer = React.forwardRef(({ style, className, selectedOrgUnit, ...props }, ref) => {
  const { metadataApi } = useApi();
  
  const [selectedChild, setSelectedChild] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { children } = props.widget;
  const currentChild = children[selectedChild];

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await currentChild.getData();

      let flag = true;
      if ( analyticData[`page${props.widget.i.split(".")[0]}`] ) {
        const page = analyticData[`page${props.widget.i.split(".")[0]}`];
        if ( page[props.widget.i] && props.widget.i.split(".")[0] !== "2" ) {
          flag = false;

          if ( page[props.widget.i] === "no_data" ) {
            setData({
              ...{
                data: generateChildCharts(
                  props.widget.i,
                  null,
                  result
                )
              }
            })
          }
          else {
            const url = currentChild["codes"] ? page[props.widget.i].replace("[CAUSE_GROUP_CODE]",currentChild["codes"]).replaceAll("[YEAR]",props.period) : page[props.widget.i].replaceAll("[YEAR]",props.period);
            const data = await metadataApi.pull(url.replace("[ORG]",selectedOrgUnit ? selectedOrgUnit.id : "USER_ORGUNIT"));

            setData({ 
              ...{ 
                data: generateChildCharts(
                  props.widget.i,
                  data,
                  result
                ),
                colors: result.colors
              } 
            });
          }
        } else if ( props.widget.i.split(".")[0] === "2" ) {
          flag = false;

          const url = currentChild["codes"] ? analyticData.page2["2.1"].replace("[CAUSE_GROUP_CODE]",currentChild["codes"]).replaceAll("[YEAR]",props.period) : page[props.widget.i].replaceAll("[YEAR]",props.period);
          const data = await metadataApi.pull(url.replace("[ORG]",selectedOrgUnit ? selectedOrgUnit.id : "USER_ORGUNIT"));

          setData({ 
            ...{ 
              data: generateChildCharts(
                "2.1",
                data,
                result
              ),
              colors: result.colors
            } 
          });
        }
      }

      if ( flag ) {
        setData({ ...result });
      }
      setLoading(false);
    })();
  }, [selectedChild,props.period]);

  const generateWidget = () => {
    switch (currentChild.type) {
      case "bar":
        return <Bar data={data} />;
      case "line":
        return <Line data={data} />;
      case "pie":
        return <Pie data={data} />;
      case "statistic":
        return <Statistic data={data} />;
      case "stackedBar":
        return <StackedBarChart data={data} />;
      case "verticalStackedBar":
        return <VerticalStackedBarChart data={data} />;
      case "doubleStackedBar":
        return <DoubleStackedBarChart data={data} />;
      case "combined":
        return <CombinedChart data={data} />;
      case "map":
        return <Map data={data} />;
      case "html":
        return <Html data={data} />;
      case "treemap":
        return <Treemap data={data} />;
      case "bubble": 
        return <Bublemap data={data}/>
      default:
        return <Nodata data={data}/>;
    }
  };

  return (
    <div style={{ ...style }} className={"widget-wrapper " + className} ref={ref}>
      <div className="widget-container">
        <div className="widget-header">
          <div className="widget-title-container">
            {children.length > 1 ? (
              <Dropdown
                overlay={
                  <Menu>
                    {children.map((child, index) => {
                      return (
                        <Menu.Item
                          key={index}
                          onClick={() => {
                            if (index !== selectedChild) {
                              setLoading(true);
                              setSelectedChild(index);
                            }
                          }}
                        >
                          {child.title}
                        </Menu.Item>
                      );
                    })}
                  </Menu>
                }
              >
                <div className="page-label">
                  <div className="widget-title">{currentChild.title}</div>&nbsp;&nbsp;
                  <IoChevronDown />
                </div>
              </Dropdown>
            ) : (
              <div className="widget-title">{currentChild.title}</div>
            )}
            {currentChild.subTitle && <div className="widget-sub-title">{currentChild.subTitle}</div>}
          </div>
          <div className="widget-menu-container">
            <IconButton icon="menu" />
          </div>
        </div>
        <div className="widget">{loading ? <SyncLoader color="#757575" margin={8} size={15} /> : generateWidget()}</div>
      </div>
    </div>
  );
});

const mapStateToProps = state => {
  return {
    selectedOrgUnit: state.metadata.selectedOrgUnit
  }
}

export default connect(mapStateToProps)(WidgetContainer);
