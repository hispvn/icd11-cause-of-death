import { useState } from "react";
import { Select, Button } from "antd";
import _ from "lodash";
/* REDUX */
import { connect } from "react-redux";
import { assignOrgUnits } from "../../redux/actions/admin";
import { useTranslation } from "react-i18next";
/*       */
import { Components } from "tracker-capture-app-core";
const { Option } = Select;
const { MultipleOrgUnitSelector } = Components;

const AssignOrgUnits = ({ admin, metadata, assignOrgUnits }) => {
  const { t } = useTranslation();
  const [selectedOrgUnitLevel, setSelectedOrgUnitLevel] = useState("");
  const [selectedOrgUnitGroup, setSelectedOrgUnitGroup] = useState("");

  const { assignedOrgUnits } = admin;
  const { orgUnitGroups, orgUnitLevels, orgUnits } = metadata;

  const selectOrgUnits = (orgUnits) => {
    const selectedPaths = orgUnits.map((ou) => ou.path);
    const newAssignOrgUnits = _.compact([
      ...assignedOrgUnits,
      ...selectedPaths
    ]);
    assignOrgUnits(newAssignOrgUnits);
  };
  const deselectOrgUnits = (orgUnits) => {
    const selectedPaths = orgUnits.map((ou) => ou.path);
    const newAssignOrgUnits = assignedOrgUnits.filter(
      (ao) => !selectedPaths.includes(ao)
    );
    assignOrgUnits(newAssignOrgUnits);
  };

  return (
    <div className="administration-orgunit-container">
      <div className="administration-multiorgunit-selector-container">
        <MultipleOrgUnitSelector
          selectedOrgUnits={assignedOrgUnits}
          handleSelectOrgUnits={(selected) => {
            assignOrgUnits(selected.selected);
          }}
        />
      </div>
      <div className="administration-multiorgunit-selection-container">
        <div>
          <div>{t("OULevel")}</div>
          <div>
            <Select
              value={selectedOrgUnitLevel.value}
              placeholder="Select organisation unit level"
              style={{ width: 250 }}
              onChange={(value, option) => {
                setSelectedOrgUnitLevel({ ...option });
              }}
              options={orgUnitLevels.map((oul) => {
                return {
                  value: oul.id,
                  level: oul.level,
                  label: oul.displayName
                };
              })}
            />
          </div>
          <div>
            <Button
              onClick={() => {
                selectOrgUnits(
                  orgUnits.filter(
                    (ou) => ou.level === selectedOrgUnitLevel.level
                  )
                );
              }}
            >
            { 
              t("Select")
            }
            </Button>
            <Button
              onClick={() => {
                deselectOrgUnits(
                  orgUnits.filter(
                    (ou) => ou.level === selectedOrgUnitLevel.level
                  )
                );
              }}
            >
            {
              t("deselect")
            }
            </Button>
          </div>
        </div>
        <div>
          <div>{t("OUGroup")}</div>
          <div>
            <Select
              value={selectedOrgUnitGroup.value}
              placeholder="Select organisation unit group"
              style={{ width: 250 }}
              onChange={(value, option) => {
                setSelectedOrgUnitGroup({ ...option });
              }}
              options={orgUnitGroups.map((oug) => {
                return {
                  value: oug.id,
                  orgUnitList: oug.organisationUnits.map((ou) => ou.id),
                  label: oug.displayName
                };
              })}
            />
          </div>
          <div>
            <Button
              onClick={() => {
                if (!selectedOrgUnitGroup) return;
                selectOrgUnits(
                  orgUnits.filter((ou) =>
                    selectedOrgUnitGroup.orgUnitList.includes(ou.id)
                  )
                );
              }}
            >
            { 
              t("select")
            }
            </Button>
            <Button
              onClick={() => {
                if (!selectedOrgUnitGroup) return;
                deselectOrgUnits(
                  orgUnits.filter((ou) =>
                    selectedOrgUnitGroup.orgUnitList.includes(ou.id)
                  )
                );
              }}
            >
            {
              t("deselect")
            }
            </Button>
          </div>
        </div>
        <div>
          <div>
            <Button
              onClick={() => {
                selectOrgUnits(orgUnits);
              }}
            >
            { 
              t("selectAll")
            }
            </Button>
            <Button
              onClick={() => {
                deselectOrgUnits(orgUnits);
              }}
            >
            {
              t("deselectAll")
            }
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    admin: state.admin,
    metadata: state.metadata
  };
};
const mapDispatchToProps = { assignOrgUnits };
export default connect(mapStateToProps, mapDispatchToProps)(AssignOrgUnits);
