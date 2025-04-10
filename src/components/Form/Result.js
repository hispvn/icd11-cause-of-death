import { connect } from "react-redux";

import { useTranslation } from "react-i18next";

import InputField from "../InputField";
import { Button } from "antd";
import "./stage.css";

const Result = ({
    metadata,
    data
}) => {
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
                {
                    (currentEvent && (currentEvent.dataValues[formMapping.dataElements["underlyingCOD_report"]] || getUcodWarning() !== "")) && <>
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
                    </>
                }
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