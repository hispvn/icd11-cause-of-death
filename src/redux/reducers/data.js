import {
  MUTATE_TEI,
  MUTATE_ATTRIBUTE,
  MUTATE_ENROLLMENT,
  MUTATE_EVENT,
  MUTATE_DATAVALUE,
  INIT_DATA,
  INIT_NEW_DATA,
  INIT_NEW_EVENT,
  INIT_NEW_ENROLLMENT
} from "../actions/data/type";
import {
  mutateTei,
  mutateAttribute,
  mutateEnrollment,
  mutateEvent,
  mutateDataValue,
  initData,
  initNewData,
  initNewEvent,
  initNewEnrollment
} from "./data-methods";

const initialState = {
  currentTei: null,
  currentEnrollment: null,
  currentEvents: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MUTATE_TEI: {
      return mutateTei(state, action);
    }
    case MUTATE_ATTRIBUTE: {
      return mutateAttribute(state, action);
    }
    case MUTATE_ENROLLMENT: {
      return mutateEnrollment(state, action);
    }
    case MUTATE_EVENT: {
      return mutateEvent(state, action);
    }
    case MUTATE_DATAVALUE: {
      return mutateDataValue(state, action);
    }
    case INIT_NEW_DATA: {
      return initNewData(state, action);
    }
    case INIT_DATA: {
      return initData(state, action);
    }
    case INIT_NEW_EVENT: {
      return initNewEvent(state, action);
    }
    case INIT_NEW_ENROLLMENT: {
      return initNewEnrollment(state, action);
    }
    default:
      return state;
  }
}
