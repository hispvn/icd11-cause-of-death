import { useEffect, useState, version } from "react";
import "./index.css";
import HeaderBarContainer from "../HeaderBar";
import ControlBar from "../ControlBar";
import RegisteredTeiList from "../RegisteredTeiList";
import SearchForm from "../Search";
import Administration from "../Administration";
import Form from "../Form";
import Export from "../Export";
import Dashboard from "../Dashboard";
import Translation from "../Translation";
import UpdateDialog from "./UpdateDialog";
import { TRANSLATIONS } from "../Translation/const";
import { Hooks, Components } from "tracker-capture-app-core";
import { InitTranslation } from "../../locale/i18n";

/* REDUX */
import { connect } from "react-redux";
import {
  setTrackerDataElements,
  setProgramMetadata,
  setTeas,
  setUsers,
  setOrgUnitGroups,
  setOrgUnitLevels,
  setOrgUnits,
  getICD11Options,
  getTrackedEntityTypes,
  setUserGroups,
  setFormMapping,
  setCertificateTemplate,
  setFemaleCode,
  setFullnameOption,
  setUILocale,
  setIcdApiToken,
  setCustomCertificate,
  setAllOptionSets,
  getAllPrograms,
  getTrackedEntityType
} from "../../redux/actions/metadata";
import {
  setFemaleOption,
  changeCerticateTemplate,
  setCertificateLogo,
} from "../../redux/actions/admin";
import { setUserRole } from "../../redux/actions/user";
import { changeRoute } from "../../redux/actions/route";
import localeFile from "../../locale/locale";
/*       */


const { useApi } = Hooks;
const { LoadingMask } = Components;

