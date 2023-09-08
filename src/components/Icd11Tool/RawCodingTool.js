import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import * as ECT from "@whoicd/icd11ect";
import "@whoicd/icd11ect/style.css";
import "./index.css";
import PropTypes from "prop-types";
import { Input, Row, Col } from "antd";
import { debounce } from "lodash";

const { Search } = Input;

let apiUrl = process.env.REACT_APP_ICD11_API_URL;

const RawCodingTool = ({ onSelect, iNo, isClear, defaultValue, keyUILocale }) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedEntity, setSelectedEntity] = useState(null);

  const ectSearch = (value) => value && ECT.Handler.search(iNo, value);

  const search = (value) => ectSearch(value);

  const debounceSearch = useCallback(debounce(search, 275), []);

  useEffect(() => {
    // console.log("Tool",defaultValue);
    // if (isClear) {
    //   setSearchValue("");
    //   setSelectedEntity(null);
    //   ECT.Handler.clear(iNo);
    // } else {
    //   setSearchValue(defaultValue ? defaultValue.title : "");
    //   search(defaultValue ? defaultValue.title : "");
    //   setSelectedEntity(defaultValue || null);
    // }
  }, [isClear]);

  useEffect(() => {
    if (defaultValue.code === "") {
      setSearchValue("");
      setSelectedEntity(null);
      ECT.Handler.clear(iNo);
    }
    else {
      setSearchValue(defaultValue ? defaultValue.title : "");
      search(defaultValue ? defaultValue.title : "");
      setSelectedEntity(defaultValue || null);
    }
  }, [defaultValue]);

  useEffect(() => {
    debounceSearch(searchValue);
  }, [searchValue])

  useEffect(() => {
    const mySettings = {
      autoBind: false,
      apiServerUrl: "https://icd11restapi-developer-test.azurewebsites.net",
      language: keyUILocale
      // icdMinorVersion: "2020-09",
      // icdLinearization: "mms",
    };
    const myCallbacks = {
      selectedEntityFunction: (selectedEntity) => {
        onSelect(selectedEntity);
        setSelectedEntity(selectedEntity);
      }
    };
    ECT.Handler.configure(mySettings, myCallbacks);
    ECT.Handler.bind(iNo);
  }, []);
  return (
    <div>
      <input hidden type="text" className="ctw-input" autoComplete="off" data-ctw-ino={iNo} />
      <Row gutter={12}>
        <Col xs={12}>
          <Search
            width="50%"
            allowClear
            onSearch={ectSearch(searchValue)}
            value={searchValue}
            placeholder="Type for start searching"
            onChange={(event) => {
              setSearchValue(event.target.value);
            }}
          />
        </Col>
        <Col xs={12}>
          <Row wrap={false} justify="center" align="center" gutter={6}>
            <Col xs={6}>
              <div style={{ lineHeight: 2, float: "right" }}>Your selection is:</div>
            </Col>
            <Col xs={18}>
              <Input
                addonBefore={selectedEntity && selectedEntity.code}
                value={selectedEntity && selectedEntity.title}
                disabled
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="ctw-window icd-window" data-ctw-ino={iNo} />
    </div>
  );
};

RawCodingTool.propTypes = {
  iNo: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onSelect: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    keyUILocale: state.metadata.keyUiLocale,
  };
};

export default connect(mapStateToProps)(RawCodingTool);