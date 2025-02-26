/** Transform to chart data */
import { AGE_RANGES, SEXES, AGE_RANGES_ID, EXPANDED_AGE_RANGES, EXPANDED_AGE_RANGES_ID, AGE_RANGES_SHORT, AGE_RANGES_SHORT_ID, MONTHS } from "../pages/utils";

const generateChildCharts = ( chartid, data, template, femaleCode, sexAttr, ageAttr ) => {
    const FEMALE_CODE = femaleCode;
    let convert;
    switch ( chartid ) {
        case "0.1": 
            return {
                message: ["Total admissions, Male, all ages","Total admissions, Female, all ages"]
            }
        case "0.2": 
            return {
                message: ["Live birth, Male","Live birth, Female"]
            }
        case "0.3": 
            return {
                message: ["Live birth, Male","Live birth, Female"]
            }
        case "0.4": 
            return {
                message: ["Total admission, Male, 0-4","Total admission, Female, 0-4"]
            }
        case "0.5": 
            return {
                message: ["Total admission, Male, 0-14","Total admission, Female, 0-14"]
            }
        case "0.6": 
            return {
                message: ["Total admission, Male, 15-49","Total admission, Female, 15-49"]
            }
        case "0.7": 
            return {
                message: ["Total admission, Male, 50+","Total admission, Female, 50+"]
            }
        case "0.8": 
            return {
                message: ["Total admission, Male, 30-70","Total admission, Female, 30-70"]
            }
        case "1.1": 
            return {
                labels: data.metaData.dimensions.dx.map( id => data.metaData.items[id].name ),
                datasets: [{
                    label: ["Value"],
                    backgroundColor: template.data.datasets[0].backgroundColor,
                    borderColor: template.data.datasets[0].borderColor,
                    data: data.metaData.dimensions.dx.map( id => {
                        const val = data.rows.find( row => row[0] === id );
                        return val ? val[1] : 0
                    }),
                }]
            }
        case "1.2":
            return {
                labels: AGE_RANGES,
                datasets: [{
                    label: "communicable",
                    backgroundColor: template.data.datasets[0].backgroundColor,
                    data: ["RMWCwaW4Usl","H8plfPHa442","uPvMmguHeY0","KGH4NsPEBEo","VANyy6Ksl7C","hZ8V3r1D40X","Zf2FgODzBeC","e1roVDqy2HZ"].map( id => data.rows.find( row => row[0] === id) ? data.rows.find( row => row[0] === id)[1] : 0 )
                },{
                    label: "non-communicable",
                    backgroundColor: template.data.datasets[1].backgroundColor,
                    data: ["jdZBCgwV8Ci","QcFRr1IOu1a","m4Lqdotc1Vx","VrYm8bpCnBJ","cMcLR6EAci9","W42hWdbWnbF","Y5w48ARowPY","whnU6pTUsiI"].map( id => data.rows.find( row => row[0] === id) ? data.rows.find( row => row[0] === id)[1] : 0 )
                },{
                    label: "external causes",
                    backgroundColor: template.data.datasets[2].backgroundColor,
                    data: ["jQ8S8UZLHTe","YKo8Vz9NrL2","MVE7fApmw9r","FIis7GDIU1z","jZbA1zglYzp","A8zSxxAtAyy","rOsB15PHdOi","gzkYv8SPImN"].map( id => data.rows.find( row => row[0] === id) ? data.rows.find( row => row[0] === id)[1] : 0 )
                },{
                    label: "ill-defined",
                    backgroundColor: template.data.datasets[3].backgroundColor,
                    data: ["lhqePOUVnK1","guzOhHchne8","a8PFQz9oFXe","WaGEeoPbuTy","hQQ2EEgWdU3","BZDhW1TaTDN","RKcTvh9eQOX","lbKBJ30o24j"].map( id => data.rows.find( row => row[0] === id) ? data.rows.find( row => row[0] === id)[1] : 0 )
                }]
            }
        case "1.3":
            const cause_group_hierarchy = require("../../../asset/icd11/causeGroupHierarchy_dashboard.json")["0000"];
            const mapping = Object.values(data.metaData.items).filter( o => o["code"] );
            return {
                name: "Root",
                children: [
                    {
                        name: mapping.find( m => m.code === "0010" ).name,
                        shortName: `${mapping.find( m => m.code === "0010" ).name.slice(0,20)}...`,
                        children: Object.keys(cause_group_hierarchy["0010"]).map( code => {
                            return {
                                name: mapping.find( m => m.code === code ).name,
                                shortName: `${mapping.find( m => m.code === code ).name.slice(0,20)}...`,
                                value: cause_group_hierarchy["0010"][code].length > 0 ?
                                    cause_group_hierarchy["0010"][code].reduce( (total, curVal) => {
                                        const val = data.rows.find( row => row[0] === curVal );
                                        return val ? parseInt(val[1]) + total : total;
                                    }, 0)
                                    :
                                    data.rows.find( row => row[0] === code ) ? parseInt(data.rows.find( row => row[0] === code )[1]) : 0
                            }
                        })
                    }, 
                    {
                        name: mapping.find( m => m.code === "0590" ).name,
                        shortName: `${mapping.find( m => m.code === "0590" ).name.slice(0,20)}...`,
                        children: Object.keys(cause_group_hierarchy["0590"]).map( code => {
                            return {
                                name: mapping.find( m => m.code === code ).name,
                                shortName: `${mapping.find( m => m.code === code ).name.slice(0,20)}...`,
                                value: cause_group_hierarchy["0590"][code].length > 0 ?
                                    cause_group_hierarchy["0590"][code].reduce( (total, curVal) => {
                                        const val = data.rows.find( row => row[0] === curVal );
                                        return val ? parseInt(val[1]) + total : total;
                                    }, 0)
                                    :
                                    data.rows.find( row => row[0] === code ) ? parseInt(data.rows.find( row => row[0] === code )[1]) : 0
                            }
                        })
                    }, 
                    {
                        name: mapping.find( m => m.code === "1480" ).name,
                        shortName: `${mapping.find( m => m.code === "1480" ).name.slice(0,20)}...`,
                        children: Object.keys(cause_group_hierarchy["1480"]).map( code => {
                            return {
                                name: mapping.find( m => m.code === code ).name,
                                shortName: `${mapping.find( m => m.code === code ).name.slice(0,20)}...`,
                                value: cause_group_hierarchy["1480"][code].length > 0 ?
                                cause_group_hierarchy["1480"][code].reduce( (total, curVal) => {
                                    const val = data.rows.find( row => row[0] === curVal );
                                    return val ? parseInt(val[1]) + total : total;
                                }, 0)
                                :
                                data.rows.find( row => row[0] === code ) ? parseInt(data.rows.find( row => row[0] === code )[1]) : 0
                            }
                        })
                    }, 
                    {
                        name: mapping.find( m => m.code === "1610" ).name,
                        shortName: `${mapping.find( m => m.code === "1610" ).name.slice(0,20)}...`,
                        value: ["1620"].reduce( (total, curVal) => {
                            const val = data.rows.find( row => row[0] === curVal );
                            return val ? parseInt(val[1]) : 0;
                        }, 0)
                    }
                ]
            }
        case "2.1": 
            return {
                labels: AGE_RANGES,
                datasets: SEXES.map( (sex,index) => {
                    return {
                        label: sex,
                        backgroundColor: template.data.datasets[index].backgroundColor,
                        borderColor: template.data.datasets[index].borderColor,
                        tension: 0.1,
                        data: AGE_RANGES_ID.map( ageG => {
                            const val = ( sex === "Female" ) ? 
                                data.rows.find( row => row[data.headers.findIndex(({name}) => name === sexAttr)] === FEMALE_CODE && row[data.headers.findIndex(({name}) => name === ageAttr)] === ageG ) 
                                : data.rows.find( row => row[data.headers.findIndex(({name}) => name === sexAttr)] !== FEMALE_CODE && row[data.headers.findIndex(({name}) => name === ageAttr)] === ageG );
                            return val ? parseInt(val[data.headers.length - 1]) : 0
                        })
                    }
                })
            }
        case "2.2":
            return {
                labels: AGE_RANGES,
                datasets: SEXES.map( (sex,index) => {
                    return {
                        label: sex,
                        backgroundColor: template.data.datasets[index].backgroundColor,
                        data: AGE_RANGES_ID.map( ageG => {
                            const val = ( sex === "Female" ) ? 
                                data.rows.find( row => row[data.headers.findIndex(({name}) => name === sexAttr)] === FEMALE_CODE && row[data.headers.findIndex(({name}) => name === ageAttr)] === ageG ) 
                                : data.rows.find( row => row[data.headers.findIndex(({name}) => name === sexAttr)] !== FEMALE_CODE && row[data.headers.findIndex(({name}) => name === ageAttr)] === ageG );
                            return val ? parseInt(val[data.headers.length - 1]) : 0
                        })
                    }
                })
            }
        case "3.1": 
            return {
                labels: EXPANDED_AGE_RANGES,
                datasets: SEXES.map( (sex,index) => {
                    return {
                        label: sex,
                        backgroundColor: template.data.datasets[index].backgroundColor,
                        borderColor: template.data.datasets[index].borderColor,
                        tension: 0.1,
                        data: EXPANDED_AGE_RANGES_ID.map( ageG => {
                            // ageG
                            const val = ( sex === "Female" ) ? 
                                data.rows.find( row => row[data.headers.findIndex(({name}) => name === sexAttr)] === FEMALE_CODE && row[data.headers.findIndex(({name}) => name === ageAttr)] === ageG ) 
                                : data.rows.find( row => row[data.headers.findIndex(({name}) => name === sexAttr)] !== FEMALE_CODE && row[data.headers.findIndex(({name}) => name === ageAttr)] === ageG );
                            return val ? parseInt(val[data.headers.length - 1]) : 0
                        })
                    }
                })
            }
        case "3.2": 
            return {
                labels: MONTHS,
                datasets: SEXES.map( (sex,index) => {
                    return {
                        label: sex,
                        backgroundColor: template.data.datasets[index].backgroundColor,
                        data: data.metaData.dimensions.pe.map( pe => {
                            // ageG
                            const val = ( sex === "Female" ) ? 
                                data.rows.find( row => row[data.headers.findIndex(({name}) => name === sexAttr)] === FEMALE_CODE && row[data.headers.findIndex(({name}) => name === "pe")] === pe ) 
                                : data.rows.find( row => row[data.headers.findIndex(({name}) => name === sexAttr)] !== FEMALE_CODE && row[data.headers.findIndex(({name}) => name === "pe")] === pe );
                            return val ? parseInt(val[data.headers.length - 1]) : 0;
                        })
                    }
                })
            }
        case "3.3": 
            return {
                labels: EXPANDED_AGE_RANGES,
                datasets: SEXES.map( (sex,index) => {
                    return {
                        label: sex,
                        backgroundColor: template.data.datasets[index].backgroundColor,
                        borderColor: template.data.datasets[index].borderColor,
                        tension: 0.1,
                        data: EXPANDED_AGE_RANGES_ID.map( ageG => {
                            // ageG
                            const val = ( sex === "Female" ) ? 
                                data.rows.find( row => row[data.headers.findIndex(({name}) => name === sexAttr)] === FEMALE_CODE && row[data.headers.findIndex(({name}) => name === ageAttr)] === ageG ) 
                                : data.rows.find( row => row[data.headers.findIndex(({name}) => name === sexAttr)] !== FEMALE_CODE && row[data.headers.findIndex(({name}) => name === ageAttr)] === ageG );
                            return val ? parseInt(val[data.headers.length - 1]) : 0
                        })
                    }
                })
            }
        case "3.4": 
            return {
                labels: MONTHS,
                datasets: SEXES.map( (sex,index) => {
                    return {
                        label: sex,
                        backgroundColor: template.data.datasets[index].backgroundColor,
                        data: data.metaData.dimensions.pe.map( pe => {
                            // ageG
                            const val = ( sex === "Female" ) ? 
                                data.rows.find( row => row[data.headers.findIndex(({name}) => name === sexAttr)] === FEMALE_CODE && row[data.headers.findIndex(({name}) => name === "pe")] === pe ) 
                                : data.rows.find( row => row[data.headers.findIndex(({name}) => name === sexAttr)] !== FEMALE_CODE && row[data.headers.findIndex(({name}) => name === "pe")] === pe );
                            return val ? parseInt(val[data.headers.length - 1]) : 0;
                        })
                    }
                })
            }
        case "3.5": 
            return {
                labels: EXPANDED_AGE_RANGES,
                datasets: SEXES.map( (sex,index) => {
                    return {
                        label: sex,
                        backgroundColor: template.data.datasets[index].backgroundColor,
                        borderColor: template.data.datasets[index].borderColor,
                        tension: 0.1,
                        data: EXPANDED_AGE_RANGES_ID.map( ageG => {
                            // ageG
                            const val = ( sex === "Female" ) ? 
                                data.rows.find( row => row[data.headers.findIndex(({name}) => name === sexAttr)] === FEMALE_CODE && row[data.headers.findIndex(({name}) => name === ageAttr)] === ageG ) 
                                : data.rows.find( row => row[data.headers.findIndex(({name}) => name === sexAttr)] !== FEMALE_CODE && row[data.headers.findIndex(({name}) => name === ageAttr)] === ageG );
                            return val ? parseInt(val[data.headers.length - 1]) : 0
                        })
                    }
                })
            }
        case "3.6": 
            return {
                labels: MONTHS,
                datasets: SEXES.map( (sex,index) => {
                    return {
                        label: sex,
                        backgroundColor: template.data.datasets[index].backgroundColor,
                        data: data.metaData.dimensions.pe.map( pe => {
                            // ageG
                            const val = ( sex === "Female" ) ? 
                                data.rows.find( row => row[data.headers.findIndex(({name}) => name === sexAttr)] === FEMALE_CODE && row[data.headers.findIndex(({name}) => name === "pe")] === pe ) 
                                : data.rows.find( row => row[data.headers.findIndex(({name}) => name === sexAttr)] !== FEMALE_CODE && row[data.headers.findIndex(({name}) => name === "pe")] === pe );
                            return val ? parseInt(val[data.headers.length - 1]) : 0;
                        })
                    }
                })
            }
        case "3.7": 
            return {
                labels: EXPANDED_AGE_RANGES,
                datasets: SEXES.map( (sex,index) => {
                    return {
                        label: sex,
                        backgroundColor: template.data.datasets[index].backgroundColor,
                        borderColor: template.data.datasets[index].borderColor,
                        tension: 0.1,
                        data: EXPANDED_AGE_RANGES_ID.map( ageG => {
                            // ageG
                            const val = ( sex === "Female" ) ? 
                                data.rows.find( row => row[data.headers.findIndex(({name}) => name === sexAttr)] === FEMALE_CODE && row[data.headers.findIndex(({name}) => name === ageAttr)] === ageG ) 
                                : data.rows.find( row => row[data.headers.findIndex(({name}) => name === sexAttr)] !== FEMALE_CODE && row[data.headers.findIndex(({name}) => name === ageAttr)] === ageG );
                            return val ? parseInt(val[data.headers.length - 1]) : 0
                        })
                    }
                })
            }
        case "3.8": 
            return {
                labels: MONTHS,
                datasets: SEXES.map( (sex,index) => {
                    return {
                        label: sex,
                        backgroundColor: template.data.datasets[index].backgroundColor,
                        data: data.metaData.dimensions.pe.map( pe => {
                            // ageG
                            const val = ( sex === "Female" ) ? 
                                data.rows.find( row => row[data.headers.findIndex(({name}) => name === sexAttr)] === FEMALE_CODE && row[data.headers.findIndex(({name}) => name === "pe")] === pe ) 
                                : data.rows.find( row => row[data.headers.findIndex(({name}) => name === sexAttr)] !== FEMALE_CODE && row[data.headers.findIndex(({name}) => name === "pe")] === pe );
                            return val ? parseInt(val[data.headers.length - 1]) : 0;
                        })
                    }
                })
            }
        case "4.1": 
            convert = data.rows
            .filter( r => r[0] !== "")
            .sort((a, b) => {
                return parseInt(b[1]) - parseInt(a[1])
            }).slice(0,10);
            return {
                labels: convert.map( d => 
                    Object.values(data.metaData.items)
                    .find( o => o["code"] && o["code"] === d[0] ).name.split(" - ")[1]
                ),
                datasets: [{
                    label: ["Value"],
                    backgroundColor: template.data.datasets[0].backgroundColor,
                    borderColor: template.data.datasets[0].borderColor,
                    data: convert.map( d => d[1] )
                }]
            }
        case "4.2":
            convert = data.rows
            .filter( r => r[0] !== "")
            .sort((a, b) => {
                return parseInt(b[1]) - parseInt(a[1])
            }).slice(0,10);
            return (
                <div>
                    <table class="styled-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th width="30%">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            convert.map( d => {
                                return (
                                    <tr>
                                        <td>
                                        {
                                            Object.values(data.metaData.items)
                                            .find( o => o["code"] && o["code"] === d[0] ).name.split(" - ")[1]
                                        }
                                        </td>
                                        <td>{d[1]}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            )
        case "5.1": 
            return data.metaData.dimensions["W4lXedV97kG"].map( id => {
                const val = data.rows.find( row => row[0] === data.metaData.items[id].code );
                return {
                    name: data.metaData.items[id].name,
                    size: val ? parseInt(val[1]) : 0
                }
            }).sort((a, b) => parseFloat(b.size) - parseFloat(a.size));
        case "6.1":
            return {
                labels: EXPANDED_AGE_RANGES,
                datasets: SEXES.map( (sex,index) => {
                    return {
                        label: sex,
                        backgroundColor: template.data.datasets[index].backgroundColor,
                        borderColor: template.data.datasets[index].borderColor,
                        tension: 0.1,
                        data: EXPANDED_AGE_RANGES_ID.map( ageG => {
                            // ageG
                            const val = ( sex === "Female" ) ? 
                                data.rows.find( row => row[data.headers.findIndex(({name}) => name === sexAttr)] === FEMALE_CODE && row[data.headers.findIndex(({name}) => name === ageAttr)] === ageG ) 
                                : data.rows.find( row => row[data.headers.findIndex(({name}) => name === sexAttr)] !== FEMALE_CODE && row[data.headers.findIndex(({name}) => name === ageAttr)] === ageG );
                            return val ? parseInt(val[data.headers.length - 1]) : 0
                        })
                    }
                })
            }
        case "6.2": 
            return {
                message: ["Number of Deaths at Home and Health Facility"]
            }
        case "6.3": 
            return {
                labels: MONTHS,
                datasets: SEXES.map( (sex,index) => {
                    return {
                        label: sex,
                        backgroundColor: template.data.datasets[index].backgroundColor,
                        data: data.metaData.dimensions.pe.map( pe => {
                            // ageG
                            const val = ( sex === "Female" ) ? 
                                data.rows.find( row => row[data.headers.findIndex(({name}) => name === sexAttr)] === FEMALE_CODE && row[data.headers.findIndex(({name}) => name === "pe")] === pe ) 
                                : data.rows.find( row => row[data.headers.findIndex(({name}) => name === sexAttr)] !== FEMALE_CODE && row[data.headers.findIndex(({name}) => name === "pe")] === pe );
                            return val ? parseInt(val[data.headers.length - 1]) : 0;
                        })
                    }
                })
            }
        case "6.4": 
            return {
                labels: SEXES,
                datasets: [{
                    label: ["Value"],
                    backgroundColor: template.data.datasets[0].backgroundColor,
                    borderColor: template.data.datasets[0].borderColor,
                    data: SEXES.map( sex => {
                        const val = ( sex === "Female" ) ? data.rows.find(row => row[0] === FEMALE_CODE) : data.rows.find(row => row[0] !== FEMALE_CODE);
                        return val ? parseInt(val[1]) : 0
                    })
                }]
            }
        case "6.5":
            return {
                labels: ["0-6 days", "7-27 days", "28-365 days", "1-4 years", "5-14 years", "15+ years"],
                datasets: [{
                    label: "% of total malaria deaths",
                    type: "line",
                    borderColor: template.data.datasets[0].borderColor,
                    data: ["fWFVTD4s9Pv","ZlMRBfKhr3A","YQFDlHHciZ9","F7UC9N85W6E","IhGq1T65Mrp","FHbcZH9eP8C"].map( id => {
                        const val = data.rows.find( row => row[0] === id );
                        return val ? val[1] : 0
                    }),
                    yAxisID: 'y1',
                    tension: 0.1
                },
                {
                    label: "Number of malaria deaths",
                    type: "bar",
                    backgroundColor: template.data.datasets[1].backgroundColor,
                    data: ["sqvAUlq3ViV","VZA8VH6tg4M","lXN7Y9UXua2","FTvpuNNXaU6","BIShzUuR59L","D8Ywph4iBu8"].map( id => {
                        const val = data.rows.find( row => row[0] === id );
                        return val ? val[1] : 0
                    }),
                    yAxisID: 'y'
                }]
            }
        case "6.6": 
            convert = [{
                label: "Malaria",
                value: AGE_RANGES_ID.map( ageG => data.rows.filter( row => row[data.headers.findIndex(({name}) => name === ageAttr)] === ageG && row[data.headers.findIndex(({name}) => name === "zwFVJMwggaH")] === "0200" ).reduce( (curTotal, val) => curTotal + val[data.headers.length - 1], 0 ))
            },
            {
                label: "Other causes",
                value: AGE_RANGES_ID.map( ageG => data.rows.filter( row => row[data.headers.findIndex(({name}) => name === ageAttr)] === ageG && row[data.headers.findIndex(({name}) => name === "zwFVJMwggaH")] !== "0200" ).reduce( (curTotal, val) => curTotal + parseInt(val[data.headers.length - 1]), 0 ))
            }];
            return {
                labels: AGE_RANGES,
                datasets: convert.map( (ds,index) => {
                    return {
                        label: ds.label,
                        backgroundColor: template.data.datasets[index].backgroundColor,
                        data: ds.value
                    }
                })
            }
        case "7.1":
            return {
                labels: EXPANDED_AGE_RANGES,
                datasets: SEXES.map( (sex,index) => {
                    return {
                        label: sex,
                        backgroundColor: template.data.datasets[index].backgroundColor,
                        borderColor: template.data.datasets[index].borderColor,
                        tension: 0.1,
                        data: EXPANDED_AGE_RANGES_ID.map( ageG => {
                            // ageG
                            const val = ( sex === "Female" ) ? 
                                data.rows.find( row => row[data.headers.findIndex(({name}) => name === sexAttr)] === FEMALE_CODE && row[data.headers.findIndex(({name}) => name === ageAttr)] === ageG ) 
                                : data.rows.find( row => row[data.headers.findIndex(({name}) => name === sexAttr)] !== FEMALE_CODE && row[data.headers.findIndex(({name}) => name === ageAttr)] === ageG );
                            return val ? parseInt(val[data.headers.length - 1]) : 0
                        })
                    }
                })
            }
        case "7.2": 
            return {
                message: ["Number of Deaths at Home and Health Facility"]
            }
        case "7.3": 
            return {
                labels: MONTHS,
                datasets: SEXES.map( (sex,index) => {
                    return {
                        label: sex,
                        backgroundColor: template.data.datasets[index].backgroundColor,
                        data: data.metaData.dimensions.pe.map( pe => {
                            // ageG
                            const val = ( sex === "Female" ) ? 
                                data.rows.find( row => row[data.headers.findIndex(({name}) => name === sexAttr)] === FEMALE_CODE && row[data.headers.findIndex(({name}) => name === "pe")] === pe ) 
                                : data.rows.find( row => row[data.headers.findIndex(({name}) => name === sexAttr)] !== FEMALE_CODE && row[data.headers.findIndex(({name}) => name === "pe")] === pe );
                            return val ? parseInt(val[data.headers.length - 1]) : 0;
                        })
                    }
                })
            }
        case "7.4": 
            return {
                labels: SEXES,
                datasets: [{
                    label: ["Value"],
                    backgroundColor: template.data.datasets[0].backgroundColor,
                    borderColor: template.data.datasets[0].borderColor,
                    data: SEXES.map( sex => {
                        const val = ( sex === "Female" ) ? data.rows.find(row => row[0] === FEMALE_CODE) : data.rows.find(row => row[0] !== FEMALE_CODE);
                        return val ? parseInt(val[1]) : 0
                    })
                }]
            }
        case "7.5":
            return {
                labels: ["0-4 years", "5-14 years", "15-49 years", "50+ years"],
                datasets: [{
                    label: "% of total tuberculosis deaths",
                    type: "line",
                    borderColor: template.data.datasets[0].borderColor,
                    data: ["IblX3RCMH8R","xGxqMonswYK","Cbgjb32yCqi","tRKZecNOlsl"].map( id => {
                        const val = data.rows.find( row => row[0] === id );
                        return val ? val[1] : 0
                    }),
                    yAxisID: 'y1',
                    tension: 0.1
                },
                {
                    label: "Number of tuberculosis deaths",
                    type: "bar",
                    backgroundColor: template.data.datasets[1].backgroundColor,
                    data: ["Nv7F18RRTdw","mrTNAVALUjV","vQ0cyDYopLi","DxIQUD9sAZ5"].map( id => {
                        const val = data.rows.find( row => row[0] === id );
                        return val ? val[1] : 0
                    }),
                    yAxisID: 'y'
                }]
            }
        case "7.6":
            convert = [{
                label: "Tuberculosis",
                value: AGE_RANGES_ID.map( ageG => data.rows.filter( row => row[data.headers.findIndex(({name}) => name === ageAttr)] === ageG && row[data.headers.findIndex(({name}) => name === "zwFVJMwggaH")] === "0030" ).reduce( (curTotal, val) => curTotal + val[data.headers.length - 1], 0 ))
            },
            {
                label: "Other causes",
                value: AGE_RANGES_ID.map( ageG => data.rows.filter( row => row[data.headers.findIndex(({name}) => name === ageAttr)] === ageG && row[data.headers.findIndex(({name}) => name === "zwFVJMwggaH")] !== "0030" ).reduce( (curTotal, val) => curTotal + parseInt(val[data.headers.length - 1]), 0 ))
            }];
            return {
                labels: AGE_RANGES,
                datasets: convert.map( (ds,index) => {
                    return {
                        label: ds.label,
                        backgroundColor: template.data.datasets[index].backgroundColor,
                        data: ds.value
                    }
                })
            }
        case "8.1":
            return {
                labels: EXPANDED_AGE_RANGES,
                datasets: SEXES.map( (sex,index) => {
                    return {
                        label: sex,
                        backgroundColor: template.data.datasets[index].backgroundColor,
                        borderColor: template.data.datasets[index].borderColor,
                        tension: 0.1,
                        data: EXPANDED_AGE_RANGES_ID.map( ageG => {
                            // ageG
                            const val = ( sex === "Female" ) ? 
                                data.rows.find( row => row[data.headers.findIndex(({name}) => name === sexAttr)] === FEMALE_CODE && row[data.headers.findIndex(({name}) => name === ageAttr)] === ageG ) 
                                : data.rows.find( row => row[data.headers.findIndex(({name}) => name === sexAttr)] !== FEMALE_CODE && row[data.headers.findIndex(({name}) => name === ageAttr)] === ageG );
                            return val ? parseInt(val[data.headers.length - 1]) : 0
                        })
                    }
                })
            }
        case "8.2": 
            return {
                message: ["Number of Deaths at Home and Health Facility"]
            }
        case "8.3": 
            return {
                labels: MONTHS,
                datasets: SEXES.map( (sex,index) => {
                    return {
                        label: sex,
                        backgroundColor: template.data.datasets[index].backgroundColor,
                        data: data.metaData.dimensions.pe.map( pe => {
                            // ageG
                            const val = ( sex === "Female" ) ? 
                                data.rows.find( row => row[data.headers.findIndex(({name}) => name === sexAttr)] === FEMALE_CODE && row[data.headers.findIndex(({name}) => name === "pe")] === pe ) 
                                : data.rows.find( row => row[data.headers.findIndex(({name}) => name === sexAttr)] !== FEMALE_CODE && row[data.headers.findIndex(({name}) => name === "pe")] === pe );
                            return val ? parseInt(val[data.headers.length - 1]) : 0;
                        })
                    }
                })
            }
        case "8.4": 
            return {
                labels: SEXES,
                datasets: [{
                    label: ["Value"],
                    backgroundColor: template.data.datasets[0].backgroundColor,
                    borderColor: template.data.datasets[0].borderColor,
                    data: SEXES.map( sex => {
                        const val = ( sex === "Female" ) ? data.rows.find(row => row[0] === FEMALE_CODE) : data.rows.find(row => row[0] !== FEMALE_CODE);
                        return val ? parseInt(val[1]) : 0
                    })
                }]
            }
        case "8.5":
            return {
                labels: ["0-4 years", "5-14 years", "15-49 years", "50+ years"],
                datasets: [{
                    label: "% of total tuberculosis deaths",
                    type: "line",
                    borderColor: template.data.datasets[0].borderColor,
                    data: ["jDA2MDrb11c","odV5MLupr0l","LzTSVWcHcUt","i9Bw8Avpdya"].map( id => {
                        const val = data.rows.find( row => row[0] === id );
                        return val ? val[1] : 0
                    }),
                    yAxisID: 'y1',
                    tension: 0.1
                },
                {
                    label: "Number of tuberculosis deaths",
                    type: "bar",
                    backgroundColor: template.data.datasets[1].backgroundColor,
                    data: ["dKAoE64Dman","ki2tP2eB6uA","LNliw80Ru5X","aTswq8brgOw"].map( id => {
                        const val = data.rows.find( row => row[0] === id );
                        return val ? val[1] : 0
                    }),
                    yAxisID: 'y'
                }]
            }
        case "8.6":
            convert = [{
                label: "AIDS",
                value: AGE_RANGES_ID.map( ageG => data.rows.filter( row => row[data.headers.findIndex(({name}) => name === ageAttr)] === ageG && row[data.headers.findIndex(({name}) => name === "zwFVJMwggaH")] === "0090" ).reduce( (curTotal, val) => curTotal + val[data.headers.length - 1], 0 ))
            },
            {
                label: "Other causes",
                value: AGE_RANGES_ID.map( ageG => data.rows.filter( row => row[data.headers.findIndex(({name}) => name === ageAttr)] === ageG && row[data.headers.findIndex(({name}) => name === "zwFVJMwggaH")] !== "0090" ).reduce( (curTotal, val) => curTotal + parseInt(val[data.headers.length - 1]), 0 ))
            }];
            return {
                labels: AGE_RANGES,
                datasets: convert.map( (ds,index) => {
                    return {
                        label: ds.label,
                        backgroundColor: template.data.datasets[index].backgroundColor,
                        data: ds.value
                    }
                })
            }
        case "9.1": 
            convert = [{
                label: "Malaria",
                value: AGE_RANGES_SHORT_ID.map( ageG => data.rows.filter( row => row[data.headers.findIndex(({name}) => name === ageAttr)] === ageG && row[data.headers.findIndex(({name}) => name === "zwFVJMwggaH")] === "0200" ).reduce( (curTotal, val) => curTotal + val[data.headers.length - 1], 0 ))
            },
            {
                label: "Tuberculosis",
                value: AGE_RANGES_SHORT_ID.map( ageG => data.rows.filter( row => row[data.headers.findIndex(({name}) => name === ageAttr)] === ageG && row[data.headers.findIndex(({name}) => name === "zwFVJMwggaH")] === "0030" ).reduce( (curTotal, val) => curTotal + val[data.headers.length - 1], 0 ))
            },
            {
                label: "AIDS",
                value: AGE_RANGES_SHORT_ID.map( ageG => data.rows.filter( row => row[data.headers.findIndex(({name}) => name === ageAttr)] === ageG && row[data.headers.findIndex(({name}) => name === "zwFVJMwggaH")] === "0090" ).reduce( (curTotal, val) => curTotal + val[data.headers.length - 1], 0 ))
            },
            {
                label: "Other causes",
                value: AGE_RANGES_SHORT_ID.map( ageG => data.rows.filter( row => row[data.headers.findIndex(({name}) => name === ageAttr)] === ageG && row[data.headers.findIndex(({name}) => name === "zwFVJMwggaH")] !== "0200" && row[data.headers.findIndex(({name}) => name === "zwFVJMwggaH")] !== "0030" && row[data.headers.findIndex(({name}) => name === "zwFVJMwggaH")] !== "0090" ).reduce( (curTotal, val) => curTotal + parseInt(val[data.headers.length - 1]), 0 ))
            }];
            return {
                labels: AGE_RANGES_SHORT,
                datasets: convert.map( (ds,index) => {
                    return {
                        label: ds.label,
                        backgroundColor: template.data.datasets[index].backgroundColor,
                        data: ds.value
                    }
                })
            }
        case "9.2":
            convert = [];
            SEXES.forEach( sex => {
                ["0200 - Malaria", "0030 - Tuberculosis", "0090 - HIV"].forEach( causeGroup => {
                    convert.push({
                        label: `${sex} - ${causeGroup.split(" - ")[1]}`,
                        stack: sex,
                        data: AGE_RANGES_SHORT_ID.map( ageG => {
                            const val =  ( sex === "Female" ) ? 
                                data.rows.find( row => row[data.headers.findIndex(({name}) => name === "zwFVJMwggaH")] === causeGroup.split(" - ")[0] && row[data.headers.findIndex(({name}) => name === sexAttr)] === FEMALE_CODE && row[data.headers.findIndex(({name}) => name === ageAttr)] === ageG ) 
                                : data.rows.find( row => row[data.headers.findIndex(({name}) => name === "zwFVJMwggaH")] === causeGroup.split(" - ")[0] && row[data.headers.findIndex(({name}) => name === sexAttr)] !== FEMALE_CODE && row[data.headers.findIndex(({name}) => name === ageAttr)] === ageG );
                            return !val ? 0 : sex === "Male" ? -1*val[data.headers.length - 1] : val[data.headers.length - 1]
                        })
                    })
                })
            });
            return {
                labels: AGE_RANGES_SHORT,
                datasets: convert.map( (ds,index) => {
                    return {
                        label: ds.label,
                        backgroundColor: template.data.datasets[index].backgroundColor,
                        stack: ds.stack,
                        data: ds.data
                    }
                })
            }
        case "9.3":
            return {
                labels: ["0 - 4", "5 - 14", "15 - 49", "50 - 75", "75+"],
                datasets: [{
                    label: "% of Death",
                    backgroundColor: template.data.datasets[0].backgroundColor,
                    data: data.metaData.dimensions.dx.map( id => {
                        const val = data.rows.find( row => row[0] === id );
                        return val ? val[1] : 0
                    })
                }]
            }
        case "9.4":
            return {
                labels: ["15 - 24", "25 - 34", "35 - 49", "50 - 74", "75+"],
                datasets:[{
                    label: "% of total deaths all cause",
                    type: "line",
                    borderColor: template.data.datasets[0].borderColor,
                    data: ["WIEflTHNHGt","HLHHkjZzhZr","fXR85loNh4h","lTm1yRk1TdN","RDnflh6o7NF"].map( id => {
                        const val = data.rows.find( row => row[0] === id );
                        return val ? val[1] : 0
                    }),
                    yAxisID: 'y1',
                    tension: 0.1
                },
                {
                    label: "TB",
                    type: "bar",
                    backgroundColor: template.data.datasets[1].backgroundColor,
                    data: ["lgQVrvXnLNM","GJZcNMT4GDr","IsdEecWYvms","MT3y6VcNRLZ","tILCmBOMDFD"].map( id => {
                        const val = data.rows.find( row => row[0] === id );
                        return val ? val[1] : 0
                    }),
                    yAxisID: 'y'
                },
                {
                    label: "AIDS",
                    type: "bar",
                    backgroundColor: template.data.datasets[2].backgroundColor,
                    data: ["LkFHyAbyAe4","VlPmjKpZ3Py","HLHHkjZzhZr","QYC7R2wvmZW","muZMnbzlTkO"].map( id => {
                        const val = data.rows.find( row => row[0] === id );
                        return val ? val[1] : 0
                    }),
                    yAxisID: 'y'
                }]
            }
        default: 
            return template.data;
    }
}

export default generateChildCharts;