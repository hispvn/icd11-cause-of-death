import { useState, useEffect } from "react";
import { Hooks } from "tracker-capture-app-core";
import { Card, Button, Collapse, Table, message } from "antd";
import InputField from "../InputField";
import { connect } from "react-redux";
import { initNewEnrollment, initData } from "../../redux/actions/data";
import { changeRoute } from "../../redux/actions/route";
import SeartResult from "./Result";
import "./index.css";
import { useTranslation } from "react-i18next";
const { Panel } = Collapse;

const { useApi } = Hooks;

const SearchForm = ({ programMetadata, trackedEntityType, initData, initNewEnrollment, changeRoute, programs, selectedOrgUnit }) => {
  const { dataApi } = useApi();
  const { t } = useTranslation();

  const [option, setOption] = useState("program"); // ["program","person"]
  const [filters, setFilters] = useState([]);
  const [data, setData] = useState([]);
  const [pager, setPager] = useState({
      current: 1,
      pageSize: 10,
      total: 0,
  });
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   console.log(trackedEntityType)
  // }, [])

  const handleCloseResult = (option) => {
    setOpen(false);
    setData([]);
    setPager({
      current: 1,
      pageSize: 10,
      total: 0,
    });
    // if (option === 1) {
    //   setProgram(undefined);
    //   setFilters([]);
    //   onClose();
    // }
  };

  const handleChangeCurrentPage = async (page) => {
    const teis = option === "program" ? await dataApi.searchTei(
      programMetadata.id,
      filters,
      pager.pageSize,
      page
    )
    : await dataApi.searchTeiByTet(
      trackedEntityType.id,
      filters,
      pager.pageSize,
      page
    );
    setData({
      trackedEntityInstances: teis.trackedEntityInstances
    });
    setPager({
      ...pager,
      current: page,
      total: teis.pager.total
    });

    setOpen(true);
  }

  return (
    <div className="search-wrapper">
      {/* <SeartResult
        open={open}
        data={data}
        metadata={option === "program" ? programMetadata : trackedEntityType}
        pager={pager}
        handleCancel={handleCloseResult}
        handleChangePage={handleChangeCurrentPage}
      /> */}
      <div className="search-container">
        <div className="search-content-container">
          <div className="search-fulform-container">
            <div className="search-fulform">
              <Card>
                {/* <Divider orientation="left">Search for</Divider> */}
                <InputField 
                  label={"Search for"}
                  valueSet={[
                    {
                      value: "program",
                      label: `${trackedEntityType.displayName} in program`
                    },
                    {
                      value: "person",
                      label: trackedEntityType.displayName
                    }
                  ]}
                  change={ selected => {
                    setFilters([]);
                    setOption(selected);
                  }}
                  value={option}
                />
                {option === "program" && <div style={{ padding: "5px" }}>
                  <Collapse accordion onChange={() => { setFilters([]); }}>
                    { 
                      programMetadata.trackedEntityAttributes
                      .filter(({ unique }) => unique)
                      .map((tea) => 
                      <Panel header={`Search ${tea.displayFormName}`}>
                        <InputField 
                          label={tea.displayFormName}
                          valueType={tea.valueType}
                          style={{ width: "260px", textAlign: "left" }}
                          valueSet={tea.valueSet}
                          change={value => {
                            if (filters.find(({attribute}) => attribute === tea.id)) {
                              setFilters(
                                filters.map( f => ({
                                  attribute: f.attribute,
                                  value: f.attribute === tea.id ? value : f.value
                                }))
                              )
                            }
                            else {
                              setFilters([
                                ...filters,
                                ...[{
                                  attribute: tea.id,
                                  value: value
                                }]
                              ])
                            }
                          }}
                          value={filters.length === 0 ? "" : filters.find(({attribute}) => attribute === tea.id)?.value ?? ""}
                        />
                        <Button
                          style={{
                            margin: "5px"
                          }}
                          onClick={async () => {
                            const teis = await dataApi.searchTei(
                                programMetadata.id,
                                filters,
                                pager.pageSize,
                                pager.current
                            );
                            setData({
                                trackedEntityInstances: teis.trackedEntityInstances
                            });
                            setPager({
                                ...pager,
                                total: teis.pager.total
                            });
                            setOpen(true);
                          }}
                        >Search by {tea.displayFormName}</Button>
                      </Panel>)
                    }
                    <Panel header="Search by attributes">
                      {
                        programMetadata.trackedEntityAttributes
                        .filter(({ searchable, unique }) => searchable && !unique)
                        .map((tea) => <InputField 
                          label={tea.displayFormName}
                          valueType={tea.valueType}
                          style={{ width: "260px", textAlign: "left" }}
                          valueSet={tea.valueSet}
                          change={value => {
                            if (filters.find(({attribute}) => attribute === tea.id)) {
                              setFilters(
                                filters.map( f => ({
                                  attribute: f.attribute,
                                  value: f.attribute === tea.id ? value : f.value
                                }))
                              )
                            }
                            else {
                              setFilters([
                                ...filters,
                                ...[{
                                  attribute: tea.id,
                                  value: value
                                }]
                              ])
                            }
                          }}
                          value={filters.length === 0 ? "" : filters.find(({attribute}) => attribute === tea.id)?.value ?? ""}
                        />)
                      }
                      <Button
                        style={{
                          margin: "10px 5px 5px 5px"
                        }}
                        onClick={async () => {
                          const teis = await dataApi.searchTei(
                              programMetadata.id,
                              filters,
                              pager.pageSize,
                              pager.current
                          );
                          setData({
                              trackedEntityInstances: teis.trackedEntityInstances
                          });
                          setPager({
                              ...pager,
                              total: teis.pager.total
                          });
                          setOpen(true);
                        }}
                      >Search by attributes</Button>
                    </Panel>
                  </Collapse>
                </div>}
                {option === "person" && <div style={{ padding: "5px" }}>
                  <Collapse accordion onChange={() => { setFilters([]); }}>
                  { 
                    trackedEntityType.trackedEntityAttributes
                      .filter(({ unique }) => unique)
                      .map((tea) => 
                      <Panel header={`Search ${tea.displayFormName}`}>
                        <InputField 
                          label={tea.displayFormName}
                          valueType={tea.valueType}
                          style={{ width: "260px", textAlign: "left" }}
                          valueSet={tea.valueSet}
                          change={value => {
                            if (filters.find(({attribute}) => attribute === tea.id)) {
                              setFilters(
                                filters.map( f => ({
                                  attribute: f.attribute,
                                  value: f.attribute === tea.id ? value : f.value
                                }))
                              )
                            }
                            else {
                              setFilters([
                                ...filters,
                                ...[{
                                  attribute: tea.id,
                                  value: value
                                }]
                              ])
                            }
                          }}
                          value={filters.length === 0 ? "" : filters.find(({attribute}) => attribute === tea.id)?.value ?? ""}
                        />
                        <Button
                          style={{
                            margin: "5px"
                          }}
                          onClick={async () => {
                            const teis = await dataApi.searchTeiByTet(
                                trackedEntityType.id,
                                filters,
                                pager.pageSize,
                                pager.current
                            );
                            setData({
                                trackedEntityInstances: teis.trackedEntityInstances
                            });
                            setPager({
                                ...pager,
                                total: teis.pager.total
                            });
                            setOpen(true);
                          }}
                        >Search by {tea.displayFormName}</Button>
                      </Panel>)
                    }
                    <Panel header="Search by attributes">
                      {
                        trackedEntityType.trackedEntityAttributes
                        .filter(({ searchable, unique }) => searchable && !unique)
                        .map((tea) => <InputField 
                          label={tea.displayFormName}
                          valueType={tea.valueType}
                          style={{ width: "260px", textAlign: "left" }}
                          valueSet={tea.valueSet}
                          change={value => {
                            if (filters.find(({attribute}) => attribute === tea.id)) {
                              setFilters(
                                filters.map( f => ({
                                  attribute: f.attribute,
                                  value: f.attribute === tea.id ? value : f.value
                                }))
                              )
                            }
                            else {
                              setFilters([
                                ...filters,
                                ...[{
                                  attribute: tea.id,
                                  value: value
                                }]
                              ])
                            }
                          }}
                          value={filters.length === 0 ? "" : filters.find(({attribute}) => attribute === tea.id)?.value ?? ""}
                        />)
                      }
                      <Button
                        style={{
                          margin: "10px 5px 5px 5px"
                        }}
                        onClick={async () => {
                          const teis = await dataApi.searchTeiByTet(
                              trackedEntityType.id,
                              filters,
                              pager.pageSize,
                              pager.current
                          );
                          setData({
                              trackedEntityInstances: teis.trackedEntityInstances
                          });
                          setPager({
                              ...pager,
                              total: teis.pager.total
                          });
                          setOpen(true);
                        }}
                      >Search by attributes</Button>
                    </Panel>
                  </Collapse>
                </div>}
                {
                  open && <div style={{ padding: "10px 5px 5px 5px" }}><Table 
                    size={"small"}
                    pagination={{
                      ...pager,
                      showSizeChanger: false
                    }}
                    onChange={(newPagination, filters, sorter) => {
                      handleChangeCurrentPage(newPagination.current);
                    }}
                    columns={option === "program" ? [
                      ...[{
                        title: "Registering Unit",
                        dataIndex: "ou",
                        key: "ou"
                      }, {
                        title: "Registration Date",
                        dataIndex: "enrollDate",
                        key: "enrollDate"
                      }],
                      ...programMetadata.trackedEntityAttributes
                      .filter( ({displayInList}) => displayInList )
                      .map( (trackedEntityAttribute) => ({
                        title: trackedEntityAttribute.displayFormName,
                        dataIndex: trackedEntityAttribute.id,
                        key: trackedEntityAttribute.id
                      })),
                      ...[{
                        title: "",
                        dataIndex: "action",
                        key: "action"
                      }]
                    ] : [
                      ...[{
                        title: "Program",
                        dataIndex: "program",
                        key: "program"
                      }, {
                        title: "Registering Unit",
                        dataIndex: "ou",
                        key: "ou"
                      }, {
                        title: "Registration Date",
                        dataIndex: "enrollDate",
                        key: "enrollDate"
                      }],
                      ...trackedEntityType.trackedEntityAttributes
                      .filter( ({displayInList}) => displayInList )
                      .map( (trackedEntityAttribute) => ({
                        title: trackedEntityAttribute.displayFormName,
                        dataIndex: trackedEntityAttribute.id,
                        key: trackedEntityAttribute.id
                      })),
                      ...[{
                        title: "",
                        dataIndex: "action",
                        key: "action"
                      }]
                    ]}
                    dataSource={option === "program" ? 
                      data.trackedEntityInstances.map( ({attributes,trackedEntityInstance, enrollments}, index) => 
                        ({
                          ...programMetadata.trackedEntityAttributes
                          .filter( ({displayInList}) => displayInList )
                          .map( (trackedEntityAttribute) => ({
                              id: trackedEntityAttribute.id,
                              value: attributes.find( ({attribute}) => attribute === trackedEntityAttribute.id ) ? attributes.find( ({attribute}) => attribute === trackedEntityAttribute.id ).value : ""
                          }) )
                          .reduce( (pre, cur) => ({
                              ...pre,
                              [cur.id]: cur.value
                          }) , { 
                              key: index, 
                              teiId: trackedEntityInstance,
                              ou: enrollments.find( ({program}) => program === programMetadata.id )?.orgUnitName,
                              enrollDate: enrollments.find( ({program}) => program === programMetadata.id )?.enrollmentDate.substring(0,10)
                          }),
                          action: <Button
                            onClick={async() => {
                              const result = await dataApi.getTrackedEntityInstanceById(
                                trackedEntityInstance,
                                programMetadata.id
                              );

                              // Close search
                              handleCloseResult();
                              setFilters([]);
                              setOption("program");

                              initData(result, programMetadata);
                              // if (result.enrollments.find( ({program}) => program === programMetadata.id )) {
                              //   initData(result, programMetadata);
                              // }
                              // else {
                              //   initNewEnrollment(selectedOrgUnit, result, programMetadata);
                              // }
                              changeRoute("form");
                            }}
                          >View</Button>
                        })
                      ) : 
                      data.trackedEntityInstances.map( ({attributes,trackedEntityInstance, enrollments}, index) => 
                        ({
                          ...trackedEntityType.trackedEntityAttributes
                          .filter( ({displayInList}) => displayInList )
                          .map( (trackedEntityAttribute) => ({
                              id: trackedEntityAttribute.id,
                              value: attributes.find( ({attribute}) => attribute === trackedEntityAttribute.id ) ? attributes.find( ({attribute}) => attribute === trackedEntityAttribute.id ).value : ""
                          }) )
                          .reduce( (pre, cur) => ({
                              ...pre,
                              [cur.id]: cur.value
                          }) , { 
                              key: index, 
                              teiId: trackedEntityInstance,
                              program: enrollments.filter(({status}) => status !== "CANCELLED").map( ({program}) => programs.find(({id}) => id === program).name ).join(" | "),
                              ou: enrollments.filter(({status}) => status !== "CANCELLED").map( ({orgUnitName}) => orgUnitName ).join(" | "),
                              enrollDate: enrollments.filter(({status}) => status !== "CANCELLED").map( ({enrollmentDate}) => enrollmentDate.substring(0,10) ).join(" | ")
                          }),
                          action: enrollments.find(({program, status}) => program === programMetadata.id && status !== "CANCELLED") ? <Button
                            onClick={async() => {
                              const result = await dataApi.getTrackedEntityInstanceById(
                                trackedEntityInstance,
                                programMetadata.id
                              );

                              // Close search
                              handleCloseResult();
                              setFilters([]);
                              setOption("program");

                              initData(result, programMetadata);
                              changeRoute("form");
                            }}
                          >View</Button>
                          : <Button
                            onClick={async() => {
                              if (selectedOrgUnit) {
                                const result = await dataApi.getTrackedEntityInstanceById(
                                  trackedEntityInstance,
                                  programMetadata.id
                                );
  
                                // Close search
                                handleCloseResult();
                                setFilters([]);
                                setOption("program");
  
                                initNewEnrollment(selectedOrgUnit, result, programMetadata);
                                changeRoute("form");
                              }
                              else {
                                message.error("Please select an Otganisation Unit for enrollment.")
                              }
                            }}
                          >Enroll</Button>
                        })
                      )}
                  /></div>
                }
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    programMetadata: state.metadata.programMetadata,
    trackedEntityType: state.metadata.trackedEntityType,
    programs: state.metadata.programs,
    selectedOrgUnit: state.metadata.selectedOrgUnit
  };
};

const mapDispatchToProps = {
  initNewEnrollment,
  changeRoute,
  initData,
};

export default connect(mapStateToProps,mapDispatchToProps)(SearchForm);
