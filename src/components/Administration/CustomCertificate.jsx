import { useState, useLayoutEffect } from "react";
import { 
    Button,
    Row, Col,
    Input,
    List,
    Divider,
    Modal
} from "antd";
// import fileSaver from "file-saver";
import { Hooks } from "tracker-capture-app-core";
import { convertPdfDoc2FileURL, fillPdf, showPage } from "../../utils/certificate";
// import { Image, PictureAsPdf, Print } from "@material-ui/icons";

const { useApi } = Hooks;

const CustomCertificate = props => { 
    const { metadataApi } = useApi();
    // const [pdfURL, setPdfURL] = useState(null);

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

    const generateData = async pdfFileTemplate => {
        const pdfDoc = await fillPdf(pdfFileTemplate);
        // const fileURL = await convertPdfDoc2FileURL(pdfDoc);
        // setPdfURL(fileURL);
        await showPage(pdfDoc, 1);
    };

    useLayoutEffect(() => {
        (async () => {
            const pdfFileTemplate = await metadataApi.getResource("o1c2Z6zbVrS");
            generateData(pdfFileTemplate);
        })();
    }, []);

    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <div className="administration-certificate-box">
                        <Divider plain orientation="right"><Button onClick={() => setOpenModal("Add")}>Add</Button></Divider>
                        <List 
                            size="small"
                            split={false}
                            dataSource={mapping}
                            renderItem={ item => 
                                <List.Item
                                    actions={[
                                        <Button type="text" onClick={() => setOpenModal(item.label)}>Edit</Button>,
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
                        {/* <iframe 
                            hidden
                            id="certificate"
                            title="Certificate"
                            src={pdfURL + "#toolbar=0&navpanes=0&scrollbar=0"}
                            frameBorder="0" 
                            height={1132}
                            width={"100%"}
                            scrolling="auto"
                            type="application/pdf"
                        /> */}
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
                    {/* <Grid container spacing={1} alignItems="flex-end" justify="flex-end">
                        <Box p={1}>
                            <Button
                                size="small"
                                color="primary"
                                variant="contained"
                                onClick={() => {
                                    fileSaver.saveAs(pdfURL, "certificate.pdf");
                                }}
                                // startIcon={<PictureAsPdf />}
                            >
                                Download as PDF
                            </Button>
                        </Box>
                        <Box p={1}>
                        <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={() => {
                                const link = document.createElement("a");
                                link.download = "certificate.png";
                                link.href = document.getElementById("pdf-canvas").toDataURL();
                                link.click();
                            }}
                            // startIcon={<Image />}
                        >
                            Download as PNG
                        </Button>
                        </Box>
                        <Box p={1}>
                        <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={() => {
                                document.getElementById("certificate").contentWindow.print();
                            }}
                            // startIcon={<Print />}
                        >
                            Print
                        </Button>
                        </Box>
                    </Grid> */}
                </Col>
            </Row>
            <Modal
                visible={ openModal !== null }
                centered
                onCancel={ () => setOpenModal(null) }
                title={ openModal === "Add" ? "Add" : `Edit ${openModal}` }
            >
                <div className="administration-customcertificate-modal">
                    <div>Label</div>
                    <div>
                        <Input disabled={openModal !== null && openModal !== "Add"} value={openModal !== "Add" ? openModal : ""} />
                    </div>
                </div>
                <div className="administration-customcertificate-modal">
                    <div>Value</div>
                    <div>
                        <Input value={openModal !== null && openModal !== "Add" ? mapping.find( ({label}) => label === openModal ).value : ""} />
                    </div>
                </div>
                <div className="administration-customcertificate-modal">
                    <div>Coordinate</div>
                    <div>
                        <Input value={openModal !== null && openModal !== "Add" ? mapping.find( ({label}) => label === openModal ).coordinate : ""} />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default CustomCertificate;