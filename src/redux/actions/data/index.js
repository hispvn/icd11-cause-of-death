import {
  MUTATE_TEI,
  MUTATE_ATTRIBUTE,
  MUTATE_ENROLLMENT,
  MUTATE_EVENT,
  MUTATE_DATAVALUE,
  INIT_DATA,
  INIT_NEW_DATA,
  INIT_NEW_EVENT
} from "./type";

export const mutateTei = (property, value) => ({
  type: MUTATE_TEI,
  payload: {
    property,
    value
  }
});
export const mutateAttribute = (attribute, value) => ({
  type: MUTATE_ATTRIBUTE,
  payload: {
    attribute,
    value
  }
});

export const mutateEnrollment = (property, value) => ({
  type: MUTATE_ENROLLMENT,
  payload: {
    property,
    value
  }
});

export const mutateEvent = (eventId, property, value) => ({
  type: MUTATE_EVENT,
  payload: {
    eventId,
    property,
    value
  }
});

export const mutateDataValue = (eventId, dataElement, value) => ({
  type: MUTATE_DATAVALUE,
  payload: {
    eventId,
    dataElement,
    value
  }
});

export const initNewData = (selectedOrgUnit, programMetadata) => ({
  type: INIT_NEW_DATA,
  payload: {
    selectedOrgUnit,
    programMetadata
  }
});

export const initData = (trackedEntityInstance, programMetadata) => ({
  type: INIT_DATA,
  payload: {
    trackedEntityInstance,
    programMetadata
  }
});

export const initNewEvent = (eventId, programStage) => ({
  type: INIT_NEW_EVENT,
  payload: { eventId, programStage }
});