const App = ({
  route,
  setProgramMetadata,
  setTeas,
  setTrackerDataElements,
  setUsers,
  setOrgUnitGroups,
  setOrgUnitLevels,
  setOrgUnits,
  getICD11Options,
  getTrackedEntityTypes,
  setUserGroups,
  // setFemaleOption,
  // changeCerticateTemplate,
  setCertificateLogo,
  setFormMapping,
  setCertificateTemplate,
  setFemaleCode,
  setFullnameOption,
  setUserRole,
  changeRoute,
  setUILocale,
  setIcdApiToken,
  setCustomCertificate,
  setAllOptionSets,
  getAllPrograms,
  getTrackedEntityType
}) => {
  const { metadataApi } = useApi();
  const [loading, setLoading] = useState(false);
  const [updatingDialog, setUpdatingDialog] = useState(false);
  const [metadataUpdatedDate, setMetadataUpdatedDate] = useState(null);
  useEffect(() => {
    setLoading(true);
    (async () => {
      /** FOR TRANSLATION */
      let translationData = await metadataApi.get("/api/dataStore/WHO_ICD11_COD/translation");
      console.log("init translation DataStore");
      if (translationData.status) {
        let array = [];
        let arrayLanguages = [
          {
            label: "English",
            key: "en",
          },
          {
            label: "French",
            key: "fr",
          },
        ];
        
        Object.entries(localeFile.en.translation).forEach((value) => {
          const findKey = TRANSLATIONS.find( ({key}) => key === value[0] );
          let object = {
            key: value[0],
            translation: findKey ? {
              en: findKey.translation.en,
              fr: findKey.translation.fr
            } : { en: value[1] }
          };
          array.push(object);
        });
        await metadataApi.push("/api/dataStore/WHO_ICD11_COD/translation", {
          translations: array,
          languages: arrayLanguages,
        });
        translationData = {
          translations: array,
          languages: arrayLanguages,
        }
      }
      else{
        console.log(translationData);
        Object.entries(localeFile.en.translation).forEach((value) => {
          let findKey = translationData.translations.find(e=>e.key === value[0]);
          if(!findKey){
            let object = {
              key: value[0],
              translation: { en: value[1] },
            };
            translationData.translations.push(object);
          }
        })
        await metadataApi.push("/api/dataStore/WHO_ICD11_COD/translation", {
          translations: translationData.translations,
          languages: translationData.languages,
        },"PUT");
      }



      Promise.all([
        metadataApi.get("/api/dataStore/WHO_ICD11_COD/program"),
        metadataApi.getMe()
      ]).then( async (results) => {

        // This is for installation
        Promise.all([
          metadataApi.getOrgUnitGroups(),
          metadataApi.getOrgUnitLevels(),
          metadataApi.get(
            "/api/trackedEntityAttributes.json",
            { paging: false },
            ["fields=id,displayName,valueType,optionSet,formName"]
          ),
          metadataApi.getTrackerDataElements(),
          metadataApi.get("/api/users.json", { paging: false }, [
            "fields=id,displayName,organisationUnits~size",
          ]),
          metadataApi.get("/api/organisationUnits.json", { paging: false }, [
            "fields=id,displayName,path,level,code",
          ]),
          metadataApi.get("/api/trackedEntityTypes.json", { paging: false }, [
            "fields=id,displayName",
          ]),
          metadataApi.get("/api/userGroups.json", { paging: false }, [
            "fields=id,displayName",
          ]),
          metadataApi.get(
            "/api/programs.json",
            { paging: false },
            [
              "fields=:owner,!created,!lastUpdated,!user,!lastUpdatedBy,!organisationUnits,programTrackedEntityAttributes[:owner,!created,!lastUpdated]",
              "filter=programType:eq:WITH_REGISTRATION"
            ]
          )
        ]).then(set => {
          // for admin module
          setOrgUnitGroups(set[0].organisationUnitGroups);
          setOrgUnitLevels(set[1].organisationUnitLevels);
          setTeas(set[2].trackedEntityAttributes);
          setTrackerDataElements(set[3].dataElements);
          setUsers(set[4].users);
          setOrgUnits(set[5].organisationUnits);
          getTrackedEntityTypes(set[6].trackedEntityTypes);
          setUserGroups(set[7].userGroups);
          getAllPrograms(set[8].programs);
        });
        

        await InitTranslation(translationData,results[1].settings.keyUiLocale);
        setUILocale(results[1].settings.keyUiLocale)

        

        // for entry module
        if (results[0].status) {
          metadataApi.push("/api/dataStore/WHO_ICD11_COD/program", {
            id: null,
          });
          metadataApi.push("/api/dataStore/WHO_ICD11_COD/icdOptionSet", {
            id: null,
          });
          metadataApi.push("/api/dataStore/WHO_ICD11_COD/femaleOption", {
            code: null,
          });
          metadataApi.push("/api/dataStore/WHO_ICD11_COD/fullnameOption", {
            fullnameOption: false,
          });
          metadataApi.push("/api/dataStore/WHO_ICD11_COD/certificateTemplate", {
            certificate: null,
          });
          metadataApi.push("/api/dataStore/WHO_ICD11_COD/customCertificate", {
            certificate: null,
          });
          metadataApi.push("/api/dataStore/WHO_ICD11_COD/formMapping", {
            formMapping: null,
          });
          metadataApi.push("/api/dataStore/WHO_ICD11_COD/fullnameOption", {
            fullnameOption: false,
          });
          changeRoute("administration");
          setLoading(false);
        } else {
          if (results[0].id !== null) {
            Promise.all([
              // metadataApi.getProgramMetadata(results[0].id),
              metadataApi.get(`/api/programs/${results[0].id}`, { paging: false }, [
                "fields=id,displayName,sharing,userGroupAccesses,trackedEntityType,organisationUnits[id,displayName,code,path,attributeValues],programTrackedEntityAttributes[mandatory,displayInList,searchable,trackedEntityAttribute[id,displayName,displayFormName,displayShortName,valueType,optionSet[id],unique]],programStages[id,displayName,programStageDataElements[displayInReports,sortOrder,compulsory,dataElement[id,displayName,displayFormName,displayShortName,description,valueType,optionSet[id]]"
              ]),
              metadataApi.get("/api/dataStore/WHO_ICD11_COD/femaleOption"),
              metadataApi.get("/api/dataStore/WHO_ICD11_COD/icdOptionSet"),
              metadataApi.get(
                "/api/dataStore/WHO_ICD11_COD/certificateTemplate"
              ),
              metadataApi.get("/api/dataStore/WHO_ICD11_COD/formMapping"),
              metadataApi.get("/api/dataStore/WHO_ICD11_COD/fullnameOption"),
              metadataApi.get("/api/dataStore/WHO_ICD11_COD/customCertificate")
            ]).then( async (res) => {
              // Set userRoles
              let roles = {
                admin: false,
                data: false,
                view: false
              };
              results[1].userGroups.forEach( userGroup => {
                const role = res[0].userGroupAccesses ? res[0].userGroupAccesses.find( ({id}) => id === userGroup.id )
                  : res[0].sharing.userGroups[userGroup.id] ;
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


              // Get TET info
              // setProgramMetadata(res[0]);
              Promise.all([
                metadataApi.get("/api/optionSets.json", { paging: false }, 
                  [
                    "fields=id,displayName,options[id,displayName,code,sortOrder]",
                    `filter=id:!eq:${res[2].id}`,
                  ]
                ),
                metadataApi.getTrackedEntityType(res[0].trackedEntityType.id),
              ]).then( async (result) => {
                setProgramMetadata({
                  id: res[0].id,
                  sharing: res[0].sharing,
                  userGroupAccesses: res[0].userGroupAccesses,
                  trackedEntityType: res[0].trackedEntityType.id,
                  organisationUnits: res[0].organisationUnits,
                  trackedEntityAttributes: res[0].programTrackedEntityAttributes.map((ptea) => {
                    const tea = {
                      compulsory: ptea.mandatory,
                      id: ptea.trackedEntityAttribute.id,
                      displayName: ptea.trackedEntityAttribute.displayName,
                      displayFormName: ptea.trackedEntityAttribute.displayFormName
                        ? ptea.trackedEntityAttribute.displayFormName
                        : ptea.trackedEntityAttribute.displayShortName,
                      valueType: ptea.trackedEntityAttribute.valueType,
                      valueSet: null,
                      optionSet: ptea.trackedEntityAttribute.optionSet ? ptea.trackedEntityAttribute.optionSet.id : null,
                      displayInList: ptea.displayInList,
                      searchable: ptea.searchable,
                      unique: ptea.trackedEntityAttribute.unique
                    };
                    if (ptea.trackedEntityAttribute.optionSet) {
                      tea.valueSet = result[0].optionSets
                        .find((os) => os.id === ptea.trackedEntityAttribute.optionSet.id)
                        .options.map((o) => {
                          return {
                            value: o.code,
                            label: o.displayName
                          };
                        });
                    }
                    return tea;
                  }),
                  programStages: res[0].programStages.map((ps) => {
                    const programStage = {
                      id: ps.id,
                      displayName: ps.displayName,
                      dataElements: ps.programStageDataElements.map((psde) => {
                        const dataElement = {
                          displayInReports: psde.displayInReports,
                          sortOrder: psde.sortOrder,
                          compulsory: psde.compulsory,
                          id: psde.dataElement.id,
                          displayName: psde.dataElement.displayName,
                          displayFormName: psde.dataElement.displayFormName
                            ? psde.dataElement.displayFormName
                            : psde.dataElement.displayShortName,
                          description: psde.dataElement.description,
                          valueType: psde.dataElement.valueType,
                          valueSet: null,
                          optionSet: psde.dataElement.optionSet ? psde.dataElement.optionSet.id : null
                        };
                        if (psde.dataElement.optionSet && psde.dataElement.optionSet.id !== res[2].id) {
                          console.log(psde.dataElement);
                          dataElement.valueSet = result[0].optionSets
                            .find((os) => os.id === psde.dataElement.optionSet.id)
                            .options.map((o) => {
                              return {
                                value: o.code,
                                label: o.displayName
                              };
                            });
                        }
                        return dataElement;
                      })
                    };
                    return programStage;
                  })
                });
                getTrackedEntityType(result[1]);

                await getICD11Options(require("../../asset/metadata/icd11_options.json"));
                metadataApi.get("/api/options.json", { paging: false }, [
                  "fields=id,displayName,code,sortOrder,attributeValues[value,attribute[id]]",
                  "filter=optionSet.id:eq:" + res[2].id,
                ])
                .then(({ options }) => {
                  getICD11Options(options);
                  setProgramMetadata({
                    id: res[0].id,
                    sharing: res[0].sharing,
                    userGroupAccesses: res[0].userGroupAccesses,
                    trackedEntityType: res[0].trackedEntityType.id,
                    organisationUnits: res[0].organisationUnits,
                    trackedEntityAttributes: res[0].programTrackedEntityAttributes.map((ptea) => {
                      const tea = {
                        compulsory: ptea.mandatory,
                        id: ptea.trackedEntityAttribute.id,
                        displayName: ptea.trackedEntityAttribute.displayName,
                        displayFormName: ptea.trackedEntityAttribute.displayFormName
                          ? ptea.trackedEntityAttribute.displayFormName
                          : ptea.trackedEntityAttribute.displayShortName,
                        valueType: ptea.trackedEntityAttribute.valueType,
                        valueSet: null,
                        optionSet: ptea.trackedEntityAttribute.optionSet ? ptea.trackedEntityAttribute.optionSet.id : null,
                        displayInList: ptea.displayInList,
                        searchable: ptea.searchable,
                        unique: ptea.trackedEntityAttribute.unique
                      };
                      if (ptea.trackedEntityAttribute.optionSet) {
                        tea.valueSet = result[0].optionSets
                          .find((os) => os.id === ptea.trackedEntityAttribute.optionSet.id)
                          .options.map((o) => {
                            return {
                              value: o.code,
                              label: o.displayName
                            };
                          });
                      }
                      return tea;
                    }),
                    programStages: res[0].programStages.map((ps) => {
                      const programStage = {
                        id: ps.id,
                        displayName: ps.displayName,
                        dataElements: ps.programStageDataElements.map((psde) => {
                          const dataElement = {
                            displayInReports: psde.displayInReports,
                            sortOrder: psde.sortOrder,
                            compulsory: psde.compulsory,
                            id: psde.dataElement.id,
                            displayName: psde.dataElement.displayName,
                            displayFormName: psde.dataElement.displayFormName
                              ? psde.dataElement.displayFormName
                              : psde.dataElement.displayShortName,
                            description: psde.dataElement.description,
                            valueType: psde.dataElement.valueType,
                            valueSet: null,
                            optionSet: psde.dataElement.optionSet ? psde.dataElement.optionSet.id : null
                          };
                          if (psde.dataElement.optionSet) {
                            console.log(psde.dataElement);
                            dataElement.valueSet = psde.dataElement.optionSet.id !== res[2].id ? result[0].optionSets
                              .find((os) => os.id === psde.dataElement.optionSet.id)
                              .options.map((o) => {
                                return {
                                  value: o.code,
                                  label: o.displayName
                                };
                              }) : options.map((o) => {
                                return {
                                  value: o.code,
                                  label: o.displayName
                                };
                              });
                          }
                          return dataElement;
                        })
                      };
                      return programStage;
                    })
                  })
                });
              });

              // Set other states
              setFemaleCode(res[1].code);
              setFullnameOption(res[5].fullnameOption);
              if (res[3].certificate !== null) setCertificateTemplate(res[3].certificate);
              if (res[6].certificate !== null) setCustomCertificate(res[6].certificate);
              setFormMapping(res[4]);
              changeRoute("list");
              

              // Get Token for ICD11 API
              await fetch("https://dhis2.world/services/icd11", {
                method: "POST"
              })
              .then(response => response.json())
              .then(result => {
                setIcdApiToken(result.token);
              })
              .catch(error => console.log('error', error));

              setLoading(false);

              if ( results[0].metadataUpdatedDate ) {
                if ( results[0].metadataUpdatedDate !== "2025-11-10" ) {
                  setMetadataUpdatedDate(results[0]);
                  setUpdatingDialog(true);
                }
              }
              else {
                setMetadataUpdatedDate({
                  ...results[0],
                  metadataUpdatedDate: "2025-04-15", // Not change this date
                  version: "2.0.0"
                });
                setUpdatingDialog(true);
              }

            });
          } else {
            changeRoute("administration");
            setLoading(false);
          }
        }
      });
    })();
  }, []);

  return (
    <div className="App">
      <div className="header-bar-container">
        <HeaderBarContainer />
      </div>
      {loading ? (
        <LoadingMask />
      ) : (
        <div className="app-content">
          {!loading && <ControlBar />}
          {route === "list" && <RegisteredTeiList />}
          {route === "search" && <SearchForm />}
          {route === "form" && <Form />}
          {route === "administration" && <Administration />}
          {route === "export" && <Export />}
          {route === "dashboard" && <Dashboard />}
          {route === "translation" && <Translation />}
        </div>
      )}
      <UpdateDialog
        open={updatingDialog}
        handleCloseUpdate={() => setUpdatingDialog(false)}
        metadataUpdatedDate={metadataUpdatedDate}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    route: state.route,
  };
};

const mapDispatchToProps = {
  changeRoute,
  setUserRole,

  // for admin module
  setTeas,
  setTrackerDataElements,
  setUsers,
  setUserGroups,
  setOrgUnitGroups,
  setOrgUnitLevels,
  setOrgUnits,
  getTrackedEntityTypes,
  setAllOptionSets,
  getAllPrograms,
  getTrackedEntityType,

  // for entry module
  setProgramMetadata,
  getICD11Options,
  setFemaleOption,
  changeCerticateTemplate,
  setCertificateLogo,
  setFormMapping,
  setCertificateTemplate,
  setCustomCertificate,
  setFemaleCode,
  setFullnameOption,
  setUILocale,
  setIcdApiToken
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
