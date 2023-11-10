import { Card, Select, Transfer, Button, Row, Col } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
/* REDUX */
import { connect } from "react-redux";
import { changeAssignUsers } from "../../redux/actions/admin";
import { useState } from "react";
import { useTranslation } from "react-i18next";

/*       */

const AssignUsers = ({
  admin: {
    users: { admin: adminUsers, capture: captureUsers, view: viewUsers },
  },
  existedUserGroups,
  changeAssignAdminUsers,
  changeAssignCaptureUsers,
  changeAssignViewUsers,
}) => {
  const { t } = useTranslation();
  const [selectedKeys, setSelectedKeys] = useState({
    admin: [],
    capture: [],
    view: [],
  });
  const changeSelectedKeys = (group) => (
    sourceSelectedKeys,
    targetSelectedKeys
  ) =>
    setSelectedKeys({
      ...selectedKeys,
      [group]: [].concat(sourceSelectedKeys).concat(targetSelectedKeys),
    });
  const showedUsers = (group) => {
    // const map = {
    //   admin: adminUsers,
    //   capture: captureUsers,
    //   view: viewUsers,
    // };
    // const users = [];
    // const arr = Object.entries(map).map(([name, groupUsers]) => {
    //   if (name !== group) {
    //     return;
    //   }
    //   users.concat(groupUsers);
    // });
    // return existedUsers.filter((user) => !arr.includes[user.id]);
    return existedUserGroups;
  };

  const onChange = (group) => (nextTargetKeys, direction, moveKeys) => {
    switch (group) {
      case "admin": {
        changeAssignAdminUsers(nextTargetKeys);
        break;
      }
      case "capture": {
        changeAssignCaptureUsers(nextTargetKeys);
        break;
      }
      case "view": {
        changeAssignViewUsers(nextTargetKeys);
        break;
      }
    }
  };

  // const onSelectChange = (group) => (
  //   sourceSelectedKeys,
  //   targetSelectedKeys
  // ) => {
  //   setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  // };

  return (
    <div className="administration-users-container">
      <Row style={{ margin: 10, width: "100%", height: "100%" }} gutter={16}>
        <Col xs={8}>
          <Card
            style={{ height: "100%" }}
            size="small"
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                {t("adminGroup")}
                <FontAwesomeIcon
                  onClick={() => {}}
                  icon={faInfoCircle}
                  style={{
                    marginLeft: 5,
                    fontSize: 17,
                    color: "#878787",
                    cursor: "pointer",
                  }}
                />
              </div>
            }
          >
            <Transfer
              showSearch
              pagination={{
                pageSize: 20,
              }}
              listStyle={{
                width: "50%",
                height: "63vh"
              }}
              dataSource={existedUserGroups.map(({ id, displayName }) => ({
                key: id,
                title: displayName,
              }))}
              // dataSource={existedUsers}
              targetKeys={adminUsers}
              selectedKeys={selectedKeys.admin}
              render={(item) => item.title}
              onChange={onChange("admin")}
              onSelectChange={changeSelectedKeys("admin")}
            />
          </Card>
        </Col>
        <Col xs={8}>
          <Card
            style={{ height: "100%" }}
            size="small"
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                {t("captureGroup")}
                <FontAwesomeIcon
                  onClick={() => {}}
                  icon={faInfoCircle}
                  style={{
                    marginLeft: 5,
                    fontSize: 17,
                    color: "#878787",
                    cursor: "pointer",
                  }}
                />
              </div>
            }
          >
            <Transfer
              showSearch
              pagination={{
                pageSize: 20,
              }}
              listStyle={{
                width: "50%",
                height: "63vh"
              }}
              dataSource={showedUsers("capture").map(({ id, displayName }) => ({
                key: id,
                title: displayName,
              }))}
              targetKeys={captureUsers}
              selectedKeys={selectedKeys.capture}
              render={(item) => item.title}
              onChange={onChange("capture")}
              onSelectChange={changeSelectedKeys("capture")}
            />
          </Card>
        </Col>
        <Col xs={8}>
          <Card
            style={{ height: "100%" }}
            size="small"
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                {t("viewGroup")}
                <FontAwesomeIcon
                  onClick={() => {}}
                  icon={faInfoCircle}
                  style={{
                    marginLeft: 5,
                    fontSize: 17,
                    color: "#878787",
                    cursor: "pointer",
                  }}
                />
              </div>
            }
          >
            <Transfer
              showSearch
              pagination={{
                pageSize: 20,
              }}
              listStyle={{
                width: "50%",
                height: "63vh"
              }}
              dataSource={showedUsers("view").map(({ id, displayName }) => ({
                key: id,
                title: displayName,
              }))}
              targetKeys={viewUsers}
              selectedKeys={selectedKeys.view}
              render={(item) => item.title}
              onChange={onChange("view")}
              onSelectChange={changeSelectedKeys("view")}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    admin: state.admin,
    existedUserGroups: state.metadata.userGroups,
  };
};

const mapDispatchToProps = {
  changeAssignAdminUsers: changeAssignUsers("admin"),
  changeAssignCaptureUsers: changeAssignUsers("capture"),
  changeAssignViewUsers: changeAssignUsers("view"),
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignUsers);
