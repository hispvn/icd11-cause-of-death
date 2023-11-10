import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Stepper, Step, StepButton, StepContent } from "@mui/material";
import { 
    Row, Col, Divider, 
    Typography, 
    Input, Upload, Button,
    List,
    Modal, message
} from "antd";
import CustomCertificate from "./CustomCertificate";
import { UploadOutlined, CaretUpFilled, CaretDownFilled, CloseCircleFilled } from '@ant-design/icons';
import { changeCerticateTemplate, setCertificateLogo } from "../../redux/actions/admin";
import { useTranslation } from "react-i18next";

const Certificate = props => {
    const { t } = useTranslation();
    const [type,setType] = useState(0);

    const [open, setOpen] = useState(null); // Body, Footer, null
    const [search, setSearch] = useState("");
    const [label, setLabel] = useState("");
    const [selected, setSelected] = useState({});

    const { Search } = Input;

    useEffect(() => {
        props.changeCerticateTemplate(props.certificateTemplateMetadata);
    },[])

    const handleMoveUp = (part, index) => {
        // part: info | footer
        let arr = props.certificateTemplateAdmin[part];
        const temp = arr[index];
        arr[index] = arr[index-1];
        arr[index-1]=temp;
        props.changeCerticateTemplate({
            ...props.certificateTemplateAdmin,
            [part]: arr
        });
    }

    const handleMoveDown = (part, index) => {
        // part: info | footer
        let arr = props.certificateTemplateAdmin[part];
        const temp = arr[index];
        arr[index] = arr[index+1];
        arr[index+1]=temp;
        props.changeCerticateTemplate({
            ...props.certificateTemplateAdmin,
            [part]: arr
        });
    }

    const handleRemoveItem = (part, index) => {
        let arr = props.certificateTemplateAdmin[part];
        arr.splice(index,1);
        props.changeCerticateTemplate({
            ...props.certificateTemplateAdmin,
            [part]: arr
        });
    }

    const handleUpdateTitle = value => {
        props.changeCerticateTemplate({
            ...props.certificateTemplateAdmin,
            title: value
        })
    }

    const handleAddItem = () => {
        if ( label === "" || selected === {} ) {
            message.error('ERROR Please enter the label and selected an item.');
        } else {
            const key = open === "Body" ? "info" : "footer";
            props.changeCerticateTemplate({
                ...props.certificateTemplateAdmin,
                [key]: [...props.certificateTemplateAdmin[key],...[{
                    ...selected,
                    label: label
                }]]
            });
            handleCloseModal();
        }
    }

    const handleCloseModal = () => {
        setOpen(null);
        setSelected({});
        setLabel("");
        setSearch("");
    }

    const handleUploadLogo = img => {
        const reader = new FileReader();
        reader.onload = e => {
            props.setCertificateLogo({ image: e.target.result });
        };

        reader.readAsDataURL(img);
    }

    const getDisplayName = data => {
        if (data) return data.displayName;
        else return "undefined";
    }

    return (
        <div className="administration-certificate-container">
            {(props.certificateTemplateAdmin) && <Stepper nonLinear activeStep={type} orientation="vertical">
                <Step>
                    <StepButton onClick={() => setType(0)}>{t("defaultCertificate")}</StepButton>
                    <StepContent>
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <div className="administration-certificate-box">
                                    <div className="administration-certificate-title-setup">
                                        <div>{t("certificateTitle")}</div>
                                        <div><Input placeholder="Certificate Name" value={props.certificateTemplateAdmin.title} onChange={e => handleUpdateTitle(e.target.value)}/></div>
                                    </div>
                                    <div className="administration-certificate-title-setup">
                                        <div>{t("certificateLogo")}</div>
                                        <div>
                                            <Upload
                                                name="uploadLogo"
                                                showUploadList={false}
                                                beforeUpload={handleUploadLogo}
                                            >
                                                <Button icon={<UploadOutlined />}>{t("upload")}</Button>
                                            </Upload>
                                        </div>
                                    </div>
                                    <Divider plain orientation="right"><Button onClick={() => setOpen("Body")}>{t("addItemBody")}</Button></Divider>
                                    <div className="administration-certificate-setup">
                                        <List 
                                            size="small"
                                            split={false}
                                            dataSource={props.certificateTemplateAdmin.info}
                                            renderItem={(item,index) => (
                                                <List.Item
                                                    actions={[
                                                        <Button type="text" icon={<CaretUpFilled />} disabled={( index === 0 )} onClick={() => handleMoveUp("info",index)} />,
                                                        <Button type="text" icon={<CaretDownFilled />} disabled={( (index + 1) === props.certificateTemplateAdmin.info.length )} onClick={() => handleMoveDown("info",index)} />,
                                                        <Button type="text" danger icon={<CloseCircleFilled />} onClick={() => handleRemoveItem("info",index)} />
                                                    ]}
                                                >
                                                    <List.Item.Meta 
                                                        title={item.label}
                                                        description={(item.dataElement) ? `Data Element: ${item.dataElement}` : (item.trackedEntityAttribute) ? `Attribute: ${item.trackedEntityAttribute}` : `Enrollment: ${item.enrollment}`}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </div>
                                    <Divider plain orientation="right"><Button onClick={() => setOpen("Footer")}>{t("addItemFooter")}</Button></Divider>
                                    <div className="administration-certificate-setup">
                                        <List 
                                            size="small"
                                            split={false}
                                            dataSource={props.certificateTemplateAdmin.footer}
                                            renderItem={(item,index) => (
                                                <List.Item
                                                    actions={[
                                                        <Button type="text" icon={<CaretUpFilled />} disabled={( index === 0 )} onClick={() => handleMoveUp("footer",index)} />,
                                                        <Button type="text" icon={<CaretDownFilled />} disabled={( (index + 1) === props.certificateTemplateAdmin.footer.length )} onClick={() => handleMoveDown("footer",index)} />,
                                                        <Button type="text" danger icon={<CloseCircleFilled />} onClick={() => handleRemoveItem("footer",index)} />
                                                    ]}
                                                >
                                                    <List.Item.Meta 
                                                        title={item.label}
                                                        description={(item.dataElement) ? `Data Element: ${item.dataElement}` : (item.trackedEntityAttribute) ? `Attribute: ${item.trackedEntityAttribute}` : `Enrollment: ${item.enrollment}`}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="administration-certificate-box">
                                    <Divider orientation="center">{t("reviewDefaultCertificate")}</Divider>
                                    <div style={{margin: "20x 0px"}}>
                                        <Row gutter={[16, 16]}>
                                            <Col span={4}>
                                                <div className="administration-certificate-logo">
                                                    { props.certificateTemplateAdmin.logo !== null && <img src={props.certificateTemplateAdmin.logo} alt="logo" /> }
                                                </div>
                                            </Col>
                                            <Col span={16}>
                                                <Typography.Title
                                                    style={{ marginBottom: 0, textAlign: "center" }}
                                                    level={2}
                                                >
                                                    {props.certificateTemplateAdmin.title}
                                                </Typography.Title>
                                            </Col>
                                            <Col span={4}></Col>
                                        </Row>
                                    </div>
                                    <div style={{margin: "50px 0px"}}>
                                        {/* <Divider orientation="left">Body</Divider> */}
                                        <Row gutter={[16, 33]}>
                                            {
                                                props.certificateTemplateAdmin.info.map( row => <>
                                                    <Col span={10}><strong>{row.label}</strong></Col>
                                                    <Col span={14}>
                                                    {
                                                        (row.dataElement) ? getDisplayName(props.programMetadata.programStages[0].dataElements.find(de => de.id === row.dataElement)) :
                                                            (row.trackedEntityAttribute) ? getDisplayName(props.programMetadata.trackedEntityAttributes.find(attr => attr.id === row.trackedEntityAttribute)) : row.enrollment
                                                    }
                                                    </Col>
                                                </>)
                                            }
                                        </Row>
                                    </div>
                                    <div style={{margin: "50px 0px"}}>
                                        {/* <Divider orientation="left">Footer</Divider> */}
                                        <Row gutter={[8, 25]}>
                                            {
                                                props.certificateTemplateAdmin.footer.map( row => <>
                                                    <Col style={{ textAlign: "right" }} offset={10} span={8}><strong>{row.label}</strong></Col>
                                                    <Col style={{ textAlign: "right" }} span={6}>
                                                    {
                                                        (row.dataElement) ? getDisplayName(props.programMetadata.programStages[0].dataElements.find(de => de.id === row.dataElement)) :
                                                            (row.trackedEntityAttribute) ? getDisplayName(props.programMetadata.trackedEntityAttributes.find(attr => attr.id === row.trackedEntityAttribute)) : row.enrollment
                                                    }
                                                    </Col>
                                                </>)
                                            }
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </StepContent>
                </Step>
                <Step>
                    <StepButton onClick={() => setType(1)}>{t("customCertificate")}</StepButton>
                    <StepContent>
                        <div className="administration-custom-certificate-container">
                            <CustomCertificate />
                        </div>
                    </StepContent>
                </Step>
            </Stepper>}
            <Modal
                width={"50%"}
                centered
                title={`${t("certificateAddItemTitle")} ${open}`}
                visible={open !== null}
                onCancel={handleCloseModal}
                onOk={handleAddItem}
            >
                <div className="administration-certificate-modal">
                    <Input style={{ width: "100%" }} value={label} placeholder="Enter Label" onChange={e => setLabel(e.target.value)} />
                </div>
                <div className="administration-certificate-modal">
                    <Input style={{ width: "100%" }} disabled={true} value={selected.displayName} placeholder="Selected Data" />
                </div>
                <div className="administration-certificate-modal">
                    <div className="administration-certificate-modal-box">
                        <div className="administration-certificate-modal">
                            <Search placeholder="Search" style={{ width: "100%" }} value={search} onChange={e => setSearch(e.target.value)} />
                        </div>
                        <div className="administration-certificate-modal-list">
                            {
                            [
                                {id: "enrollmentDate", displayName: "Enrolment Date"}, 
                                {id: "incidentDate", displayName: "Incident Date"},
                                {id: "orgUnitName", displayName: "Organisation Unit"}
                            ].filter( it => it.displayName.toLowerCase().includes(search.toLowerCase())).length > 0 && 
                            <>
                                <Divider orientation="left">Enrollment</Divider>
                                <List 
                                    size="small"
                                    split={false}
                                    dataSource={[
                                        {id: "enrollmentDate", displayName: "Enrolment Date"}, 
                                        {id: "incidentDate", displayName: "Incident Date"},
                                        {id: "orgUnitName", displayName: "Organisation Unit"}
                                    ].filter( it => it.displayName.toLowerCase().includes(search.toLowerCase()))}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <div className="administration-certificate-modal-item" onClick={() => setSelected({
                                                enrollment: item.id,
                                                displayName: item.displayName
                                            })}>{item.displayName}</div>
                                        </List.Item>
                                    )}
                                />
                            </>}
                            {props.programMetadata.trackedEntityAttributes.filter( it => it.displayName.toLowerCase().includes(search.toLowerCase())).length > 0 && 
                            <>
                                <Divider orientation="left">Tracked Entity Attributes</Divider>
                                <List 
                                    size="small"
                                    split={false}
                                    dataSource={props.programMetadata.trackedEntityAttributes.filter( it => it.displayName.toLowerCase().includes(search.toLowerCase()))}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <div className="administration-certificate-modal-item" onClick={() => setSelected({
                                                trackedEntityAttribute: item.id,
                                                displayName: item.displayName
                                            })}>{item.displayName}</div>
                                        </List.Item>
                                    )}
                                />
                            </>}
                            {props.programMetadata.programStages[0].dataElements.filter( it => it.displayName.toLowerCase().includes(search.toLowerCase())).length > 0 && 
                            <>
                                <Divider orientation="left">Data Elements</Divider>
                                <List 
                                    size="small"
                                    split={false}
                                    dataSource={props.programMetadata.programStages[0].dataElements.filter( it => it.displayName.toLowerCase().includes(search.toLowerCase()))}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <div className="administration-certificate-modal-item"
                                                onClick={() => setSelected({
                                                    dataElement: item.id,
                                                    displayName: item.displayName
                                                })}
                                            >{item.displayName}</div>
                                        </List.Item>
                                    )}
                                />
                            </>}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        certificateTemplateAdmin: state.admin.certificateTemplate,
        certificateTemplateMetadata: state.metadata.certificateTemplate,
        programMetadata: state.metadata.programMetadata
    }
}

const mapDispatchToProps = {
    changeCerticateTemplate,
    setCertificateLogo
};

export default connect(mapStateToProps,mapDispatchToProps)(Certificate);