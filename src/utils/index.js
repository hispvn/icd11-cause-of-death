import moment from "moment";
import InputField from "../components/InputField";
import { Select, Input, DatePicker } from "antd";
import i18n from "i18next";
const { Option } = Select;
const { Search } = Input;

const sample = (d, fn = Math.random) => {
  if (d.length === 0) {
    return;
  }
  return d[Math.round(fn() * (d.length - 1))];
};

export const generateCode = (limit = 11, fn = Math.random) => {
  const allowedLetters = ["abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ"].join("");
  const allowedChars = ["0123456789", allowedLetters].join("");
  const arr = [sample(allowedLetters, fn)]; // sample 1 to make sure it starts with a letter
  for (let i = 0; i < limit - 1; i++) {
    arr.push(sample(allowedChars, fn));
  }
  return arr.join("");
};

export const convertValue = (valueType, value) => {
  switch (valueType) {
    case "TEXT":
    case "INTEGER_POSITIVE":
    case "INTEGER_NEGATIVE":
    case "INTEGER_ZERO_OR_POSITIVE":
    case "PERCENTAGE":
    case "NUMBER":
    case "INTEGER":
    case "PHONE_NUMBER":
    case "EMAIL":
    case "LONG_TEXT":
      return value;
    case "DATE":
      return moment(value).format("YYYY-MM-DD");
    case "DATETIME":
      return moment(value);
    case "TIME":
      return moment(value);
    case "BOOLEAN":
      return value;
    case "TRUE_ONLY":
      return value;
    case "AGE":
      return moment(value);
    default:
      return <span>UNSUPPORTED VALUE TYPE</span>;
  }
};

export const convertValueBack = (valueType, value) => {
  switch (valueType) {
    case "TEXT":
    case "INTEGER_POSITIVE":
    case "INTEGER_NEGATIVE":
    case "INTEGER_ZERO_OR_POSITIVE":
    case "PERCENTAGE":
    case "NUMBER":
    case "INTEGER":
    case "PHONE_NUMBER":
    case "EMAIL":
    case "LONG_TEXT":
      return value;
    case "DATE":
      return moment(value).format("YYYY-MM-DD");
    case "DATETIME":
      return moment(value);
    case "TIME":
      return moment(value);
    case "BOOLEAN":
      return value + "";
    case "TRUE_ONLY":
      return value ? value + "" : "";
    case "AGE":
      return moment(value).format("YYYY-MM-DD");
    default:
      return <span>UNSUPPORTED VALUE TYPE</span>;
  }
};

export const generateDhis2Payload = (data, programMetadata) => {
  const newData = JSON.parse(JSON.stringify(data));
  let { currentTei, currentEnrollment, currentEvents } = newData;
  currentTei.attributes = Object.keys(currentTei.attributes)
    .filter(attribute => programMetadata.trackedEntityAttributes.find((attr) => attr.id === attribute) )
    .map((attribute) => {
    const attributeMetadata = programMetadata.trackedEntityAttributes.find((attr) => attr.id === attribute);
    return {
      attribute,
      value: convertValueBack(attributeMetadata.valueType, currentTei.attributes[attribute])
    };
  });
  currentEnrollment.enrollmentDate = moment(currentEnrollment.enrollmentDate).format("YYYY-MM-DD");
  currentEnrollment.incidentDate = moment(currentEnrollment.incidentDate).format("YYYY-MM-DD");

  currentEvents = currentEvents.map((event) => {
    const programStage = programMetadata.programStages.find((ps) => ps.id === event.programStage);
    event.dataValues = Object.keys(event.dataValues).map((dataElement) => {
      const dataElementMetadata = programStage.dataElements.find((de) => de.id === dataElement);
      return {
        dataElement,
        value: convertValueBack(dataElementMetadata.valueType, event.dataValues[dataElement])
      };
    });
    event.eventDate = moment(event.eventDate).format("YYYY-MM-DD");
    event.dueDate = moment(event.dueDate).format("YYYY-MM-DD");
    return event;
  });

  return { currentTei, currentEnrollment, currentEvents };
};

