import { generateCode } from ".";

const jsonFiles = [
    "attributes",
    "optionSets",
    "trackedEntityAttributes",
    "trackedEntityTypes",
    "dataElements",
    "programs",
    "programStages",
    "programStageSections",
    "programIndicators",
    "indicatorTypes",
    "indicators",
    "sqlViews",
    "options",
    "optionGroups",
    "optionGroupSets",
    "legendSets"
]; // should order from child to parent dependenvies

const replaceUID = (mapping, data) => {
    let res = data;
    for( const uid in mapping) {
        res = res.replaceAll(uid,mapping[uid]);
    }
    return res;
}

export const generateDefaultMetadata = (fullnameOption, newUID) => {
    let metadata = {};
    let formMapping = require("../asset/metadata/mapping.json");
    let uidReplacement = {};

    // Generate new id and map to old
    jsonFiles.forEach( jsonFile => {
        metadata[jsonFile] = require(`../asset/metadata/${jsonFile}.json`)[jsonFile];

        if ( jsonFile === "trackedEntityAttributes" ) {
            metadata[jsonFile] = metadata[jsonFile].filter( ({id}) => id !== "A9yzNTl9G0f" );
        }
        if ( jsonFile === "programs") {
            metadata[jsonFile][0].programTrackedEntityAttributes = metadata[jsonFile][0].programTrackedEntityAttributes.filter( ({trackedEntityAttribute}) => trackedEntityAttribute.id !== "A9yzNTl9G0f");
        }
        
        metadata[jsonFile].forEach( element => {
            if (element.id) uidReplacement = {
                ...uidReplacement,
                [element.id]: generateCode()
            }
        });
    });

    formMapping["sections"] = metadata.programStageSections;
    formMapping["otherSections"] = {};
    // if (fullnameOption) formMapping.attributes.family_name = "";

    if ( newUID ) {
        // Replace metadata
        const stringMetadata = replaceUID(uidReplacement,JSON.stringify(metadata));
        metadata = JSON.parse(stringMetadata);

        // Replace mapping
        const stringFormMapping = replaceUID(uidReplacement,JSON.stringify(formMapping));
        formMapping = JSON.parse(stringFormMapping);
    }

    return { 
        metadata: metadata,
        formMapping: formMapping
    };
}

