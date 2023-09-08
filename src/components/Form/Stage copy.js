

import { useState } from "react";
import { connect } from "react-redux";

import { Button } from "antd";
import Icd11Tool from "../Icd11Tool/EmbeddedIcd11Tool";
import "./stage.css";

/* REDUX */

import {
  mutateEvent,
  mutateDataValue,
  initNewEvent,
} from "../../redux/actions/data";


const Stage = ({
  metadata,
  data,
  mutateEvent,
  mutateDataValue,
  initNewEvent,
}) => {
  const [icdTool, setIcdTool] = useState(false);
    return <>
        <Button onClick={() => setIcdTool(true)}>CLICK HERE</Button>
        <Icd11Tool
            visible={icdTool}
            setVisible={setIcdTool}
            onSelect={(cod) => {
              console.log("TEST");
            }}
            defaultValue={{
              title: "",
              code: ""
            }}
        />
    </>
};

const mapStateToProps = (state) => {
  return {
    metadata: state.metadata,
    data: state.data
  };
};
const mapDispatchToProps = { mutateEvent, mutateDataValue, initNewEvent };

export default connect(mapStateToProps, mapDispatchToProps)(Stage);
