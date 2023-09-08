import { useState, useEffect } from "react";
import { Hooks } from "tracker-capture-app-core";
import { 
    Card,
    Form,
    Input,
    DatePicker,
    Button,
    Divider
} from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import SeartResult from "./Result";
import "./index.css";

const { useApi } = Hooks;

const SearchForm = ({ metadata }) => {
    const { dataApi } = useApi();
    const { programMetadata } = metadata;

    const [ searches, setSearches ] = useState(
        programMetadata.trackedEntityAttributes
        .filter( ({searchable}) => searchable )
        .map( ({id}) => ({
            id,
            value: ""
        }) )
        .reduce( (pre, cur) => ({
            ...pre,
            [cur.id]: ""
        }) , {})
    );
    const [filters, setFilters] = useState([]);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({
        pager: {
            current: 1,
            pageSize: 10,
            total: 0
        },
        trackedEntityInstances: []
    });

    useEffect( async () => {
        const teis = await dataApi.searchTei(
            programMetadata.id, 
            filters,
            data.pager.pageSize,
            data.pager.current
        )
        setData({
            trackedEntityInstances: teis.trackedEntityInstances,
            pager: {
                current: teis.pager.page,
                pageSize: teis.pager.pageSize,
                total: teis.pager.total
            }
        });

        if ( filters.length > 0 ) setOpen(true); 

    }, [filters]);

    const onSearch = uniqueKeyId => {
        if ( uniqueKeyId ) {
            setFilters([{
                attribute: uniqueKeyId,
                value: searches[uniqueKeyId]
            }]);
        }
        else {
            setFilters(
                programMetadata.trackedEntityAttributes
                .filter( ({id, searchable, unique}) => searchable && !unique && searches[id] !== "" )
                .map( ({id}) => ({
                    attribute: id,
                    value: searches[id]
                }) )
            )
        }
    }

    const handleCloseResult = () => {
        setOpen(false);
    }

    const handleChangeCurrentPage = async page => {
        const teis = await dataApi.searchTei(
            programMetadata.id, 
            filters,
            data.pager.pageSize,
            page
        );

        setData({
            trackedEntityInstances: teis.trackedEntityInstances,
            pager: {
                current: teis.pager.page,
                pageSize: teis.pager.pageSize,
                total: teis.pager.total
            }
        });
    }

    return (
        <div className="search-wrapper">
            <SeartResult open={open} handleCancel={handleCloseResult} data={data} handleChangePage={handleChangeCurrentPage} />
            <div className="search-container">
                <div className="search-content-container">
                    <div className="search-form-container">
                        <div className="search-form">
                            <Card>
                                <Divider orientation="left">Unique Field</Divider>
                                <Form
                                    name="basic"
                                    labelCol={{
                                        span: 4,
                                    }}
                                    wrapperCol={{
                                        span: 20,
                                    }}
                                    initialValues={{
                                        remember: true,
                                    }}
                                >
                                {
                                    programMetadata.trackedEntityAttributes.filter( ({unique}) => unique ).map( tea => 
                                        <>
                                            <Form.Item
                                                label={`${tea.displayFormName}:`}
                                                name={tea.displayName}
                                            >
                                                <Input 
                                                    onChange={ e => {
                                                        setSearches({
                                                            ...searches,
                                                            [tea.id]: e.target.value
                                                        });
                                                    }}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                wrapperCol={{
                                                    offset: 4,
                                                    span: 20
                                                }}
                                            >
                                                <Button 
                                                    type="primary" 
                                                    htmlType="submit" 
                                                    icon={<SearchOutlined />}
                                                    onClick={ () => onSearch(tea.id) }
                                                >
                                                    Search
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )
                                }
                                </Form>
                            </Card>
                        </div>
                        <div className="search-form">
                            <Card>
                                <Divider orientation="left">Searchable fields</Divider>
                                <Form
                                    name="basic"
                                    labelCol={{
                                        span: 4,
                                    }}
                                    wrapperCol={{
                                        span: 20,
                                    }}
                                    initialValues={{
                                        remember: true,
                                    }}
                                >
                                {
                                    programMetadata.trackedEntityAttributes.filter( ({searchable, unique}) => searchable && !unique ).map( tea => {
                                        const value = searches[tea.id];
                                        return (<Form.Item
                                            label={`${tea.displayFormName}:`}
                                            name={tea.displayName}
                                        >
                                        {
                                            tea.valueType === "DATE" ? 
                                            <DatePicker 
                                                onChange={ (date, dateString) => {
                                                    setSearches({
                                                        ...searches,
                                                        [tea.id]: dateString
                                                    });
                                                }}
                                            />
                                            :
                                            <Input 
                                                onChange={ e => {
                                                    setSearches({
                                                        ...searches,
                                                        [tea.id]: e.target.value
                                                    });
                                                }}
                                            />
                                        }
                                            
                                        </Form.Item>)
                                    })
                                }
                                    <Form.Item
                                        wrapperCol={{
                                            offset: 4,
                                            span: 20
                                        }}
                                    >
                                        <Button 
                                            type="primary" 
                                            htmlType="submit" 
                                            icon={<SearchOutlined />}
                                            onClick={ () => onSearch() }
                                        >
                                            Search
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        metadata: state.metadata
    };
};

export default connect(mapStateToProps)(SearchForm);