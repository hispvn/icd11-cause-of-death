import { Card, Select, Transfer, Button, Radio, Space } from "antd";
import { Hooks } from "tracker-capture-app-core";
import { defaultAttributes } from "../../utils/const";

/* REDUX */
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { changeTrackedEntityTypes, changeTrackedEntityType, setFemaleOption, setFullnameOption } from "../../redux/actions/admin";
import { setTeas } from "../../redux/actions/metadata";

import { useTranslation } from "react-i18next";
/*       */

const { useApi } = Hooks;


const { Option } = Select;

const Attributes = ({
  admin: { 
    trackedEntityAttributes: selectedTrackedEntityAttributes,
    trackedEntityType: selectedTrackedEntityType,
    femaleOption: selectedFemaleOption,
    fullnameOption: selectedFullnameOption,
    type
  },
  allExistedTrackedEntityAttributes,
  allExistedTrackedEntityTypes,
  programMetadata,
  formMapping,
  femaleCode,
  fullnameOption,
  changeTrackedEntityTypes,
  changeTrackedEntityType,
  setTeas,
  setFemaleOption,
  setFullnameOption
}) => {
  const { t } = useTranslation();
  const { metadataApi } = useApi();
  const [isReloading, setIsReloading] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([]);
  // const [fullname, setFullname] = useState(false);
  const [femaleOptions, setFemaleOptions] = useState([]);
  
  const getDefaultTEAName = defaultName => defaultName === "First Name" ? "Given Name" :
    defaultName === "Middle Name" ? "Middle Name" :
    defaultName === "Last Name" ? "Fammily Name" :
    defaultName === "Date of Birth" ? "Date of Birth" :
    defaultName === "Date of Birth is estimated" ? "Date of Birth is estimated" :
    defaultName === "Age in years" ? "Age (years)" :
    defaultName === "Address" ? "Address (current)" :
    defaultName === "Sex" ? "Sex" :
    defaultName === "Female Option" ? "Female" :
    defaultName === "Person" ? "Person" : "";

  const showedTrackedEntityAttributes = (attribute) =>
    allExistedTrackedEntityAttributes.filter(({ id }) =>
      selectedTrackedEntityAttributes.every(
        ([des, source]) => des !== id || source === null || (attribute ? source === attribute : false)
      )
    );

  useEffect(() => {
    if ( (selectedTrackedEntityAttributes.filter( ([,source]) => source === "Sex" ).length > 0) ) {
      metadataApi.get(`/api/trackedEntityAttributes/${selectedTrackedEntityAttributes.find( ([,source]) => source === "Sex" )[0]}.json`, {} ,[
        "fields=optionSet[options[id,name,code]]"
      ]).then( json => {
        setFemaleOptions(json.optionSet.options)
      })
    }
  },[selectedTrackedEntityAttributes])

  useEffect(() => {
    if (programMetadata) {
      let selectedAttrs = [];
      selectedAttrs = defaultAttributes.map( ({name,code}) => [formMapping.attributes[code],name]);
      selectedAttrs = [
        ...selectedAttrs,
        ...programMetadata.trackedEntityAttributes.filter( ({id}) => 
          !selectedAttrs.find( ([des,]) => des === id ) )
        .map(({id}) => [id,null])
      ]
      changeTrackedEntityTypes(selectedAttrs); // This is for TEAs
      changeTrackedEntityType(programMetadata.trackedEntityType);
      setFemaleOption(femaleCode);
      setFullnameOption(fullnameOption);
    }
  },[programMetadata])

  const onChange = (nextTargetKeys, direction, moveKeys) => {
    changeTrackedEntityTypes(
      selectedTrackedEntityAttributes.filter(([, source]) => source).concat(nextTargetKeys.map((key) => [key, null]))
    );
  };

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const getSelectValue = (attrId) => {
    const selectedAttr = selectedTrackedEntityAttributes.find(([, source]) => source === attrId);
    return selectedAttr ? selectedAttr[0] : null;
  };

  return (
    <div className="administration-transfer-container">
      <div>
        <Card size="small" style={{marginBottom: "10px"}}>
          <div className="administration-tet">
            <div><strong>{t("trackedEntityType")}</strong></div>
            <div>
            {
              type === 'default' && programMetadata === null ? getDefaultTEAName("Person") :
              <Select
                style={{
                  width: "100%"
                }}
                placeholder="Select tracked entity type"
                value={selectedTrackedEntityType}
                onChange={(value) => changeTrackedEntityType(value)}
                disabled={programMetadata}
              >
                {
                  allExistedTrackedEntityTypes.map( tet => 
                    <Option key={tet.id} value={tet.id}>{tet.displayName}</Option>
                  )
                }
              </Select>
            }
            </div>
          </div>
        </Card>
        <Card size="small" title={t("defaultAttribute")}>
          <div className="administration-attribute">
            <div>{defaultAttributes[0].name}</div>
            <div>{
              (!programMetadata) ?
                t("systemID")
                :
                allExistedTrackedEntityAttributes.find(({id}) => getSelectValue(defaultAttributes[0].name) === id) ? 
                  allExistedTrackedEntityAttributes.find(({id}) => getSelectValue(defaultAttributes[0].name) === id).displayName
                  :
                  getSelectValue(defaultAttributes[0].name)
            }</div>
          </div>
          {
            programMetadata === null ? 
            <>
              <div className="administration-fullnameOption">
                <div><strong>* Select Name Option</strong></div>
                <div>
                  
                </div>
              </div>
              <div className="administration-attribute">
                <div>
                {
                  type === 'default' ? "Full Name" : 
                  <Radio.Group 
                    size="small"
                    onChange={({ target: { value } }) => {
                      setFullnameOption(value);

                      if (value === "noname") {
                        changeTrackedEntityTypes(selectedTrackedEntityAttributes.filter(
                          ([,source]) => source !== "First Name" && source !== "Middle Name" && source !== "Last Name"
                        ))
                      }
                      else if (value === "fullname") {
                        changeTrackedEntityTypes(selectedTrackedEntityAttributes.filter(
                          ([,source]) => source !== "Middle Name" && source !== "Last Name"
                        ))
                      }
                      else if (value === "firstlastname") {
                        changeTrackedEntityTypes(selectedTrackedEntityAttributes.filter(
                          ([,source]) => source !== "Middle Name"
                        ))
                      }
                    }}
                    value={selectedFullnameOption}
                    optionType="button"
                    buttonStyle="solid"
                  >
                    <Space direction="vertical">
                      <Space>
                        <Radio value="noname">No Name</Radio>
                        <Radio value="fullname">Fullname</Radio>
                        <Radio value="firstlastname">First & Last Name</Radio>
                      </Space>
                      <Radio value="firstmidlastname">First, Middle & Last Name</Radio>
                    </Space>
                  </Radio.Group>
                }
                </div>
                <div className="administration-fullnameOption-inputs">
                  <div>
                    {
                      type === 'default' ? getDefaultTEAName("First Name") :
                        <Select
                          filterOption={(inputValue, option) => {
                            return option.children.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase());
                          }}
                          style={{
                            width: "100%"
                          }}
                          showSearch
                          onChange={(value) => {
                            const existedIndex = selectedTrackedEntityAttributes.findIndex(
                              ([, source]) => source === "First Name"
                            );
                            let newSelectedAttributes = selectedTrackedEntityAttributes.filter(
                              ([destination, source]) => source || destination !== value
                            );
                            if (existedIndex < 0) {
                              newSelectedAttributes.push([value, "First Name"]);
                            } else {
                              newSelectedAttributes.splice(existedIndex, 1, [value, "First Name"]);
                            }
                            changeTrackedEntityTypes(newSelectedAttributes);
                          }}
                          value={getSelectValue("First Name")}
                          placeholder="First Name"
                          disabled={selectedFullnameOption === "noname" }
                        >
                          {showedTrackedEntityAttributes("First Name")
                          .filter(({ valueType }) => valueType === "TEXT")
                          .map(({ id, displayName }) => (
                            <Option key={id} value={id}>{displayName}</Option>
                          ))}
                        </Select>
                    }
                  </div>
                  <div>
                  {
                    type === 'default' ? getDefaultTEAName("Middle Name") :
                      <Select
                        filterOption={(inputValue, option) => {
                          return option.children.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase());
                        }}
                        style={{
                          width: "100%"
                        }}
                        showSearch
                        onChange={(value) => {
                          const existedIndex = selectedTrackedEntityAttributes.findIndex(
                            ([, source]) => source === "Middle Name"
                          );
                          let newSelectedAttributes = selectedTrackedEntityAttributes.filter(
                            ([destination, source]) => source || destination !== value
                          );
                          if (existedIndex < 0) {
                            newSelectedAttributes.push([value, "Middle Name"]);
                          } else {
                            newSelectedAttributes.splice(existedIndex, 1, [value, "Middle Name"]);
                          }
                          changeTrackedEntityTypes(newSelectedAttributes);
                        }}
                        value={getSelectValue("Middle Name")}
                        placeholder="Middle Name"
                        disabled={selectedFullnameOption === "noname" || selectedFullnameOption === "fullname" || selectedFullnameOption === "firstlastname"}
                      >
                        {showedTrackedEntityAttributes("Middle Name")
                        .filter(({ valueType }) => valueType === "TEXT")
                        .map(({ id, displayName }) => (
                          <Option key={id} value={id}>{displayName}</Option>
                        ))}
                      </Select>
                  }
                  </div>
                  <div>
                  {
                    type === 'default' ? getDefaultTEAName("Last Name") :
                      <Select
                        filterOption={(inputValue, option) => {
                          return option.children.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase());
                        }}
                        style={{
                          width: "100%"
                        }}
                        showSearch
                        onChange={(value) => {
                          const existedIndex = selectedTrackedEntityAttributes.findIndex(
                            ([, source]) => source === "Last Name"
                          );
                          let newSelectedAttributes = selectedTrackedEntityAttributes.filter(
                            ([destination, source]) => source || destination !== value
                          );
                          if (existedIndex < 0) {
                            newSelectedAttributes.push([value, "Last Name"]);
                          } else {
                            newSelectedAttributes.splice(existedIndex, 1, [value, "Last Name"]);
                          }
                          changeTrackedEntityTypes(newSelectedAttributes);
                        }}
                        value={getSelectValue("Last Name")}
                        placeholder="Last Name"
                        disabled={selectedFullnameOption === "noname" || selectedFullnameOption === "fullname"}
                      >
                        {showedTrackedEntityAttributes("Last Name")
                        .filter(({ valueType }) => valueType === "TEXT")
                        .map(({ id, displayName }) => (
                          <Option key={id} value={id}>{displayName}</Option>
                        ))}
                      </Select>
                  }
                  </div>
                </div>
              </div>
            </>
            :
            <>
              <div className="administration-attribute">
                <div>
                {
                  fullnameOption === "noname" ? "No Name" : 
                    fullnameOption === "fullname" ? "Fullname" : 
                      fullnameOption === "firstlastname" ? "First & Last Name" : "First, Middle & Last Name"
                }
                </div>
                <div className="administration-fullnameOption-inputs">
                  <div>
                  {
                    (fullnameOption === "fullname" || fullnameOption === "firstlastname" || fullnameOption === "firstmidlastname") ?
                      allExistedTrackedEntityAttributes.find(({ id }) => formMapping.attributes["given_name"] === id).displayName : ""
                  }
                  </div>
                  <div>
                  {
                    (fullnameOption === "firstmidlastname") ?
                      allExistedTrackedEntityAttributes.find(({ id }) => formMapping.attributes["middle_name"] === id).displayName : ""
                  }
                  </div>
                  <div>
                  {
                    (fullnameOption === "firstlastname" || fullnameOption === "firstmidlastname") ?
                      allExistedTrackedEntityAttributes.find(({ id }) => formMapping.attributes["family_name"] === id).displayName : ""
                  }
                  </div>
                </div>
              </div>
            </>
          }
          
          {defaultAttributes.slice(4,9).map((attribute,index) => {
            return (
              <div key={index} className="administration-attribute">
                <div>{attribute.name}</div>
                <div>
                {
                  type === 'default' && programMetadata === null ? getDefaultTEAName(attribute.name) :
                    <Select
                      filterOption={(inputValue, option) => {
                        return option.children.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase());
                      }}
                      style={{
                        width: "100%"
                      }}
                      showSearch
                      onChange={(value) => {
                        const existedIndex = selectedTrackedEntityAttributes.findIndex(
                          ([, source]) => source === attribute.name
                        );
                        let newSelectedAttributes = selectedTrackedEntityAttributes.filter(
                          ([destination, source]) => source || destination !== value
                        );
                        if (existedIndex < 0) {
                          newSelectedAttributes.push([value, attribute.name]);
                        } else {
                          newSelectedAttributes.splice(existedIndex, 1, [value, attribute.name]);
                        }
                        changeTrackedEntityTypes(newSelectedAttributes);
                      }}
                      value={getSelectValue(attribute.name)}
                      placeholder="Select attribute"
                      disabled={programMetadata}
                    >
                      {showedTrackedEntityAttributes(attribute.name)
                      .filter(({ valueType, optionSet }) => (optionSet) ? attribute.valueType === "optionSet" : valueType === attribute.valueType)
                      .map(({ id, displayName }) => (
                        <Option key={id} value={id}>{displayName}</Option>
                      ))}
                    </Select>
                }
                </div>
              </div>
            );
          })}
          {
            (selectedTrackedEntityAttributes.filter( ([,source]) => source === "Sex" ).length > 0) && <div className="administration-femaleOption">
              <div className="administration-femaleOption-name">* Female Option</div>
              <div>
                {
                  <Select
                    style={{
                      width: "100%"
                    }}
                    placeholder="Select option"
                    value={selectedFemaleOption}
                    onChange={(value) => setFemaleOption(value)}
                    disabled={programMetadata}
                  >
                    {
                      (femaleOptions.length > 0) && femaleOptions.map( opt => <Option key={opt.id} value={opt.code}>{opt.name}</Option> )
                    }
                  </Select>
                }
              </div>
            </div>
          }
          {
            (type === 'default' && programMetadata === null) && <div className="administration-femaleOption">
              <div className="administration-femaleOption-name">* Female Option</div>
              <div>
              {
                getDefaultTEAName("Female Option")
              }
              </div>
            </div>
          }
        </Card>
      </div>
      <div>
        <Card size="small" title={t("otherAttributes")}>
          <Transfer
            showSearch
            pagination={{
              pageSize: 20
            }}
            listStyle={{
              width: "100%",
              height: 500
            }}
            dataSource={showedTrackedEntityAttributes().map(({ id, displayName }) => ({
              title: displayName,
              key: id
            }))}
            targetKeys={selectedTrackedEntityAttributes.filter(([, source]) => !source).map(([key]) => key)}
            selectedKeys={selectedKeys}
            onChange={onChange}
            onSelectChange={onSelectChange}
            titles={[t("otherAvailableAttributes"), t("otherSelectedAttributes")]}
            render={(item) => item.title}
            footer={(props) => {
              if (props.titleText === t("otherAvailableAttributes"))
                return (
                  <div
                    style={{
                      display: "flex",
                      padding: 5,
                      justifyContent: "flex-end"
                    }}
                  >
                    <Button
                      onClick={() => {
                        window.open(
                          "../../../dhis-web-maintenance/index.html#/list/programSection/trackedEntityAttribute"
                        );
                      }}
                      style={{
                        marginRight: 5
                      }}
                      size="small"
                      type="primary"
                      disabled={type === 'default' && programMetadata === null}
                    >
                      Add
                    </Button>
                    <Button
                      loading={isReloading}
                      size="small"
                      onClick={async () => {
                        setIsReloading(true);
                        const { trackedEntityAttributes } = await metadataApi.getTrackedEntityAttributes();
                        setIsReloading(false);
                        setTeas(trackedEntityAttributes);
                      }}
                      disabled={type === 'default' && programMetadata === null}
                    >
                      Reload
                    </Button>
                  </div>
                );
              return null;
            }}
            disabled={type === 'default' && programMetadata === null}
          />
        </Card>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    admin: state.admin,
    allExistedTrackedEntityAttributes: state.metadata.trackedEntityAttributes,
    allExistedTrackedEntityTypes: state.metadata.trackedEntityTypes,
    programMetadata: state.metadata.programMetadata,
    formMapping: state.metadata.formMapping,
    femaleCode: state.metadata.femaleCode,
    fullnameOption: state.metadata.fullnameOption
  };
};

const mapDispatchToProps = {
  changeTrackedEntityTypes,
  changeTrackedEntityType,
  setTeas,
  setFemaleOption,
  setFullnameOption
};

export default connect(mapStateToProps, mapDispatchToProps)(Attributes);
