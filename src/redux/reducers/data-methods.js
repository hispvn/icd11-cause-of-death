import { generateCode, convertValue } from "../../utils";

export const mutateTei = (state, action) => {
  const { property, value } = action.payload;
  const { currentTei } = state;
  currentTei.isDirty = true;
  currentTei[property] = value;
  return { ...state, currentTei };
};

export const mutateAttribute = (state, action) => {
  const { attribute, value } = action.payload;
  const { currentTei } = state;
  currentTei.isDirty = true;
  currentTei.attributes[attribute] = value;

  return { ...state, currentTei };
};

export const mutateEnrollment = (state, action) => {
  const { property, value } = action.payload;
  const { currentEnrollment } = state;
  currentEnrollment.isDirty = true;
  currentEnrollment[property] = value;
  return { ...state, currentEnrollment };
};

export const mutateEvent = (state, action) => {
  const { eventId, property, value } = action.payload;
  const { currentEvents } = state;
  const currentEventIndex = currentEvents.findIndex(
    (event) => event.event === eventId
  );
  currentEvents[currentEventIndex].isDirty = true;
  currentEvents[currentEventIndex][property] = value;
  return { ...state, currentEvents: [...currentEvents] };
};

export const mutateDataValue = (state, action) => {
  const { eventId, dataElement, value } = action.payload;
  const { currentEvents } = state;
  const currentEventIndex = currentEvents.findIndex(
    (event) => event.event === eventId
  );
  currentEvents[currentEventIndex].isDirty = true;
  currentEvents[currentEventIndex].dataValues[dataElement] = value;
  return { ...state, currentEvents: [...currentEvents] };
};

export const initNewData = (state, action) => {
  const { selectedOrgUnit, programMetadata } = action.payload;
  const orgUnit = selectedOrgUnit.id;
  const program = programMetadata.id;
  const generatedTeiId = generateCode();
  const generatedEnrollmentId = generateCode();
  const currentTei = {
    trackedEntityInstance: generatedTeiId,
    orgUnit,
    isDirty: false,
    isNew: true,
    isSaved: false,
    trackedEntityType: programMetadata.trackedEntityType,
    attributes: {}
  };
  const currentEnrollment = {
    enrollment: generatedEnrollmentId,
    orgUnit,
    program,
    isDirty: false,
    isNew: true,
    trackedEntityInstance: generatedTeiId
  };
  const currentEvents = programMetadata.programStages.map((ps) => {
    return {
      event: generateCode(),
      orgUnit,
      programStage: ps.id,
      program,
      isDirty: false,
      isNew: true,
      trackedEntityInstance: generatedTeiId,
      enrollment: generatedEnrollmentId,
      dataValues: {}
    };
  });

  return { ...state, currentTei, currentEnrollment, currentEvents };
};

export const initNewEnrollment = (state, action) => {
  const { selectedOrgUnit, trackedEntityInstance, programMetadata } = action.payload;
  const orgUnit = selectedOrgUnit.id;
  const program = programMetadata.id;
  const currentTei = trackedEntityInstance;
  currentTei.isNew = false;
  currentTei.isDirty = false;
  currentTei.attributes = currentTei.attributes.reduce(
    (previousValue, currentValue) => {
      previousValue[currentValue.attribute] = convertValue(
        currentValue.valueType,
        currentValue.value
      );
      return previousValue;
    },
    {}
  );
  // const currentTei = {
  //   trackedEntityInstance: generatedTeiId,
  //   orgUnit,
  //   isDirty: false,
  //   isNew: true,
  //   isSaved: false,
  //   trackedEntityType: programMetadata.trackedEntityType,
  //   attributes: {}
  // };
  
  const generatedEnrollmentId = generateCode();
  const currentEnrollment = {
    enrollment: generatedEnrollmentId,
    orgUnit,
    program,
    isDirty: false,
    isNew: true,
    trackedEntityInstance: currentTei.trackedEntityInstance
  };
  const currentEvents = programMetadata.programStages.map((ps) => {
    return {
      event: generateCode(),
      orgUnit,
      programStage: ps.id,
      program,
      isDirty: false,
      isNew: true,
      trackedEntityInstance: currentTei.trackedEntityInstance,
      enrollment: generatedEnrollmentId,
      dataValues: {}
    };
  });

  return { ...state, currentTei, currentEnrollment, currentEvents };
}

export const initData = (state, action) => {
  const { trackedEntityInstance, programMetadata } = action.payload;
  const currentTei = trackedEntityInstance;
  const currentEnrollment = trackedEntityInstance.enrollments.find( ({program}) => program === programMetadata.id );
  const currentEvents = currentEnrollment ? currentEnrollment.events : [];
  delete currentTei.enrollments;
  delete currentEnrollment.events;
  currentTei.isNew = false;
  currentTei.isDirty = false;
  currentTei.attributes = currentTei.attributes.reduce(
    (previousValue, currentValue) => {
      previousValue[currentValue.attribute] = convertValue(
        currentValue.valueType,
        currentValue.value
      );
      return previousValue;
    },
    {}
  );
  currentEnrollment.enrollmentDate = convertValue(
    "DATE",
    currentEnrollment.enrollmentDate
  );
  currentEnrollment.incidentDate = convertValue(
    "DATE",
    currentEnrollment.incidentDate
  );
  currentEnrollment.isNew = false;
  currentEnrollment.isDirty = false;
  currentEvents.forEach((event) => {
    const programStage = programMetadata.programStages.find(
      (ps) => ps.id === event.programStage
    );
    if (!programStage) return;
    event.eventDate = convertValue("DATE", event.eventDate);
    event.dueDate = convertValue("DATE", event.dueDate);
    event.isNew = false;
    event.isDirty = false;
    event.dataValues = event.dataValues.reduce(
      (previousValue, currentValue) => {
        const foundDe = programStage.dataElements.find(
          (de) => de.id === currentValue.dataElement
        );
        if (!foundDe) return previousValue;
        previousValue[currentValue.dataElement] = convertValue(
          foundDe.valueType,
          currentValue.value
        );
        return previousValue;
      },
      {}
    );
  });

  return {
    ...state,
    currentTei,
    currentEnrollment,
    currentEvents: [...currentEvents]
  };
};

export const initNewEvent = (state, action) => {
  const { eventId, programStage } = action.payload;
  const { currentTei, currentEnrollment, currentEvents } = state;
  const newEvent = {
    event: eventId,
    isNew: true,
    isDirty: false,
    orgUnit: currentTei.orgUnit,
    enrollment: currentEnrollment.enrollment,
    trackedEntityInstance: currentTei.trackedEntityInstance,
    program: currentEnrollment.program,
    programStage,
    dataValues: {}
  };
  return { ...state, currentEvents: [...currentEvents, newEvent] };
};
