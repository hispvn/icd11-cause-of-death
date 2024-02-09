import { useState, useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { 
    Button,
    Row, Col,
    Input,
    Select,
    List,
    Divider,
    Modal
} from "antd";
import { Backdrop, CircularProgress } from '@mui/material';
// import fileSaver from "file-saver";
import { changeCustomCertificate } from "../../redux/actions/admin";
import { Hooks } from "tracker-capture-app-core";
import { convertPdfDoc2FileURL, fillPdf, showPage } from "../../utils/certificate";
// import { Image, PictureAsPdf, Print } from "@material-ui/icons";

const { useApi } = Hooks;

const { Option } = Select;

const CustomCertificate = props => { 
    const { metadataApi } = useApi();
    const [pdfURL, setPdfURL] = useState(null);

    const [ templates, setTemplates ] = useState([]);

    const [ pages, setPages ] = useState(1);

    const [ template, setTemplate ] = useState(null);
    const [ openModal, setOpenModal ] = useState(null);
    const [ currentLabel, setCurrentlabel ] = useState({
        label: "",
        page: 1,
        size: 11,
        valueType: "text",
        value: "",
        coordinates: [100,100],
    });

    const [ loading, setLoading ] = useState(false);

    const generateData = async pdfFileTemplate => {
        const pdfDoc = await fillPdf(pdfFileTemplate,props.certificateTemplateAdmin.labels);
        const fileURL = await convertPdfDoc2FileURL(pdfDoc);
        setPdfURL(fileURL);
        setPages(pdfDoc.getPages().length);
        // await showPage(pdfDoc, 1);
    };

    const previewTemplate = async () => {
        if ( props.certificateTemplateAdmin ) {
            setLoading(true);
            const pdfFileTemplate = await metadataApi.pullNotForJson(`/api/documents/${props.certificateTemplateAdmin.template}/data.pdf`);
            await generateData(pdfFileTemplate);
            setLoading(false);
        }
    }

    useLayoutEffect(() => {
        setLoading(true);
        props.changeCustomCertificate(props.certificateTemplateMetadata);
        if ( props.certificateTemplateMetadata ) {
            Promise.all([
                metadataApi.get("/api/documents.json"),
                metadataApi.pullNotForJson(`/api/documents/${props.certificateTemplateMetadata.template}/data.pdf`)
            ])
            .then( async (res) => {
                setTemplates(res[0].documents);                
                setTemplate(props.certificateTemplateMetadata.template);

                const pdfDoc = await fillPdf(res[1],props.certificateTemplateMetadata.labels);
                const fileURL = await convertPdfDoc2FileURL(pdfDoc);
                setPdfURL(fileURL);
                setPages(pdfDoc.getPages().length);
                // await showPage(pdfDoc, 1);

                setLoading(false);
            });
        }
        else {
            Promise.all([
                metadataApi.get("/api/documents.json"),
            ])
            .then( res => {
                setTemplates(res[0].documents);
                setLoading(false);
            });
        }
    }, []);

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <div className="administration-certificate-box">
                        <Divider plain orientation="right">
                            <Button
                                type="primary"
                                onClick={ async () => {
                                    previewTemplate();
                                }}
                                style={{
                                    width: "150px"
                                }}
                            >
                                Preview
                            </Button>
                        </Divider>
                        <div className="administration-certificate-title-setup">
                            <div>Template UID</div>
                            <div>
                                <Select
                                    style={{
                                        width: "100%"
                                    }}
                                    value={template ? template : ""}
                                    onChange={ val => {
                                        setTemplate(val);
                                    }}
                                >
                                {
                                    templates.map( template => <Option value={template.id}>{template.displayName}</Option>)
                                }
                                </Select>
                            </div>
                        </div>
                        <div className="administration-certificate-title-setup">
                            <div><i>Note: Changing a new template will reset/clear all labels</i></div>
                            <div>
                                <Button
                                    onClick={() => {
                                        props.changeCustomCertificate({
                                            template: template,
                                            labels: []
                                        });
                                    }}
                                >
                                    Change Template
                                </Button>
                            </div>
                        </div>
                        <Divider plain orientation="right">
                            <Button 
                                onClick={() => {
                                    setOpenModal("Add");
                                    setCurrentlabel({
                                        label: "",
                                        page: 1,
                                        size: 11,
                                        valueType: "text",
                                        value: "",
                                        coordinates: [100,100],
                                    });
                                }}
                                style={{
                                    width: "150px"
                                }}
                            >
                                Add
                            </Button>
                        </Divider>
                        { props.certificateTemplateAdmin !== null && <List 
                            size="small"
                            split={false}
                            dataSource={props.certificateTemplateAdmin ? props.certificateTemplateAdmin.labels : []}
                            renderItem={ item => 
                                <List.Item
                                    actions={[
                                        <Button 
                                            type="text" 
                                            onClick={() => {
                                                setOpenModal("Edit");
                                                setCurrentlabel(item);
                                            }}
                                        >
                                            Edit
                                        </Button>,
                                        <Button 
                                            type="text" 
                                            onClick={ () => { 
                                                props.changeCustomCertificate({
                                                    ...props.certificateTemplateAdmin,
                                                    labels: props.certificateTemplateAdmin.labels.filter( ({label}) => label !== item.label )
                                                });
                                            }}
                                        >
                                            Remove
                                        </Button>
                                    ]}
                                >
                                    <List.Item.Meta
                                        title={item.label}
                                        description={item.value}
                                    />
                                </List.Item>
                            }
                        /> }
                        <Divider plain orientation="right">
                            <Button 
                                type="primary" danger
                                style={{
                                    width: "150px"
                                }}
                                onClick={() => {
                                    props.changeCustomCertificate(null);
                                }}
                            >
                                Delete
                            </Button>
                        </Divider>
                    </div>
                </Col>
                <Col span={12}>
                    <div className="administration-certificate-box">
                        <iframe 
                            // hidden
                            id="certificate"
                            title="Certificate"
                            src={pdfURL + "#toolbar=0&navpanes=0&scrollbar=0"}
                            frameBorder="0" 
                            height={1132}
                            width={"100%"}
                            scrolling="auto"
                            type="application/pdf"
                        />
                        {/* <Row>
                            <Col>
                                <canvas
                                    style={{ maxWidth: "100%" }}
                                    id="pdf-canvas"
                                    width="800"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <canvas
                                    style={{ maxWidth: "100%" }}
                                    id="pdf-canvas-2"
                                    width="800"
                                />
                            </Col>
                        </Row> */}
                    </div>
                </Col>
            </Row>
            <Modal
                visible={ openModal !== null }
                centered
                onCancel={ () => {
                    setCurrentlabel({
                        label: "",
                        page: 1,
                        size: 11,
                        valueType: "text",
                        value: "",
                        coordinates: [100,100],
                    });
                    setOpenModal(null);
                }}
                onOk={ () => {
                    console.log(currentLabel);


                    // Do something
                    if (openModal === "Add") {
                        props.changeCustomCertificate({
                            ...props.certificateTemplateAdmin,
                            labels: [
                                ...props.certificateTemplateAdmin.labels,
                                ...[currentLabel]
                            ]
                        });
                    }
                    else if (openModal === "Edit") {
                        props.changeCustomCertificate({
                            ...props.certificateTemplateAdmin,
                            labels: props.certificateTemplateAdmin.labels.map( l => l.label === currentLabel.label ? currentLabel : l)
                        });
                    }

                    // Reset currentLabel
                    setCurrentlabel({
                        label: "",
                        page: 1,
                        size: 11,
                        valueType: "text",
                        value: "",
                        coordinates: [100,100],
                    });
                    setOpenModal(null);
                }}
                title={ openModal === "Edit" ? `Edit ${currentLabel.label}` : "Add" }
            >
                <div className="administration-customcertificate-modal">
                    <div>Label</div>
                    <div>
                        <Input 
                            disabled={openModal === "Edit"} 
                            value={currentLabel.label} 
                            onChange={ val => {
                                setCurrentlabel({
                                    ...currentLabel,
                                    label: val.target.value
                                })
                            }}
                        />
                    </div>
                </div>
                <div className="administration-customcertificate-modal">
                    <div>Page</div>
                    <div>
                        <Select
                            style={{
                                width: "100%"
                            }}
                            value={currentLabel.page}
                            onChange={ val => {
                                setCurrentlabel({
                                    ...currentLabel,
                                    page: val
                                })
                            }}
                        >
                            <Option value={1}>Page 1</Option>
                            { pages > 1 && <Option value={2}>Page 2</Option> }
                        </Select>
                    </div>
                </div>
                <div className="administration-customcertificate-modal">
                    <div>Value Type</div>
                    <div>
                        <Select
                            style={{
                                width: "100%"
                            }}
                            value={currentLabel.valueType}
                            onChange={ val => {
                                setCurrentlabel({
                                    ...currentLabel,
                                    valueType: val
                                })
                            }}
                        >
                            <Option value={"text"}>Text Field</Option>
                            <Option value={"check"}>Check Mark</Option>
                        </Select>
                    </div>
                </div>
                <div className="administration-customcertificate-modal">
                    <div>Value</div>
                    <div>
                        <Input 
                            value={currentLabel.value} 
                            onChange={ val => {
                                setCurrentlabel({
                                    ...currentLabel,
                                    value: val.target.value
                                })
                            }}
                        />
                    </div>
                </div>
                <div className="administration-customcertificate-modal">
                    <div>Size</div>
                    <div>
                    <Input 
                        value={currentLabel.size} 
                        onChange={ val => {
                            setCurrentlabel({
                                ...currentLabel,
                                size: parseInt(val.target.value)
                            })
                        }}
                    />
                    </div>
                </div>
                <div className="administration-customcertificate-modal">
                    <div>Coordinate</div>
                    <div className="administration-customcertificate-modal-2half">
                        <Input 
                            value={currentLabel.coordinates[0]} 
                            onChange={ val => {
                                setCurrentlabel({
                                    ...currentLabel,
                                    coordinates: [parseInt(val.target.value), currentLabel.coordinates[1]]
                                })
                            }}
                        />
                        <Input 
                            value={currentLabel.coordinates[1]} 
                            onChange={ val => {
                                setCurrentlabel({
                                    ...currentLabel,
                                    coordinates: [currentLabel.coordinates[0], parseInt(val.target.value)]
                                })
                            }}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        certificateTemplateMetadata: state.metadata.customCertificate,
        certificateTemplateAdmin: state.admin.customCertificate,
        // programMetadata: state.metadata.programMetadata
    }
}

const mapDispatchToProps = {
    changeCustomCertificate
};

export default connect(mapStateToProps,mapDispatchToProps)(CustomCertificate);