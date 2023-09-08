import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNotesMedical } from "@fortawesome/free-solid-svg-icons";
import { Tabs } from "antd";
import InputField from "../InputField";
import Icd11Tool from "../Icd11Tool";
import "./stage.css";
/* REDUX */
import { connect } from "react-redux";
import {
  mutateEvent,
  mutateDataValue,
  mutateAttribute
} from "../../redux/actions/data";
//
import { Hooks } from "tracker-capture-app-core";
const { useRuleEngine } = Hooks;
const { TabPane } = Tabs;

const Stage = ({ metadata, data, mutateEvent, mutateDataValue }) => {
  const { programMetadata } = metadata;
  const { currentEvents } = data;
  const { run } = useRuleEngine(data, programMetadata);
  const actions = run();

  const currentEvent = currentEvents.find(
    (event) => event.programStage === "EqlJQDoBX4I"
  );

  const renderInputFields = (de, actions) => {
    let error = "",
      helper = "",
      warning = "";
    let value = currentEvent.dataValues[de.id]
      ? currentEvent.dataValues[de.id]
      : "";
    const thisActions = actions
      .map((act, index) => {
        act.index = index;
        return act;
      })
      .filter((act) => act.target === de.id);
    let hidden = false;
    thisActions.forEach((action) => {
      switch (action.type) {
        case "SHOWERROR":
          error = action.content;
          break;
        case "SHOWWARNING":
          warning = action.content;
          break;
        case "SHOWTEXT":
          helper = action.content;
          break;
        case "HIDEFIELD":
          hidden = true;
          break;
        default:
          break;
      }
    });

    return (
      !hidden && (
        <InputField
          label={de.displayFormName}
          value={value}
          change={(value) => {
            mutateDataValue(currentEvent.event, de.id, value);
          }}
          error={error}
          warning={warning}
          helper={helper}
          valueType={de.valueType}
          //label={foundDe.displayFormName}
          valueSet={de.valueSet}
        />
      )
    );
  };

  const executeActions = () => {
    actions.forEach((action) => {
      switch (action.type) {
        case "ASSIGN":
          if (action.targetType === "de") {
            mutateDataValue(currentEvent.event, action.target, action.value);
          } else if (action.targetType === "tea") {
            mutateAttribute(action.target, action.value);
          }
          break;
        default:
          break;
      }
    });
  };

  useEffect(() => {
    executeActions();
  }, [JSON.stringify(currentEvent)]);

  return (
    <div className="stage-section-container">
      {programMetadata.programStages[0].dataElements.map((de) => {
        return renderInputFields(de, actions);
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    metadata: state.metadata,
    data: state.data
  };
};
const mapDispatchToProps = { mutateEvent, mutateDataValue };

export default connect(mapStateToProps, mapDispatchToProps)(Stage);
