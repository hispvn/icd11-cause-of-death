import { Modal } from "antd";
import { useEffect, useState } from "react";
import "./index.css";
import RawCodingTool from "./RawCodingTool";

const Icd11Tool = ({ visible, setVisible, onSelect, defaultValue }) => {
  const [selectedCod, setSelectedCod] = useState(null);
  const [isClear, setIsClear] = useState(false);

  useEffect(() => {
    console.log("Modal");
    console.log(defaultValue);
    console.log(visible);
    if (!visible) {
      setIsClear(true);
    } else {
      setSelectedCod(defaultValue);
      setIsClear(false);
    }
  }, [visible]);

  return (
    <Modal
      title="ICD 11 Coding Tool"
      maskClosable={false}
      centered
      open={visible}
      onOk={() => {
        setVisible(false);
        onSelect(selectedCod);
      }}
      onCancel={() => setVisible(false)}
      width="95%"
    >
      <RawCodingTool
        defaultValue={defaultValue}
        isClear={isClear}
        iNo={1}
        onSelect={setSelectedCod}
      />
    </Modal>
  );
};

export default Icd11Tool;