import {
  Card,
  Row,
  Col,
  Table,
  Collapse,
  Switch,
  // Checkbox
} from "antd";
import { Hooks, Components } from "tracker-capture-app-core";
/* REDUX */
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { defaultAttributes } from "../../utils/const";
import { generateDefaultMetadata, generateCustomMetadata, updateProgramIndicators, updateSQLViews } from "../../utils/generateMetadata";
import { setInstallingFile } from "../../redux/actions/admin";
import { setFormMapping } from "../../redux/actions/metadata";
import { useTranslation } from "react-i18next";
/*       */
const { useApi } = Hooks;
const { LoadingMask } = Components;

// Temporally here
const fixedSections = require("../../asset/metadata/programStageSections.json").programStageSections.slice(6,10);
const fixedDEs = require("../../asset/metadata/dataElements.json").dataElements;

const Review = ({
  admin: {
    trackedEntityAttributes,
    dataElements,
    trackedEntityType,
    assignedOrgUnits,
    users,
    type: installType,
    fullnameOption,
    femaleOption
    // installingFile: metadata
  },
  allTeas,
  allExistedDataElements,
  allExistedUserGroups,
  setInstallingFile,
  setFormMapping
}) => {
  const { t } = useTranslation();
  const { metadataApi } = useApi();

  const [metadata, setMetadata] = useState(null);
  const [generateNewUID, setgenerateNewUID] = useState(false);

  const getAttr = (id) => allTeas.find(({ id: attrId }) => attrId === id);
  const getUser = (id) => allExistedUserGroups.find(({ id: userId }) => userId === id);
  const getDE = (id) => allExistedDataElements.find(({ id: deId }) => deId === id);
  
  const getUserGroupAccesses = () => {
    let userAccesses = {};
    for ( const group in users ) {
      users[group].forEach( user => {
        if ( !userAccesses[user] ) userAccesses[user] = [group];
        else userAccesses[user].push(group);
      });
    }
    let userGroupAccesses = [];
    for ( const user in userAccesses ) {
      let access = "r-------";
      userAccesses[user].forEach( a => {
        if ( a === "admin" ) access = access.substring(0,1) + "wr" + access.substring(3,8); 
        if ( a === "capture" ) access = access.substring(0,2) + "rw" + access.substring(4,8);
        if ( a === "view" ) access = access.substring(0,2) + "r" + access.substring(3,8);
      })
      userGroupAccesses.push({
        id: user,
        access: access
      })
    }
    return userGroupAccesses;
  }
    
  useEffect( () => {
    (async () => {
      setMetadata(null);
      let data = {};

      // generate metadata (base on setting stored in redux)
      if (installType === "custom") {
        const ageAttribute = await metadataApi.get(`/api/trackedEntityAttributes.json`, { paging: false }, [`filter=id:eq:${trackedEntityAttributes.find(([,name]) => name === "Age in years")[0]}`,"fields=:owner,!created,!lastUpdated,!createdBy,!lastUpdatedBy"]);
        data = generateCustomMetadata({trackedEntityAttributes,dataElements,trackedEntityType,fullnameOption}, generateNewUID,ageAttribute.trackedEntityAttributes[0]);
        data.metadata.programIndicators = updateProgramIndicators(data.metadata.programIndicators,trackedEntityAttributes.find(([,name]) => name === "Date of Birth")[0],trackedEntityAttributes.find(([,name]) => name === "Sex")[0],femaleOption);
        data.metadata.sqlViews = updateSQLViews(data.metadata.sqlViews,trackedEntityAttributes.find(([,name]) => name === "Age in years")[0],trackedEntityAttributes.find(([,name]) => name === "Sex")[0],femaleOption);
      }
      else {
        data = generateDefaultMetadata(false,generateNewUID);
      }

      data.metadata = {
        ...data.metadata,
        programs: [{
          ...data.metadata.programs[0],
          organisationUnits: assignedOrgUnits.map( o => {return { id : o.substring(o.length-11,o.length) }}),
          userGroupAccesses: getUserGroupAccesses()
        }]
      };

      // local state
      setMetadata(data.metadata);

      // redux
      setInstallingFile(data.metadata);
      setFormMapping(data.formMapping);

      console.log(data)
    })();
  }, [generateNewUID]);
  
  const getSwitchValue = section => {
    const sectionValue = dataElements.frameB.defaultSections.find(
      ({name}) => section.name === name
    );
    if (sectionValue) {
      return true;
    }
    return false;
  };

  const renderCustomAttributesStep = () => {
    const otherAttributes = trackedEntityAttributes.filter(
      ([, source]) => !source
    );
    const defAttrs = trackedEntityAttributes.filter(
      ([des, source]) => source && des !== ''
    );
    return Array.from(
      {
        length: Math.max(otherAttributes.length, defAttrs.length),
      },
      (_, index) => {
        const defaultAttr = defAttrs[index];
        const defaultAttrName = !defaultAttr ? "" : (defaultAttr[1] === 'First Name' && fullnameOption === "fullname") ? "Full Name" : defaultAttr[1];
        return {
          key: index,
          default: defaultAttrName,
          name: defaultAttr && getAttr(defaultAttr[0]) ? getAttr(defaultAttr[0]).displayName : "",
          other: otherAttributes[index]
            ? getAttr(otherAttributes[index][0]).displayName
            : "",
        };
      }
    );
  };

  const renderDefaultAttributesStep = () => {
    // return fullnameOption ? 
    // [
    //   {key:0,default:"Unique ID",name:metadata.trackedEntityAttributes.find(tea => tea.name === "COD System ID").name,other:""},
    //   {key:1,default:"Full Name",name:metadata.trackedEntityAttributes.find(tea => tea.name === "Given name").name,other:""},
    //   {key:2,default:"Date of Birth",name:metadata.trackedEntityAttributes.find(tea => tea.name === "Date of birth").name,other:""},
    //   {key:3,default:"Date of Birth is estimated",name:metadata.trackedEntityAttributes.find(tea => tea.name === "Date of birth is estimated").name,other:""},
    //   {key:4,default:"Age in years",name:metadata.trackedEntityAttributes.find(tea => tea.name === "Age (years)").name,other:""},
    //   {key:5,default:"Address",name:metadata.trackedEntityAttributes.find(tea => tea.name === "Address (current)").name,other:""},
    //   {key:6,default:"Sex",name:metadata.trackedEntityAttributes.find(tea => tea.name === "Sex").name,other:""}
    // ] 
    // : 
    return [
      {key:0,default:"Unique ID",name:metadata.trackedEntityAttributes.find(tea => tea.name === "COD System ID").name,other:""},
      {key:1,default:"First Name",name:metadata.trackedEntityAttributes.find(tea => tea.name === "Given name").name,other:""},
      {key:2,default:"Last Name",name:metadata.trackedEntityAttributes.find(tea => tea.name === "Family name").name,other:""},
      {key:3,default:"Date of Birth",name:metadata.trackedEntityAttributes.find(tea => tea.name === "Date of birth").name,other:""},
      {key:4,default:"Date of Birth is estimated",name:metadata.trackedEntityAttributes.find(tea => tea.name === "Date of birth is estimated").name,other:""},
      {key:5,default:"Age in years",name:metadata.trackedEntityAttributes.find(tea => tea.name === "Age (years)").name,other:""},
      {key:6,default:"Address",name:metadata.trackedEntityAttributes.find(tea => tea.name === "Address (current)").name,other:""},
      {key:7,default:"Sex",name:metadata.trackedEntityAttributes.find(tea => tea.name === "Sex").name,other:""}
    ]
  } 

  return (
    <div className="administration-reviewfinish-container">
      {
        (metadata === null) ? <LoadingMask /> : 
        <Row 
          style={{ 
            width: "100%", 
            height: "100%"
          }} 
          gutter={[16, 24]}
        >
          {/* <Col span={18}
            style={{ 
              width: "100%", 
              // height: "100%", 
              // overflow: "auto",
              margin: "auto",
              textAlign: "center"
            }}  
          >
            <Checkbox checked={generateNewUID} onChange={() => setgenerateNewUID(!generateNewUID)}>Generate new UID for the installing metadata</Checkbox>
          </Col> */}
          <Col span={18}
            style={{ 
              width: "100%", 
              height: "100%", 
              // overflow: "auto",
              margin: "auto" 
            }} 
          >
            <Card
              style={{ marginBottom: 10 }}
              type="inner"
              title={t("step2Attribute")}
            >
              <Row>
                <Table
                  size="small"
                  bordered
                  pagination={false}
                  columns={[
                    {
                      title: t("defaultAttribute"),
                      colSpan: 2,
                      dataIndex: "default"
                    },
                    {
                      colSpan: 0,
                      dataIndex: "name"
                    },
                    {
                      title: t("otherAttributes"),
                      dataIndex: "other"
                    },
                  ]}
                  dataSource={ installType === "custom" ? renderCustomAttributesStep() : renderDefaultAttributesStep()}
                />
              </Row>
            </Card>
            <Card style={{ marginBottom: 10 }} type="inner" title={t("step3FrameA")}>
              <Row>
                <Col xs={12}>
                  <Card
                    type="inner"
                    style={{ height: 255, overflow: "auto" }}
                    size="small"
                    title={t("defaultSectionsInFrameB")}
                  >
                    <Collapse
                      // style={{ height: 500, overflow: "auto" }}
                      defaultActiveKey={[]}
                    >
                      {/* {metadata.programStageSections.slice(0,6).map( section => { */}
                      {metadata.programStageSections.slice(0,10).map( section => {
                        return (
                          <Collapse.Panel
                            key={section.id}
                            header={
                              <div>
                                <Switch
                                  disabled
                                  checked={true}
                                  // onChange={changeSwitch(section)}
                                  checkedChildren="Include"
                                  unCheckedChildren="Skip"
                                  style={{ marginRight: 8 }}
                                />
                                <strong>{section.name}</strong>
                              </div>
                            }
                          >
                            {section.dataElements.map( de => (
                              <div key={de.id} className="administration-attribute">
                                {
                                  metadata.dataElements.find(
                                    ({ id }) => id === de.id
                                  ).name
                                }
                              </div>
                            ))}
                          </Collapse.Panel>
                        );
                      })}
                    </Collapse>
                  </Card>
                </Col>
                <Col xs={12}>
                  <Card
                    type="inner"
                    style={{ height: 255, overflow: "auto" }}
                    size="small"
                    title={t("otherSectionsInFrameA")}
                  >
                    {(installType === "custom" ) && 
                      <Collapse defaultActiveKey={["1"]}>
                        {/* {dataElements.frameA.otherSections.map(([name, des], index) => ( */}
                        {dataElements.form.otherSections.map(([name, des], index) => (
                          <Collapse.Panel key={index} header={name}>
                            <Table
                              size="small"
                              bordered
                              showHeader={false}
                              pagination={false}
                              columns={[
                                {
                                  dataIndex: 0
                                }
                              ]}
                              dataSource={des.map((id) => [getDE(id).displayName])}
                            />
                          </Collapse.Panel>
                        ))}
                      </Collapse>
                    }
                  </Card>
                </Col>
              </Row>
            </Card>
            {/* <Card style={{ marginBottom: 10 }} type="inner" title={t("step4FrameB")}>
              <Row>
                <Col xs={12}>
                  <Card
                    type="inner"
                    style={{ height: 255, overflow: "auto" }}
                    size="small"
                    title={t("defaultSectionsInFrameB")}
                  >
                    <Collapse
                      // style={{ height: 500, overflow: "auto" }}
                      defaultActiveKey={[]}
                    >
                      {fixedSections.map( section => {
                        return (
                          <Collapse.Panel
                            key={section.id}
                            header={
                              <div>
                                <Switch
                                  disabled
                                  checked={installType === "default" ? true : getSwitchValue(section)}
                                  // onChange={changeSwitch(section)}
                                  checkedChildren="Include"
                                  unCheckedChildren="Skip"
                                  style={{ marginRight: 8 }}
                                />
                                <strong>{section.name}</strong>
                              </div>
                            }
                          >
                            {section.dataElements.map( de => (
                              <div key={de.id} className="administration-attribute">
                                {
                                  fixedDEs.find(
                                    ({ id }) => id === de.id
                                  ).name
                                }
                              </div>
                            ))}
                          </Collapse.Panel>
                        );
                      })}
                    </Collapse>
                  </Card>
                </Col>
                <Col xs={12}>
                  <Card
                    type="inner"
                    style={{ height: 255, overflow: "auto" }}
                    size="small"
                    title={t("otherSectionsInFrameB")}
                  >
                    {(installType === "custom" ) && 
                      <Collapse>
                        {dataElements.frameB.otherSections.map(([name,des], index) => {
                          return (
                            <Collapse.Panel key={index} header={name}>
                              <Table
                                size="small"
                                bordered
                                showHeader={false}
                                pagination={false}
                                columns={[
                                  {
                                    dataIndex: 0
                                  }
                                ]}
                                dataSource={des.map( de => [
                                  getDE(de).displayName
                                ])}
                              />
                            </Collapse.Panel>
                          );
                        })}
                      </Collapse>
                    }
                  </Card>
                </Col>
              </Row>
            </Card> */}
            <Card
              style={{ marginBottom: 10 }}
              type="inner"
              title={t("step5OUs")}
            >
              <div>
                Number of OrgUnits assigned:{" "}
                <strong>{assignedOrgUnits.length}</strong> org units
              </div>
            </Card>
            <Card
              style={{ marginBottom: 10 }}
              type="inner"
              title={t("step6Users")}
            >
              <Row>
                <Col xs={24}>
                  <Table
                    size="small"
                    scroll={{
                      y: "calc(255px - 39px)",
                    }}
                    bordered
                    // showHeader={false}
                    header={t("adminGroup")}
                    pagination={false}
                    columns={[
                      {
                        title: t("adminGroup"),
                        dataIndex: "admin",
                      },
                      {
                        title: t("captureGroup"),
                        dataIndex: "capture",
                      },
                      {
                        title: t("viewGroup"),
                        dataIndex: "view",
                      },
                    ]}
                    dataSource={Array.from(
                      {
                        length: Math.max(
                          users.admin.length,
                          users.capture.length,
                          users.view.length
                        ),
                      },
                      (_, index) => {
                        return {
                          key: index,
                          admin: users.admin[index]
                            ? getUser(users.admin[index]).displayName
                            : "",
                          capture: users.capture[index]
                            ? getUser(users.capture[index]).displayName
                            : "",
                          view: users.view[index]
                            ? getUser(users.view[index]).displayName
                            : "",
                        };
                      }
                    )}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      }
    </div>
  );
};

const mapStateToProps = state => {
  return {
    admin: state.admin,
    allTeas: state.metadata.trackedEntityAttributes,
    allExistedDataElements: state.metadata.dataElements,
    allExistedUserGroups: state.metadata.userGroups,
  };
};

const mapDispatchToProps = {
  setInstallingFile,
  setFormMapping
}

export default connect(mapStateToProps, mapDispatchToProps)(Review);
