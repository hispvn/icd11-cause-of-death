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
    disabledDate,
    selectMode,
    mandatory,
    tagRender,
    style
  } = props;

  // function disabledDate(d) {
  //   // Can not select days after today and today
  //   return moment(d,"yyyy-mm-dd") > moment().endOf('day');
  // }

  const generateField = () => {
    if (valueSet) {
      return selectMode ? 
      (
        <Select
          value={value}
          // allowClear
          showSearch
          style={style ? style : { width: "100%", textAlign: "left" }}
          onChange={(selected) => {
            change(selected);
          }}
          disabled={disabled}
          mode={selectMode}
          tagRender={tagRender}
          onClick={click}
          placeholder={placeholder}
        >
          {valueSet.map((set) => (
            <Option value={set.value}>{set.label}</Option>
          ))}
        </Select>
      ) : 
      (
        <Select
          value={value}
          allowClear
          showSearch
          style={style ? style : { width: "100%", maxWidth: "260px", textAlign: "left" }}
          onChange={(selected) => {
            change(selected);
          }}
          disabled={disabled}
          placeholder={placeholder}
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
            style={style}
          />
        );
      case "LONG_TEXT":
        return (
          <TextArea
            value={value || ""}
            onChange={(event) => {
              change(event.target.value);
            }}
            disabled={disabled}
          />
        );
      case "DATE":
        return (
          <DatePicker
            value={value ? moment(value) : ""}
            onChange={(momentObject) => {
              if( momentObject !== null ) {
                change(momentObject.format("YYYY-MM-DD"));
              }
              else {
                change("");
              }
            }}
            disabled={disabled}
            style={style}
          />
        );
      case "DATE_WITH_RANGE":
        return (
          <DatePicker 
            value={value ? moment(value) : ""}
            onChange={(momentObject) => {
              if( momentObject !== null ) {
                change(momentObject.format("YYYY-MM-DD"));
              }
              else {
                change("");
              }
            }}
            disabledDate={disabledDate}
            disabled={disabled}
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
            disabled={disabled}
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
            disabled={disabled}
          />
        );
      default:
        return <span>UNSUPPORTED VALUE TYPE</span>;
    }
  };

  return (
    <div className="input-container">
      {label && <div className="input-label">{`${label}${mandatory ? " *" : ""}`}</div>}
      <div className="input-field">{generateField()}</div>
      {error && <div className="input-error">{error}</div>}
      {helper && <div className="input-helper">{helper}</div>}
      {warning && <div className="input-warning">{warning}</div>}
    </div>
  );
};

export default InputField;
