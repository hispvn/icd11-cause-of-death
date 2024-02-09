import {
  SET_PROGRAM_METADATA,
  SET_SELECTED_ORGUNIT,
  SET_TRACKER_DATA_ELEMENTS,
  SET_TEAS,
  SET_USERS,
  SET_ORGUNIT_GROUPS,
  SET_ORGUNIT_LEVELS,
  SET_ORGUNITS,
  GET_ICD11_OPTIONS,
  GET_TRACKED_ENTITY_TYPES,
  SET_USER_GROUPS,
  SET_FORM_MAPPING,
  SET_FORM_MAPPING_TEAS,
  SET_CERTIFICATE_TEMPLATE,
  SET_FEMALE_CODE,
  SET_UI_LOCALE,
  CHANGE_FULLNAMEOPTION,
  GET_ICD_API_CLIENT_TOKEN,
  SET_CUSTOM_CERTIFICATE
} from "./type";

export const setProgramMetadata = (programMetadata) => ({
  type: SET_PROGRAM_METADATA,
  payload: {
    programMetadata
  }
});

export const setSelectedOrgUnit = (selectedOrgUnit) => ({
  type: SET_SELECTED_ORGUNIT,
  payload: {
    selectedOrgUnit
  }
});

export const setTeas = (trackedEntityAttributes) => ({
  type: SET_TEAS,
  payload: {
    trackedEntityAttributes
  }
});

export const setTrackerDataElements = (dataElements) => ({
  type: SET_TRACKER_DATA_ELEMENTS,
  payload: {
    dataElements
  }
});

export const setUsers = (users) => ({
  type: SET_USERS,
  payload: {
    users
  }
});

export const setOrgUnitGroups = (orgUnitGroups) => ({
  type: SET_ORGUNIT_GROUPS,
  payload: {
    orgUnitGroups
  }
});

export const setOrgUnitLevels = (orgUnitLevels) => ({
  type: SET_ORGUNIT_LEVELS,
  payload: {
    orgUnitLevels
  }
});

export const setOrgUnits = (orgUnits) => ({
  type: SET_ORGUNITS,
  payload: {
    orgUnits
  }
});

export const getICD11Options = options => ({
  type: GET_ICD11_OPTIONS,
  payload: {
    options
  }
});

export const getTrackedEntityTypes = trackedEntityTypes => ({
  type: GET_TRACKED_ENTITY_TYPES,
  payload: {
    trackedEntityTypes
  }
})

export const setUserGroups = userGroups => ({
  type: SET_USER_GROUPS,
  payload: {
    userGroups
  }
})

export const setFormMapping = formMapping => ({
  type: SET_FORM_MAPPING,
  payload: {
    formMapping
  }
})

export const setFormMapping_TEAs = teas => ({
  type: SET_FORM_MAPPING_TEAS,
  payload: {
    teas
  }
})

export const setCertificateTemplate = certificateTemplate => ({
  type: SET_CERTIFICATE_TEMPLATE,
  payload: {
    certificateTemplate
  }
})

export const setCustomCertificate = customCertificate => ({
  type: SET_CUSTOM_CERTIFICATE,
  payload: {
    customCertificate
  }
})

export const setFemaleCode = femaleCode => ({
  type: SET_FEMALE_CODE,
  payload: femaleCode
})

export const setFullnameOption = fullnameOption => ({
  type: CHANGE_FULLNAMEOPTION,
  payload: fullnameOption
})

export const setUILocale = language => ({
  type: SET_UI_LOCALE,
  payload: language
})

export const setIcdApiToken = token => ({
  type: GET_ICD_API_CLIENT_TOKEN,
  payload: token
})