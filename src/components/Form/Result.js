import { connect } from "react-redux";

import { useTranslation } from "react-i18next";

import InputField from "../InputField";
import { Tabs } from "antd";
import "./stage.css";

const Result = ({
    metadata,
    data
}) => {
    // MermaidChart
    const charts = {
        ReportRuleFlow: `graph TD;
        START([Starting point])
        START -.-> SP4
        SP4["SP4"] -- "TSP: 5A11" --> M4
        M4["M4"] -- "TUC:<br/>5A11/GB61.Z/GB60.Z/BA00.Z<br/>(Substitute<br/>5A11>5A11/GB61.Z/GB60.Z/BA00.Z)" --> END([5A11/GB61.Z/GB60.Z/BA00.Z is the underlying<br/>cause of death.])
        SP4@{ shape: rect, label: "<div style='cursor:pointer;' title='SP4: 5A11 is the starting point of the first-mentioned sequence (GB61.Z due to GB60.Z due to 5A11), which is selected as the tentative starting point (TSP).'>SP4 </div>"}
        M4@{ shape: rect, label: "<div style='cursor:pointer;' title='GB61.Z, GB60.Z, BA00.Z are manifestations of the selected underlying cause of death 5A11 and it is added as a postcoordination - 5A11>5A11/GB61.Z/GB60.Z/BA00.Z. The postcoordinations - GB61.Z, GB60.Z, BA00.Z - were selected from conditions that are potential manifestations of the tentative underlying cause - 5A11, manual check of their validity is needed.'>M4 </div>"}
        `,
        ReportRuleProgression: `sequenceDiagram
        participant SP4
        participant M4
        Note over SP4: SP4: 5A11 is the<br/>starting point of the<br/>first-mentioned sequence<br/>(GB61.Z due to GB60.Z<br/>due to 5A11), which is<br/>selected as the<br/>tentative starting point<br/>(TSP).
        SP4->>M4: TSP: 5A11
        Note over M4: GB61.Z, GB60.Z, BA00.Z<br/>are manifestations of<br/>the selected underlying<br/>cause of death 5A11 and<br/>it is added as a<br/>postcoordination -<br/>5A11>5A11/GB61.Z/GB60.Z/BA00.Z.<br/>The postcoordinations -<br/>GB61.Z, GB60.Z, BA00.Z -<br/>were selected from<br/>conditions that are<br/>potential manifestations<br/>of the tentative<br/>underlying cause - 5A11,<br/>manual check of their<br/>validity is needed.
        M4->>UCOD: TUC:<br/>5A11/GB61.Z/GB60.Z/BA00.Z<br/>(Substitute<br/>5A11>5A11/GB61.Z/GB60.Z/BA00.Z)
        Note over UCOD: <br/>5A11/GB61.Z/GB60.Z/BA00.Z<br/>is the<br/>underlying<br/>cause of<br/>death.
        `,
    };

    const { t } = useTranslation();

    const { programMetadata, formMapping } = metadata;

  const { currentTei, currentEnrollment, currentEvents } = data;

    const currentEvent = currentEvents.find((event) => {
        return event.programStage === formMapping.programStage;
    });

    const programStage = programMetadata.programStages.find(
        (ps) => ps.id === formMapping.programStage
    );

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

        return (
          <InputField
            value={currentEvent && currentEvent.dataValues[de] ? currentEvent.dataValues[de] : ""}
            // change={(value) => {
            //   // check if input is underlying checkbox
            //   mutateDataValue(currentEvent.event, de, value);
            // }}
            valueType={foundDe.valueType}
            // label={foundDe.displayFormName}
            valueSet={foundDe.valueSet}
            disabled={disable}
            placeholder={placeholder}
          />
        );
    };

    const getUcodResult = () => currentEvent && currentEvent.dataValues[formMapping.dataElements["underlyingCOD_report"]] ? currentEvent.dataValues[formMapping.dataElements["underlyingCOD_report"]] : "";
    const getUcodWarning = () => currentEvent && currentEvent.dataValues[formMapping.dataElements["underlyingCOD_warning"]] ? currentEvent.dataValues[formMapping.dataElements["underlyingCOD_warning"]] : "";

    return (
        <div className="stage-section">
            {/* <div className="stage-section-title">{t("results")}</div> */}
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
                { (currentEvent && (currentEvent.dataValues[formMapping.dataElements["underlyingCOD_report"]] || getUcodWarning() !== "")) && <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Textual report" key="1">
                        <div className="result-section-title">Detailed explanation</div>
                        <div>
                            {currentTei.attributes[formMapping.attributes["sex"]] ? currentTei.attributes[formMapping.attributes["sex"]] : ""}, {currentTei.attributes[formMapping.attributes["age"]] ? currentTei.attributes[formMapping.attributes["age"]] : ""}
                        </div>
                        {
                            getUcodWarning() !== "" && <>
                                <div><strong>Warnings</strong></div>
                                <div className="results-compute">
                                    <div><pre style={{whiteSpace: "pre-wrap"}}>{getUcodWarning()}</pre></div>
                                </div>
                            </>
                        }
                        { 
                            getUcodResult() !== "" && <>
                                <div><strong>Short Coding Report</strong></div>
                                <div className="results-compute">
                                    <div><pre style={{whiteSpace: "pre-wrap"}}>{getUcodResult()}</pre></div>
                                </div>
                            </>
                        }
                    </Tabs.TabPane>
                </Tabs> }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      metadata: state.metadata,
      data: state.data
    };
};
  
export default connect(mapStateToProps)(Result);