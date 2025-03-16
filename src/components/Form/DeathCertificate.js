import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Typography, Space } from "antd";
import { connect } from "react-redux";
import { Hooks } from "tracker-capture-app-core";
import { convertPdfDoc2FileURL, fillPdf, showPage } from "../../utils/certificate";
import "./certificate.css";
import { CheckSquareFilled, CloseSquareFilled } from "@ant-design/icons";

import { useTranslation } from "react-i18next";

const { useApi } = Hooks;

const DeathCertificate = ({
  data: { currentEvents, currentEnrollment, currentTei },
  certificateTemplate,
  customCertificateTemplate,
  formMapping,
  programMetadata,
  open,
  onCancel,
  onLoading
}) => {
  const { metadataApi } = useApi();
  const [pdfURL, setPdfURL] = useState(null);
  const { t } = useTranslation();
  const currentEvent = currentEvents.find((event) => {
    return event.programStage === formMapping.programStage;
  });
  const isBoolean = val => (val === undefined) ? ""
                                                  : (typeof val !== "boolean" ) ? val 
                                                    : (val) ? <CheckSquareFilled style={{ fontSize: 20, color: "#1890ff", }} /> 
                                                      : <CloseSquareFilled style={{ fontSize: 20, color: "#d3d3d3", }} />

  const getVal_defaultCert = row => {
    if (row.enrollment) {
      return currentEnrollment[row.enrollment === "orgUnit" ? "orgUnitName" : row.enrollment];
    } else if (row.trackedEntityAttribute) {
      const foundTea = programMetadata.trackedEntityAttributes.find( tea => tea.id === row.trackedEntityAttribute );
      return !foundTea.valueSet ? isBoolean(currentTei.attributes[row.trackedEntityAttribute]) 
        : foundTea.valueSet.find( vs => vs.value === currentTei.attributes[row.trackedEntityAttribute] )?.label ?? currentTei.attributes[row.trackedEntityAttribute];
    } else if (currentEvent && currentEvent.dataValues) {
      const foundDe = programMetadata.programStages.find( ps => ps.id === formMapping.programStage ).dataElements.find( de => de.id === row.dataElement );
      return !foundDe.valueSet ? isBoolean(currentEvent.dataValues[row.dataElement]) : foundDe.valueSet.find( vs => vs.value === currentEvent.dataValues[row.dataElement] )?.label ?? currentEvent.dataValues[row.dataElement];
    }
  }

  const getVal_customCert = (uid, datatype) => {
    if (datatype === "de") {
      if (currentEvent && currentEvent.dataValues[uid]) {
        const foundDe = programMetadata.programStages.find( ps => ps.id === formMapping.programStage ).dataElements.find( de => de.id === uid );
        return !foundDe.valueSet ? currentEvent.dataValues[uid] : foundDe.valueSet.find( vs => vs.value === currentEvent.dataValues[uid] )?.label ?? currentEvent.dataValues[uid];
      }
      else {
        return "";
      }
    }
    else if (datatype === "tea") {
      if (currentTei && currentTei.attributes[uid]) {
        const foundTea = programMetadata.trackedEntityAttributes.find( tea => tea.id === uid );
        return !foundTea.valueSet ? currentTei.attributes[uid] : foundTea.valueSet.find( vs => vs.value === currentTei.attributes[uid] )?.label ?? currentTei.attributes[uid];
      }
      else {
        return "";
      }
    }
  }
  const convertToValue = (val,valType) => {
    if (valType === "text") {
      return val.split("#{").map( str => {
        if( currentEvent && str.startsWith("de.") ) {
          return str.replace(`de.${str.slice(3,14)}}`,getVal_customCert(str.slice(3,14),"de"));
        }
        else if( currentTei && str.startsWith("tea.") ) {
          return str.replace(`tea.${str.slice(4,15)}}`,getVal_customCert(str.slice(4,15),"tea"));
        }
        else if( str.startsWith("orgUnitName") ) {
          return str.replace(`orgUnitName}`,currentEnrollment["orgUnitName"]);
        }
        else if( str.startsWith("enrollmentDate") ) {
          return str.replace(`enrollmentDate}`,currentEnrollment["enrollmentDate"]);
        }
        else if( str.startsWith("incidentDate") ) {
          return str.replace(`incidentDate}`,currentEnrollment["incidentDate"]);
        }
        else {
          return str;
        }
      }).join("");
    }
    else if (valType === "check") {
      if( val.startsWith("#{de.") ) {
        if(currentEvent.dataValues[val.slice(5,16)]) {
          return currentEvent.dataValues[val.slice(5,16)] === val.slice(18) ? "X" : ""
        }
        else {
          return "";
        }
      }
      else if( val.startsWith("#{tea.") ) {
        if(currentTei.attributes[val.slice(6,17)]) {
          return currentTei.attributes[val.slice(6,17)] === val.slice(19) ? "X" : ""
        }
        else {
          return "";
        }
      }
    }
    else {
      return "";
    }
  }

  useEffect(() => {
    if ( open ) {
      if ( customCertificateTemplate ) {
        Promise.all([
          metadataApi.pullNotForJson(`/api/documents/${customCertificateTemplate.template}/data.pdf`)
        ])
        .then( async (res) => {
          const pdfDoc = await fillPdf(res[0],customCertificateTemplate.labels.map( l => ({
            ...l,
            value: convertToValue(l.value,l.valueType)
          })));
          // const pdfDoc = await fillPdf(res[0],[]);
          const fileURL = await convertPdfDoc2FileURL(pdfDoc);
          setPdfURL(fileURL);
          // await showPage(pdfDoc, 1);
          onLoading();
        });
      }
      else {
        onLoading();
      }
    }
  }, [open])

  return (
    <Modal
      wrapClassName="certificate-modal"
      bodyStyle={{
        height: "100%",
      }}
      style={{
        top: 20,
      }}
      width={1000}
      visible={open}
      footer={false}
      closable={false}
      onCancel={onCancel}
      title={
        <Row className="no-print" gutter={8} justify="end">
          <Col>
            <Button 
              type="primary" 
              onClick={() => {
                if(customCertificateTemplate) {
                  window.frames["certificate"].focus();
                  window.frames["certificate"].print();
                }
                else {
                  window.print();
                }
              }}
            >
            {
              t("print")
            }
            </Button>
          </Col>
          <Col>
            <Button onClick={onCancel}>{t("close")}</Button>
          </Col>
        </Row>
      }
    >
    {
      (customCertificateTemplate) ? <iframe 
          // hidden
          id="certificate"
          name="certificate"
          title="Certificate"
          src={pdfURL + "#toolbar=0&navpanes=0&scrollbar=0"}
          frameBorder="0" 
          height={800}
          width={"100%"}
          scrolling="auto"
          type="application/pdf"
      />
      :
      <Space size="large" style={{ width: "100%" }} direction="vertical">
        <div style={{ position: "relative" }}>
          <div
            style={{
              padding: "4px 8px",
              position: "absolute",
              top: "50%",
              left: 0,
              transform: "translateY(-50%)",
            }}
          >
            <img src={certificateTemplate.logo} alt="logo" style={{width: "20%"}} />
          </div>
          <Typography.Title
            style={{ marginBottom: 0, textAlign: "center" }}
            level={2}
          >
            {certificateTemplate.title}
          </Typography.Title>
        </div>
        <div />
        {
          certificateTemplate.info.map( row => 
            <Row>
              <Col span={8}>
                <div style={{fontSize: 20}}><strong>{row.label}:</strong></div>
              </Col>
              <Col span={16}>
                <div style={{fontSize: 20}}>{getVal_defaultCert(row)}</div>
              </Col>
            </Row>
          )
        }
        <div />
        <div />
        {
          certificateTemplate.footer.map( row => 
            <Row gutter={8}>
              <Col style={{ textAlign: "right" }} offset={8} span={8}>
                <div style={{fontSize: 20}}><strong>{row.label}:</strong></div>
              </Col>
              <Col style={{ textAlign: "right" }} span={8}>
                <div style={{fontSize: 20}}>{getVal_defaultCert(row)}</div>
              </Col>
            </Row>
          )
        }
      </Space>
    }
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.data,
    certificateTemplate: state.metadata.certificateTemplate,
    customCertificateTemplate: state.metadata.customCertificate,
    formMapping: state.metadata.formMapping,
    programMetadata: state.metadata.programMetadata
  };
};

export default connect(mapStateToProps)(DeathCertificate);