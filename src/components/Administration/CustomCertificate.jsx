import { useState, useLayoutEffect } from "react";
import { 
    Button,
    Row, Col,
    Input,
    Select,
    List,
    Divider,
    Modal
} from "antd";
// import fileSaver from "file-saver";
import { Hooks } from "tracker-capture-app-core";
import { convertPdfDoc2FileURL, fillPdf, showPage } from "../../utils/certificate";
// import { Image, PictureAsPdf, Print } from "@material-ui/icons";

const { useApi } = Hooks;

const { Option } = Select;

const CustomCertificate = props => { 
    const { metadataApi } = useApi();
    const [pdfURL, setPdfURL] = useState(null);

    const [ openModal, setOpenModal ] = useState(null);
    const [ mapping, setMapping ] = useState([
        {
            label: "full_name",
            value: "#{tea.uid1} #{tea.uid2}",
            coordinate: "132, 132"
        },
        {
            label: "nationality",
            value: "#{de.uid1} #{de.uid2}",
            coordinate: "102, 122"
        }
    ]);
    const [ labels, setLabels] = useState([
        {
            label: "full_name",
            page: 1,
            valueType: "text",
            value: "#{tea.uid1} #{tea.uid2}",
            coordinates: [67, 123],
            size: 11
        },
        {
            label: "nationality",
            page: 1,
            valueType: "text",
            value: "#{de.uid1} #{de.uid2}",
            coordinates: [390, 104],
            size: 11
        },
        {
            label: "female",
            page: 1,
            valueType: "check",
            value: "#{de.uid1}:option_code",
            coordinates: [61, 170],
            size: 9
        }
    ]);

    const generateData = async pdfFileTemplate => {
        const pdfDoc = await fillPdf(pdfFileTemplate,labels);
        const fileURL = await convertPdfDoc2FileURL(pdfDoc);
        setPdfURL(fileURL);
        await showPage(pdfDoc, 1);
    };

    useLayoutEffect(() => {
        (async () => {
            const pdfFileTemplate = await metadataApi.pullNotForJson("/api/documents/o1c2Z6zbVrS/data.pdf");
            generateData(pdfFileTemplate);
        })();
    }, []);

    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <div className="administration-certificate-box">
                        <Divider plain orientation="right"><Button onClick={() => setOpenModal({label: "Add"})}>Add</Button></Divider>
                        <List 
                            size="small"
                            split={false}
                            dataSource={labels}
                            renderItem={ item => 
                                <List.Item
                                    actions={[
                                        <Button type="text" onClick={() => setOpenModal(item)}>Edit</Button>,
                                        <Button type="text">Remove</Button>
                                    ]}
                                >
                                    <List.Item.Meta
                                        title={item.label}
                                        description={item.value}
                                    />
                                </List.Item>
                            }
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div className="administration-certificate-box">
                        <iframe 
                            hidden
                            id="certificate"
                            title="Certificate"
                            src={pdfURL + "#toolbar=0&navpanes=0&scrollbar=0"}
                            frameBorder="0" 
                            height={1132}
                            width={"100%"}
                            scrolling="auto"
                            type="application/pdf"
                        />
                        <Row>
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
                        </Row>
                    </div>
                </Col>
            </Row>
            <Modal
                visible={ openModal !== null }
                centered
                onCancel={ () => setOpenModal(null) }
                title={ openModal !== null && openModal.label !== "Add" ? `Edit ${openModal.label}` : "Add" }
            >
                <div className="administration-customcertificate-modal">
                    <div>Label</div>
                    <div>
                        <Input disabled={openModal !== null && openModal.label !== "Add"} value={openModal !== null && openModal.label !== "Add" ? openModal.label : ""} />
                    </div>
                </div>
                <div className="administration-customcertificate-modal">
                    <div>Page</div>
                    <div>
                        <Select
                            style={{
                                width: "100%"
                            }}
                            value={openModal !== null && openModal.label !== "Add" ? openModal.page : 1}
                        >
                            <Option value={1}>Page 1</Option>
                            <Option value={2}>Page 2</Option>
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
                            value={openModal !== null && openModal.label !== "Add" ? openModal.valueType : "text"}
                        >
                            <Option value={"text"}>Text Field</Option>
                            <Option value={"check"}>Check Mark</Option>
                        </Select>
                    </div>
                </div>
                <div className="administration-customcertificate-modal">
                    <div>Value</div>
                    <div>
                        <Input value={openModal !== null && openModal.label !== "Add" ? openModal.value : ""} />
                    </div>
                </div>
                <div className="administration-customcertificate-modal">
                    <div>Size</div>
                    <div>
                    <Input value={openModal !== null && openModal.label !== "Add" ? openModal.size : ""} />
                    </div>
                </div>
                <div className="administration-customcertificate-modal">
                    <div>Coordinate</div>
                    <div className="administration-customcertificate-modal-2half">
                        <Input value={openModal !== null && openModal.label !== "Add" ? openModal.coordinates[0] : ""} />
                        <Input value={openModal !== null && openModal.label !== "Add" ? openModal.coordinates[1] : ""} />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default CustomCertificate;