export const generateTableColumns = (metadata, external) => {
  let render = null;
  if (external) {
    switch (external.type) {
      case "DATE":
        render = (value) => {
          return value ? moment(value).format("YYYY-MM-DD") : "";
        };
        break;
      default:
        render = (value) => {
          return value ? value : "";
        };
        break;
    }
  } else {
    if (metadata.valueSet) {
      render = (value) => {
        let find = metadata.valueSet.find((e) => {
          return e.value === value;
        });
        if (find) {
          value = find.label;
        }
        return value;
      };
    } else {
      switch (metadata.valueType) {
        case "TRUE_ONLY":
        case "BOOLEAN":
          render = (value) => {
            if (value == true || value == "true") {
              value = "Yes";
            }
            if (value == false || value == "false") {
              value = "No";
            }
            return value ? value : "";
          };
          break;
        case "DATE":
          render = (value) => {
            return value ? moment(value).format("YYYY-MM-DD") : "";
          };
          break;
        default:
          render = (value) => {
            return value ? value : "";
          };
          break;
      }
    }
  }
  return render;
};

export const generateTableFilter = (metadata, onFilter, external) => {
  let render = null;
  if (external) {
    switch (external.type) {
      case "DATE":
        render = (
          <div style={{ padding: "20px" }}>
            <DatePicker
              id={external.name}
              style={{ width: 250 }}
              onChange={(value) => {
                onFilter(value ? moment(value).format("YYYY-MM-DD") : value, external.name);
              }}
            />
          </div>
        );
        break;
      default:
        render = (value) => {
          return value ? value : "";
        };
        break;
    }
  } else {
    if (metadata.valueSet) {
      render = (
        <div style={{ padding: "20px" }}>
          <Select
            style={{ width: 250 }}
            allowClear
            showSearch
            placeholder={`${i18n.t("select")}...`}
            onChange={(value) => {
              onFilter(value, metadata.id, "select");
            }}
          >
            {metadata.valueSet.map((option) => {
              return <Option value={option.value}>{option.label}</Option>;
            })}
          </Select>
        </div>
      );
    } else {
      switch (metadata.valueType) {
        case "TRUE_ONLY":
        case "BOOLEAN":
          <div style={{ padding: "20px" }}>
            <Select
              style={{ width: 250 }}
              allowClear
              placeholder={`${i18n.t("select")}...`}
              onChange={(value) => {
                onFilter(value, metadata.id);
              }}
            >
              <Option value="true">Yes</Option>
              <Option value="false">No</Option>
            </Select>
          </div>;

          break;
        case "DATE":
          render = (
            <div style={{ padding: "20px" }}>
              <DatePicker
                id={metadata.id}
                style={{ width: 250 }}
                onChange={(value) => {
                  onFilter(value ? moment(value).format("YYYY-MM-DD") : value, metadata.id);
                }}
              />
            </div>
          );
          break;
        default:
          // render = (<Input style={{ width: 200 }} placeholder="Text Here..." allowClear onChange={onFilter}/>)
          render = (
            <div style={{ padding: "20px" }}>
              <Search
                id={metadata.id}
                placeholder={i18n.t("inputSearchText")}
                allowClear
                onSearch={(value) => {
                  onFilter(value, metadata.id);
                }}
                style={{ width: 250 }}
              />
            </div>
          );
          break;
      }
    }
  }
  return render;
};

export const generateEditableDataValueCells = (metadata, mutateDataValue) => {
  let render = (value, record) => {
    return (
      <InputField
        value={value}
        valueSet={metadata.valueSet ? metadata.valueSet : null}
        // label={metadata.displayFormName}
        valueType={metadata.valueType}
        change={(value) => {
          mutateDataValue(record.eventId, metadata.id, value);
        }}
      />
    );
  };
  return render;
};
export const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};
