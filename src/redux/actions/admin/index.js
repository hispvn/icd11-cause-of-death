import {
  CHANGE_STEP,
  CHANGE_INSTALLATION_TYPE,
  CHANGE_TEAS,
  CHANGE_DATA_ELEMENTS,
  CHANGE_ASSIGN_USERS,
  ASSIGN_ORGUNITS,
  CHANGE_ICD11_TOOL_URL,
  CHANGE_CERTIFICATE_TEMPLATE,
  SET_CERTIFICATE_LOGO,
  CHANGE_TRACKED_ENTITY_TYPE,
  SET_FEMALE_SECTION,
  SET_INSTALLING_FILE,
  CHANGE_FULLNAMEOPTION
} from "./type";

export const changeStep = (step) => ({
  type: CHANGE_STEP,
  payload: {
    step
  }
});

export const changeInstallationType = (type) => ({
  type: CHANGE_INSTALLATION_TYPE,
  payload: {
    type
  }
});

export const changeTrackedEntityTypes = (trackedEntityAttributes) => ({
  type: CHANGE_TEAS,
  payload: {
    trackedEntityAttributes
  }
});

export const changeDataElements = (frame) => (section) => ({
  type: CHANGE_DATA_ELEMENTS,
  payload: {
    frame,
    section
  }
});

export const changeAssignUsers = (group) => (users) => ({
  type: CHANGE_ASSIGN_USERS,
  payload: {
    group,
    users
  }
});

export const assignOrgUnits = (orgUnits) => ({
  type: ASSIGN_ORGUNITS,
  payload: {
    orgUnits
  }
});

export const changeIcd11ToolUrl = (url, type) => ({
  type: CHANGE_ICD11_TOOL_URL,
  payload: {
    url,
    type
  }
});

export const changeCerticateTemplate = certificateTemplate => ({
  type: CHANGE_CERTIFICATE_TEMPLATE,
  payload: {
    certificateTemplate
  }
})

export const setCertificateLogo = image => ({
  type: SET_CERTIFICATE_LOGO,
  payload: {
    image
  }
})

export const changeTrackedEntityType = trackedEntityType => ({
  type: CHANGE_TRACKED_ENTITY_TYPE,
  payload: {
    trackedEntityType
  }
})

export const setFemaleOption = femaleOption => ({
  type: SET_FEMALE_SECTION,
  payload: femaleOption
})

export const setFullnameOption = fullnameOption => ({
  type: CHANGE_FULLNAMEOPTION,
  payload: fullnameOption
})

export const setInstallingFile = installingFile => ({
  type: SET_INSTALLING_FILE,
  payload: {
    installingFile
  }
})