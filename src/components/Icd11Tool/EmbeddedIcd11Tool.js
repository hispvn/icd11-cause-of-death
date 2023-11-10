import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./index.css";
import RawCodingTool from "./RawCodingTool";

const Icd11Tool = ({ visible, setVisible, onSelect, defaultValue }) => {
  const { t } = useTranslation();
  const [selectedCod, setSelectedCod] = useState(null);
  const [isClear, setIsClear] = useState(false);

  useEffect(() => {
    if (!visible) {
      setIsClear(true);
    } else {
      setSelectedCod(defaultValue);
      setIsClear(false);
    }
  }, [visible]);

  return (
    <Modal
      title={t("icd11_tool")}
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