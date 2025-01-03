const resources = {
  en: {
    translation: {
      selectOrgUnit: "Select organisation unit",
      newRegistration: "New Registration",
      search: "Search",
      exit: "Exit",
      page: "Page",
      profile: "Profile",
      save: "Save",
      cancel: "Cancel",
      certificate: "Certificate",
      causeOfDeath: "Cause of Death",
      frameA: "Frame A",
      frameB: "Frame B",
      medicalData: "Medical data",
      results: "Results",
      surgery: "Surgery",
      mannerOfDeath: "Manner of Death",
      fetalOrInfantDeath: "Fetal of Infant Death",
      pleaseSelectYear: "Please select year",
      run: "RUN",
      anacodExportExcel: "Anacod Export (Excel)",
      mortalityLevels: "Mortality levels",
      mortalityFromBroadCausesOfDeath: "Mortality from broad causes of death",
      mortalityByCauseAgeAndSex: "Mortality by cause, age and sex",
      mortalityFromNcds: "Mortality from NCDs",
      mostFrequentCauseOfDeath: "Most frequent cause of death",
      deathsByIcd11Chapter: "Deaths by ICD-11 Chapter",
      next: "Next",
      add: "Add",
      reload: "Reload",
      translation: "Translation",
      dataEntry: "Data Entry",
      anacodExport: "Anacod Export",
      dashboard: "Dashboard",
      administration: "Administration",
      exitApp: "Exit App",
      orgUnit: "Org Unit",
      addLanguage: "Add Language",
      pleaseSelectLanguage: "Please select a language",
      lastUpdated: "Last updated",
      causeOfDeathApp: "Cause Of Death App",
      inputSearchText: "Input search text",
      select: "Select",
      triggerDesc: "Click to sort descending",
      triggerAsc: "Click to sort ascending",
      cancelSort: "Click to cancel sorting",
      // Administration
      step1Installation: "1 - Installation",
      step2Attribute: "2 - Attributes",
      step3FrameA: "3 - Form",
      step4FrameB: "4 - Frame B",
      step5OUs: "4 - Assign OrgUnits",
      step6Users: "5 - Assign Users",
      step7Review: "6 - Review & Finish",
      errorMissingTET:
        "ERROR Please select ALL default attributes and Tracked Entity Type.",
      step1Attributes: "1 - Attributes",
      step2Certificate: "2 - Certificate",
      saveSuccessful: "Successfully Save!",
      selectionTitle: "INSTALLATION OF WHO MCCD PACKAGE",
      globalICDTool: "Use global WHO ICD Tool url",
      otherICDTool: "Use other ICD Tool url",
      defaultInstallation: "Default Installation",
      defaultInstallationInfo:
        "Use default MCCOD program with minimum configurations",
      customInstallation: "Custom Installation",
      customInstallationInfo:
        "Use default MCCOD program with additional metadata as you need",
      installWithDocker: "How to install ICD-11 API Server using Docker:",
      installationWarning: "COD app could not start the installation process.",
      installationWarningTitle:
        "The app setup requires Organisation Units and assigned Users. Please check whether they created.",
      backToMaintenance: "Go to Maintenance app",
      trackedEntityType: "Tracked Entity Type",
      systemID: "COD System ID (auto-generated)",
      defaultAttribute: "Default attributes",
      otherAttributes: "Other attributes",
      otherAvailableAttributes: "Available attributes",
      otherSelectedAttributes: "Selected attributes",
      defaultDEsInFrameA: "Default data elements (cannot be changed)",
      otherSectionsInFrameA: "Other sections",
      availableDEs: "Available data elements",
      selectedDEs: "Selected data elements",
      defaultSectionsInFrameB: "Default sections",
      otherSectionsInFrameB: "Other sections",
      OULevel: "Organisation unit level:",
      OUGroup: "Organisation unit group:",
      deselect: "Deselect",
      selectAll: "Select all",
      deselectAll: "Deselect all",
      adminGroup: "ADMIN GROUP",
      captureGroup: "CAPTURE GROUP",
      viewGroup: "VIEW GROUP",
      installing: "Installing the COD app",
      waitForInstalling: "Please wait untill the process done.",
      importAttributes: "Importing Attributes",
      importOptionSets: "Importing Option Sets",
      importTrackedEntityAttributes: "Importing Tracked Entity Attributes",
      importTrackedEntityTypes: "Importing Tracked Entity Types",
      importDataElements: "Importing Data Elements",
      importPrograms: "Importing Programs",
      importProgramStages: "Importing Program Stages",
      importProgramStageSections: "Importing Program Stage Sections",
      importProgramIndicators: "Importing Program Indicators",
      importIndicators: "Importing Indicators",
      importOptions: "Importing Options",
      complete: "Install Complete",
      programID: "The program id:",
      defaultCertificate: "Default",
      customCertificate: "Custom",
      certificateTitle: "Title",
      certificateLogo: "Logo",
      upload: "Upload",
      addItemBody: "Add an item to Body",
      addItemFooter: "Add an item to Footer",
      reviewDefaultCertificate: "Review",
      certificateAddItemTitle: "Add an item to",
      back: "Back",
      install: "Install",
      selectName: "Section name",
      selectNameOption: "* Select Name Option",
      selectTrackedEntityType: "Select tracked entity type",
      femaleOption: "* Female Option",
      selectOption: "Select option",
      noname: "No Name",
      fullname: "Fullname",
      firstlastname: "First & Last Name",
      firstmiddlelastname: "First, Middle & Last Name",
      firstname: "First Name",
      middlename: "Middle Name",
      lastname: "Last Name",
      // Entry Form
      print: "Print",
      close: "Close",
      reportedDate: "Reported Date",
      incidentDate: "Date of Death",
      printCertificate: "Certificate",
      reasonLeadingToDeath: "Disease or condition directly leading to death",
      timeFromOnsetToDeath: "Time from onset to death",
      underlying: "Underlying",
      immediate: "Immediate",
      reportDirection:
        "Report chain of events in 'due to' order (B - C - D) if applicable. State the underlying cause on the lowest used line, and tick the checkbox for 'Underlying'",
      dueTo: "Due to",
      otherReasonLeadingToDeath:
        "Other significant conditions contributing to death (time intervals can be included in brackets after the condition)",
      underlyingCOD: "Underlying cause of death",
      icd11Chapter: "ICD-11 Chapter",
      icd11Grouping: "ICD-11 Grouping",
      icd11: "ICD-11",
      surgeryWithin4months: "Was surgery performed within the last 4 weeks?",
      surgeryDate: "If yes, please specify date of surgery",
      surgeryReason:
        "If yes, please specify reason for surgery (disease or condition)",
      autopsy: "Was an autopsy requested?",
      findings: "If yes, were the findings used in the certification?",
      posisoning: "If external cause or posisoning, date of injury",
      describe:
        "Please describe how external cause occurred (if poisoning, please specify poisoning agent)",
      occurrencePlace: "Place of occurrence of the external cause",
      occurrenceSpecifyPlace:
        "Specify place of occurence of the external cause",
      pregnant: "Multiple pregnancy?",
      stillborn: "Stillborn?",
      hoursSurvived: "If death within 24hrs specify number of hours survived",
      birthWeight: "Birth weight (in grams)",
      pregnantWeeks: "Number of completed weeks of pregnancy",
      motherAge: "Age of mother (in years)",
      perinatal:
        "If death was perinatal, state conditions of mother that affected the fetus and newborn",
      maternal: "Maternal death",
      pregnancyLastYear:
        "For women, was the deceased pregnant within the past year?",
      timePregnancy: "If yes, time from pregnancy",
      pregnancyToDeath: "Did the pregnancy contribute to the death?",
      warning: "Warning!!!",
      clear: "Clear",
      stay: "Stay",
      leave: "Leave",
      compute: "Compute",
      changes_you_made_may_not_be_saved: "Changes you made may not be saved.",
      note_WHO_digital_open_rule_integrated_cause_of_death_selection_Doris: "* Note: WHO Digital Open Rule Integrated cause of death Selection (DORIS)",
      icd11_tool: "ICD 11 Coding Tool",
      your_selection: "Your selection is:",
      type_to_start_searching: "Type for start searching",
      // Dashboard
      mortalityFromBoardCausesOfDeath: "Mortality from broad causes of death",
      proportionOfDeathFromBroadCausesAll:
        "Proportion of deaths from broad causes (all sexes, all ages)",
      distributionOfDeathByBroadCausesAndAgeGroups:
        "Distribution of deaths by broad causes and age groups",
      overViewDistributionOfDeath:
        "Overview of the distribution of causes of total deaths grouped by category",
      clickOnBubleForDetail: "Click on each buble for details",
      communicable: "communicable",
      nonCommunicable: "non-communicable",
      externalCauses: "external causes",
      illDefined: "ill-defined",
      numberOfDeathBy: "Number of Death by",
      tuberculosis: "Tuberculosis",
      sexuallyTransmittedDiseasesExcludingHiv:
        "Sexually transmitted diseases excluding HIV",
      hiv: "HIV",
      diarrhoealDiseases: "Diarrhoeal diseases",
      pertussis: "Pertussis",
      poliomyelitis: "Poliomyelitis",
      diphtheria: "Diphtheria",
      measles: "Measles",
      tetanus: "Tetanus",
      meningitis: "Meningitis",
      hepatitisB: "Hepatitis B",
      hepatitisC: "Hepatitis C",
      malaria: "Malaria",
      tropicalClusterDiseases: "Tropical-cluster diseases",
      lowerRespiratoryInfections: "Lower respiratory infections",
      maternalConditions: "Maternal conditions",
      conditionsArisingDuringThePerinatalPeriod:
        "Conditions arising during the perinatal period",
      nutritionalDeficiencies: "Nutritional deficiencies",
      mouthAndOropharynxCancers: "Mouth and oropharynx cancers",
      oesophagusCancer: "Oesophagus cancer",
      stomachCancer: "Stomach cancer",
      colonAndRectumCancers: "Colon and rectum cancers",
      liverCancer: "Liver cancer",
      pancreasCancer: "Pancreas cancer",
      tracheaBronchusAndLungCancers: "Trachea, bronchus and lung cancers",
      melanomaAndOtherSkinCancers: "Melanoma and other skin cancers",
      breastCancer: "Breast cancer",
      cervixUteriCancer: "Cervix uteri cancer",
      corpusUteriCancer: "Corpus uteri cancer",
      ovaryCancer: "Ovary cancer",
      prostateCancer: "Prostate cancer",
      bladderCancer: "Bladder cancer",
      lymphomasAndMultipleMyeloma: "Lymphomas and multiple myeloma",
      leukaemia: "Leukaemia",
      alzheimerAndOtherDementias: "Alzheimer and other dementias",
      parkinsonDisease: "Parkinson disease",
      hypertensiveDisease: "Hypertensive disease",
      ischaemicHeartDisease: "Ischaemic heart disease",
      cerebrovascularDisease: "Cerebrovascular disease",
      chronicObstructivePulmonaryDisease:
        "Chronic obstructive pulmonary disease",
      asthma: "Asthma",
      digestiveDiseases: "Digestive diseases",
      genitoUrinaryDiseases: "Genito-urinary diseases",
      congenitalAnomalies: "Congenital anomalies",
      roadTrafficAccidents: "Road traffic accidents",
      suicide: "Suicide",
      homicide: "Homicide",
      mortaliryFromNcds: "Mortality from NCDs",
      malignantNeoplasms: "Malignant neoplasms",
      diabetesMellitus: "Diabetes mellitus",
      cardiovascularDiseases: "Cardiovascular diseases",
      respiratoryDiseases: "Respiratory diseases",
      numberOfDeathBySexAndAge: "Number of deaths by sex and age",
      numberOfDeathByMonth: "Number of deaths by month",
      pneumonia: "Pneumonia",
      otherDiseasesOfTheDigestiveSystem:
        "Other diseases of the digestive system",
      otherDirectObstetricDeaths: "Other direct obstetric deaths",
      prematurity: "Prematurity",
      symptomsSignAndAbnormalClinicalAndLaboratoryFindingsNotElsewhereClassified:
        "Symptoms sign and abnormal clinical and laboratory findings, not elsewhere classified",
      otherAndUnspecifiedCongenitalMalformations:
        "Other and unspecified congenital malformations",
      otherAndUnspecifiedPerinatalConditions:
        "Other and unspecified perinatal conditions",
      intrauterineHypoxiaAndBirthAsphyxia:
        "Intrauterine hypoxia and birth asphyxia",
      name: "Name",
      points: "Points",
      certainInfectiousOrParasiticDiseases:
        "Certain infectious or parasitic diseases",
      neoplasms: "Neoplasms",
      diseasesOfTheBloodOrBloodFormingOrgans:
        "Diseases of the blood or blood-forming organs",
      diseasesOfTheImmuneSystem: "Diseases of the immune system",
      endocrineNutritionalOrMetabolicDiseases:
        "Endocrine, nutritional or metabolic diseases",
      mentalBehaviouralOrNeurodevelopmentalDisorders:
        "Mental, behavioural or neurodevelopmental disorders",
      sleepWakeDisorders: "Sleep-wake disorders",
      diseasesOfTheNervousSystem: "Diseases of the nervous system",
      diseasesOfTheVisualSystem: "Diseases of the visual system",
      diseasesOfTheEarOrMastoidProcess:
        "Diseases of the ear or mastoid process",
      diseasesOfTheCirculatorySystem: "Diseases of the circulatory system",
      diseasesOfTheRespiratorySystem: "Diseases of the respiratory system",
      diseasesOfTheDigestiveSystem: "Diseases of the digestive system",
      diseasesOfTheSkin: "Diseases of the skin",
      diseasesOfTheMusculoskeletalSystemOrConnectiveTissue:
        "Diseases of the musculoskeletal system or connective tissue",
      diseasesOfTheGenitourinarySystem: "Diseases of the genitourinary system",
      conditionsRelatedToSexualHealth: "Conditions related to sexual health",
      pregnancyChildbirthOrThePuerperium:
        "Pregnancy, childbirth or the puerperium",
      certainConditionsOriginatingInThePerinatalPeriod:
        "Certain conditions originating in the perinatal period",
      developmentalAnomalies: "Developmental anomalies",
      symptomsSignsOrClinicalFindingsNotElsewhereClassified:
        "Symptoms, signs or clinical findings, not elsewhere classified",
      injuryPoisoningOrCertainOtherConsequencesOfExternalCauses:
        "Injury, poisoning or certain other consequences of external causes",
      externalCausesOfMorbidityOrMortality:
        "External causes of morbidity or mortality",
      factorsInfluencingHealthStatusOrContactWithHealthServices:
        "Factors influencing health status or contact with health services",
      codesForSpecialPurposes: "Codes for special purposes",
      numberOfMalariaDeathsByMonth: "Number of malaria deaths by month",
      numberOfMalariaDeathsPlaceOfDeath:
        "Number of malaria deaths - place of death",
      numberOfMalariaDeathsBySex: "Number of malaria deaths by sex",
      numberOfMalariaDeathsBySexAndDetailedAgeGroup:
        "Number of malaria deaths by sex and detailed age-group",
      numberOfMalariaDeathsAndPercentOfAllMalariaDeathsByBroadAgeGroup:
        "Number of malaria deaths and percent of all malaria deaths by broad age-group",
      numberOfMalariaDeathsComparedWithOtherCausesOfDeaths:
        "Number of malaria deaths compared with other causes of deaths",
      percentOfTotalMalariaDeaths: "% of total malaria deaths",
      numberOfMalariaDeaths: "Number of malaria deaths",
      otherCauses: "Other causes",
      numberOfTuberculosisDeathsByMonth:
        "Number of tuberculosis deaths by month",
      numberOfTuberculosisDeathsByPlaceOfDeath:
        "Number of tuberculosis deaths by place of death",
      numberOfTuberculosisDeathsBySex: "Number of tuberculosis deaths by sex",
      numberOfTuberculosisDeathsBySexAndDetailedAgeGroup:
        "Number of tuberculosis deaths by sex and detailed age-group",
      numberOfTuberculosisDeathsAndPercentOfAllTuberculosisDeathsByBroadAgeGroup:
        "Number of tuberculosis deaths and percent of all tuberculosis deaths by broad age-group",
      numberOfTuberculosisDeathsComparedWithOtherCausesOfDeaths:
        "Number of tuberculosis deaths compared with other causes of deaths",
      percentOfTotalTuberculosisDeaths: "% of total tuberculosis deaths",
      numberOfTuberculosisDeaths: "Number of tuberculosis deaths",
      numberOfAidsDeathsByMonth: "Number of AIDS deaths by month",
      numberOfAidsDeathsPlaceOfDeath: "Number of AIDS deaths - place of death",
      numberOfAidsDeathsBySex: "Number of AIDS deaths by sex",
      numberOfAidsDeathsBySexAndDetailedAgeGroup:
        "Number of AIDS deaths by sex and detailed age-group",
      numberOfAidsDeathsAndPercentOfAllAidsDeathsByBroadAgeGroup:
        "Number of AIDS deaths and percent of all AIDS deaths by broad age-group",
      numberOfAidsDeathsComparedWithOtherCausesOfDeaths:
        "Number of AIDS deaths compared with other causes of deaths",
      aids: "AIDS",
      percentOfTotalAidsDeaths: "% of total AIDS deaths",
      numberOfAidsDeaths: "Number of AIDS deaths",
      tb: "TB",
      other: "Other",
      numberOfDeath: "% of Deaths",
      percentOfTotalDeathAllCauses: "% of total deaths all causes",
      numberOfDeathsFromTbAidsMalariaAndOtherCausesAgeGroup:
        "Number of deaths from TB, AIDS, malaria and other causes - age-group",
      distributionOfDeathsByTbAidsAndMalariaBySexAndAge:
        "Distribution of deaths by TB, AIDS and malaria by sex and age",
      percentageOfDeathsFromTbAidsAndMalariaOutOfAllDeathsFromCommunicableDiseases:
        "Percentage of deaths from TB, AIDS and malaria out of all deaths from communicable diseases",
      numberOfTbAndAidsDeathsAndPercentOfTheseDeathsOutOfAllDeaths15YearsAndAbove:
        "Number of TB and AIDS deaths  and percent of these  deaths out of all deaths: 15 years and above",
      //Search
      list: "List",
      uniqueField: "Unique Field",
      searchableFields: "Searchable fields",
      //Help
      help: "Help",
      userManual: "User Manual",
      causeOfDeathVersion: "Cause of Death App (version 1.0.1)",
      appFeatures: "App features",
      installation: "Installation",
    },
  },
};
export default resources;
