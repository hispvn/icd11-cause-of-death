
import { Hooks } from "tracker-capture-app-core";
import {
    Modal,
    Table,
    Button
} from "antd";
import { connect } from "react-redux";
import { initData } from "../../redux/actions/data";
import { changeRoute } from "../../redux/actions/route";

const { useApi } = Hooks;

const SearchResult = ({ open, handleCancel, data, handleChangePage, metadata, initData, changeRoute }) => {
    
    const { programMetadata } = metadata;
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
                <Button key="back" onClick={handleCancel}>
                    Close
                </Button>
            ]}
            onCancel={handleCancel}
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
                        ...programMetadata.trackedEntityAttributes
                            .filter( ({displayInList}) => displayInList )
                            .map( tea => ({
                                title: tea.displayFormName,
                                dataIndex: tea.id,
                                key: tea.id
                            }))
                    ]}
                    dataSource={
                        data.trackedEntityInstances.map( ({attributes,trackedEntityInstance, enrollments}, index) => 
                            programMetadata.trackedEntityAttributes
                            .filter( ({displayInList}) => displayInList )
                            .map( ({id}) => ({
                                id,
                                value: attributes.find( ({attribute}) => attribute === id ) ? attributes.find( ({attribute}) => attribute === id ).value : ""
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
                        ...data.pager,
                        // position: ["topRight"]
                    }}
                    onChange={handleTableChange}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: async (event) => {
                                const result = await dataApi.getTrackedEntityInstanceById(
                                    record.teiId,
                                    programMetadata.id
                                );
                                initData(result, programMetadata);
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
        metadata: state.metadata
    }
}

const mapDispatchToProps = {
    initData,
    changeRoute
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);