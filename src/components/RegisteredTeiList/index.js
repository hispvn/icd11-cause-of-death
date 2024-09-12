import { useRef, useEffect, useState } from "react";
import { Table, Tag } from "antd";
import { Hooks, Components } from "tracker-capture-app-core";
import "./index.css";
import { generateTableColumns, generateTableFilter } from "../../utils/index";
/* REDUX */
import { connect } from "react-redux";
import { initData } from "../../redux/actions/data";
import { changeRoute } from "../../redux/actions/route";
import { useTranslation } from "react-i18next";
/*       */

/* Components */
import { SearchOutlined } from "@ant-design/icons";
const { useApi } = Hooks;
const { LoadingMask } = Components;

const RegisteredTeiList = ({ metadata, data, initData, changeRoute }) => {
  const { t } = useTranslation();
  const { dataApi } = useApi();
  const { programMetadata, selectedOrgUnit } = metadata;
  const tableContainer = useRef(null);
  const [size, setSize] = useState({ height: 0 });
  const [loadingTable, setLoadingTable] = useState(true);
  const [loadingPage, setLoadingPage] = useState(true);
  const [sortTable, setSortTable] = useState("order=created:desc");
  const [filterTable, setFilterTable] = useState([]);

  const [tableData, setTableData] = useState({
    columns: null,
    data: null,
    pager: null,
  });

  useEffect(() => {
    const tableContainerHeight = tableContainer.current.offsetHeight;
    setSize({
      ...size,
      height: tableContainerHeight,
    });
  }, []);

  useEffect(() => {
    (async () => {
      if (!programMetadata || !selectedOrgUnit) return;
      setLoadingPage(true);
      setFilterTable([]);
      setSortTable("order=created:desc");
      setTableData({
        ...tableData,
        columns: null,
        data: null,
        pager: null,
      });
      const instanceList = await dataApi.getTrackedEntityInstanceListByQuery(
        selectedOrgUnit.id,
        programMetadata.id,
        10,
        1,
        "",
        sortTable
      );
      console.log(instanceList);
      setupUI(instanceList);
    })();
  }, [
    programMetadata ? programMetadata.id : null,
    selectedOrgUnit ? selectedOrgUnit.id : null,
  ]);

  useEffect(() => {
    if (selectedOrgUnit) {
      (async () => {
        setLoadingTable(true);
        const instanceList = await dataApi.getTrackedEntityInstanceListByQuery(
          selectedOrgUnit.id,
          programMetadata.id,
          tableData.pager ? tableData.pager.pageSize : 10,
          tableData.page ? tableData.pager.page : 1,
          returnFilterString(filterTable),
          sortTable
        );
        setupUI(instanceList);
      })();
    }
  }, [filterTable, sortTable]);

  const returnFilterString = (arr) => {
    let filterString = "";
    arr.forEach((e) => {
      if (e.type === "select") {
        filterString += `&attribute=${e.teiId}:EQ:${e.value}`;
      } else {
        filterString += `&attribute=${e.teiId}:LIKE:${e.value}`;
      }
    });
    return filterString;
  };

  const onSort = async (sorter) => {
    if (sorter) {
      let orderString = "";
      if (sorter.order === "descend") {
        orderString = `order=${sorter.columnKey}:desc`;
      } else {
        if (sorter.order === "ascend") {
          orderString = `order=${sorter.columnKey}:asc`;
        } else {
          orderString = `order=created:desc`;
        }
      }
      setSortTable(orderString);
    }
  };

  const onFilter = async (value, teiId, type) => {
    let arr = [];
    arr = filterTable;
    if (value && arr) {
      let find = arr.findIndex((e) => e.teiId === teiId);
      if (find >= 0) {
        arr[find].value = value;
      } else {
        arr.push({
          value,
          teiId,
          type: type ? type : null,
        });
      }
    } else {
      let find = arr.findIndex((e) => e.teiId === teiId);
      arr.splice(find, 1);
    }
    setFilterTable([...arr]);
  };

  const setupUI = (instanceList) => {
    let columns = programMetadata.trackedEntityAttributes
      .filter((tea) => tea.displayInList)
      .map((tea) => {
        const teaObject = {
          title: tea.displayFormName,
          dataIndex: tea.id,
          key: tea.id,
          sorter: true,
          filterDropdown: generateTableFilter(tea, onFilter),
          render: generateTableColumns(tea),
        };
        return teaObject;
      });
    const lastUpdatedObject = {
      title: t("lastUpdated"),
      dataIndex: "lastupdated",
      key: "lastupdated",
      sorter: true,
      // filterDropdown: generateTableFilter(null, onFilter, {
      //   name: "lastupdated",
      //   type: "DATE",
      // }),
      render: generateTableColumns(null, { name: "lastupdated", type: "DATE" }),
    };
    columns.unshift(lastUpdatedObject);
    const data = instanceList.rows.map((row, index) => {
      const rowObject = {
        key: index,
      };

      const teiIdIndex = instanceList.headers.findIndex(
        (h) => h.name === "instance"
      );
      rowObject.teiId = row[teiIdIndex];

      columns.forEach((column) => {
        const columnIndex = instanceList.headers.findIndex((h) => {
          return h.name === column.dataIndex;
        });
        rowObject[column.dataIndex] =
          columnIndex !== -1 ? row[columnIndex] : "";
      });
      rowObject["rZSVLUfgHlD"] = (rowObject["rZSVLUfgHlD"] !== "Completed") ? "Pending" : "Completed";
      return rowObject;
    });

    setLoadingPage(false);
    setLoadingTable(false);
    setTableData({
      ...tableData,
      columns,
      data,
      pager: instanceList.metaData.pager,
    });
  };

  const onChangePage = async (page, pageSize) => {
    setLoadingTable(true);
    const instanceList = await dataApi.getTrackedEntityInstanceListByQuery(
      selectedOrgUnit.id,
      programMetadata.id,
      pageSize,
      page,
      returnFilterString(filterTable),
      sortTable
    );
    setupUI(instanceList);
  };

  return (
    <div className="registered-tei-list-wrapper">
      <div className="registered-tei-list-container" ref={tableContainer}>
        {selectedOrgUnit ? (
          !loadingPage ? (
            <Table
              onRow={(record, rowIndex) => {
                return {
                  onClick: async (event) => {
                    setLoadingPage(true);
                    const result = await dataApi.getTrackedEntityInstanceById(
                      record.teiId,
                      programMetadata.id
                    );
                    setLoadingPage(false);
                    initData(result, programMetadata);
                    changeRoute("form");
                  },
                };
              }}
              sticky
              tableLayout={"fixed"}
              pagination={
                tableData.pager
                  ? {
                      position: ["bottomCenter"],
                      showSizeChanger: true,
                      defaultCurrent: tableData.pager.page,
                      total: tableData.pager.total,
                      onChange: onChangePage,
                    }
                  : null
              }
              columns={tableData.columns}
              dataSource={tableData.data}
              scroll={{ y: size.height - 200 }}
              loading={loadingTable}
              onChange={(pagination, filters, sorter, extra) => {
                onSort(sorter);
              }}
              bordered={true}
              locale={{
                triggerDesc: t("triggerDesc"),
                triggerAsc: t("triggerAsc"),
                cancelSort: t("cancelSort"),
              }}
            />
          ) : (
            <LoadingMask />
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    metadata: state.metadata,
    data: state.data,
  };
};

const mapDispatchToProps = {
  initData,
  changeRoute,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisteredTeiList);