export const generateCustomMetadata = ( admin, newUID ) => {
    /** 
     * WHAT THIS FUNCTION DOES
     * 
     * 1. Remove metadata
     * ** TE Types
     * ** TEAs
     * CREATE NEW FILES (base dataelements in redux)
     * ** DEs
     * ** Options / Option Sets
     * ** ProgramStageSections
     * 
     * 2. Remove TEAs, DEs, [ProgramStageSections]-> use default in Redux, TE Type from Programs and Program Stages
     * 
     * 3. Generate new UID
     * 
     * 4. Add other DEs, sections and attributes, types to Programs and Program Stages (base on TEAs, TE Type and DEs in Redux)
     */

    // Check optionSet nbcADZuow7x

    let formMapping = {
        version: "",
        dataElements: {},
        attributes: {
          system_id: "BfkIayM14MF"
        },
        programStage: "WlWJt4lVSWw",
        optionAttributes: {
          group: "UBT4QSKzYo4",
          chapter: "QUYTAqoXnje"
        },
        sections: [],
        otherSections: {}
    };
    

    // 1. Filter DEs, optionSets and options
    let metadata = {};
    metadata["attributes"] = require(`../asset/metadata/attributes.json`)["attributes"];
    metadata["programIndicators"] = require(`../asset/metadata/programIndicators.json`)["programIndicators"];

    metadata["programs"] = require(`../asset/metadata/programs.json`)["programs"];
    metadata["programStages"] = require(`../asset/metadata/programStages.json`)["programStages"];

    metadata["optionSets"] = require(`../asset/metadata/optionSets.json`)["optionSets"];
    metadata["dataElements"] = require(`../asset/metadata/dataElements.json`)["dataElements"];
    metadata["options"] = require(`../asset/metadata/options.json`)["options"];

    metadata["indicatorTypes"] = require(`../asset/metadata/indicatorTypes.json`)["indicatorTypes"];
    metadata["indicators"] = require(`../asset/metadata/indicators.json`)["indicators"];
    metadata["sqlViews"] = require(`../asset/metadata/sqlViews.json`)["sqlViews"];
    metadata["optionGroups"] = require(`../asset/metadata/optionGroups.json`)["optionGroups"];
    metadata["optionGroupSets"] = require(`../asset/metadata/optionGroupSets.json`)["optionGroupSets"];
    metadata["legendSets"] = require(`../asset/metadata/legendSets.json`)["legendSets"];

    // add system_id
    metadata["trackedEntityAttributes"] = require(`../asset/metadata/trackedEntityAttributes.json`)["trackedEntityAttributes"].slice(0,1);

    // const admin = require("./admin.json");
    let dataElements = [];
    let optionSets = [];
    let options = [];

    for ( const frame in admin.dataElements ) {
        admin.dataElements[frame].defaultSections.forEach( section => {
            dataElements = [
                ...dataElements,
                ...section.dataElements.map( de => {
                    const findedDE = metadata.dataElements.find( ({id}) => de.id === id )
                    if ( findedDE.optionSet ) {
                        if ( !optionSets.find( ({id}) => id === findedDE.optionSet.id ) )  {
                            optionSets.push(metadata.optionSets.find( ({id}) => id === findedDE.optionSet.id ));
                            options = [
                                ...options,
                                ...metadata.options.filter( opt => opt.optionSet.id === findedDE.optionSet.id )
                            ];
                        }
                    }
                    return findedDE;
                })
            ]
        });
    }

    metadata["dataElements"] = dataElements;
    metadata["optionSets"] = optionSets;
    metadata["options"] = options;
    const entryForm = require("../asset/metadata/mapping.json");
    for ( const key in entryForm.dataElements ) {
        if ( metadata["dataElements"].find( ({id}) => id === entryForm.dataElements[key] ) ) {
            formMapping.dataElements[key] = entryForm.dataElements[key];
        }
    }

    // add version
    formMapping.version = entryForm.version;





    // 2. Remove DEs from programStages, TEAs/TE_Type from programs, and programStageSections
    metadata.programStageSections = [
        ...admin.dataElements.frameA.defaultSections,
        ...admin.dataElements.frameB.defaultSections,
    ];

    delete metadata.programs[0].trackedEntityType;
    metadata.programs[0].programTrackedEntityAttributes = [];

    metadata.programStages[0].programStageDataElements = metadata.programStages[0].programStageDataElements.filter( ({dataElement}) =>
        metadata.dataElements.find( ({id}) => id === dataElement.id )
    )



    // 3. Generate new UID
    let uidReplacement = {};
    for ( const jsonFile in metadata ) {
        metadata[jsonFile].forEach( element => {
            if (element.id) uidReplacement = {
                ...uidReplacement,
                [element.id]: generateCode()
            }
        });
    }

    if ( newUID ) {
        // Replace metadata
        const stringMetadata = replaceUID(uidReplacement,JSON.stringify(metadata));
        metadata = JSON.parse(stringMetadata);

        // Replace mapping
        const stringFormMapping = replaceUID(uidReplacement,JSON.stringify(formMapping));
        formMapping = JSON.parse(stringFormMapping);
    }
    

    // 3.b Mapping for entry form**************
    admin.trackedEntityAttributes.forEach( defaultAttribute => {
        // if (defaultAttribute[1] === "Unique ID") formMapping.attributes["system_id"] = defaultAttribute[0];
        if (defaultAttribute[1] === "First Name") formMapping.attributes["given_name"] = defaultAttribute[0];
        if (defaultAttribute[1] === "Last Name") formMapping.attributes["family_name"] = defaultAttribute[0];
        if (defaultAttribute[1] === "Middle Name") formMapping.attributes["middle_name"] = defaultAttribute[0];
        if (defaultAttribute[1] === "Date of Birth") formMapping.attributes["dob"] = defaultAttribute[0];
        if (defaultAttribute[1] === "Date of Birth is estimated") formMapping.attributes["estimated_dob"] = defaultAttribute[0];
        if (defaultAttribute[1] === "Age in years") formMapping.attributes["age"] = defaultAttribute[0];
        if (defaultAttribute[1] === "Address") formMapping.attributes["address"] = defaultAttribute[0];
        if (defaultAttribute[1] === "Sex") formMapping.attributes["sex"] = defaultAttribute[0];
    })



    // 4.a Add other attributes, types to Programs
    metadata.programs[0]["trackedEntityType"] = { id: admin.trackedEntityType };
    metadata.programs[0].programTrackedEntityAttributes = [
        ...[{
            "mandatory": true,
            "searchable": true,
            "renderOptionsAsRadio": false,
            "displayInList": true,
            "sortOrder": 1,
            "program": { "id": metadata.programs[0].id },
            // "trackedEntityAttribute": { "id": admin.trackedEntityAttributes[0][0] },
            "trackedEntityAttribute": { "id": metadata["trackedEntityAttributes"][0].id },
            "programTrackedEntityAttributeGroups": []
          }],
          ...admin.trackedEntityAttributes.filter( ([des,]) => des !== '' ).map( (tea,index) => ({
            "mandatory": false,
            "searchable": tea[1] === "First Name" || tea[1] === "Last Name" || tea[1] === "Date of Birth" || tea[1] === "Address",
            "renderOptionsAsRadio": false,
            "displayInList": tea[1] === "First Name" || tea[1] === "Last Name" || tea[1] === "Date of Birth" || tea[1] === "Address",
            "sortOrder": index+2,
            "program": { "id": metadata.programs[0].id  },
            "trackedEntityAttribute": { "id": tea[0] },
            "programTrackedEntityAttributeGroups": []
          }))
        //   ...[{
        //     "mandatory": false,
        //     "searchable": true,
        //     "renderOptionsAsRadio": false,
        //     "displayInList": true,
        //     "sortOrder": 2,
        //     "program": { "id": metadata.programs[0].id  },
        //     "trackedEntityAttribute": { "id": admin.trackedEntityAttributes[0][0] },
        //     "programTrackedEntityAttributeGroups": []
        //   },
        //   {
        //     "mandatory": false,
        //     "searchable": true,
        //     "renderOptionsAsRadio": false,
        //     "displayInList": true,
        //     "sortOrder": 3,
        //     "program": { "id": metadata.programs[0].id  },
        //     "trackedEntityAttribute": { "id": admin.trackedEntityAttributes[1][0] },
        //     "programTrackedEntityAttributeGroups": []
        //   },
        //   {
        //     "mandatory": false,
        //     "searchable": true,
        //     "renderOptionsAsRadio": false,
        //     "displayInList": true,
        //     "sortOrder": 4,
        //     "program": { "id": metadata.programs[0].id  },
        //     "trackedEntityAttribute": { "id": admin.trackedEntityAttributes[2][0] },
        //     "programTrackedEntityAttributeGroups": []
        //   },
        //   {
        //     "mandatory": false,
        //     "searchable": false,
        //     "renderOptionsAsRadio": false,
        //     "displayInList": false,
        //     "sortOrder": 5,
        //     "program": { "id": metadata.programs[0].id  },
        //     "trackedEntityAttribute": { "id": admin.trackedEntityAttributes[3][0] },
        //     "programTrackedEntityAttributeGroups": []
        //   },
        //   {
        //     "mandatory": false,
        //     "searchable": false,
        //     "renderOptionsAsRadio": false,
        //     "displayInList": false,
        //     "sortOrder": 6,
        //     "program": { "id": metadata.programs[0].id  },
        //     "trackedEntityAttribute": { "id": admin.trackedEntityAttributes[4][0] },
        //     "programTrackedEntityAttributeGroups": []
        //   },
        //   {
        //     "mandatory": false,
        //     "searchable": true,
        //     "renderOptionsAsRadio": false,
        //     "displayInList": true,
        //     "sortOrder": 7,
        //     "program": { "id": metadata.programs[0].id  },
        //     "trackedEntityAttribute": { "id": admin.trackedEntityAttributes[5][0] },
        //     "programTrackedEntityAttributeGroups": []
        //   },
        //   {
        //     "mandatory": false,
        //     "searchable": false,
        //     "renderOptionsAsRadio": false,
        //     "displayInList": false,
        //     "sortOrder": 8,
        //     "program": { "id": metadata.programs[0].id  },
        //     "trackedEntityAttribute": { "id": admin.trackedEntityAttributes[6][0] },
        //     "programTrackedEntityAttributeGroups": []
        //   }]
    ];
    // metadata.programs[0].programTrackedEntityAttributes = [
    //     ...metadata.programs[0].programTrackedEntityAttributes,
    //     ...admin.trackedEntityAttributes.slice(8,admin.trackedEntityAttributes.length).map( (tea, index) => {
    //         return {
    //             "mandatory": false,
    //             "searchable": false,
    //             "renderOptionsAsRadio": false,
    //             "displayInList": false,
    //             "sortOrder": (9 + index),
    //             "program": { "id": metadata.programs[0].id  },
    //             "trackedEntityAttribute": { "id": tea[0] },
    //             "programTrackedEntityAttributeGroups": []
    //         }
    //     })
    // ];

    // 4.b Add other DEs, sections and and Program Stages
    for (const frame in admin.dataElements) {
        formMapping.otherSections[frame] = [];
        admin.dataElements[frame].otherSections.forEach((section, index) => {
            section[1].forEach( de => {
                metadata.programStages[0].programStageDataElements.push({
                    "displayInReports": false,
                    "skipSynchronization": false,
                    "renderOptionsAsRadio": false,
                    "compulsory": false,
                    "allowProvidedElsewhere": false,
                    "allowFutureDate": false,
                    "programStage": { "id": metadata.programStages[0].id },
                    "dataElement": { "id": de }
                })
            });

            metadata.programStageSections.push({
                "name": section[0],
                "sortOrder": 11 + index,
                "programStage": { "id": metadata.programStages[0].id },
                "dataElements": section[1].map( de => {
                    return {
                        "id": de
                    }
                })
            });

            formMapping["otherSections"][frame].push({
                "name": section[0],
                "dataElements": section[1].map( de => {
                    return {
                        "id": de
                    }
                })
            });
        })
    }
    formMapping.sections = metadata.programStageSections;
    
    return { 
        metadata: metadata,
        formMapping: formMapping
    };
}