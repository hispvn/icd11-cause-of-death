import "./index.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNotesMedical,
  faUserEdit,
  faAngleDoubleUp,
  faAngleDoubleDown
} from "@fortawesome/free-solid-svg-icons";
import { Button, message } from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Backdrop, CircularProgress } from '@mui/material';

import { connect } from "react-redux";
import { useState, useEffect } from "react";

import DeathCertificate from "./DeathCertificate";
import Profile from "./Profile";
import Stage from "./Stage";
import Result from "./Result";

import WarningDialog from "./WarningDialog";
import DeleteDialog from "./DeleteDialog";

import { changeRoute } from "../../redux/actions/route";
import {
  mutateTei,
  mutateAttribute,
  mutateEnrollment,
  mutateEvent,
} from "../../redux/actions/data";

import { Hooks } from "tracker-capture-app-core";
import { generateDhis2Payload } from "../../utils";
import { useTranslation } from "react-i18next";


const { useApi } = Hooks;
const ButtonGroup = Button.Group;

const Form = ({ 
  changeRoute,
  mutateTei,
  mutateAttribute,
  mutateEnrollment,
  mutateEvent,
  data,
  metadata,
  userRoles,
}) => {
  const { t } = useTranslation();
  const { dataApi } = useApi();

  const [ sideBar, setSideBar ] = useState(true);
  const [ profileSection, setProfileSection ] = useState(true); 
  const [ resultSection, setResultSection ] = useState(true); 

  const [loading,setLoading]=useState(false);
  const [exitWarning,setExitWarning]=useState(false);
  const [deleteWarning,setDeleteWarning]=useState(false);

  const { currentTei, currentEnrollment, currentEvents } = data;
  const { programMetadata, formMapping } = metadata;

  const [openCertificate, setOpenCertificate] = useState(false);
  const [certificate, setCertificate] = useState(false);

  // const [doris, setDoris] = useState(false);

  useEffect(() => {
    setCertificate (
      currentEvents[0] &&
      currentEvents[0].dataValues &&
      currentEvents[0].dataValues[formMapping.dataElements["underlyingCOD"]]
    );
    console.log(data)
  }, [data]);

  return (
    <div className="form-wrapper">
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
      <DeleteDialog 
        open={deleteWarning}
        handleCancel={() => {
          setDeleteWarning(false);
        }}
        handleDeleteEnrollment={async () => {
          await dataApi.push(
            `/api/enrollments/${currentEnrollment.enrollment}`,
            {},
            "DELETE"
          );
          changeRoute("list");
        }}
        handleDeleteTEI={async () => {
          await dataApi.push(
            `/api/trackedEntityInstances/${currentEnrollment.trackedEntityInstance}`,
            {},
            "DELETE"
          );
          changeRoute("list");
        }}
      ></DeleteDialog>
      <div className="form-container">
        <DeathCertificate
          open={openCertificate}
          onCancel={() => {
            setOpenCertificate(false);
          }}
          onLoading={() => {
            setLoading(false);
          }}
        />
        <div className={sideBar ? "profile-section-container" : "profile-section-container-hidden"}>
          <div className="section-title-profile-container">
            <div className="section-title-profile">
              <FontAwesomeIcon icon={faUserEdit} style={{ fontSize: 15 }} />
              &nbsp; 
              {t("profile")}
            </div>
            <ButtonGroup
              style={{
                float: "right",
              }}
            >
              <Button 
                type="text" 
                style={{ 
                  color: "#ffffff", 
                  width: "300px",
                  fontSize: "15px", 
                  fontWeight: "bold",
                  lineHeight: "5px",
                  textAlign: "right",
                  padding: "0px 5px"
                }}
                icon={<FontAwesomeIcon icon={profileSection ? faAngleDoubleUp : faAngleDoubleDown} style={{ fontSize: 15 }} />}
                onClick={() => {setProfileSection(!profileSection)}}
              />
            </ButtonGroup>
          </div>
          <div className={profileSection ? "profile-section" : "profile-section-hidden"}>
            <div className="profile-content">
              <Profile />
            </div>
            <div className="profile-button">
              <ButtonGroup
                style={{
                  float: "right",
                  padding: "1.5px",
                }}
              >
                {currentTei.isNew ? <Button
                  type="primary" 
                  style={{
                    width: "110px",
                    marginLeft: "3px"
                  }}

                  onClick={async () => {
                    if ( 
                      programMetadata.trackedEntityAttributes.filter( ({compulsory}) => compulsory )
                      .every( ({id}) => currentTei.attributes[id] && currentTei.attributes[id] !== "" )
                      && currentEnrollment['enrollmentDate'] && currentEnrollment.enrollmentDate !== ""
                      && currentEnrollment['incidentDate'] && currentEnrollment['incidentDate'] !== ""
                    ) {
                      setLoading(true);
                      const { currentTei, currentEnrollment, currentEvents } = generateDhis2Payload(
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
                      await dataApi.pushTrackedEntityInstance(
                        currentTei,
                        programMetadata.id
                      );
                      mutateTei("isSaved", true);
                      mutateTei("isNew", false);

                      // Dirty Check
                      mutateTei("isDirty", false);
                      mutateEnrollment("isDirty", false);


                      // Notification
                      setLoading(false);
                      message.success("Profile is saved successfully!")
                    }
                    else {
                      message.error("All complusory fields must be fill!")
                    }
                  }}
                >
                  Create
                </Button> : userRoles.admin ? <Button
                  type="primary" 
                  danger
                  style={{
                    width: "110px"
                  }}
                  disabled={currentTei.isNew && !currentTei.isSaved}
                  onClick={() => {
                    setDeleteWarning(true);
                  }}
                >
                  Delete
                </Button> : <></>}
              </ButtonGroup>
            </div>
          </div>

          <div className="section-title-result-container">
            <div className="section-title-result">
              <FontAwesomeIcon icon={faNotesMedical} style={{ fontSize: 15 }} />
              &nbsp; Output
            </div>
            <ButtonGroup
              style={{
                float: "right",
              }}
            >
              <Button 
                type="text" 
                style={{ 
                  color: "#ffffff", 
                  width: "300px",
                  fontSize: "15px", 
                  fontWeight: "bold",
                  lineHeight: "5px",
                  textAlign: "right",
                  padding: "0px 5px"
                }}
                icon={<FontAwesomeIcon icon={resultSection ? faAngleDoubleUp : faAngleDoubleDown} style={{ fontSize: 15 }} />}
                onClick={() => {setResultSection(!resultSection)}}
              />
            </ButtonGroup>
          </div>
          <div className={ resultSection ? "result-section" : "result-section-hidden"}>
            <div className="result-content">
              <Result />
            </div>
          </div>
        </div>
        <div className={sideBar ? "stage-section-container" : "stage-section-container-fullscreen"}>
          <div className="stage-button">
            <ButtonGroup
              style={{
                // float: "right",
                padding: "1.5px",
              }}
            >
              <Button
                style={{
                  width: "110px"
                }}
                disabled={currentTei.isNew}
                icon={sideBar ? <DoubleLeftOutlined /> : <DoubleRightOutlined />}
                onClick={() => {setSideBar(!sideBar)}}
              >
                {sideBar ? "Collapse" : "Expand"}
              </Button>
              <Button
                type="primary" 
                style={{
                  width: "110px",
                  marginLeft: "3px",
                }}
                disabled={!certificate}
                onClick={() => { 
                  setOpenCertificate(true);
                  setLoading(true);
                }}
              >
                Certificate
              </Button>
            </ButtonGroup>
            <ButtonGroup
                style={{
                  float: "right",
                  padding: "1.5px",
                }}
              >
              <Button
                style={{
                  width: "110px"
                }}
                onClick={async () => {
                  setLoading(true);
                  const { currentEvents } = generateDhis2Payload(data, programMetadata);
                  mutateEvent(currentEvents[0].event,"dataValues",{});
                  setLoading(false);
                }}
                disabled={currentTei.isNew}
              >
                Clear
              </Button>
              {
                  currentEnrollment.status === "COMPLETED" ? <Button
                    style={{
                      width: "110px",
                      marginLeft: "3px",
                      backgroundColor: "#f0ad4e",
                      color: "white"
                    }}
                    onClick={async () => {
                      setLoading(true);

                      mutateEnrollment("status", "ACTIVE");
                      mutateAttribute(formMapping.attributes["status"], "Pending");

                      const { currentTei, currentEnrollment } = generateDhis2Payload(
                        data,
                        programMetadata
                      );
                      await dataApi.pushEnrollment(
                        currentEnrollment,
                        programMetadata.id
                      );
                      await dataApi.pushTrackedEntityInstance(
                        currentTei,
                        programMetadata.id
                      );
                      mutateTei("isSaved", true);

                      // Dirty Check
                      mutateTei("isDirty", false);
                      mutateEnrollment("isDirty", false);
                      
                      setLoading(false);
                    }}
                  >
                    Reopen
                  </Button>
                  :
                  <Button
                    style={currentTei.isNew ? {
                      width: "110px",
                      marginLeft: "3px"
                    } : {
                      width: "110px",
                      marginLeft: "3px",
                      backgroundColor: "#f0ad4e",
                      color: "white"
                    }}
                    disabled={currentTei.isNew}
                    onClick={async () => {
                      if (
                        currentEvents[0] &&
                        currentEvents[0].dataValues &&
                        currentEvents[0].dataValues[formMapping.dataElements["underlyingCOD_processed_by"]] &&
                        currentEvents[0].dataValues[formMapping.dataElements["underlyingCOD_processed_by"]] === "Manual" &&
                        (( 
                          currentEvents[0].dataValues[formMapping.dataElements["reason_of_manual_COD_selection"]] && 
                          currentEvents[0].dataValues[formMapping.dataElements["reason_of_manual_COD_selection"]] === "" 
                        ) || !currentEvents[0].dataValues[formMapping.dataElements["reason_of_manual_COD_selection"]])
                      ) {
                        message.error("ERROR!!! Please select reason of not using the result from DORIS tool");
                      }
                      else {
                        setLoading(true);

                        mutateEnrollment("status", "COMPLETED");
                        mutateAttribute(formMapping.attributes["status"], "Completed");

                        const { currentTei, currentEnrollment, currentEvents } = generateDhis2Payload(
                          data,
                          programMetadata
                        );
                        await dataApi.pushEnrollment(
                          currentEnrollment,
                          programMetadata.id
                        );
                        await dataApi.pushTrackedEntityInstance(
                          currentTei,
                          programMetadata.id
                        );
                        await dataApi.pushEvents({ events: currentEvents });
                        mutateTei("isSaved", true);

                        // Dirty Check
                        mutateTei("isDirty", false);
                        mutateEnrollment("isDirty", false);
                        mutateEvent(currentEvents[0].event,"isDirty",false);
                        
                        setLoading(false);
                      }
                    }}
                  >
                    Complete
                  </Button>
                }
                <Button
                  type="primary" 
                  style={{
                    width: "110px",
                    marginLeft: "3px"
                  }}
                  disabled={currentTei.isNew}
                  onClick={async () => {
                    if (
                      currentEvents[0] &&
                        currentEvents[0].dataValues &&
                        currentEvents[0].dataValues[formMapping.dataElements["underlyingCOD_processed_by"]] &&
                        currentEvents[0].dataValues[formMapping.dataElements["underlyingCOD_processed_by"]] === "Manual" &&
                        (( 
                          currentEvents[0].dataValues[formMapping.dataElements["reason_of_manual_COD_selection"]] && 
                          currentEvents[0].dataValues[formMapping.dataElements["reason_of_manual_COD_selection"]] === "" 
                        ) || !currentEvents[0].dataValues[formMapping.dataElements["reason_of_manual_COD_selection"]])
                    ) {
                      message.error("ERROR!!! Please select reason of not using the result from DORIS tool");
                    }
                    else {
                      setLoading(true);
                      const { currentTei, currentEnrollment, currentEvents } = generateDhis2Payload(
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
                      await dataApi.pushTrackedEntityInstance(
                        currentTei,
                        programMetadata.id
                      );
                      await dataApi.pushEvents({ events: currentEvents });
                      mutateTei("isSaved", true);
      
                      // Dirty Check
                      mutateTei("isDirty", false);
                      mutateEnrollment("isDirty", false);
                      mutateEvent(currentEvents[0].event,"isDirty",false);
      
                      // Notification
                      setLoading(false);
                      message.success("Saved Successfully!");
                    }
                  }}
                >
                  Save
                </Button>
                <Button
                  type="danger"
                  style={{
                    width: "110px",
                    marginLeft: "3px"
                  }}
                  onClick={() => {
                    if ( currentTei.isDirty || currentEnrollment.isDirty || currentEvents[0].isDirty ) {
                      setExitWarning(true);
                    }
                    else {
                      changeRoute("list");
                    }
                  }}
                >
                  Close
                </Button>
              </ButtonGroup>
          </div>
          <div className="stage-sections-container">
            <div className="stage-section">
              { !currentTei.isNew ? <Stage /> : currentTei.isSaved ? <Stage />: <></> }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    metadata: state.metadata,
    data: state.data,
    userRoles: state.user.userRoles,
  };
};

const mapDispatchToProps = {
  changeRoute,
  mutateTei,
  mutateAttribute,
  mutateEnrollment,
  mutateEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
