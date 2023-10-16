import { useState, useEffect } from "react";

import { Popover } from "antd";
import { 
  Button, Select, MenuItem, 
  FormControl, 
  InputLabel, 
  Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, 
  Divider, 
  Slide 
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion,faCircleInfo,faClose,faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Components } from "tracker-capture-app-core";
import { useTranslation } from "react-i18next";
import "./index.css";

/* REDUX */
import { connect } from "react-redux";
import { setSelectedOrgUnit } from "../../redux/actions/metadata";
import { 
  initNewData, 
  mutateTei,
  mutateEnrollment,
  mutateEvent,
} from "../../redux/actions/data";
import { changeRoute } from "../../redux/actions/route";

import WarningDialog from "../Form/WarningDialog";

/*       */
const { OrgUnitSelector } = Components;
// const { Option } = Select;

const ControlBar = ({
  metadata,
  setSelectedOrgUnit,
  changeRoute,
  initNewData,
  mutateTei,
  mutateEnrollment,
  mutateEvent,
  route,
  userRoles,
  currentEventId,
  isDirty
}) => {
  const [routeText,setRouteText] = useState("");

  const { selectedOrgUnit, programMetadata } = metadata;
  const { t } = useTranslation();

  const [about,setAbout] = useState(false);
  const [help,setHelp] = useState(false);
  const [doc,setDoc] = useState(null);
  const [exitWarning,setExitWarning]=useState(false);

  useEffect( () => {
    console.log(userRoles);
  }, [userRoles])

  return (
    <div className="control-bar-container">
      <Popover
        trigger="click"
        content={
          <div className="orgunit-selector-container">
            <OrgUnitSelector
              selectedOrgUnit={selectedOrgUnit}
              handleSelectOrgUnit={(orgUnit) => {
                setSelectedOrgUnit(orgUnit);
                if (isDirty) {
                  setRouteText("list");
                  setExitWarning(true);
                }
                else {
                  changeRoute("list");
                }
              }}
            />
          </div>
        }
        onVisibleChange={(visible) => {
          console.log(visible);
        }}
        // onCancel={() => {
        //   setSelectedOrgUnit(null);
        // }}
        // onConfirm={() => {
        //   console.log("confirm");
        // }}
        // okText={t("ok")}
        // cancelText={t("cancel")}
      >
        <div className="button-container">
          <Button variant="outlined" disabled={!programMetadata}>
            {selectedOrgUnit ? (
              <>
                {t("orgUnit")}: <b>{selectedOrgUnit.displayName} </b>
              </>
            ) : (
              t("selectOrgUnit")
            )}
          </Button>
        </div>
      </Popover>
      <div className="button-container">
        <Button
          variant="contained"
          disabled={
            !selectedOrgUnit ||
            !programMetadata.organisationUnits.find(
              (ou) => ou.id === selectedOrgUnit.id
            )
          }
          onClick={() => {
            if (isDirty) {
              setRouteText("form");
              setExitWarning(true);
            }
            else {
              changeRoute("form");
              initNewData(selectedOrgUnit, programMetadata);
            }
          }}
        >
          {t("newRegistration")}
        </Button>
      </div>
      <div className="button-container">
        <Button 
          disabled={!programMetadata}
          onClick={() => {
          if (isDirty) {
            setRouteText(route === "search" ? "list" : "search");
            setExitWarning(true);
          }
          else {
            changeRoute(route === "search" ? "list" : "search");
          }
          }}
        >
          { route === "search" ? "List" : t("search")}
        </Button>
      </div>
      <div className="button-container menu-button-container">
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">Menu</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={route ? (route === "form" || route === "search" ? "list" : route) : "list"}
          label="Menu"
          style={{ width: 150 }}
          onChange={(value) => {
            if (isDirty) {
              setRouteText(value.target.value);
              setExitWarning(true);
            }
            else {
              changeRoute(value.target.value);
            }
          }}
        >
          {programMetadata !== null && ( userRoles.data || userRoles.admin ) && <MenuItem value="list">{t("dataEntry")}</MenuItem>}
          {programMetadata !== null && ( userRoles.view || userRoles.admin ) && <MenuItem value="export">{t("anacodExport")}</MenuItem>}
          {programMetadata !== null && ( userRoles.view || userRoles.admin ) && <MenuItem value="dashboard">{t("dashboard")}</MenuItem>}
          { userRoles.admin && <MenuItem value="administration">{t("administration")}</MenuItem> }
          { userRoles.admin && <MenuItem value="translation">{t("translation")}</MenuItem> }
        </Select>
      </FormControl>
        {/* <div className="exit-app-button">
          <Button
            onClick={() => {
              window.location.href = "../../../dhis-web-dashboard/";
            }}
          >
            {t("exitApp")}
          </Button>
        </div> */}
        <div className="exit-app-button">
          <IconButton 
            size="small"
            onClick={ () => {
              setHelp(true);
            }}
          >
            <FontAwesomeIcon icon={faCircleQuestion} />
          </IconButton>
        </div>
        <div className="exit-app-button">
          <IconButton 
            size="small"
            onClick={() => {
              setAbout(true);
            }}
          >
            <FontAwesomeIcon icon={faCircleInfo} />
          </IconButton>
        </div>
      </div>
      <Dialog 
        open={about}
        fullWidth
        maxWidth="sm"
        onClose={() => {
          setAbout(false);
        }}
      >
        <DialogTitle>
          About
          <IconButton
            aria-label="close"
            onClick={() => {
              setAbout(false);
            }}
            sx={{
              position: "absolute",
              right: 8,
              top: 12
            }}
          >
            <FontAwesomeIcon icon={faClose} fontSize={24} />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
            <div><strong>Cause of Death App</strong> <i>(version 1.0.1)</i></div>
            <div>Developed of HISP Vietnam in collaboration with University of Oslo and WHO</div>
            <br/>
            <div>DHIS2 version tested:</div>
            <ul>
              <li>2.35</li>
              <li>2.36</li>
              <li>2.37</li>
              <li>2.38</li>
              <li>2.39</li>
              <li>2.40</li>
            </ul>
        </DialogContent>
      </Dialog>
      <Dialog
        open={help}
        fullWidth
        maxWidth="xl"
        onClose={() => {
          setHelp(false);
          setDoc(null);
        }}
      >
        <DialogTitle>
          Help
          <IconButton
            aria-label="close"
            onClick={() => {
              setHelp(false);
              setDoc(null);
            }}
            sx={{
              position: "absolute",
              right: 8,
              top: 12
            }}
          >
            <FontAwesomeIcon icon={faClose} fontSize={24} />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <div className="help-container">
            <Slide direction="right" in={!doc} mountOnEnter unmountOnExit>
              <div className="help-homepage">
                <div className="help-title">User Manual</div>
                <div className="help-subtitle">Cause of Death App (version 1.0.1)</div>
                <br/>
                <br/>
                <br/>
                <div className="help-title">App features</div>
                <ul className="help-listing">
                  <li
                    onClick={() => {
                      setDoc({
                        label: "dataentry",
                        type: "googleDoc",
                        url: "https://docs.google.com/document/d/e/2PACX-1vT7is5PmIEG0jVWfnT7kGJrwu0Ihj0rGlBsMA8JZWmwFdkK8YHAAW-WxL6FkgbrGX5cAPpyVUChVDlJ/pub?embedded=true"
                      })
                    }}
                  >
                    Data Entry
                  </li>
                  <li
                    onClick={() => {
                      setDoc({
                        label: "anacod",
                        type: "googleDoc",
                        url: "https://docs.google.com/document/d/e/2PACX-1vQdr2wU1vpl_Aq0qR3tzx4_Ye2MeS4Vl5ngVw4_-URLG9P0y6zpLHtAJj4rJh47QGdN0az0XbbuZt6t/pub?embedded=true"
                      })
                    }}
                  >
                    AnaCoD Export
                  </li>
                  <li
                    onClick={() => {
                      setDoc({
                        label: "dashboard",
                        type: "googleDoc",
                        url: "https://docs.google.com/document/d/e/2PACX-1vRtwuTMcvKmUBWKoI1Cgt9WLjGLiuA9Ti_0ii9HVSpcMRRlh4rBd99GpalRytZp4N6P05K9QYvYOm62/pub?embedded=true"
                      })
                    }}
                  >
                    Dashboard
                  </li>
                  <li
                    onClick={() => {
                      setDoc({
                        label: "translation",
                        type: "googleDoc",
                        url: "https://docs.google.com/document/d/e/2PACX-1vRTLVO0CS8SyEo7U_WgGMpyZDwFanKJ0ov7nRRyW5p64q4HT563pS_ZgAbf7V2drkaeQlcojnsTQfb4/pub?embedded=true"
                      })
                    }}
                  >
                    Translation
                  </li>
                  <li
                    onClick={() => {
                      setDoc({
                        label: "administration",
                        type: "googleDoc",
                        url: "https://docs.google.com/document/d/e/2PACX-1vSSVBG46xrDYjA1c8gkl3RdY3JcgLgLhf-rQPJHtvf67CnBMoSdlg14vxpKXb1yDpLB8sFTQo1JBJEf/pub?embedded=true"
                      })
                    }}
                  >
                    Administration
                  </li>
                  <li
                    onClick={() => {
                      setDoc({
                        label: "installation",
                        type: "googleDoc",
                        url: "https://docs.google.com/document/d/e/2PACX-1vSQ1HmJ1_VpuKiuWd23N14kDbWLZwyqwqLmqLxAx_aFF5PIqw7w-iCDjIyeaa_O-A/pub?embedded=true"
                      })
                    }}
                  >
                    Installation
                  </li>
                </ul>
              </div>
            </Slide>
            <Slide direction="left" in={doc} mountOnEnter unmountOnExit>
              <div className="help-content">
              {
                doc && <iframe src={doc.url + `&time=${new Date()}`} width="750px" height="100%" frameBorder="0"></iframe>
              }
              </div>
            </Slide>
          </div>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              setDoc(null);
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
        </DialogActions>
      </Dialog>
      <WarningDialog 
        open={exitWarning}
        handleCancel={() => {
          setExitWarning(false);
        }}
        handleOk={() => {
          if(routeText==="form") {
            initNewData(selectedOrgUnit, programMetadata);
          }
          else {
            mutateTei("isDirty", false);
            mutateEnrollment("isDirty", false);
            if(currentEventId) { mutateEvent(currentEventId, "isDirty", false); }
          }
          setExitWarning(false);
          changeRoute(routeText);
        }}
      ></WarningDialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    metadata: state.metadata,
    route: state.route,
    userRoles: state.user.userRoles,
    isDirty: (state.data.currentEnrollment && state.data.currentEnrollment.isDirty) || (state.data.currentTei && state.data.currentTei.isDirty) || (state.data.currentEvents.length > 0 && state.data.currentEvents[0].isDirty),
    currentEventId: state.data.currentEvents.length > 0 ? state.data.currentEvents[0].event : null
  };
};

const mapDispatchToProps = { 
  setSelectedOrgUnit, changeRoute, initNewData, 
  mutateTei,
  mutateEnrollment,
  mutateEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlBar);
