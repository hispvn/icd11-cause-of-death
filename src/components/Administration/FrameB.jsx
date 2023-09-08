import {
  Card,
  Transfer,
  Button,
  Switch,
  Modal,
  Input,
  Collapse,
} from "antd";
import { Hooks } from "tracker-capture-app-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  // faInfoCircle, 
  faTrash 
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
/* REDUX */
import { connect } from "react-redux";
import { changeDataElements } from "../../redux/actions/admin";
import { setTrackerDataElements } from "../../redux/actions/metadata";
import { useTranslation } from "react-i18next";
/*       */
const { useApi } = Hooks;

const dataElements = require("../../asset/metadata/dataElements.json").dataElements;
const fixedSections = require("../../asset/metadata/programStageSections.json").programStageSections.slice(6,10);

const FrameB = ({
  admin: {
    dataElements: {
      frameB: { defaultSections, otherSections },
      frameA: { otherSections: frameAOtherSections },
    },
  },
  allExistedDataElements,
  changeDataElements,
  setTrackerDataElements,
}) => {
  const { metadataApi } = useApi();
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([]); // [sectionName, [dataElements]]
  const [tempSection, setTempSection] = useState([]);
  const [isEditingIndex, setIsEditingIndex] = useState(null);
  const [isReloading, setIsReloading] = useState(false);

  const onChange = (nextTargetKeys, direction, moveKeys) => {
    setTempSection([tempSection[0], nextTargetKeys || []]);
  };

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    if (!tempSection.length) return;
    if (isEditingIndex === null) {
      changeDataElements({
        otherSections: [...otherSections, tempSection],
      });
    } else {
      const newSelectedDataElements = otherSections.slice();
      newSelectedDataElements.splice(isEditingIndex, 1, tempSection);
      changeDataElements({ otherSections: newSelectedDataElements });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onReload = () => {
    setIsReloading(true);
    metadataApi.getTrackerDataElements().then(({ dataElements }) => {
      setTrackerDataElements(dataElements);
      setIsReloading(false);
    });
  };

  const getSwitchValue = section => {
    return defaultSections.find( ({name}) => name === section.name ) ? true : false;
  };

  const changeSwitch = section => (checked, e) => {
    e.stopPropagation();
    changeDataElements({
        defaultSections:  !checked ? defaultSections.filter( ({name}) => name !== section.name ) : [...defaultSections, section]
    });
  };

  return (
    <div className="administration-transfer-container">
      <div>
        <Card size="small" title={t("defaultSectionsInFrameB")}>
          <Collapse defaultActiveKey={[]}>
            {fixedSections.map( (section, index) => {
              return (
                <Collapse.Panel
                  key={index}
                  header={
                    <div>
                      <Switch
                        checked={getSwitchValue(section)}
                        onChange={changeSwitch(section)}
                        checkedChildren="Include"
                        unCheckedChildren="Skip"
                        style={{ marginRight: 8 }}
                      />
                      <strong>{section.name}</strong>
                    </div>
                  }
                >
                  {section.dataElements.map((de) => (
                    <div key={de.id} className="administration-attribute">
                      {
                        dataElements.find( ({id}) => de.id === id ).name
                      }
                    </div>
                  ))}
                </Collapse.Panel>
              );
            })}
          </Collapse>
        </Card>
      </div>
      <div>
        <Card size="small" title={t("otherSectionsInFrameB")}>
          {otherSections.map(([name, dataElements], index) => {
            return (
              <div
                style={{
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  setIsEditingIndex(index);
                  setIsModalVisible(true);
                  setTempSection(otherSections[index]);
                }}
                key={index}
                className="administration-attribute"
              >
                <div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      const newSelectedDataElements = otherSections.slice();
                      newSelectedDataElements.splice(index, 1);
                      changeDataElements({
                        otherSections: newSelectedDataElements,
                      });
                    }}
                    style={{
                      marginRight: 5,
                    }}
                    size="small"
                    danger
                    type="text"
                    icon={
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{
                          fontSize: 15,
                          marginTop: 3,
                          cursor: "pointer",
                        }}
                      />
                    }
                  />
                  {name}
                </div>
              </div>
            );
          })}
          <Button onClick={showModal} type="primary">
          {
            t("add")
          }
          </Button>
        </Card>
      </div>
      <Modal
        width={"100%"}
        centered
        title={
          <Input
            style={{
              width: "calc(50% - 20px)",
            }}
            value={tempSection[0]}
            onChange={(e) =>
              setTempSection([e.target.value, tempSection[1] || []])
            }
            placeholder="Section name"
          />
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        afterClose={() => {
          setIsEditingIndex(null);
          setTempSection([]);
          setSelectedKeys([]);
        }}
      >
        <Transfer
          pagination={{
            pageSize: 20,
          }}
          showSearch
          listStyle={{
            width: "100%",
            height: 500,
          }}
          dataSource={allExistedDataElements
            .filter(({ id }) =>
              frameAOtherSections.every(
                ([name, dataElements]) => !dataElements.includes(id)
              )
            )
            .filter(({ id }) => {
              if (isEditingIndex === null) {
                return otherSections.every(
                  ([name, dataElements]) => !dataElements.includes(id)
                );
              } else {
                return otherSections.every(
                  ([name, dataElements]) =>
                    !dataElements.includes(id) ||
                    otherSections[isEditingIndex][0] === name
                );
              }
            })
            .map(({ id, displayName }) => ({
              key: id,
              title: displayName,
            }))}
          titles={[t("availableDEs"), t("selectedDEs")]}
          render={(item) => item.title}
          targetKeys={tempSection[1] || []}
          selectedKeys={selectedKeys}
          onChange={onChange}
          onSelectChange={onSelectChange}
          footer={(props) => {
            if (props.titleText === t("availableDEs"))
              return (
                <div
                  style={{
                    display: "flex",
                    padding: 5,
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    style={{ marginRight: 5 }}
                    size="small"
                    type="primary"
                    onClick={() => {
                      window.open(
                        "../../../dhis-web-maintenance/index.html#/list/dataElementSection/dataElement"
                      );
                    }}
                  >
                  {
                    t("add")
                  }
                  </Button>
                  <Button loading={isReloading} size="small" onClick={onReload}>
                  {
                    t("reload")
                  }
                  </Button>
                </div>
              );
            return null;
          }}
        />
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    admin: state.admin,
    allExistedDataElements: state.metadata.dataElements,
  };
};

const mapDispatchToProps = {
  changeDataElements: changeDataElements("frameB"),
  setTrackerDataElements,
};

export default connect(mapStateToProps, mapDispatchToProps)(FrameB);
