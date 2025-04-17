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
  CHANGE_FULLNAMEOPTION,
  CHANGE_CUSTOM_CERTIFICATE
} from "../actions/admin/type";

const initialState = {
  step: 0,
  type: null,
  trackedEntityAttributes: [],
  trackedEntityType: null,
  femaleOption: null,
  fullnameOption: "firstlastname",
  dataElements: {
    // frameA: { 
    //   otherSections: [], 
    //   defaultSections: require(`../../asset/metadata/programStageSections.json`).programStageSections.slice(0,6) 
    // },
    // frameB: { 
    //   otherSections: [], 
    //   defaultSections: require(`../../asset/metadata/programStageSections.json`).programStageSections.slice(6,10) 
    // },
    form: { 
      otherSections: [], 
      defaultSections: require(`../../asset/metadata/programStageSections.json`).programStageSections
    }
  },
  users: {
    admin: [],
    capture: [],
    view: []
  },
  assignedOrgUnits: [],
  icd11ToolUrl: {
    type: "global",
    url: "https://id.who.int/icd/"
  },
  certificateTemplate: null,
  customCertificate: null,
  installingFile: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_STEP: {
      return { ...state, step: action.payload.step };
    }
    case CHANGE_INSTALLATION_TYPE: {
      return { ...state, type: action.payload.type };
    }
    case CHANGE_TEAS: {
      return {
        ...state,
        trackedEntityAttributes: action.payload.trackedEntityAttributes
      };
    }
    case CHANGE_DATA_ELEMENTS: {
      return {
        ...state,
        dataElements: {
          ...state.dataElements,
          [action.payload.frame]: {
            ...state.dataElements[action.payload.frame],
            ...action.payload.section
          }
        }
      };
    }

    case CHANGE_ASSIGN_USERS: {
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.group]: action.payload.users
        }
      };
    }

    case ASSIGN_ORGUNITS: {
      return { ...state, assignedOrgUnits: action.payload.orgUnits };
    }
    case CHANGE_ICD11_TOOL_URL: {
      if (action.payload.type !== undefined) {
        return {
          ...state,
          icd11ToolUrl: {
            ...state.icd11ToolUrl,
            url: action.payload.url,
            type: action.payload.type
          }
        };
      } else {
        return {
          ...state,
          icd11ToolUrl: {
            ...state.icd11ToolUrl,
            url: action.payload.url
          }
        };
      }
    }

    case CHANGE_CERTIFICATE_TEMPLATE: {
      return {
        ...state,
        certificateTemplate: action.payload.certificateTemplate
      }
    }

    case SET_CERTIFICATE_LOGO: {
      return {
        ...state,
        certificateTemplate: {
          ...state.certificateTemplate,
          logo: action.payload.image.image
        }
      }
    }

    case CHANGE_CUSTOM_CERTIFICATE: {
      return {
        ...state,
        customCertificate: action.payload.customCertificate
      }
    }

    case CHANGE_TRACKED_ENTITY_TYPE: {
      return {
        ...state,
        trackedEntityType: action.payload.trackedEntityType
      }
    }

    case SET_FEMALE_SECTION: {
      return {
        ...state,
        femaleOption: action.payload
      }
    }

    case CHANGE_FULLNAMEOPTION: {
      return {
        ...state,
        fullnameOption: action.payload
      }
    }

    case SET_INSTALLING_FILE: {
      return {
        ...state,
        installingFile: action.payload.installingFile
      }
    }

    default:
      return state;
  }
}
