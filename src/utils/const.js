const defaultAttributes = [
  { name: "Unique ID", valueType: "TEXT", code: "system_id"},
  { name: "First Name", valueType: "TEXT", code: "given_name"},
  { name: "Middle Name", valueType: "TEXT", code: "middle_name"},
  { name: "Last Name", valueType: "TEXT", code: "family_name"},
  { name: "Date of Birth", valueType: "DATE", code: "dob"},
  { name: "Date of Birth is estimated", valueType: "TRUE_ONLY", code: "estimated_dob"},
  { name: "Age in years", valueType: "INTEGER_ZERO_OR_POSITIVE", code: "age"},
  { name: "Address", valueType: "LONG_TEXT", code: "address"},
  { name: "Sex", valueType: "optionSet", code: "sex"},
  { name: "Age unit", valueType: "TEXT", code: "age_unit"},
  { name: "Estimated age", valueType: "INTEGER_POSITIVE", code: "estimated_age"},
  { name: "COD Status", valueType: "TEXT", code: "status"},
];

const analyticData = {
  page0: {
    0.1: "no_data",
    0.2: "no_data",
    0.3: "no_data",
    0.4: "no_data",
    0.5: "no_data",
    0.6: "no_data",
    0.7: "no_data",
    0.8: "no_data"
  },
  page1: {
    1.1: "/api/analytics.json?dimension=dx:qoq4LfF8E61;OIZTau847kT;tln3upB4BS6;uL1LMOUhAcn&filter=pe:[YEAR]&filter=ou:[ORG]",
    1.2: "/api/analytics.json?dimension=dx:RMWCwaW4Usl;uPvMmguHeY0;KGH4NsPEBEo;VANyy6Ksl7C;hZ8V3r1D40X;H8plfPHa442;Zf2FgODzBeC;e1roVDqy2HZ;jQ8S8UZLHTe;MVE7fApmw9r;FIis7GDIU1z;jZbA1zglYzp;A8zSxxAtAyy;YKo8Vz9NrL2;rOsB15PHdOi;gzkYv8SPImN;jdZBCgwV8Ci;m4Lqdotc1Vx;VrYm8bpCnBJ;cMcLR6EAci9;W42hWdbWnbF;QcFRr1IOu1a;Y5w48ARowPY;whnU6pTUsiI;lhqePOUVnK1;a8PFQz9oFXe;WaGEeoPbuTy;hQQ2EEgWdU3;BZDhW1TaTDN;guzOhHchne8;RKcTvh9eQOX;lbKBJ30o24j&filter=ou:[ORG]&filter=pe:[YEAR]",
    1.3: "/api/analytics/events/aggregate/ogrOUKoSaWA.json?dimension=WlWJt4lVSWw.zwFVJMwggaH&filter=pe:[YEAR]&filter=ou:[ORG]&stage=WlWJt4lVSWw"
  },
  page2: {
    2.1: "/api/analytics/events/aggregate/ogrOUKoSaWA.json?dimension=WlWJt4lVSWw.[ATTRIBUTE_SEX]&dimension=WlWJt4lVSWw.[ATTRIBUTE_AGE]-bHqcKIS01OI&filter=ou:[ORG]&filter=zwFVJMwggaH:IN:[CAUSE_GROUP_CODE]&filter=pe:[YEAR]&stage=WlWJt4lVSWw",
    2.2: "/api/analytics/events/aggregate/ogrOUKoSaWA.json?dimension=WlWJt4lVSWw.[ATTRIBUTE_SEX]&dimension=WlWJt4lVSWw.[ATTRIBUTE_AGE]-bHqcKIS01OI&filter=ou:[ORG]&filter=zwFVJMwggaH:IN:[CAUSE_GROUP_CODE]&filter=pe:[YEAR]&stage=WlWJt4lVSWw"
  },
  page3: {
    3.1: "/api/analytics/events/aggregate/ogrOUKoSaWA.json?dimension=WlWJt4lVSWw.[ATTRIBUTE_SEX]&dimension=WlWJt4lVSWw.[ATTRIBUTE_AGE]-S0CP6RzDx4c&filter=ou:[ORG]&filter=WlWJt4lVSWw.zwFVJMwggaH:IN:0600;0610;0620;0630;0640;0650;0660;0670;0680;0690;0700;0710;0720;0730;0740;0750;0760;0770&filter=pe:[YEAR]&stage=WlWJt4lVSWw",
    3.2: "/api/analytics/events/aggregate/ogrOUKoSaWA.json?dimension=WlWJt4lVSWw.[ATTRIBUTE_SEX]&dimension=pe:[YEAR]01;[YEAR]02;[YEAR]03;[YEAR]04;[YEAR]05;[YEAR]06;[YEAR]07;[YEAR]08;[YEAR]09;[YEAR]10;[YEAR]11;[YEAR]12&filter=ou:[ORG]&filter=WlWJt4lVSWw.zwFVJMwggaH:IN:0600;0610;0620;0630;0640;0650;0660;0670;0680;0690;0700;0710;0720;0730;0740;0750;0760;0770&stage=WlWJt4lVSWw",
    3.3: "/api/analytics/events/aggregate/ogrOUKoSaWA.json?dimension=WlWJt4lVSWw.[ATTRIBUTE_SEX]&dimension=WlWJt4lVSWw.[ATTRIBUTE_AGE]-S0CP6RzDx4c&filter=ou:[ORG]&filter=WlWJt4lVSWw.zwFVJMwggaH:IN:0790&filter=pe:[YEAR]&stage=WlWJt4lVSWw",
    3.4: "/api/analytics/events/aggregate/ogrOUKoSaWA.json?dimension=WlWJt4lVSWw.[ATTRIBUTE_SEX]&dimension=pe:[YEAR]01;[YEAR]02;[YEAR]03;[YEAR]04;[YEAR]05;[YEAR]06;[YEAR]07;[YEAR]08;[YEAR]09;[YEAR]10;[YEAR]11;[YEAR]12&filter=ou:[ORG]&filter=WlWJt4lVSWw.zwFVJMwggaH:IN:0790&stage=WlWJt4lVSWw",
    3.5: "/api/analytics/events/aggregate/ogrOUKoSaWA.json?dimension=WlWJt4lVSWw.[ATTRIBUTE_SEX]&dimension=WlWJt4lVSWw.[ATTRIBUTE_AGE]-S0CP6RzDx4c&filter=ou:[ORG]&filter=WlWJt4lVSWw.zwFVJMwggaH:IN:1040;1050;1060;1070;1080;1090;1100&filter=pe:[YEAR]&stage=WlWJt4lVSWw",
    3.6: "/api/analytics/events/aggregate/ogrOUKoSaWA.json?dimension=WlWJt4lVSWw.[ATTRIBUTE_SEX]&dimension=pe:[YEAR]01;[YEAR]02;[YEAR]03;[YEAR]04;[YEAR]05;[YEAR]06;[YEAR]07;[YEAR]08;[YEAR]09;[YEAR]10;[YEAR]11;[YEAR]12&filter=ou:[ORG]&filter=WlWJt4lVSWw.zwFVJMwggaH:IN:1040;1050;1060;1070;1080;1090;1100&stage=WlWJt4lVSWw",
    3.7: "/api/analytics/events/aggregate/ogrOUKoSaWA.json?dimension=WlWJt4lVSWw.[ATTRIBUTE_SEX]&dimension=WlWJt4lVSWw.[ATTRIBUTE_AGE]-S0CP6RzDx4c&filter=ou:[ORG]&filter=WlWJt4lVSWw.zwFVJMwggaH:IN:1110;1120;1130;1140&filter=pe:[YEAR]&stage=WlWJt4lVSWw",
    3.8: "/api/analytics/events/aggregate/ogrOUKoSaWA.json?dimension=WlWJt4lVSWw.[ATTRIBUTE_SEX]&dimension=pe:[YEAR]01;[YEAR]02;[YEAR]03;[YEAR]04;[YEAR]05;[YEAR]06;[YEAR]07;[YEAR]08;[YEAR]09;[YEAR]10;[YEAR]11;[YEAR]12&filter=ou:[ORG]&filter=WlWJt4lVSWw.zwFVJMwggaH:IN:1110;1120;1130;1140&&stage=WlWJt4lVSWw"
  },
  page4: {
    4.1: "/api/analytics/events/aggregate/ogrOUKoSaWA.json?dimension=WlWJt4lVSWw.zwFVJMwggaH&filter=pe:[YEAR]&filter=ou:[ORG]&stage=WlWJt4lVSWw",
    4.2: "/api/analytics/events/aggregate/ogrOUKoSaWA.json?dimension=WlWJt4lVSWw.zwFVJMwggaH&filter=pe:[YEAR]&filter=ou:[ORG]&stage=WlWJt4lVSWw"
  },
  page5: {
    5.1: "/api/analytics/events/aggregate/ogrOUKoSaWA.json?dimension=W4lXedV97kG&filter=pe:[YEAR]&filter=ou:[ORG]&stage=WlWJt4lVSWw"
  },
  page6: {
    6.1: "/api/analytics/events/aggregate/ogrOUKoSaWA.json?dimension=WlWJt4lVSWw.[ATTRIBUTE_SEX]&dimension=WlWJt4lVSWw.[ATTRIBUTE_AGE]-S0CP6RzDx4c&filter=ou:[ORG]&filter=pe:[YEAR]&filter=zwFVJMwggaH:IN:0200&stage=WlWJt4lVSWw",
    6.2: "no_data",
    6.3: "/api/analytics/events/aggregate/ogrOUKoSaWA.json?dimension=WlWJt4lVSWw.[ATTRIBUTE_SEX]&dimension=pe:[YEAR]01;[YEAR]02;[YEAR]03;[YEAR]04;[YEAR]05;[YEAR]06;[YEAR]07;[YEAR]08;[YEAR]09;[YEAR]10;[YEAR]11;[YEAR]12&filter=zwFVJMwggaH:IN:0200&filter=ou:[ORG]&stage=WlWJt4lVSWw",
    6.4: "/api/analytics/events/aggregate/ogrOUKoSaWA.json?dimension=WlWJt4lVSWw.[ATTRIBUTE_SEX]&filter=zwFVJMwggaH:IN:0200&filter=ou:[ORG]&filter=pe:[YEAR]&stage=WlWJt4lVSWw",
    6.5: "/api/analytics.json?dimension=dx:fWFVTD4s9Pv;ZlMRBfKhr3A;YQFDlHHciZ9;F7UC9N85W6E;IhGq1T65Mrp;FHbcZH9eP8C;sqvAUlq3ViV;VZA8VH6tg4M;lXN7Y9UXua2;FTvpuNNXaU6;BIShzUuR59L;D8Ywph4iBu8&filter=pe:[YEAR]&filter=ou:[ORG]",
    6.6: "/api/analytics/events/aggregate/ogrOUKoSaWA.json?dimension=WlWJt4lVSWw.[ATTRIBUTE_AGE]-bHqcKIS01OI&dimension=WlWJt4lVSWw.zwFVJMwggaH&filter=ou:[ORG]&filter=pe:[YEAR]&stage=WlWJt4lVSWw"
  },
  page7: {
    7.1: "/api/analytics/events/aggregate/ogrOUKoSaWA.json?dimension=WlWJt4lVSWw.[ATTRIBUTE_SEX]&dimension=WlWJt4lVSWw.[ATTRIBUTE_AGE]-S0CP6RzDx4c&filter=ou:[ORG]&filter=pe:[YEAR]&filter=WlWJt4lVSWw.zwFVJMwggaH:IN:0030&stage=WlWJt4lVSWw",
    7.2: "no_data",
    7.3: "/api/analytics/events/aggregate/ogrOUKoSaWA.json?dimension=WlWJt4lVSWw.[ATTRIBUTE_SEX]&dimension=pe:[YEAR]01;[YEAR]02;[YEAR]03;[YEAR]04;[YEAR]05;[YEAR]06;[YEAR]07;[YEAR]08;[YEAR]09;[YEAR]10;[YEAR]11;[YEAR]12&filter=zwFVJMwggaH:IN:0030&filter=ou:[ORG]&stage=WlWJt4lVSWw",
    7.4: "/api/analytics/events/aggregate/ogrOUKoSaWA.json?dimension=WlWJt4lVSWw.[ATTRIBUTE_SEX]&filter=zwFVJMwggaH:IN:0030&filter=ou:[ORG]&filter=pe:[YEAR]&stage=WlWJt4lVSWw",
    7.5: "/api/analytics.json?dimension=dx:IblX3RCMH8R;xGxqMonswYK;Cbgjb32yCqi;tRKZecNOlsl;Nv7F18RRTdw;mrTNAVALUjV;vQ0cyDYopLi;DxIQUD9sAZ5&filter=pe:[YEAR]&filter=ou:[ORG]",
    7.6: "/api/analytics/events/aggregate/ogrOUKoSaWA.json?dimension=WlWJt4lVSWw.[ATTRIBUTE_AGE]-bHqcKIS01OI&dimension=WlWJt4lVSWw.zwFVJMwggaH&filter=ou:[ORG]&filter=pe:[YEAR]&stage=WlWJt4lVSWw"
  },
  page8: {
    8.1: "/api/analytics/events/aggregate/ogrOUKoSaWA.json?dimension=WlWJt4lVSWw.[ATTRIBUTE_SEX]&dimension=WlWJt4lVSWw.[ATTRIBUTE_AGE]-S0CP6RzDx4c&filter=ou:[ORG]&filter=pe:[YEAR]&filter=zwFVJMwggaH:IN:0090&stage=WlWJt4lVSWw",
    8.2: "no_data",
    8.3: "/api/analytics/events/aggregate/ogrOUKoSaWA.json?dimension=WlWJt4lVSWw.[ATTRIBUTE_SEX]&dimension=pe:[YEAR]01;[YEAR]02;[YEAR]03;[YEAR]04;[YEAR]05;[YEAR]06;[YEAR]07;[YEAR]08;[YEAR]09;[YEAR]10;[YEAR]11;[YEAR]12&filter=zwFVJMwggaH:IN:0090&filter=ou:[ORG]&stage=WlWJt4lVSWw",
    8.4: "/api/analytics/events/aggregate/ogrOUKoSaWA.json?dimension=WlWJt4lVSWw.[ATTRIBUTE_SEX]&filter=zwFVJMwggaH:IN:0090&filter=ou:[ORG]&filter=pe:[YEAR]&stage=WlWJt4lVSWw",
    8.5: "/api/analytics.json?dimension=dx:dKAoE64Dman;LNliw80Ru5X;ki2tP2eB6uA;aTswq8brgOw;jDA2MDrb11c;LzTSVWcHcUt;odV5MLupr0l;i9Bw8Avpdya&filter=ou:[ORG]&filter=pe:[YEAR]",
    8.6: "/api/analytics/events/aggregate/ogrOUKoSaWA.json?dimension=WlWJt4lVSWw.[ATTRIBUTE_AGE]-bHqcKIS01OI&dimension=WlWJt4lVSWw.zwFVJMwggaH&filter=ou:[ORG]&filter=pe:[YEAR]&stage=WlWJt4lVSWw"
  },
  page9: {
    9.1: "/api/analytics/events/aggregate/ogrOUKoSaWA.json?dimension=WlWJt4lVSWw.[ATTRIBUTE_AGE]-YVz7lS5F4So&dimension=WlWJt4lVSWw.zwFVJMwggaH&filter=ou:[ORG]&filter=pe:[YEAR]&stage=WlWJt4lVSWw",
    9.2: "/api/analytics/events/aggregate/ogrOUKoSaWA.json?dimension=WlWJt4lVSWw.zwFVJMwggaH:IN:0200;0090;0030&dimension=[ATTRIBUTE_SEX]&dimension=[ATTRIBUTE_AGE]-YVz7lS5F4So&filter=ou:[ORG]&filter=pe:[YEAR]&stage=WlWJt4lVSWw",
    9.3: "/api/analytics.json?dimension=dx:DHxwdMnnEhp;nG4ITg8hrrF;bKLqFfc6ZIk;iooUsQINIYk;B1zBU8cKFRo&filter=ou:[ORG]&filter=pe:[YEAR]",
    9.4: "/api/analytics.json?dimension=dx:WIEflTHNHGt;HLHHkjZzhZr;fXR85loNh4h;lTm1yRk1TdN;RDnflh6o7NF;lgQVrvXnLNM;GJZcNMT4GDr;IsdEecWYvms;MT3y6VcNRLZ;tILCmBOMDFD;LkFHyAbyAe4;VlPmjKpZ3Py;QYC7R2wvmZW;muZMnbzlTkO&filter=ou:[ORG]&filter=pe:[YEAR]"
  }
}

export { defaultAttributes, analyticData };