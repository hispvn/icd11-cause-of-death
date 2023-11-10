import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import InputField from "../InputField";
import { Button, Col, Row, message } from "antd";
import { Backdrop, CircularProgress } from '@mui/material';
import moment from "moment";
/* REDUX */
import { connect } from "react-redux";
import {
  mutateTei,
  mutateAttribute,
  mutateEnrollment,
  mutateEvent,
} from "../../redux/actions/data";
import { changeRoute } from "../../redux/actions/route";

import { useTranslation } from "react-i18next";

/*       */
import { Hooks } from "tracker-capture-app-core";
import { generateDhis2Payload } from "../../utils";

// Leave page
import WarningDialog from "./WarningDialog";

const ButtonGroup = Button.Group;
const { useApi
  // , useRuleEngine 
} = Hooks;
const Profile = ({
  changeRoute,
  mutateTei,
  mutateAttribute,
  mutateEnrollment,
  mutateEvent,
  metadata,
  data,
  openCertificateModal
}) => {
  const { t } = useTranslation();
  const { dataApi, metadataApi } = useApi();
  const { currentTei, currentEnrollment, currentEvents } = data;
  const { programMetadata, formMapping, fullnameOption
  } = metadata;

  const [loading,setLoading]=useState(false);
  const [exitWarning,setExitWarning]=useState(false);
  const [certificate,setCertificate]=useState(false);

  useEffect(() => {
    if ( getTeaValue(formMapping.attributes["system_id"]) === "" ) {
      metadataApi.get(`/api/trackedEntityAttributes/${formMapping.attributes["system_id"]}/generate.json`)
      .then(res => {
        mutateAttribute(formMapping.attributes["system_id"], res.value);
      });
    }
  },[]);

  useEffect(() => {
    if ( currentEnrollment["enrollmentDate"] && currentEnrollment["incidentDate"] ) {
      if ( currentEnrollment["enrollmentDate"] < currentEnrollment["incidentDate"] ) {
        message.error("ERROR!!! Reported Date must be greater than incidentDate")
      }
    }

    setCertificate (
      currentEvents[0] &&
      currentEvents[0].dataValues &&
      currentEvents[0].dataValues[formMapping.dataElements["underlyingCOD"]]
    );
  }, [data])

  const getTeaMetadata = (attribute) =>
    programMetadata.trackedEntityAttributes.find(
      (tea) => tea.id === attribute
    );

  const getTeaValue = (attribute) => currentTei.attributes[attribute] ? currentTei.attributes[attribute] : "";

  const populateInputField = attribute => {
    const tea = getTeaMetadata(attribute);
    const value = getTeaValue(attribute);
    
    return (
      <InputField
        value={ value }
        valueType={tea.valueType}
        label={tea.displayFormName}
        valueSet={tea.valueSet}
        change={(value) => {
          mutateAttribute(tea.id, value);
        }}
        disabled={attribute === formMapping.attributes["system_id"]}
      />
    );
  };

  /*
  const hasUnderlying = () => {
    const currentEvent = data.currentEvents.find((event) => {
      return event.programStage === formMapping.programStage;
    });
    return (
      currentEvent &&
      currentEvent.dataValues &&
      currentEvent.dataValues[formMapping.dataElements["underlyingCOD"]]
    );
  };
  */

  const renderDOBGroup = () => {
    const dob = getTeaMetadata(formMapping.attributes["dob"]);
    const age = getTeaMetadata(formMapping.attributes["age"]);
    const isEstimated = getTeaMetadata(formMapping.attributes["estimated_dob"]);
    return (
      <>
        <Row justify="start" align="middle">
          <Col>
            <InputField
              value={getTeaValue(formMapping.attributes["estimated_dob"])}
              valueType={isEstimated.valueType}
              // label={}
              valueSet={isEstimated.valueSet}
              change={(value) => {
                mutateAttribute(isEstimated.id, value);
              }}
            />
          </Col>
          <Col>
            <div className="input-label">{isEstimated.displayFormName}</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputField
              value={getTeaValue(formMapping.attributes["dob"])}
              // valueType={dob.valueType}
              valueType={"DATE_WITH_RANGE"}
              label={dob.displayFormName}
              valueSet={dob.valueSet}
              change={(value) => {
                mutateAttribute(dob.id, value);
                const age_cal = Math.round(moment(currentEnrollment.incidentDate, "YYYY-MM-DD").diff(
                  moment(getTeaValue(formMapping.attributes["dob"]), "YYYY-MM-DD"),
                  "years",
                  true
                ));
                if (age_cal > 150) 
                  message.error("Age can't be greater than 150")
                else if (age_cal < 0)
                  message.error("Age can't be negative number")
                else 
                  mutateAttribute(age.id, age_cal);
              }}
              disabledDate={current => current && current >= moment().startOf('day')}
            />
          </Col>
          <Col>
            <InputField
              value={getTeaValue(formMapping.attributes["age"])}
              valueType={age.valueType}
              label={age.displayFormName}
              valueSet={age.valueSet}
              change={(value) => {
                (value > 150) ?
                  message.error("Age can't be greater than 150")
                  : (value < 0) ? 
                    message.error("Age can't be negative number")
                    : mutateAttribute(age.id, Math.round(value));
              }}
            />
          </Col>
        </Row>
      </>
    );
  };

  return (
    <div className="profile-section-container">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <WarningDialog 
        open={exitWarning}
        handleCancel={() => {
          setExitWarning(false);
        }}
        handleOk={() => {
          mutateTei("isDirty", false);
          mutateEnrollment("isDirty", false);
          mutateEvent(currentEvents[0].event, "isDirty", false);
          changeRoute("list");
        }}
      ></WarningDialog>
      <div className="section-title section-title-profile">
        <FontAwesomeIcon icon={faUserEdit} style={{ fontSize: 15 }} />
        &nbsp; {t("profile")}
      </div>
      <div className="profile-section">
        <div className="profile-content">
          <InputField
            value={currentEnrollment.enrollmentDate || ""}
            label={t("reportedDate")}
            valueType={"DATE_WITH_RANGE"}
            disabledDate={current => current && current >= moment().startOf('day')}
            change={(value) => {
              mutateEnrollment("enrollmentDate", value);
            }}
          />
          <InputField
            value={currentEnrollment.incidentDate || ""}
            label={t("incidentDate")}
            valueType={"DATE_WITH_RANGE"}
            disabledDate={current => current && current >= moment().startOf('day')}
            change={(value) => {
              mutateEnrollment("incidentDate", value);
              currentEvents.forEach((event) => {
                mutateEvent(event.event, "eventDate", value);
                mutateEvent(event.event, "dueDate", value);
              });
            }}
          />
          {/* {attributes
            .slice(0, 3)
            .map((attribute) => populateInputField(attribute))} */}
          {populateInputField(formMapping.attributes["system_id"])}
          {fullnameOption !== "noname" && populateInputField(formMapping.attributes["given_name"])}
          {fullnameOption === "firstmidlastname" && populateInputField(formMapping.attributes["middle_name"])}
          {(fullnameOption !== "noname" && fullnameOption !== "fullname") && populateInputField(formMapping.attributes["family_name"])}
          {renderDOBGroup()}
          {/* {attributes.slice(3).map((attribute) => populateInputField(attribute))} */}
          {populateInputField(formMapping.attributes["sex"])}
          {populateInputField(formMapping.attributes["address"])}


          {/* For other attributes */}
          {programMetadata.trackedEntityAttributes.filter( 
            ({id}) => !Object.values(formMapping.attributes).find( tea => tea === id ) 
          ).map( tea => populateInputField(tea.id) )}
        </div>
        <div className="profile-button">
          <ButtonGroup
            style={{
              // float: "right",
              padding: "5px",
            }}
          >
            <Button
              type="primary"
              onClick={async () => {
                setLoading(true);
                const { currentTei, currentEnrollment } = generateDhis2Payload(
                  data,
                  programMetadata
                );
                await dataApi.pushTrackedEntityInstance(
                  currentTei,
                  programMetadata.id
                );
                await dataApi.pushEnrollment(
                  currentEnrollment,
                  programMetadata.id
                );
                mutateTei("isSaved", true);

                // Dirty Check
                mutateTei("isDirty", false);
                mutateEnrollment("isDirty", false);


                // Notification
                setLoading(false);
                message.success("Profile is saved successfully!")
              }}
            >
            {
              t("save")
            }
            </Button>
            <Button
              type="danger"
              onClick={() => {
                if ( currentTei.isDirty || currentEnrollment.isDirty || currentEvents[0].isDirty ) {
                  setExitWarning(true);
                }
                else {
                  changeRoute("list");
                }
              }}
            >
            {
              t("cancel")
            }
            </Button>
            <Button disabled={!certificate} onClick={openCertificateModal}>
            {
              t("printCertificate")
            }
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    metadata: state.metadata,
    data: state.data,
  };
};
const mapDispatchToProps = {
  changeRoute,
  mutateTei,
  mutateAttribute,
  mutateEnrollment,
  mutateEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
