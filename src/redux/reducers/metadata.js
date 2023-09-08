import {
  GET_PROGRAM_METADATA,
  SET_TRACKER_DATA_ELEMENTS,
  SET_PROGRAM_METADATA,
  SET_SELECTED_ORGUNIT,
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
  GET_ICD_API_CLIENT_TOKEN
} from "../actions/metadata/type";

const initialState = {
  programMetadata: null,
  selectedOrgUnit: null,
  orgUnitGroups: null,
  orgUnitLevels: null,
  orgUnits: null,
  icd11Options: null,
  formMapping: null,
  certificateTemplate: {
    title: "Death Certificate",
    logo: null,
    info: [{
      label: "Date of Death",
      enrollment: "incidentDate"
    },{
      label: "Reported Date",
      enrollment: "enrollmentDate"
    }],
    footer:[{
      label: "Institution Name",
      enrollment: "orgUnitName"
    },{
      label: "Certificate Date",
      enrollment: "enrollmentDate"
    }]
  },
  femaleCode: "",
  fullnameOption: false,
  keyUiLocale: "en",
  icdApi_clientToken: ""
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PROGRAM_METADATA: {
      return {
        ...state,
        programMetadata: action.payload.programMetadata
      };
    }
    case SET_SELECTED_ORGUNIT: {
      return {
        ...state,
        selectedOrgUnit: action.payload.selectedOrgUnit
      };
    }
    case SET_ORGUNITS: {
      return {
        ...state,
        orgUnits: action.payload.orgUnits
      };
    }
    case SET_ORGUNIT_GROUPS: {
      return {
        ...state,
        orgUnitGroups: action.payload.orgUnitGroups
      };
    }
    case SET_ORGUNIT_LEVELS: {
      return {
        ...state,
        orgUnitLevels: action.payload.orgUnitLevels
      };
    }
    case SET_TEAS: {
      return {
        ...state,
        trackedEntityAttributes: action.payload.trackedEntityAttributes
      };
    }
    case SET_TRACKER_DATA_ELEMENTS: {
      return {
        ...state,
        dataElements: action.payload.dataElements
      };
    }
    case SET_USERS: {
      return {
        ...state,
        users: action.payload.users
      };
    }
    case GET_ICD11_OPTIONS: {
      return {
        ...state,
        icd11Options: action.payload.options
      }
    }
    case GET_TRACKED_ENTITY_TYPES: {
      return {
        ...state,
        trackedEntityTypes: action.payload.trackedEntityTypes
      }
    }
    case SET_USER_GROUPS: {
      return {
        ...state,
        userGroups: action.payload.userGroups
      }
    }
    case SET_FORM_MAPPING: {
      return {
        ...state,
        formMapping: action.payload.formMapping
      }
    }
    case SET_FORM_MAPPING_TEAS: {
      return {
        ...state,
        formMapping: { 
          ...state.formMapping,
          attributes: action.payload.teas
        }
      }
    }
    case SET_CERTIFICATE_TEMPLATE: {
      return {
        ...state,
        certificateTemplate: action.payload.certificateTemplate
      }
    }
    case SET_FEMALE_CODE: {
      return {
        ...state,
        femaleCode: action.payload
      }
    }
    case CHANGE_FULLNAMEOPTION: {
      return {
        ...state,
        fullnameOption: action.payload
      }
    }
    case SET_UI_LOCALE: {
      return {
        ...state,
        keyUiLocale: action.payload
      }
    }
    case GET_ICD_API_CLIENT_TOKEN: {
      return {
        ...state,
        icdApi_clientToken: action.payload
      }
    }
    default:
      return state;
  }
}
