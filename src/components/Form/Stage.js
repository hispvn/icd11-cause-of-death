

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";

/* Styling tools */
import {
  faNotesMedical,
  // faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { Button, Tabs, message } from "antd";
import { Backdrop, CircularProgress } from '@mui/material';
import moment from "moment";
import InputField from "../InputField";
import Icd11Tool from "../Icd11Tool/EmbeddedIcd11Tool";
import "./stage.css";

/* REDUX */

import {
  mutateEvent,
  mutateDataValue,
  initNewEvent,
} from "../../redux/actions/data";

/* Utils */
import { Hooks } from "tracker-capture-app-core";
import { generateCode, generateDhis2Payload } from "../../utils";
const ButtonGroup = Button.Group;
const { TabPane } = Tabs;
const { useApi } = Hooks;


const Stage = ({
  metadata,
  data,
  mutateEvent,
  mutateDataValue,
  initNewEvent,
}) => {
  const { t } = useTranslation();
  const { dataApi } = useApi();

  const [icdTool, setIcdTool] = useState(false);
  const [activeCauseOfDeath, setActiveCauseOfDeath] = useState("");
  const [causeOfDeaths, setCauseOfDeaths] = useState(null);
  const [checkBoxUnderlying, setCheckBoxUnderlying] = useState("");
  const [flagUnderlying, setFlagUnderlying] = useState(false);
  const [loading,setLoading]=useState(false);

  const {
    currentEnrollment,
    currentTei: { attributes },
    currentEnrollment: { enrollmentDate: currentTeiDateOfDeath }
  } = data;
  const { programMetadata, formMapping, icd11Options, femaleCode, icdApi_clientToken, keyUiLocale } = metadata;
  const currentTeiSexAttributeValue = attributes[formMapping.attributes["sex"]];
  const currentTeiDateOfBirthAttributeValue = attributes[formMapping.attributes["dob"]];
  const currentTeiAgeAttributeValue = attributes[formMapping.attributes["age"]];

  const age = currentTeiAgeAttributeValue ? currentTeiAgeAttributeValue : Math.abs(
    moment(currentTeiDateOfDeath, "YYYY-MM-DD").diff(
      moment(currentTeiDateOfBirthAttributeValue, "YYYY-MM-DD"),
      "years",
      true
    )
  );
  const programStage = programMetadata.programStages.find(
    (ps) => ps.id === formMapping.programStage
  );
  const currentEvent = data.currentEvents.find((event) => {
    return event.programStage === formMapping.programStage;
  });
  const returnInitValue = (de) => {
    return currentEvent ? (currentEvent.dataValues[de] ? currentEvent.dataValues[de] : "") : "";
  };
  const isShowMaternalDeath = () => currentTeiSexAttributeValue === femaleCode && age >= 10;
  const isShowFetalOrInfantDeath = () => age <= 1;

  useEffect(() => {
    if (currentEvent && !isShowFetalOrInfantDeath()) {
      [
        formMapping.dataElements["multiple_pregnancies"],
        formMapping.dataElements["stillborn"],
        formMapping.dataElements["hours_newborn_survived"],
        formMapping.dataElements["birth_weight"],
        formMapping.dataElements["completedWeeks_pregnancy"],
        formMapping.dataElements["age_mother"],
        formMapping.dataElements["pregnancy_conditions"],
      ].map((deId) => mutateDataValue(currentEvent.event, deId, ""));
      mutateEvent(currentEvent.event, "isDirty", false);
    }
  }, [age]);

  useEffect(() => {
    if (currentEvent && !isShowMaternalDeath()) {
      [
        formMapping.dataElements["pregnancy_inLastYear"], 
        formMapping.dataElements["time_from_pregnancy"], 
        formMapping.dataElements["pregnancy_contributed_to_death"]
      ].map((deId) =>
        mutateDataValue(currentEvent.event, deId, "")
      );
      mutateEvent(currentEvent.event, "isDirty", false);
    }
  }, [currentTeiSexAttributeValue, age]);

  useEffect(() => {
    if (!currentEvent) {
      const eventId = generateCode();
      initNewEvent(eventId, programStage.id);
      mutateEvent(eventId, "eventDate", currentEnrollment.incidentDate);
      mutateEvent(eventId, "dueDate", currentEnrollment.incidentDate);

      // Dirty Check
      mutateEvent(eventId, "isDirty", false);
    }
    const cods = {
      [formMapping.dataElements["codA"]]: {
        code: returnInitValue(formMapping.dataElements["codA"]),
        label: returnInitValue(formMapping.dataElements["codA_name"]),
        underlying: returnInitValue(formMapping.dataElements["codA_underlying"]),
        entityId: returnInitValue(formMapping.dataElements["codA_entityId"])
      },
      [formMapping.dataElements["codB"]]: {
        code: returnInitValue(formMapping.dataElements["codB"]),
        label: returnInitValue(formMapping.dataElements["codB_name"]),
        underlying: returnInitValue(formMapping.dataElements["codB_underlying"]),
        entityId: returnInitValue(formMapping.dataElements["codB_entityId"])
      },
      [formMapping.dataElements["codC"]]: {
        code: returnInitValue(formMapping.dataElements["codC"]),
        label: returnInitValue(formMapping.dataElements["codC_name"]),
        underlying: returnInitValue(formMapping.dataElements["codC_underlying"]),
        entityId: returnInitValue(formMapping.dataElements["codC_entityId"])
      },
      [formMapping.dataElements["codD"]]: {
        code: returnInitValue(formMapping.dataElements["codD"]),
        label: returnInitValue(formMapping.dataElements["codD_name"]),
        underlying: returnInitValue(formMapping.dataElements["codD_underlying"]),
        entityId: returnInitValue(formMapping.dataElements["codD_entityId"])
      },
    };
    setCauseOfDeaths(cods);
  }, []);

  useEffect(() => {
    causeOfDeaths && setCheckBoxUnderlying(
      causeOfDeaths[formMapping.dataElements["codA"]].underlying
        ? formMapping.dataElements["codA_underlying"]
        : causeOfDeaths[formMapping.dataElements["codB"]].underlying
        ? formMapping.dataElements["codB_underlying"]
        : causeOfDeaths[formMapping.dataElements["codC"]].underlying
        ? formMapping.dataElements["codC_underlying"]
        : causeOfDeaths[formMapping.dataElements["codD"]].underlying
        ? formMapping.dataElements["codD_underlying"]
        : ""
    );
  }, [causeOfDeaths])

  useEffect(() => {
    setFlagUnderlying(!flagUnderlying);
  }, [checkBoxUnderlying])

  useEffect(() => {
    if ( causeOfDeaths ) {
      fillUpUnderlying(causeOfDeaths);
    }
  }, [flagUnderlying]);

  const setValueIcdField = (cod) => {
    if (activeCauseOfDeath !== "") {
      mutateDataValue(currentEvent.event, activeCauseOfDeath.code, cod[activeCauseOfDeath.code].code);
      mutateDataValue(currentEvent.event, activeCauseOfDeath.label, cod[activeCauseOfDeath.code].label);
      mutateDataValue(currentEvent.event, activeCauseOfDeath.underlying, cod[activeCauseOfDeath.code].underlying);
      mutateDataValue(currentEvent.event, activeCauseOfDeath.entityId, cod[activeCauseOfDeath.code].entityId);

      // RESET activeCauseOfDeath 
      setActiveCauseOfDeath("");
    }
  }

  const fillUpUnderlying = (cod) => {
    let result = null;
    for (const [key, value] of Object.entries(cod)) {
      if (value.underlying) {
        result = value;
      }
    }

    const currentUnderlyingCoD = currentEvent && currentEvent.dataValues[formMapping.dataElements["underlyingCOD_code"]] ? currentEvent.dataValues[formMapping.dataElements["underlyingCOD_code"]] : "";
    // Save values of underlying
    if (currentEvent) {
      if (result) {
        if ( result.code !== currentUnderlyingCoD ) {
          mutateDataValue(currentEvent.event, formMapping.dataElements["underlyingCOD"], result.code);
          mutateDataValue(currentEvent.event, formMapping.dataElements["underlyingCOD_code"], result.code);
          mutateDataValue(currentEvent.event, formMapping.dataElements["underlyingCOD_chapter"], icd11Options.find( option => option.code === result.code).attributeValues.find( attrVal => attrVal.attribute.id === formMapping.optionAttributes["chapter"] ).value);
          mutateDataValue(currentEvent.event, formMapping.dataElements["underlyingCOD_group"], icd11Options.find( option => option.code === result.code).attributeValues.find( attrVal => attrVal.attribute.id === formMapping.optionAttributes["group"] ).value);
        }
      } else {
        if (currentEvent.isDirty) {
          mutateDataValue(currentEvent.event, formMapping.dataElements["underlyingCOD"], "");
          mutateDataValue(currentEvent.event, formMapping.dataElements["underlyingCOD_code"], "");
          mutateDataValue(currentEvent.event, formMapping.dataElements["underlyingCOD_chapter"], "");
          mutateDataValue(currentEvent.event, formMapping.dataElements["underlyingCOD_group"], "");
          mutateDataValue(currentEvent.event, formMapping.dataElements["underlyingCOD_report"], "");
        }
        else {
          mutateDataValue(currentEvent.event, formMapping.dataElements["underlyingCOD"], "");
          mutateDataValue(currentEvent.event, formMapping.dataElements["underlyingCOD_code"], "");
          mutateDataValue(currentEvent.event, formMapping.dataElements["underlyingCOD_chapter"], "");
          mutateDataValue(currentEvent.event, formMapping.dataElements["underlyingCOD_group"], "");
          mutateDataValue(currentEvent.event, formMapping.dataElements["underlyingCOD_report"], "");
          mutateEvent(currentEvent.event, "isDirty", false);
        }
        
      }
    }
  };

  // Render Inputs ( text, checkbox - note: not for code and label fields)
  const renderInputField = (de, extraFunction, placeholder) => {
    const foundDe = programStage.dataElements.find((dataElement) => dataElement.id === de);
    if(!foundDe){
      return null;
    }
    let disable = false;
    if (de === formMapping.dataElements["underlyingCOD"] || 
        de === formMapping.dataElements["underlyingCOD_chapter"] || 
        de === formMapping.dataElements["underlyingCOD_group"] || 
        de === formMapping.dataElements["underlyingCOD_code"]) 
    {
      disable = true;
    }
    if (
      de === formMapping.dataElements["codA_underlying"] ||
      de === formMapping.dataElements["codB_underlying"] ||
      de === formMapping.dataElements["codC_underlying"] ||
      de === formMapping.dataElements["codD_underlying"]
    ) {
      if (checkBoxUnderlying !== "" && checkBoxUnderlying !== de) {
        disable = true;
      }
    }
    return (
      <InputField
        value={currentEvent && currentEvent.dataValues[de] ? currentEvent.dataValues[de] : ""}
        change={(value) => {
          // check if input is underlying checkbox
          if (extraFunction) {
            let currentCauseOfDeath = causeOfDeaths;
            let id = null;
            switch (de) {
              case formMapping.dataElements["codA_underlying"]:
                id = formMapping.dataElements["codA"];
                break;
              case formMapping.dataElements["codB_underlying"]:
                id = formMapping.dataElements["codB"];
                break;
              case formMapping.dataElements["codC_underlying"]:
                id = formMapping.dataElements["codC"];
                break;
              case formMapping.dataElements["codD_underlying"]:
                id = formMapping.dataElements["codD"];
                break;
              default:
                break;
            }
            // if (value) {
            //   setCheckBoxUnderlying(de);
            // } else {
            //   setCheckBoxUnderlying("");
            // }
            // set underlying
            if (id) {
              for (const [key, val] of Object.entries(currentCauseOfDeath)) {
                if (key === id) {
                  val.underlying = value;
                } else {
                  val.underlying = false;
                }
              }
              // setFlagUnderlying(!flagUnderlying);
              setCauseOfDeaths({
                ...causeOfDeaths,
                ...currentCauseOfDeath
              });
            }
          }
          mutateDataValue(currentEvent.event, de, value);
        }}
        valueType={foundDe.valueType}
        // label={foundDe.displayFormName}
        valueSet={foundDe.valueSet}
        disabled={disable}
        placeholder={placeholder}
      />
    );
  };

  const renderCauseOfDeathsInputField = (codCode, codName, codEntityId, codUnderlying) => {
    return (
      <InputField
        addonBefore={
          currentEvent ? currentEvent.dataValues[codCode] ? <b>{currentEvent.dataValues[codCode]}</b> : "" : ""
        }
        value={currentEvent ? (currentEvent.dataValues[codName] ? currentEvent.dataValues[codName] : "") : ""}
        valueType="TEXT"
        click={() => {
          setActiveCauseOfDeath({
            // ...activeCauseOfDeath,
            label: codName,
            code: codCode,
            entityId: codEntityId,
            underlying: codUnderlying
          });
          setIcdTool(true);
        }}
        placeholder={"Click here for ICD 11 code"}
        allowClear={true}
        change={ value => {
          if ( value === "" ) {
            mutateDataValue(currentEvent.event, codCode, "");
            mutateDataValue(currentEvent.event, codName, "");
            mutateDataValue(currentEvent.event, codUnderlying, false);
            causeOfDeaths[codCode].code = "";
            causeOfDeaths[codCode].label = "";
            causeOfDeaths[codCode].underlying = false;
            setCauseOfDeaths({ ...causeOfDeaths });
          }
        } }
      />
    );
  };

  const renderOtherSection = section => {
    return (
      <div className="stage-section">
        <div className="stage-section-title">{section.name}</div>
        <div className="stage-section-content">
          <table className="other-section-table">
            <tbody>
            {
              section.dataElements.map( ({id}) => <tr>
                <td>{programMetadata.programStages[0].dataElements.find( de => de.id === id ).displayFormName}</td>
                <td>
                  {renderInputField(id)}
                </td>
              </tr>)
            }
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const detectUnderlyingCauseOfDeath = async () => {
    let headers = new Headers();
    headers.append("accept", "application/json");
    headers.append("API-Version", "v2");
    headers.append("Accept-Language", keyUiLocale);
    headers.append("Authorization", `Bearer ${icdApi_clientToken}`);
    const icdApiUrl = `https://id.who.int/icd/release/11/2023-01/doris?causeOfDeathCodeA=${causeOfDeaths[formMapping.dataElements["codA"]].code}&causeOfDeathCodeB=${causeOfDeaths[formMapping.dataElements["codB"]].code}&causeOfDeathCodeC=${causeOfDeaths[formMapping.dataElements["codC"]].code}&causeOfDeathCodeD=${causeOfDeaths[formMapping.dataElements["codD"]].code}`;
    const result = await fetch(icdApiUrl, {
      headers: headers
    })
    .then((result) => {
      return result.json();
    })
    .catch((err) => {
      return err;
    });
    const underlyingCode = result.stemCode;
    if ( underlyingCode !== "" ) {
      const cods = {
        [formMapping.dataElements["codA"]]: {
          ...causeOfDeaths[formMapping.dataElements["codA"]],
          underlying: underlyingCode === causeOfDeaths[formMapping.dataElements["codA"]].code,
        },
        [formMapping.dataElements["codB"]]: {
          ...causeOfDeaths[formMapping.dataElements["codB"]],
          underlying: underlyingCode === causeOfDeaths[formMapping.dataElements["codB"]].code,
        },
        [formMapping.dataElements["codC"]]: {
          ...causeOfDeaths[formMapping.dataElements["codC"]],
          underlying: underlyingCode === causeOfDeaths[formMapping.dataElements["codC"]].code,
        },
        [formMapping.dataElements["codD"]]: {
          ...causeOfDeaths[formMapping.dataElements["codD"]],
          underlying: underlyingCode === causeOfDeaths[formMapping.dataElements["codD"]].code,
        }
      };

      mutateDataValue(currentEvent.event, formMapping.dataElements["codA_underlying"], cods[formMapping.dataElements["codA"]].underlying);
      mutateDataValue(currentEvent.event, formMapping.dataElements["codB_underlying"], cods[formMapping.dataElements["codB"]].underlying);
      mutateDataValue(currentEvent.event, formMapping.dataElements["codC_underlying"], cods[formMapping.dataElements["codC"]].underlying);
      mutateDataValue(currentEvent.event, formMapping.dataElements["codD_underlying"], cods[formMapping.dataElements["codD"]].underlying);
      mutateDataValue(currentEvent.event, formMapping.dataElements["underlyingCOD_report"], result.report);

      setCauseOfDeaths(cods);
    };
  }

  const getUcodResult = () => currentEvent && currentEvent.dataValues[formMapping.dataElements["underlyingCOD_report"]] ? currentEvent.dataValues[formMapping.dataElements["underlyingCOD_report"]] : t("note_WHO_digital_open_rule_integrated_cause_of_death_selection_Doris");

  return (
    <div className="stage-section-container">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Icd11Tool
        visible={icdTool}
        setVisible={setIcdTool}
        onSelect={(cod) => {
          const selectedCod = {
            code: cod.code,
            label: cod.title
              .replace(/<em class='found'>/g, "")
              .replace(/<em class='nonwbe'>/g, "")
              .replace(/<[/]em>/g, ""),
            uri: cod.foundationUri
          };
          causeOfDeaths[activeCauseOfDeath.code].code = selectedCod.code;
          causeOfDeaths[activeCauseOfDeath.code].label = selectedCod.label;
          causeOfDeaths[activeCauseOfDeath.code].underlying = false;
          causeOfDeaths[activeCauseOfDeath.code].entityId = selectedCod.uri.split("/")[selectedCod.uri.split("/").length - 1];
          setValueIcdField(causeOfDeaths);
          setCauseOfDeaths({ ...causeOfDeaths });
        }}
        defaultValue={{
          title: (currentEvent && currentEvent.dataValues[activeCauseOfDeath.label]) || "",
          code: (currentEvent && currentEvent.dataValues[activeCauseOfDeath.code]) || ""
        }}
      />
      <div className="section-title section-title-stage">
        <FontAwesomeIcon icon={faNotesMedical} style={{ fontSize: 15 }} />
        &nbsp; {t("causeOfDeath")}
      </div>
      <div className="stage-sections-container">
        <Tabs defaultActiveKey="1" type="card">
          <TabPane tab="Frame A" key="a">
            <div className="tab-container">
              <div className="stage-section">
                <div className="stage-section-title">{t("medicalData")}</div>
                <div className="stage-section-content">
                  <table className="medical-data-table">
                    <tbody>
                      <tr>
                        <td
                          colSpan="5"
                          style={{
                            fontWeight: "bold",
                            textAlign: "left",
                            backgroundColor: "#f5f5f5"
                          }}
                        >
                        {
                          t("reasonLeadingToDeath")
                        }
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="3" style={{ width: "70%" }}>
                        {t("causeOfDeath")}
                        </td>
                        <td>{t("timeFromOnsetToDeath")}</td>
                        <td>{t("underlying")}</td>
                      </tr>
                      <tr>
                        <td>{t("immediate")}</td>
                        <td>A</td>
                        <td>
                          <div className="two-fields-container">
                            {renderInputField(formMapping.dataElements["codA_other_name"],undefined,"Enter Diagnosis (Free text)")}
                            {/* {renderInputField(formMapping.dataElements["codA_other_name"])} */}
                            {renderCauseOfDeathsInputField(
                              formMapping.dataElements["codA"],
                              formMapping.dataElements["codA_name"],
                              formMapping.dataElements["codA_entityId"],
                              formMapping.dataElements["codA_underlying"]
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="two-fields-container">
                            {renderInputField(formMapping.dataElements["codA_time"])}
                            {renderInputField(formMapping.dataElements["codA_periodType"])}
                          </div>
                        </td>
                        <td>{renderInputField(formMapping.dataElements["codA_underlying"], "underlying")}</td>
                      </tr>
                      {/* <tr>
                        <td
                          colSpan="5"
                          style={{
                            fontWeight: "bold",
                            textAlign: "left",
                            backgroundColor: "#f5f5f5"
                          }}
                        >
                        {
                          t("reportDirection")
                        }
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="3">{t("causeOfDeath")}</td>
                        <td>{t("timeFromOnsetToDeath")}</td>
                        <td>{t("underlying")}</td>
                      </tr> */}
                      <tr>
                        <td>{t("dueTo")}</td>
                        <td>B</td>
                        <td>
                          <div className="two-fields-container">
                            {renderInputField(formMapping.dataElements["codB_other_name"],undefined,"Enter Diagnosis (Free text)")}
                            {/* {renderInputField(formMapping.dataElements["codB_other_name"])} */}
                            {renderCauseOfDeathsInputField(
                              formMapping.dataElements["codB"],
                              formMapping.dataElements["codB_name"],
                              formMapping.dataElements["codB_entityId"],
                              formMapping.dataElements["codB_underlying"]
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="two-fields-container">
                            {renderInputField(formMapping.dataElements["codB_time"])}
                            {renderInputField(formMapping.dataElements["codB_periodType"])}
                          </div>
                        </td>
                        <td>{renderInputField(formMapping.dataElements["codB_underlying"], "underlying")}</td>
                      </tr>
                      <tr>
                        <td>{t("dueTo")}</td>
                        <td>C</td>
                        <td>
                          <div className="two-fields-container">
                            {renderInputField(formMapping.dataElements["codC_other_name"],undefined,"Enter Diagnosis (Free text)")}
                            {/* {renderInputField(formMapping.dataElements["codC_other_name"])} */}
                            {renderCauseOfDeathsInputField(
                              formMapping.dataElements["codC"],
                              formMapping.dataElements["codC_name"],
                              formMapping.dataElements["codC_entityId"],
                              formMapping.dataElements["codC_underlying"]
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="two-fields-container">
                            {renderInputField(formMapping.dataElements["codC_time"])}
                            {renderInputField(formMapping.dataElements["codC_periodType"])}
                          </div>
                        </td>
                        <td>{renderInputField(formMapping.dataElements["codC_underlying"], "underlying")}</td>
                      </tr>
                      <tr>
                        <td>{t("dueTo")}</td>
                        <td>D</td>
                        <td>
                          <div className="two-fields-container">
                            {renderInputField(formMapping.dataElements["codD_other_name"],undefined,"Enter Diagnosis (Free text)")}
                            {/* {renderInputField(formMapping.dataElements["codD_other_name"])} */}
                            {renderCauseOfDeathsInputField(
                              formMapping.dataElements["codD"],
                              formMapping.dataElements["codD_name"],
                              formMapping.dataElements["codD_entityId"],
                              formMapping.dataElements["codD_underlying"]
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="two-fields-container">
                            {renderInputField(formMapping.dataElements["codD_time"])}
                            {renderInputField(formMapping.dataElements["codD_periodType"])}
                          </div>
                        </td>
                        <td>{renderInputField(formMapping.dataElements["codD_underlying"], "underlying")}</td>
                      </tr>
                      <tr>
                        <td
                          colSpan="5"
                          style={{
                            fontWeight: "bold",
                            textAlign: "left",
                            backgroundColor: "#f5f5f5"
                          }}
                        >
                        {
                          t("otherReasonLeadingToDeath")
                        }
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="5">{renderInputField(formMapping.dataElements["codOther"])}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="stage-section">
                <div className="stage-section-title">{t("results")}</div>
                <div className="stage-section-content">
                  <table className="results-table">
                    <tbody>
                      <tr>
                        <td>{t("icd11")}</td>
                        <td className="unselectable-field">
                          {renderInputField(formMapping.dataElements["underlyingCOD_code"])}
                        </td>
                      </tr>
                      <tr>
                        <td>{t("underlyingCOD")}</td>
                        <td className="unselectable-field">
                          {renderInputField(formMapping.dataElements["underlyingCOD"])}
                        </td>
                      </tr>
                      <tr>
                        <td>{t("icd11Chapter")}</td>
                        <td className="unselectable-field">
                          {renderInputField(formMapping.dataElements["underlyingCOD_chapter"])}
                        </td>
                      </tr>
                      <tr hidden="hidden">
                        <td>{t("icd11Grouping")}</td>
                        <td className="unselectable-field">
                          {renderInputField(formMapping.dataElements["underlyingCOD_group"])}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="results-compute">
                    <Button onClick={() => detectUnderlyingCauseOfDeath()}>{
                      t("compute")
                    }</Button> 
                    <div><pre>{getUcodResult()}</pre></div>
                  </div>
                </div>
              </div>
              {formMapping.otherSections.frameA && formMapping.otherSections.frameA.map( section => renderOtherSection(section) )}
            </div>
          </TabPane>
          <TabPane tab="Frame B" key="b">
            <div className="tab-container">
              {formMapping.sections.find(({name}) => name === "Surgery") && (<div className="stage-section">
                <div className="stage-section-title">{t("surgery")}</div>
                <div className="stage-section-content">
                  <table className="surgery-table">
                    <tbody>
                      <tr>
                        <td>{t("surgeryWithin4months")}</td>
                        <td>{renderInputField(formMapping.dataElements["surgery"])}</td>
                        <td>{t("surgeryDate")}</td>
                        <td>{renderInputField(formMapping.dataElements["surgery_date"])}</td>
                      </tr>
                      <tr>
                        <td colSpan="1">
                        {
                          t("surgeryReason")
                        }
                        </td>
                        <td colSpan="3">{renderInputField(formMapping.dataElements["surgery_reason"])}</td>
                      </tr>
                      <tr>
                        <td>{t("autopsy")}</td>
                        <td>{renderInputField(formMapping.dataElements["autopsy"])}</td>
                        <td>
                        {
                          t("findings")
                        }
                        </td>
                        <td>{renderInputField(formMapping.dataElements["autopsy_specified"])}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>)}
              {formMapping.sections.find(({name}) => name === "Manner of death") && (<div className="stage-section">
                <div className="stage-section-title">{t("mannerOfDeath")}</div>
                <div className="stage-section-content">
                  <table className="manner-death-table">
                    <tbody>
                      <tr>
                        <td>{t("mannerOfDeath")}</td>
                        <td>{renderInputField(formMapping.dataElements["mannerOfDeath"])}</td>
                      </tr>
                      <tr>
                        <td>{t("posisoning")}</td>
                        <td>{renderInputField(formMapping.dataElements["dateOfInjury"])}</td>
                      </tr>
                      <tr>
                        <td>{t("describe")}</td>
                        <td>{renderInputField(formMapping.dataElements["externalCause"])}</td>
                      </tr>
                      <tr>
                        <td>{t("occurrencePlace")}</td>
                        <td>{renderInputField(formMapping.dataElements["externalCause_place"])}</td>
                      </tr>
                      <tr>
                        <td>{t("occurrenceSpecifyPlace")}</td>
                        <td>{renderInputField(formMapping.dataElements["externalCause_specifiedPlace"])}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>)}
              {(formMapping.sections.find(({name}) => name === "Fetal or infant death") && isShowFetalOrInfantDeath()) && (<div className="stage-section">
                <div className="stage-section-title">{t("fetalOrInfantDeath")}</div>
                <div className="stage-section-content">
                  <table className="infant-death-table">
                    <tbody>
                      <tr>
                        <td>{t("pregnant")}</td>
                        <td>{renderInputField(formMapping.dataElements["multiple_pregnancies"])}</td>
                        <td>{t("stillborn")}</td>
                        <td>{renderInputField(formMapping.dataElements["stillborn"])}</td>
                      </tr>
                      <tr>
                        <td>{t("hoursSurvived")}</td>
                        <td>{renderInputField(formMapping.dataElements["hours_newborn_survived"])}</td>
                        <td>{t("birthWeight")}</td>
                        <td>{renderInputField(formMapping.dataElements["birth_weight"])}</td>
                      </tr>
                      <tr>
                        <td>{t("pregnantWeeks")}</td>
                        <td>{renderInputField(formMapping.dataElements["completedWeeks_pregnancy"])}</td>
                        <td>{t("motherAge")}</td>
                        <td>{renderInputField(formMapping.dataElements["age_mother"])}</td>
                      </tr>
                      <tr>
                        <td colSpan="1">{t("perinatal")}</td>
                        <td colSpan="3">{renderInputField(formMapping.dataElements["pregnancy_conditions"])}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>)}
              {(formMapping.sections.find(({name}) => name === "Maternal death") && isShowMaternalDeath()) && (<div className="stage-section">
                <div className="stage-section-title">{t("maternal")}</div>
                <div className="stage-section-content">
                  <table className="maternal-death-table">
                    <tbody>
                      <tr>
                        <td>{t("pregnancyLastYear")}</td>
                        <td>{renderInputField(formMapping.dataElements["pregnancy_inLastYear"])}</td>
                      </tr>
                      <tr>
                        <td>{t("timePregnancy")}</td>
                        <td>{renderInputField(formMapping.dataElements["time_from_pregnancy"])}</td>
                      </tr>
                      <tr>
                        <td>{t("pregnancyToDeath")}</td>
                        <td>{renderInputField(formMapping.dataElements["pregnancy_contributed_to_death"])}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>)}
              {formMapping.otherSections.frameB && formMapping.otherSections.frameB.map( section => renderOtherSection(section) )}
            </div>
          </TabPane>
        </Tabs>
        <div className="stage-save-button-container">
          <ButtonGroup>
            <Button
              type="primary"
              onClick={async () => {
                setLoading(true);
                const { currentEvents } = generateDhis2Payload(data, programMetadata);
                await dataApi.pushEvents({ events: currentEvents });

                // Dirty Check
                mutateEvent(currentEvents[0].event,"isDirty",false);

                // Notification
                setLoading(false);
                message.success("Saved Successfully!");
              }}
            >
            {
              t("save")
            }
            </Button>
            <Button
              onClick={async () => {
                setLoading(true);
                const { currentEvents } = generateDhis2Payload(data, programMetadata);
                mutateEvent(currentEvents[0].event,"dataValues",{});
                setLoading(false);
              }}
            >{
              t("clear")
            }</Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    metadata: state.metadata,
    data: state.data
  };
};
const mapDispatchToProps = { mutateEvent, mutateDataValue, initNewEvent };

export default connect(mapStateToProps, mapDispatchToProps)(Stage);
