import { Modal, Input, Spin, Collapse, Checkbox } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useCallback } from "react";
import { search, searchByCode, getEntity, getToken } from "../../utils/icd11";
import "./index.css";
const { Search } = Input;
const { Panel } = Collapse;

const Icd11Tool = ({ visible, setVisible, onSelect }) => {
  const [value, setValue] = useState("");
  const [selectedCod, setSelectedCod] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setSelectedCod(null);
    setData(null);
    onKeywordChange("");
  }, [visible]);

  const debounce = (func, wait) => {
    var timeout;
    return function () {
      var context = this,
        args = arguments;

      var executeFunction = function () {
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(executeFunction, wait);
    };
  };

  const onKeywordClick = async (keyword) => {
    setValue(keyword);
    setLoading(true);
    const result = await search(keyword);
    setLoading(false);
    setData({ ...result });
  };

  const onKeywordChange = async (value, event) => {
    const keyword = value;
    setValue(value);
    setLoading(true);
    const result = await search(keyword);
    setLoading(false);
    setData({ ...result, keyword });
  };
  const debouncedSearch = useCallback(
    debounce((value) => {
      if (value.length >= 3) {
        onKeywordChange(value);
      }
    }, 1000),
    [] // will be created only once initially
  );
  return (
    <Modal
      title="ICD 11 Coding Tool"
      maskClosable={false}
      centered
      visible={visible}
      onOk={() => {
        setVisible(false);
        // getEntity(selectedCod.id).then((json) => console.log(json));
        onSelect(selectedCod);
      }}
      onCancel={() => setVisible(false)}
      width="95%"
    >
      <div className="icd11-coding-tool-container">
        <Search
          value={value}
          placeholder="Seach..."
          onChange={(event) => {
            setValue(event.target.value);
            debouncedSearch(event.target.value);
          }}
        />
        {loading ? (
          <div className="icd11-coding-tool-loading-container ">
            <Spin size="large" />
          </div>
        ) : (
          <div className="icd11-coding-tool-content-container">
            <div className="icd11-matching-keyword-table">
              {data &&
                data.words.map((word, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        onKeywordClick(word.label);
                      }}
                      className="icd-matching-keyword-row"
                    >
                      {word.label}
                    </div>
                  );
                })}
            </div>
            <div className="icd11-result-table">
              {loading && <Spin size="large" />}
              {data && (
                <Collapse accordion>
                  {data.destinationEntities.map((de, index) => {
                    return (
                      <Panel
                        header={
                          <div className="icd11-result-row" key={de.id}>
                            <div className="icd11-description-action">
                              <Checkbox
                                checked={
                                  selectedCod
                                    ? selectedCod.id === de.id
                                      ? true
                                      : false
                                    : false
                                }
                                onClick={(event) => {
                                  event.stopPropagation();
                                  setSelectedCod(de);
                                }}
                              />
                            </div>
                            <div className="icd11-code">{de.theCode}</div>
                            <div
                              className="icd11-description"
                              dangerouslySetInnerHTML={{ __html: de.title }}
                            ></div>
                          </div>
                        }
                      >
                        {de.matchingPVs.map((mpv) => {
                          return (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: "&#8226; " + mpv.label
                              }}
                            ></div>
                          );
                        })}
                      </Panel>
                    );
                  })}
                </Collapse>
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default Icd11Tool;
