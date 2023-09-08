import { Input, Radio, Checkbox, DatePicker, Select } from "antd";
import moment from "moment";
import "./index.css";
const { TextArea } = Input;
const { Option } = Select;

const InputField = (props) => {
  const {
    label,
    error,
    helper,
    warning,
    value,
    valueType,
    valueSet,
    click,
    addonBefore,
    change,
    disabled,
    addonAfter,
    date_limit,
    placeholder,
    allowClear,
    disabledDate
  } = props;

  // function disabledDate(d) {
  //   // Can not select days after today and today
  //   return moment(d,"yyyy-mm-dd") > moment().endOf('day');
  // }

  const generateField = () => {
    if (valueSet) {
      return (
        <Select
          value={value}
          allowClear
          showSearch
          style={{ width: "100%" }}
          onChange={(selected) => {
            change(selected);
          }}
            disabled={disabled}
        >
          {valueSet.map((set) => (
            <Option value={set.value}>{set.label}</Option>
          ))}
        </Select>
      );
    }
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
        return (
          <Input
            addonBefore={addonBefore}
            addonAfter={addonAfter}
            value={value || ""}
            onClick={click}
            onChange={(event) => {
              change(event.target.value);
            }}
            disabled={disabled}
            placeholder={placeholder}
            allowClear={allowClear}
          />
        );
      case "LONG_TEXT":
        return (
          <TextArea
            value={value || ""}
            onChange={(event) => {
              change(event.target.value);
            }}
          />
        );
      case "DATE":
        return (
          <DatePicker
            value={value ? moment(value) : ""}
            onChange={(momentObject) => {
              change(momentObject.format("YYYY-MM-DD"));
            }}
          />
        );
      case "DATE_WITH_RANGE":
        return (
          <DatePicker 
            value={value ? moment(value) : ""}
            onChange={(momentObject) => {
              change(momentObject.format("YYYY-MM-DD"));
            }}
            disabledDate={disabledDate}
          />
        );
      case "DATETIME":
        return <div>hello</div>;
      case "TIME":
        return <div>hello</div>;
      case "BOOLEAN":
        return (
          <Radio.Group
            value={value}
            onChange={(event) => {
              change(event.target.value);
            }}
          >
            <Radio value="true" style={{ fontSize: "13.5px" }}>
              Yes
            </Radio>
            <Radio value="false" style={{ fontSize: "13.5px" }}>
              No
            </Radio>
          </Radio.Group>
        );
      case "TRUE_ONLY":
        return (
          <Checkbox
            checked={value}
            onChange={(event) => {
              change(event.target.checked);
            }}
            disabled={disabled}
          ></Checkbox>
        );
      case "AGE":
        return (
          <DatePicker
            value={value}
            onChange={(momentObject) => {
              change(momentObject);
            }}
          />
        );
      default:
        return <span>UNSUPPORTED VALUE TYPE</span>;
    }
  };

  return (
    <div className="input-container">
      {label && <div className="input-label">{label}</div>}
      <div className="input-field">{generateField()}</div>
      {error && <div className="input-error">{error}</div>}
      {helper && <div className="input-helper">{helper}</div>}
      {warning && <div className="input-warning">{warning}</div>}
    </div>
  );
};

export default InputField;
