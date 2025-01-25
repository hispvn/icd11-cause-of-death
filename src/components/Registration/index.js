import { useEffect, useState } from "react";
import { Hooks } from "tracker-capture-app-core";
import { Modal, Button, Divider } from "antd";
import InputField from "../InputField";
import { SearchOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import TEIList from "./TEIList";
import { changeRoute } from "../../redux/actions/route";
import { initNewData } from "../../redux/actions/data";
import "./index.css";

const { useApi } = Hooks;

const Registration = ({
    openRegistration,
    onClose,
    programs,
    trackedEntityAttributes,
    optionSets,
    programMetadata,
    changeRoute,
    initNewData,
    selectedOrgUnit
}) => {

    const { dataApi } = useApi();

    const [program, setProgram] = useState(undefined);
    const [filters, setFilters] = useState([]);
    const [data, setData] = useState([]);
    const [pager, setPager] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [open, setOpen] = useState(false);

    const handleCloseResult = (option) => {
        setOpen(false);
        setData([]);
        setPager({
            current: 1,
            pageSize: 10,
            total: 0,
        });
        if (option === 1) {
            setProgram(undefined);
            setFilters([]);
            onClose();
        }
    };

    const handleChangeCurrentPage = async (page) => {
        const teis = await dataApi.searchTei(
            program,
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

    return <>
        {open && <TEIList 
            open={open}
            handleCancel={handleCloseResult}
            program={programs.find(({id}) => id === program)}
            data={data}
            pager={pager}
            handleChangePage={handleChangeCurrentPage}
        />}
        <Modal
            width={"52%"}
            bodyStyle={{
                height: "100%",
            }}
            centered
            open={openRegistration}
            closable={false}
            footer={[
                <Button
                    style={{
                        width: "20%",
                    }}
                    onClick={() => {
                        setProgram(undefined);
                        setFilters([]);
                        onClose();
                    }}
                >
                    Close
                </Button>,
                <Button 
                    type="primary"
                    style={{
                        width: "20%",
                    }}
                    onClick={() => {
                        changeRoute("form");
                        initNewData(selectedOrgUnit, programMetadata);
                        setProgram(undefined);
                        setFilters([]);
                        onClose();
                    }}
                >
                    New Registration
                </Button>,
                <Button 
                    type="primary"
                    icon={<SearchOutlined />}
                    style={{
                        width: "20%",
                    }}
                    disabled={!program || filters.length === 0}
                    onClick={async () => {
                        const teis = await dataApi.searchTei(
                            program,
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
                >
                    Search TEI
                </Button>
            ]}
            title={"Enrollment"}
        >
            <div className="registration-form-container">
                <div className="registration-form">
                    <InputField 
                        label={"Program"}
                        valueSet={
                            programs
                            .filter(({id}) => id !== programMetadata.id)
                            .map(({id,name}) => ({
                                label: name,
                                value: id
                            }))
                        }
                        change={ selected => {
                            setFilters([]);
                            setProgram(selected);
                        }}
                        mandatory={true}
                        placeholder={"Select program"}
                        value={program}
                    />
                    {program && <div className="registration-fields">
                        {
                            programs
                            .find(({id}) => id === program).programTrackedEntityAttributes
                            .filter(({searchable}) => searchable)
                            .map(({trackedEntityAttribute}) => {
                                const tea = trackedEntityAttributes.find(({id}) => id === trackedEntityAttribute.id);
                                return <InputField 
                                    label={tea.displayName}
                                    valueType={tea.valueType}
                                    style={{ width: "100%", minWidth: "260px", textAlign: "left" }}
                                    valueSet={tea.optionSet ? optionSets.find(({id}) => id === tea.optionSet.id).options.map(({displayName, code}) => ({
                                        label: displayName,
                                        value: code
                                    })) : null}
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
                                />;
                            })
                        }
                    </div>}
                </div>
            </div>
        </Modal>
    </>
}

const mapStateToProps = (state) => {
    return {
        programs: state.metadata.programs,
        trackedEntityAttributes: state.metadata.trackedEntityAttributes,
        optionSets: state.metadata.optionSets,
        programMetadata: state.metadata.programMetadata,
        selectedOrgUnit: state.metadata.selectedOrgUnit
    };
};

const mapDispatchToProps = {
    changeRoute,
    initNewData
};

export default connect(mapStateToProps,mapDispatchToProps)(Registration);