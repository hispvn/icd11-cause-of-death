import { useState, useEffect } from "react";
import Selections from "./Selections";
import Attributes from "./Attributes";
import FrameA from "./FrameA";
import FrameB from "./FrameB";
import AssignOrgUnits from "./AssignOrgUnits";
import AssignUsers from "./AssignUsers";
import Certificate from "./Certificate";
import Review from "./Review";
import Finish  from "./Finish";
import { Steps, Button, message, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { Hooks } from "tracker-capture-app-core";
/* REDUX */
import { connect } from "react-redux";
import { changeStep } from "../../redux/actions/admin";
import { setFormMapping_TEAs, setProgramMetadata, setCertificateTemplate, setFemaleCode } from "../../redux/actions/metadata";
/*       */
import "./index.css";
import { useTranslation } from "react-i18next";

const { Step } = Steps;
const { useApi } = Hooks;

const Administration = ({ admin, programMetadata, formMapping, changeStep, setFormMapping_TEAs, setProgramMetadata, setCertificateTemplate, setFemaleCode }) => {
  const { t } = useTranslation();
  
  const [open, setOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const { metadataApi } = useApi();
  const { 
    step, 
    type,
    trackedEntityAttributes,
    trackedEntityType,
    certificateTemplate,
    femaleOption,
    fullnameOption
  } = admin;

  const antIcon = <LoadingOutlined style={{ fontSize: 102 }} />;

  useEffect(() => {
    if ( programMetadata !== null ) { 
      setOpen(false);
      changeStep(0);
    }
  },[programMetadata])

  return (
    <div className="administration-wrapper">
      <Finish open={open} />
      {
        (programMetadata === null) ? 
        <div className="administration-container">
          <div className="administration-stepper">
            <Steps current={step} size="small">
              <Step title={t("step1Installation")} disabled={true} />
              <Step title={t("step2Attribute")} />
              <Step title={t("step3FrameA")} />
              <Step title={t("step4FrameB")} />
              <Step title={t("step5OUs")} />
              <Step title={t("step6Users")} />
              <Step title={t("step7Review")} />
            </Steps>
          </div>
          {step !== 0 && (
            <div className="administration-navigation-buttons-container">
              <Button
                onClick={() => {
                  // changeStep(step === 4 && type === "default" ? 0 : step >= 1 ? step - 1 : 0);
                  changeStep(step === 4 && type === "default" ? 0 : step - 1);
                }}
              >{
                t("back")
              }</Button>
              { (step===6) ? 
                <Button type="primary"
                  style={{ marginLeft: 10 }}
                  onClick={() => setOpen(true)}
                >{
                  t("install")
                }</Button> 
                :
                <Button
                  onClick={() => {
                    if (step === 0) {
                      if ( type === "default" ) {
                        changeStep(4);
                      }
                    }
                    else if ( step === 1 ) {
                      if ( type === "custom" ) {
                        if ( trackedEntityType === null || femaleOption === "" ) {
                          // Show error
                          message.error(t("errorMissingTET"));
                        } 
                        // else if (!fullnameOption && trackedEntityAttributes.filter( ([destination,]) => destination !== '' ).length < 7) {
                        //   message.error(t("errorMissingTET"));
                        // }
                        else if ( fullnameOption === "noname" &&  trackedEntityAttributes.filter( ([destination,]) => destination !== '' ).length < 5) {
                          message.error(t("errorMissingTET"));
                        }
                        else if ( fullnameOption === "fullname" &&  trackedEntityAttributes.filter( ([destination,]) => destination !== '' ).length < 6) {
                          message.error(t("errorMissingTET"));
                        }
                        else if ( fullnameOption === "firstlastname" &&  trackedEntityAttributes.filter( ([destination,]) => destination !== '' ).length < 7) {
                          message.error(t("errorMissingTET"));
                        }
                        else if ( fullnameOption === "firstmidlastname" &&  trackedEntityAttributes.filter( ([destination,]) => destination !== '' ).length < 8) {
                          message.error(t("errorMissingTET"));
                        }
                        else changeStep(2);
                      }
                    }
                    else changeStep(step < 6 ? step + 1 : 6);
                  }}
                  style={{ marginLeft: 10 }}
                >{
                  t("next")
                }</Button>
              }
            </div>
          )}
          <div className="administration-content-container">
            {step === 0 && <Selections />}
            {step === 1 && <Attributes />}
            {step === 2 && <FrameA />}
            {step === 3 && <FrameB />}
            {step === 4 && <AssignOrgUnits />}
            {step === 5 && <AssignUsers />}
            {step === 6 && <Review />}
          </div>
        </div>
        : 
        <div className="administration-container">
          <div className="administration-stepper">
            <Steps current={step} size="small">
              <Step title={t("step1Attributes")} />
              <Step title={t("step2Certificate")} />
            </Steps>
          </div>
          <Spin spinning={spinning} indicator={antIcon} >
            <div className="administration-navigation-buttons-container">
              {
                (step===1) ? 
                  <>
                    <Button onClick={() => changeStep(step - 1) }>Back</Button>
                    <Button type="primary"
                      style={{ marginLeft: 10 }}
                      onClick={() => {
                        setSpinning(true);
                        metadataApi.push("/api/dataStore/WHO_ICD11_COD/certificateTemplate", {certificate: certificateTemplate}, "PUT").then( res => {
                          setCertificateTemplate(certificateTemplate);
                          message.success(t("saveSuccessful"));
                          setSpinning(false);
                        });
                      }}
                    >
                      {t("save")}
                    </Button> 
                  </>
                  :
                  <>
                    <Button onClick={() => changeStep(step + 1) }>Next</Button>
                    <Button type="primary"
                      style={{ marginLeft: 10 }}
                      onClick={() => {
                        setSpinning(true);
                        // Update formMapping in redux and dataStore
                        let attributes = {};
                        admin.trackedEntityAttributes.forEach( defaultAttribute => {
                          if (defaultAttribute[1] === "Unique ID") attributes["system_id"] = defaultAttribute[0];
                          if (defaultAttribute[1] === "First Name") attributes["given_name"] = defaultAttribute[0];
                          if (defaultAttribute[1] === "Last Name") attributes["family_name"] = defaultAttribute[0];
                          if (defaultAttribute[1] === "Date of Birth") attributes["dob"] = defaultAttribute[0];
                          if (defaultAttribute[1] === "Date of Birth is estimated") attributes["estimated_dob"] = defaultAttribute[0];
                          if (defaultAttribute[1] === "Age in years") attributes["age"] = defaultAttribute[0];
                          if (defaultAttribute[1] === "Address") attributes["address"] = defaultAttribute[0];
                          if (defaultAttribute[1] === "Sex") attributes["sex"] = defaultAttribute[0];
                        });
                        setFormMapping_TEAs(attributes);
                        metadataApi.push("/api/dataStore/WHO_ICD11_COD/formMapping", {
                          ...formMapping,
                          attributes: attributes
                        }, "PUT");

                        // Update femaleCode
                        setFemaleCode(femaleOption);
                        metadataApi.push("/api/dataStore/WHO_ICD11_COD/femaleOption", {code: femaleOption}, "PUT");
                        
                        // Update program in DHIS2 and programMetadata in Redux
                        metadataApi.get("/api/programs.json", { paging: false }, ["fields=:owner","filter=id:eq:"+programMetadata.id] ).then( programs => {
                          //default attributes
                          let program = {
                            ...programs.programs[0],
                            trackedEntityType: {
                              id: admin.trackedEntityType
                            },
                            programTrackedEntityAttributes: [
                              {
                                "mandatory": true,
                                "searchable": true,
                                "renderOptionsAsRadio": false,
                                "displayInList": true,
                                "sortOrder": 1,
                                "program": { "id": programMetadata.id },
                                "trackedEntityAttribute": { "id": admin.trackedEntityAttributes[0][0] },
                                "programTrackedEntityAttributeGroups": []
                              },
                              {
                                "mandatory": false,
                                "searchable": true,
                                "renderOptionsAsRadio": false,
                                "displayInList": true,
                                "sortOrder": 2,
                                "program": { "id": programMetadata.id  },
                                "trackedEntityAttribute": { "id": admin.trackedEntityAttributes[1][0] },
                                "programTrackedEntityAttributeGroups": []
                              },
                              {
                                "mandatory": false,
                                "searchable": true,
                                "renderOptionsAsRadio": false,
                                "displayInList": true,
                                "sortOrder": 3,
                                "program": { "id": programMetadata.id  },
                                "trackedEntityAttribute": { "id": admin.trackedEntityAttributes[2][0] },
                                "programTrackedEntityAttributeGroups": []
                              },
                              {
                                "mandatory": false,
                                "searchable": true,
                                "renderOptionsAsRadio": false,
                                "displayInList": true,
                                "sortOrder": 4,
                                "program": { "id": programMetadata.id  },
                                "trackedEntityAttribute": { "id": admin.trackedEntityAttributes[3][0] },
                                "programTrackedEntityAttributeGroups": []
                              },
                              {
                                "mandatory": false,
                                "searchable": false,
                                "renderOptionsAsRadio": false,
                                "displayInList": false,
                                "sortOrder": 5,
                                "program": { "id": programMetadata.id  },
                                "trackedEntityAttribute": { "id": admin.trackedEntityAttributes[4][0] },
                                "programTrackedEntityAttributeGroups": []
                              },
                              {
                                "mandatory": false,
                                "searchable": false,
                                "renderOptionsAsRadio": false,
                                "displayInList": false,
                                "sortOrder": 6,
                                "program": { "id": programMetadata.id  },
                                "trackedEntityAttribute": { "id": admin.trackedEntityAttributes[5][0] },
                                "programTrackedEntityAttributeGroups": []
                              },
                              {
                                "mandatory": false,
                                "searchable": true,
                                "renderOptionsAsRadio": false,
                                "displayInList": true,
                                "sortOrder": 7,
                                "program": { "id": programMetadata.id  },
                                "trackedEntityAttribute": { "id": admin.trackedEntityAttributes[6][0] },
                                "programTrackedEntityAttributeGroups": []
                              },
                              {
                                "mandatory": false,
                                "searchable": false,
                                "renderOptionsAsRadio": false,
                                "displayInList": false,
                                "sortOrder": 8,
                                "program": { "id": programMetadata.id  },
                                "trackedEntityAttribute": { "id": admin.trackedEntityAttributes[7][0] },
                                "programTrackedEntityAttributeGroups": []
                              }
                            ]
                          };
                          //other attributes
                          admin.trackedEntityAttributes.slice(8,admin.trackedEntityAttributes.length).forEach( (tea, index) => {
                            program.programTrackedEntityAttributes.push({
                              "mandatory": false,
                              "searchable": false,
                              "renderOptionsAsRadio": false,
                              "displayInList": false,
                              "sortOrder": (9 + index),
                              "program": { "id": programMetadata.id  },
                              "trackedEntityAttribute": { "id": tea[0] },
                              "programTrackedEntityAttributeGroups": []
                            })
                          });
                          // update program in DHIS2
                          metadataApi.push(`/api/metadata?importStrategy=IMPORT_AND_UPDATE`, { programs: [program]}).then( res => {
                            metadataApi.getProgramMetadata(programMetadata.id).then( metadata => {
                              // update program in dataStore
                              setProgramMetadata(metadata);
                              setSpinning(false);
                              message.success(t("saveSuccessful"));
                            })
                          });
                        })
                      }}
                    >{
                      t("save")
                    }</Button>
                  </>
              }
            </div>
            <div className="administration-content-container">
              {step === 0 && <Attributes />}
              {step === 1 && <Certificate />}
            </div>
          </Spin>
        </div>
      }
      
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    admin: state.admin,
    programMetadata: state.metadata.programMetadata,
    formMapping: state.metadata.formMapping
  };
};

const mapDispatchToProps = {
  changeStep,
  setFormMapping_TEAs,
  setProgramMetadata,
  setCertificateTemplate,
  setFemaleCode
};
export default connect(mapStateToProps, mapDispatchToProps)(Administration);
