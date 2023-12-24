import React from "react";
import { Modal, Button, Row, Col, Typography, Space } from "antd";
import { connect } from "react-redux";
import "./certificate.css";
import { CheckSquareFilled, CloseSquareFilled } from "@ant-design/icons";

import { useTranslation } from "react-i18next";

const DeathCertificate = ({
  data: { currentEvents, currentEnrollment, currentTei },
  certificateTemplate,
  formMapping,
  open,
  onCancel
}) => {
  const { t } = useTranslation();
  const currentEvent = currentEvents.find((event) => {
    return event.programStage === formMapping.programStage;
  });
  const isBoolean = val => (val === undefined) ? ""
                                                  : (typeof val !== "boolean" ) ? val 
                                                    : (val) ? <CheckSquareFilled style={{ fontSize: 20, color: "#1890ff", }} /> 
                                                      : <CloseSquareFilled style={{ fontSize: 20, color: "#d3d3d3", }} />

  const getVal = row => {
    if (row.enrollment) {
      return currentEnrollment[row.enrollment === "orgUnit" ? "orgUnitName" : row.enrollment];
    } else if (row.trackedEntityAttribute) {
      return isBoolean(currentTei.attributes[row.trackedEntityAttribute])
    } else if (currentEvent && currentEvent.dataValues) {
      return isBoolean(currentEvent.dataValues[row.dataElement])
    }
  }
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
            <Button type="primary" onClick={() => window.print()}>
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
                <div style={{fontSize: 20}}>{getVal(row)}</div>
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
                <div style={{fontSize: 20}}>{getVal(row)}</div>
              </Col>
            </Row>
          )
        }
      </Space>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.data,
    certificateTemplate: state.metadata.certificateTemplate,
    formMapping: state.metadata.formMapping
  };
};

export default connect(mapStateToProps)(DeathCertificate);