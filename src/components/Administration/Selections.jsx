import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCog } from "@fortawesome/free-solid-svg-icons";
import { Radio, Input, Result, Button } from "antd";
/* REDUX */
import { connect } from "react-redux";
import { changeStep, changeIcd11ToolUrl, changeInstallationType } from "../../redux/actions/admin";
import { useTranslation } from "react-i18next";
/*       */

const Selections = ({ 
  changeStep, 
  changeIcd11ToolUrl, 
  changeInstallationType, 
  admin,
  metadata: {
    orgUnits,
    users
  } 
}) => {
  const { t } = useTranslation();
  const onChangeRadio = (e) => {
    if (e.target.value === "global") {
      changeIcd11ToolUrl("https://icd11restapi-developer-test.azurewebsites.net/icd/", "global");
    } else {
      changeIcd11ToolUrl("", e.target.value);
    }
  };
  const onChangeInput = (e) => {
    let type = admin.icd11ToolUrl.type;
    changeIcd11ToolUrl(e.target.value, type);
  };
  return (
    <div className="administration-selections-container">
      {( orgUnits.length > 0 && users.filter(({organisationUnits}) => organisationUnits > 0).length > 0 ) ? 
          <>  
            <div className="administration-selections-title">{t("selectionTitle")}</div>
            <div className="administration-selections-title">
              <Radio.Group name="radiogroup" onChange={onChangeRadio} value={admin.icd11ToolUrl.type}>
                <Radio value={"global"}>{t("globalICDTool")}</Radio>
                <Radio value={"other"}>{t("otherICDTool")}</Radio>
              </Radio.Group>
            </div>
            <div className="administration-selections-title">
              <Input
                placeholder="Input Url"
                style={{ width: "400px" }}
                value={admin.icd11ToolUrl.url}
                disabled={admin.icd11ToolUrl.type === "global" ? true : false}
                onChange={onChangeInput}
              />
            </div>
            <div className="administration-selections-buttons-container">
              <div
                onClick={() => {
                  changeInstallationType("default");
                  changeStep(4);
                }}
              >
                <div className="administration-selection">{t("defaultInstallation")}</div>
                <FontAwesomeIcon icon={faCheck} style={{ fontSize: 80, color: "#ffffff" }} />
                <div className="administration-selection-info">{t("defaultInstallationInfo")}</div>
              </div>
              <div
                onClick={() => {
                  changeInstallationType("custom");
                  changeStep(1);
                }}
              >
                <div className="administration-selection">{t("customInstallation")}</div>
                <FontAwesomeIcon icon={faCog} style={{ fontSize: 80, color: "#ffffff" }} />
                <div className="administration-selection-info">{t("customInstallationInfo")}</div>
              </div>
            </div>
            <div className="administration-selections-title">{t("installWithDocker")}</div>
            <div style={{ width: "100%", textAlign: "center" }}>
              <a target="_blank" href="https://icd.who.int/icdapi/docs2/ICDAPI-DockerContainer">
                https://icd.who.int/icdapi/docs2/ICDAPI-DockerContainer
              </a>
            </div>
          </> :
          <Result
            status="warning"
            title={t("installationWarning")}
            subTitle={t("installationWarningTitle")}
            extra={
              <Button type="primary"
                onClick={() => {
                  window.location.href = "../../../dhis-web-maintenance/";
                }}
              >
                {t("backToMaintenance")}
              </Button>
            }
          />
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    admin: state.admin,
    metadata: state.metadata
  };
};

const mapDispatchToProps = {
  changeStep,
  changeIcd11ToolUrl,
  changeInstallationType
};
export default connect(mapStateToProps, mapDispatchToProps)(Selections);
