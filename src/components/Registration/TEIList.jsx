import {
    Modal,
    Table,
    Button
} from "antd";
import { connect } from "react-redux";
import { initNewEnrollment, initData } from "../../redux/actions/data";
import { changeRoute } from "../../redux/actions/route";
import { Hooks } from "tracker-capture-app-core";

const { useApi } = Hooks;

const TEIList = ({
    open, 
    handleCancel, 
    program, 
    data, pager, 
    handleChangePage, 
    trackedEntityAttributes,
    initNewEnrollment,
    initData,
    changeRoute,
    selectedOrgUnit,
    programMetadata
}) => {
    const { dataApi } = useApi();

    const handleTableChange = (newPagination, filters, sorter) => {
        handleChangePage(newPagination.current)
    };

    return (
        <Modal
            width={"80%"}
            bodyStyle={{
                height: "100%",
            }}
            centered
            visible={open}
            closable={false}
            footer={[
                <Button key="back" onClick={() => {handleCancel(0)}}>
                    Close
                </Button>
            ]}
            onCancel={() => {handleCancel(0)}}
        >
            <div 
                style={{
                    height: "70vh"
                }} 
            >
                <Table 
                    size={"small"}
                    columns={[
                        ...[{
                            title: "Registering Unit",
                            dataIndex: "ou",
                            key: "ou"
                        }, {
                            title: "Registration Date",
                            dataIndex: "enrollDate",
                            key: "enrollDate"
                        }],
                        ...program.programTrackedEntityAttributes
                            .filter( ({displayInList}) => displayInList )
                            .map( ({trackedEntityAttribute}) => ({
                                title: trackedEntityAttributes.find(({id}) => id === trackedEntityAttribute.id).displayName,
                                dataIndex: trackedEntityAttribute.id,
                                key: trackedEntityAttribute.id
                            }))
                    ]}
                    dataSource={
                        data.trackedEntityInstances.map( ({attributes,trackedEntityInstance, enrollments}, index) => 
                            program.programTrackedEntityAttributes
                            .filter( ({displayInList}) => displayInList )
                            .map( ({trackedEntityAttribute}) => ({
                                id: trackedEntityAttribute.id,
                                value: attributes.find( ({attribute}) => attribute === trackedEntityAttribute.id ) ? attributes.find( ({attribute}) => attribute === trackedEntityAttribute.id ).value : ""
                            }) )
                            .reduce( (pre, cur) => ({
                                ...pre,
                                [cur.id]: cur.value
                            }) , { 
                                key: index, 
                                teiId: trackedEntityInstance,
                                ou: enrollments[0].orgUnitName,
                                enrollDate: enrollments[0].enrollmentDate.substring(0,10)
                            })
                        )
                    }
                    pagination={{
                        ...pager,
                        showSizeChanger: false
                    }}
                    onChange={handleTableChange}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: async (event) => {
                                const result = await dataApi.getTrackedEntityInstanceById(
                                    record.teiId,
                                    programMetadata.id
                                );
                                handleCancel(1);
                                if (result.enrollments.find( ({program}) => program === programMetadata.id )) {
                                    initData(result, programMetadata);
                                }
                                else {
                                    initNewEnrollment(selectedOrgUnit, result, programMetadata);
                                }
                                changeRoute("form");
                            },
                        };
                    }}
                />
            </div>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        trackedEntityAttributes: state.metadata.trackedEntityAttributes,
        selectedOrgUnit: state.metadata.selectedOrgUnit,
        programMetadata: state.metadata.programMetadata,
    }
}

const mapDispatchToProps = {
    initNewEnrollment,
    changeRoute,
    initData,
};

export default connect(mapStateToProps,mapDispatchToProps)(TEIList);