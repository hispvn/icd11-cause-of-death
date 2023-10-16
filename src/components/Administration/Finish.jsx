import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
    Result,
    Modal, 
    Button
    // Row,
    // Col,
    // Button,
    // Checkbox
} from "antd";
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Hooks, Components } from "tracker-capture-app-core";
import { useTranslation } from "react-i18next";
import { setProgramMetadata, getICD11Options, setFemaleCode, setCertificateTemplate, setTeas, setTrackerDataElements } from "../../redux/actions/metadata";
import { setUserRole } from "../../redux/actions/user";
// import { getICD11Options } from "../../redux/actions/admin";
const { useApi } = Hooks;
const { LoadingMask } = Components;

const Finish = ({
    open,
    metadata,
    programMetadata,
    formMapping,
    femaleOption,
    fullnameOption,
    setProgramMetadata,
    getICD11Options,
    setFemaleCode,
    setCertificateTemplate, setTeas, setTrackerDataElements, setUserRole
}) => {
    const { t } = useTranslation();
    const { metadataApi } = useApi();
    
    const [results, setResults] = useState({});
    const [status, setStatus] = useState({
        title: t("installing"),
        subTitle: t("waitForInstalling"),
        status: "installing"
    })

    const importMetadata = async () => {
        let temp = {};

        setStatus({...status, subTitle: "Loading metadata ..."});
        const icd11Options = require("../../asset/metadata/icd11_options.json");
        
        if (metadata["attributes"]) {
            setStatus({...status, subTitle: t("importAttributes")});
            await metadataApi.push(`/api/metadata`, { attributes: metadata["attributes"]})
            .then(response => {
                temp = {
                    ...temp,
                    attributes: response
                };
                setResults(temp);
            });
        }
        if (metadata["legendSets"]) {
            setStatus({...status, subTitle: t("legendSets")});
            await metadataApi.push(`/api/metadata`, { legendSets: metadata["legendSets"]})
            .then(response => {
                temp = {
                    ...temp,
                    legendSets: response
                };
                setResults(temp);
            });
        }
        if (metadata["optionSets"]) {
            setStatus({...status, subTitle: t("importOptionSets")});
            await metadataApi.push(`/api/metadata`, { optionSets: metadata["optionSets"]})
            .then(response => {
                temp = {
                    ...temp,
                    optionSets: response
                };
                setResults(temp);
            });
        }

        // metadataApi.push(`/api/metadata`, icd11Options )
        // .then(response => {
        //     temp = {
        //         ...temp,
        //         icd11Options: response
        //     };
        //     setResults(temp);
        // });
        metadataApi.push(`/api/metadata?importStrategy=CREATE_AND_UPDATE&async=true`, icd11Options )
        .then(async response => {
            let importComplete = false;
            while (!importComplete) {
                const importReport = await metadataApi.get(response.response.relativeNotifierEndpoint);
                if ( importReport.find(report => report.completed) ) {
                    importComplete = true;
                    temp = {
                        ...temp,
                        icd11Options: response
                    };
                    setResults(temp);
                }
                else {
                    if ( Object.keys(results).length === Object.keys(metadata).length ) {
                        setStatus({...status, subTitle: "Import ICD11 options"});
                    }
                }
            }
        });

        if (metadata["options"]) {
            setStatus({...status, subTitle: t("importOptions")});
            await metadataApi.push(`/api/metadata`, { options: metadata["options"]})
            .then(async response => {
                temp = {
                    ...temp,
                    options: response
                };
                setResults(temp);
            });
        }

        if (metadata["trackedEntityAttributes"]) {
            setStatus({...status, subTitle: t("importTrackedEntityAttributes")});
            await metadataApi.push(`/api/metadata`, { trackedEntityAttributes: metadata["trackedEntityAttributes"]})
            .then(response => {
                temp = {
                    ...temp,
                    trackedEntityAttributes: response
                };
                setResults(temp);
            });
        }
        if (metadata["trackedEntityTypes"]) {
            setStatus({...status, subTitle: t("importTrackedEntityTypes")});
            await metadataApi.push(`/api/metadata`, { trackedEntityTypes: metadata["trackedEntityTypes"]})
            .then(response => {
                temp = {
                    ...temp,
                    trackedEntityTypes: response
                };
                setResults(temp);
            });
        }
        if (metadata["dataElements"]) {
            setStatus({...status, subTitle: t("importDataElements")});
            await metadataApi.push(`/api/metadata`, { dataElements: metadata["dataElements"]})
            .then(response => {
                temp = {
                    ...temp,
                    dataElements: response
                };
                setResults(temp);
            });
        }
        if (metadata["programs"]) {
            setStatus({...status, subTitle: t("importPrograms")});
            await metadataApi.push(`/api/metadata`, { programs: metadata["programs"]})
            .then(response => {
                temp = {
                    ...temp,
                    programs: response
                };
                setResults(temp);
            });
        }
        if (metadata["programStages"]) {
            setStatus({...status, subTitle: t("importProgramStages")});
            await metadataApi.push(`/api/metadata`, { programStages: metadata["programStages"]})
            .then(response => {
                temp = {
                    ...temp,
                    programStages: response
                };
                setResults(temp);
            });
        }
        if (metadata["programStageSections"]) {
            setStatus({...status, subTitle: t("importProgramStageSections")});
            await metadataApi.push(`/api/metadata`, { programStageSections: metadata["programStageSections"]})
            .then(response => {
                temp = {
                    ...temp,
                    programStageSections: response
                };
                setResults(temp);
            });
        }
        if (metadata["programIndicators"]) {
            setStatus({...status, subTitle: t("programIndicators")});
            await metadataApi.push(`/api/metadata`, { programIndicators: metadata["programIndicators"]})
            .then(response => {
                temp = {
                    ...temp,
                    programIndicators: response
                };
                setResults(temp);
            });
        }
        if (metadata["indicatorTypes"]) {
            setStatus({...status, subTitle: t("indicatorTypes")});
            await metadataApi.push(`/api/metadata`, { indicatorTypes: metadata["indicatorTypes"]})
            .then(response => {
                temp = {
                    ...temp,
                    indicatorTypes: response
                };
                setResults(temp);
            });
        }
        if (metadata["indicators"]) {
            setStatus({...status, subTitle: t("indicators")});
            await metadataApi.push(`/api/metadata`, { indicators: metadata["indicators"]})
            .then(response => {
                temp = {
                    ...temp,
                    indicators: response
                };
                setResults(temp);
            });
        }
        if (metadata["sqlViews"]) {
            setStatus({...status, subTitle: t("sqlViews")});
            await metadataApi.push(`/api/metadata`, { sqlViews: metadata["sqlViews"]})
            .then(response => {
                temp = {
                    ...temp,
                    sqlViews: response
                };
                setResults(temp);
            });
        }
        if (metadata["optionGroups"]) {
            setStatus({...status, subTitle: t("optionGroups")});
            await metadataApi.push(`/api/metadata`, { optionGroups: metadata["optionGroups"]})
            .then(response => {
                temp = {
                    ...temp,
                    optionGroups: response
                };
                setResults(temp);
            });
        }
        if (metadata["optionGroupSets"]) {
            setStatus({...status, subTitle: t("optionGroupSets")});
            await metadataApi.push(`/api/metadata`, { optionGroupSets: metadata["optionGroupSets"]})
            .then(response => {
                temp = {
                    ...temp,
                    optionGroupSets: response
                };
                setResults(temp);
            });
        }
    }

    useEffect(() => {
        if ( open ) {
            if ( programMetadata === null && status.status === "installing" ) {
                importMetadata();
            } else {
                setStatus({
                    title: t("complete"),
                    subTitle: `${t("programID")} ${programMetadata.id}`,
                    status: "finish"
                })
            }
        }
    }, [open])

    useEffect(() => {
        if ( open && Object.keys(results).length === ( Object.keys(metadata).length + 1 ) ) {

            const certtificateTemplate = {
                title: "Medical Certificate of Cause of Death - specimen",
                logo: null,
                info: [{
                    label: "Date of Death",
                    enrollment: "incidentDate"
                },
                {
                    label: "Reported Date",
                    enrollment: "enrollmentDate"
                },
                {
                    label: "COD System ID",
                    trackedEntityAttribute: formMapping.attributes["system_id"]
                },
                {
                    label: "Date of Birth",
                    trackedEntityAttribute: formMapping.attributes["dob"]
                },
                {
                    label: "Date of Birth is estimated",
                    trackedEntityAttribute: formMapping.attributes["estimated_dob"]
                },
                {
                    label: "Age in years",
                    trackedEntityAttribute: formMapping.attributes["age"]
                },
                {
                    label: "Address",
                    trackedEntityAttribute: formMapping.attributes["address"]
                },
                {
                    label: "Sex",
                    trackedEntityAttribute: formMapping.attributes["sex"]
                },
                {
                    label: "Underlying Cause of Death",
                    dataElement: formMapping.dataElements["underlyingCOD"]
                },
                {
                    label: "ICD-11",
                    dataElement: formMapping.dataElements["underlyingCOD_code"]
                }],
                footer: [{
                    label: "Institution Name",
                    enrollment: "orgUnit"
                },
                {
                    label: "Certificate Date",
                    enrollment: "enrollmentDate"
                }]
            }

            Promise.all([
                metadataApi.push("/api/dataStore/WHO_ICD11_COD/program", {id: metadata["programs"][0].id}, "PUT"),
                metadataApi.push("/api/dataStore/WHO_ICD11_COD/femaleOption", {code: femaleOption}, "PUT"),
                metadataApi.push("/api/dataStore/WHO_ICD11_COD/icdOptionSet", {id: metadata["optionSets"].find( ({code}) => code === "icd11").id}, "PUT"),
                metadataApi.push("/api/dataStore/WHO_ICD11_COD/formMapping", formMapping, "PUT"),
                metadataApi.get("/api/options.json", { paging: false }, [
                    "fields=id,name,code,attributeValues[value,attribute[id]]",
                    `filter=optionSet.id:eq:${metadata["optionSets"].find( ({code}) => code === "icd11").id}`
                ]),
                metadataApi.push(
                    "/api/dataStore/WHO_ICD11_COD/certificateTemplate",
                    { certificate: certtificateTemplate },
                    "PUT"
                ),
                metadataApi.push("/api/dataStore/WHO_ICD11_COD/fullnameOption", {fullnameOption: fullnameOption}, "PUT")
            ])
            .then( res => {
                setFemaleCode(femaleOption);
                setCertificateTemplate(certtificateTemplate);
                getICD11Options(res[4].options);
                setStatus({
                    title: t("complete"),
                    subTitle: `${t("programID")} ${metadata["programs"][0].id}`,
                    status: "finish"
                });
            });
        }
    }, [results])

    return (
        <Modal
            width={"50%"}
            bodyStyle={{
                height: "100%",
            }}
            centered
            visible={open}
            closable={false}
            footer={false}
        >
            <div style={{
                height: "55vh"
            }}>
                <Result
                icon={( status.status === "installing" ) ? <LoadingMask /> : <CheckCircleOutlined />}
                title={status.title}
                subTitle={status.subTitle}
                extra={<Button 
                    disabled={status.status !== "finish"} 
                    type="primary" key="complete"
                    onClick={() => {
                        setStatus({
                            ...status,
                            status: "installing",
                            title: "Loading metadata"
                        });
                        Promise.all([
                            metadataApi.get("/api/trackedEntityAttributes.json", { paging: false }, ["fields=id,displayName,valueType,optionSet,formName"]),
                            metadataApi.getTrackerDataElements(),
                            metadataApi.getProgramMetadata(metadata["programs"][0].id),
                            metadataApi.getMe()
                        ]).then( results => {
                            setTeas(results[0].trackedEntityAttributes);
                            setTrackerDataElements(results[1].dataElements);
                            setProgramMetadata(results[2]);
                            setStatus({
                                ...status,
                                status: "finish",
                                title: "Install Complete"
                            });
                            let roles = {
                                admin: false,
                                data: false,
                                view: false
                              };
                            results[3].userGroups.forEach( userGroup => {
                            const role = results[2].userGroupAccesses.find( ({id}) => id === userGroup.id );
                            if ( role ) {
                                if ( role.access.charAt(1) === 'w' ) {
                                roles = {
                                    ...roles,
                                    admin: true
                                }
                                }
                                if ( role.access.charAt(3) === 'w' ) {
                                roles = {
                                    ...roles,
                                    data: true
                                }
                                }
                                if ( role.access.charAt(0) === 'r' && role.access.charAt(2) === 'r'  ) {
                                roles = {
                                    ...roles,
                                    view: true
                                }
                                }
                            }
                            });
                            setUserRole(roles);
                        });
                    }}
                >
                    Finish
                </Button>}
            >
                {
                    ( programMetadata === null || Object.keys(results).length !== 0 ) && Object.keys(results).map( (key, index) => 
                    (<div key={index}>
                    {
                        (results[key].status === "OK") ? <CheckCircleOutlined style={{color: "blue"}} /> : <CloseCircleOutlined style={{color: "red"}} />
                    }
                    {
                        ` ${key}`
                    }
                    </div>))
                }
            </Result>
            </div>
        </Modal>
    )
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        metadata: state.admin.installingFile,
        formMapping: state.metadata.formMapping,
        femaleOption: state.admin.femaleOption,
        fullnameOption: state.admin.fullnameOption,
        programMetadata: state.metadata.programMetadata
    }
}

const mapDispatchToProps = {
    setProgramMetadata,
    getICD11Options,
    setFemaleCode,
    setCertificateTemplate,
    setTeas,
    setTrackerDataElements,
    setUserRole
}

export default connect(mapStateToProps,mapDispatchToProps)(Finish);