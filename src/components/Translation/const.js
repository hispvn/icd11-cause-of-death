const LANGUAGES = [
  { key: "en", label: "English" },
  { key: "fr", label: "French" },
  { key: "ar", label: "Arabic" }
];

const TRANSLATION_KEYS_MAPPING = {
  dataEntry: [
    "causeOfDeathApp",
    "selectOrgUnit",
    "newRegistration",
    "search",
    "list",
    "exit",
    "page",
    "profile",
    "clear",
    "cancel",
    "exitApp",
    "orgUnit",
    "certificate",
    "causeOfDeath",
    "frameA",
    "frameB",
    "medicalData",
    "results",
    "surgery",
    "mannerOfDeath",
    "fetalOrInfantDeath",
    "lastUpdated",
    "inputSearchText",
    "select",
    "triggerDesc",
    "triggerAsc",
    "cancelSort",
    "print",
    "close",
    "reportedDate",
    "incidentDate",
    "printCertificate",
    "reasonLeadingToDeath",
    "timeFromOnsetToDeath",
    "underlying",
    "immediate",
    "reportDirection",
    "dueTo",
    "otherReasonLeadingToDeath",
    "underlyingCOD",
    "icd11Chapter",
    "icd11Grouping",
    "icd11",
    "surgeryWithin4months",
    "surgeryDate",
    "surgeryReason",
    "autopsy",
    "findings",
    "posisoning",
    "describe",
    "occurrencePlace",
    "occurrenceSpecifyPlace",
    "pregnant",
    "stillborn",
    "hoursSurvived",
    "birthWeight",
    "pregnantWeeks",
    "motherAge",
    "perinatal",
    "maternal",
    "pregnancyLastYear",
    "timePregnancy",
    "pregnancyToDeath",
    "warning",
    "changes_you_made_may_not_be_saved",
    "stay",
    "leave",
    "compute",
    "note_WHO_digital_open_rule_integrated_cause_of_death_selection_Doris",
    "icd11_tool",
    "your_selection",
    "type_to_start_searching",
    "uniqueField",
    "searchableFields"
  ],
  anacodExport: ["pleaseSelectYear", "run", "anacodExportExcel"],
  dashboard: [
    "mortalityLevels",
    "mortalityFromBroadCausesOfDeath",
    "mortalityByCauseAgeAndSex",
    "mortalityFromNcds",
    "mostFrequentCauseOfDeath",
    "deathsByIcd11Chapter",
    "mortalityFromBoardCausesOfDeath",
    "proportionOfDeathFromBroadCausesAll",
    "distributionOfDeathByBroadCausesAndAgeGroups",
    "overViewDistributionOfDeath",
    "clickOnBubleForDetail",
    "communicable",
    "nonCommunicable",
    "externalCauses",
    "illDefined",
    "numberOfDeathBy",
    "tuberculosis",
    "sexuallyTransmittedDiseasesExcludingHiv",
    "hiv",
    "diarrhoealDiseases",
    "pertussis",
    "poliomyelitis",
    "diphtheria",
    "measles",
    "tetanus",
    "meningitis",
    "hepatitisB",
    "hepatitisC",
    "malaria",
    "tropicalClusterDiseases",
    "lowerRespiratoryInfections",
    "maternalConditions",
    "conditionsArisingDuringThePerinatalPeriod",
    "nutritionalDeficiencies",
    "mouthAndOropharynxCancers",
    "oesophagusCancer",
    "stomachCancer",
    "colonAndRectumCancers",
    "liverCancer",
    "pancreasCancer",
    "tracheaBronchusAndLungCancers",
    "melanomaAndOtherSkinCancers",
    "breastCancer",
    "cervixUteriCancer",
    "corpusUteriCancer",
    "ovaryCancer",
    "prostateCancer",
    "bladderCancer",
    "lymphomasAndMultipleMyeloma",
    "leukaemia",
    "alzheimerAndOtherDementias",
    "parkinsonDisease",
    "hypertensiveDisease",
    "ischaemicHeartDisease",
    "cerebrovascularDisease",
    "chronicObstructivePulmonaryDisease",
    "asthma",
    "digestiveDiseases",
    "genitoUrinaryDiseases",
    "congenitalAnomalies",
    "roadTrafficAccidents",
    "suicide",
    "homicide",
    "mortaliryFromNcds",
    "malignantNeoplasms",
    "diabetesMellitus",
    "cardiovascularDiseases",
    "respiratoryDiseases",
    "numberOfDeathBySexAndAge",
    "numberOfDeathByMonth",
    "pneumonia",
    "otherDiseasesOfTheDigestiveSystem",
    "otherDirectObstetricDeaths",
    "prematurity",
    "symptomsSignAndAbnormalClinicalAndLaboratoryFindingsNotElsewhereClassified",
    "otherAndUnspecifiedCongenitalMalformations",
    "otherAndUnspecifiedPerinatalConditions",
    "intrauterineHypoxiaAndBirthAsphyxia",
    "name",
    "points",
    "certainInfectiousOrParasiticDiseases",
    "neoplasms",
    "diseasesOfTheBloodOrBloodFormingOrgans",
    "diseasesOfTheImmuneSystem",
    "endocrineNutritionalOrMetabolicDiseases",
    "mentalBehaviouralOrNeurodevelopmentalDisorders",
    "sleepWakeDisorders",
    "diseasesOfTheNervousSystem",
    "diseasesOfTheVisualSystem",
    "diseasesOfTheEarOrMastoidProcess",
    "diseasesOfTheCirculatorySystem",
    "diseasesOfTheRespiratorySystem",
    "diseasesOfTheDigestiveSystem",
    "diseasesOfTheSkin",
    "diseasesOfTheMusculoskeletalSystemOrConnectiveTissue",
    "diseasesOfTheGenitourinarySystem",
    "conditionsRelatedToSexualHealth",
    "pregnancyChildbirthOrThePuerperium",
    "certainConditionsOriginatingInThePerinatalPeriod",
    "developmentalAnomalies",
    "symptomsSignsOrClinicalFindingsNotElsewhereClassified",
    "injuryPoisoningOrCertainOtherConsequencesOfExternalCauses",
    "externalCausesOfMorbidityOrMortality",
    "factorsInfluencingHealthStatusOrContactWithHealthServices",
    "codesForSpecialPurposes",
    "numberOfMalariaDeathsByMonth",
    "numberOfMalariaDeathsPlaceOfDeath",
    "numberOfMalariaDeathsBySex",
    "numberOfMalariaDeathsBySexAndDetailedAgeGroup",
    "numberOfMalariaDeathsAndPercentOfAllMalariaDeathsByBroadAgeGroup",
    "numberOfMalariaDeathsComparedWithOtherCausesOfDeaths",
    "percentOfTotalMalariaDeaths",
    "numberOfMalariaDeaths",
    "otherCauses",
    "numberOfTuberculosisDeathsByMonth",
    "numberOfTuberculosisDeathsByPlaceOfDeath",
    "numberOfTuberculosisDeathsBySex",
    "numberOfTuberculosisDeathsBySexAndDetailedAgeGroup",
    "numberOfTuberculosisDeathsAndPercentOfAllTuberculosisDeathsByBroadAgeGroup",
    "numberOfTuberculosisDeathsComparedWithOtherCausesOfDeaths",
    "percentOfTotalTuberculosisDeaths",
    "numberOfTuberculosisDeaths",
    "numberOfAidsDeathsByMonth",
    "numberOfAidsDeathsPlaceOfDeath",
    "numberOfAidsDeathsBySex",
    "numberOfAidsDeathsBySexAndDetailedAgeGroup",
    "numberOfAidsDeathsAndPercentOfAllAidsDeathsByBroadAgeGroup",
    "numberOfAidsDeathsComparedWithOtherCausesOfDeaths",
    "aids",
    "percentOfTotalAidsDeaths",
    "numberOfAidsDeaths",
    "tb",
    "other",
    "numberOfDeath",
    "percentOfTotalDeathAllCauses",
    "numberOfDeathsFromTbAidsMalariaAndOtherCausesAgeGroup",
    "distributionOfDeathsByTbAidsAndMalariaBySexAndAge",
    "percentageOfDeathsFromTbAidsAndMalariaOutOfAllDeathsFromCommunicableDiseases",
    "numberOfTbAndAidsDeathsAndPercentOfTheseDeathsOutOfAllDeaths15YearsAndAbove",
  ],
  administration: [
    "step1Installation",
    "step2Attribute",
    "step3FrameA",
    "step4FrameB",
    "step5OUs",
    "step6Users",
    "step7Review",
    "errorMissingTET",
    "step1Attributes",
    "step2Certificate",
    "saveSuccessful",
    "selectionTitle",
    "globalICDTool",
    "otherICDTool",
    "defaultInstallation",
    "defaultInstallationInfo",
    "customInstallation",
    "customInstallationInfo",
    "installWithDocker",
    "installationWarning",
    "installationWarningTitle",
    "backToMaintenance",
    "trackedEntityType",
    "systemID",
    "defaultAttribute",
    "otherAttributes",
    "otherAvailableAttributes",
    "otherSelectedAttributes",
    "defaultDEsInFrameA",
    "otherSectionsInFrameA",
    "availableDEs",
    "selectedDEs",
    "add",
    "reload",
    "defaultSectionsInFrameB",
    "otherSectionsInFrameB",
    "OULevel",
    "OUGroup",
    "deselect",
    "selectAll",
    "deselectAll",
    "adminGroup",
    "captureGroup",
    "viewGroup",
    "installing",
    "waitForInstalling",
    "importAttributes",
    "importOptionSets",
    "importTrackedEntityAttributes",
    "importTrackedEntityTypes",
    "importDataElements",
    "importPrograms",
    "importProgramStages",
    "importProgramStageSections",
    "importProgramIndicators",
    "importIndicators",
    "importOptions",
    "complete",
    "programID",
    "defaultCertificate",
    "customCertificate",
    "certificateTitle",
    "certificateLogo",
    "upload",
    "addItemBody",
    "addItemFooter",
    "reviewDefaultCertificate",
    "certificateAddItemTitle",
    "back",
    "install",
    "next",
    "save",
    "selectName",
    "selectNameOption",
    "selectTrackedEntityType",
    "femaleOption",
    "selectOption",
    "noname",
    "fullname",
    "firstlastname",
    "firstmiddlelastname",
    "firstname",
    "middlename",
    "lastname",
    "help",
    "userManual",
    "causeOfDeathVersion",
    "appFeatures",
    "installation"
  ],
  translation: [
    "translation",
    "dataEntry",
    "anacodExport",
    "dashboard",
    "administration",
    "addLanguage",
    "pleaseSelectLanguage",
  ],
};

const TRANSLATIONS = [
  {
    key: "selectOrgUnit",
    translation: {
      ar: "حدد الوحدة التنظيمية",
      en: "Select organisation unit",
      fr: "Sélectionnez l'unité d'organisation"
    }
  },
  {
    key: "newRegistration",
    translation: {
      ar: "تسجيل جديد",
      en: "New Registration",
      fr: " Nouvelle inscription"
    }
  },
  {
    key: "search",
    translation: { ar: "بحث", en: "Search", fr: "Chercher" }
  },
  {
    key: "exit",
    translation: { ar: "خروج", en: "Exit", fr: "Sortir" }
  },
  {
    key: "page",
    translation: { ar: "صفحة", en: "Page", fr: "Page" }
  },
  {
    key: "profile",
    translation: {
      ar: "الملف الشخصي",
      en: "Profile",
      fr: "Le profil"
    }
  },
  {
    key: "save",
    translation: { ar: "حفظ", en: "Save", fr: "Sauver" }
  },
  {
    key: "cancel",
    translation: { ar: "إلغاء", en: "Cancel", fr: "Annuler" }
  },
  {
    key: "certificate",
    translation: { ar: "شهادة", en: "Certificate", fr: "Certificat" }
  },
  {
    key: "causeOfDeath",
    translation: {
      ar: "سبب الوفاة",
      en: "Cause of Death",
      fr: "Cause de décès"
    }
  },
  {
    key: "frameA",
    translation: { ar: "إطار أ", en: "Frame A", fr: "Cadre A" }
  },
  {
    key: "frameB",
    translation: { ar: "إطار ب", en: "Frame B", fr: "Cadre B" }
  },
  {
    key: "medicalData",
    translation: {
      ar: "البيانات الطبية",
      en: "Medical data",
      fr: "Données médicales"
    }
  },
  {
    key: "results",
    translation: { ar: "النتائج", en: "Results", fr: "Résultats" }
  },
  {
    key: "surgery",
    translation: {
      ar: "عملية جراحية",
      en: "Surgery",
      fr: "Opération"
    }
  },
  {
    key: "mannerOfDeath",
    translation: {
      ar: "طريقة الوفاة",
      en: "Manner of Death",
      fr: "Manière de mourir"
    }
  },
  {
    key: "fetalOrInfantDeath",
    translation: {
      ar: "موت الجنين أو الرضيع",
      en: "Fetal of Infant Death",
      fr: "Mort fœtale du nourrisson"
    }
  },
  {
    key: "pleaseSelectYear",
    translation: {
      ar: "الرجاء تحديد السنة",
      en: "Please select year",
      fr: "Veuillez sélectionner l'année"
    }
  },
  {
    key: "run",
    translation: { ar: "تنفيذ", en: "RUN", fr: "COURS" }
  },
  {
    key: "anacodExportExcel",
    translation: {
      ar: "تصدير تحليل الوفيات وأسبابها بصيغة إكسل",
      en: "Anacod Export (CSV)",
      fr: "Export Anacode (CSV)"
    }
  },
  {
    key: "mortalityLevels",
    translation: {
      ar: "معدل الوفيات",
      en: "Mortality levels",
      fr: "Niveaux de mortalité"
    }
  },
  {
    key: "mortalityFromBroadCausesOfDeath",
    translation: {
      ar: "الوفيات الناتجة عن أسباب الوفاه الرئيسية",
      en: "Mortality from broad causes of death",
      fr: "Mortalité due aux causes générales de décès"
    }
  },
  {
    key: "mortalityByCauseAgeAndSex",
    translation: {
      ar: "الوفيات حسب السبب والعمر والجنس",
      en: "Mortality by cause, age and sex",
      fr: "Mortalité par cause, âge et sexe"
    }
  },
  {
    key: "mortalityFromNcds",
    translation: {
      ar: "الوفيات من الأمراض غير المعدية",
      en: "Mortality from NCDs",
      fr: "Mortalité due aux MNT"
    }
  },
  {
    key: "mostFrequentCauseOfDeath",
    translation: {
      ar: "السبب الأكثر شيوعًا للوفاة",
      en: "Most frequent cause of death",
      fr: "Cause de décès la plus fréquente"
    }
  },
  {
    key: "deathsByIcd11Chapter",
    translation: {
      ar: "الوفيات حسب فصل التصنيف الدولي للأمراض، المراجعة الحادية عشر",
      en: "Deaths by ICD-11 Chapter",
      fr: "Deaths by ICD-11 Chapter"
    }
  },
  {
    key: "next",
    translation: { ar: "التالي", en: "Next", fr: "Suivante" }
  },
  {
    key: "femaleOption",
    translation: { ar: "خيار الأنثى", en: "* Female Option" }
  },
  {
    key: "add",
    translation: { ar: "إضافة", en: "Add", fr: "Ajouter" }
  },
  {
    key: "reload",
    translation: { ar: "إعادة تحميل", en: "Reload", fr: "Recharger" }
  },
  {
    key: "translation",
    translation: { ar: "ترجمة", en: "Translation", fr: "Traduction" }
  },
  {
    key: "dataEntry",
    translation: {
      ar: "إدخال البيانات",
      en: "Data Entry",
      fr: "Saisie des données"
    }
  },
  {
    key: "anacodExport",
    translation: {
      ar: "تصدير تحليل الوفيات وأسبابها",
      en: "Anacod Export",
      fr: "Exportation d'Anacod"
    }
  },
  {
    key: "dashboard",
    translation: {
      ar: "لوحة المعلومات",
      en: "Dashboard",
      fr: "Tableau de bord"
    }
  },
  {
    key: "administration",
    translation: {
      ar: "إدارة",
      en: "Administration",
      fr: "Administration"
    }
  },
  {
    key: "exitApp",
    translation: {
      ar: "الخروج من التطبيق",
      en: "Exit App",
      fr: "Quitter l'application"
    }
  },
  {
    key: "orgUnit",
    translation: {
      ar: "الوحدة التنظيمية",
      en: "Org Unit",
      fr: "Unité organisationnelle"
    }
  },
  {
    key: "addLanguage",
    translation: {
      ar: "إضافة لغة",
      en: "Add Language",
      fr: "Ajouter une langue"
    }
  },
  {
    key: "pleaseSelectLanguage",
    translation: {
      ar: "الرجاء تحديد لغة",
      en: "Please select a language",
      fr: "Veuillez sélectionner une langue"
    }
  },
  {
    key: "lastUpdated",
    translation: {
      ar: "آخر تحديث",
      en: "Last updated",
      fr: "Dernière mise à jour"
    }
  },
  {
    key: "causeOfDeathApp",
    translation: {
      ar: "تطبيق أسباب الوفاة",
      en: "Cause Of Death App",
      fr: " Application Cause de décès"
    }
  },
  {
    key: "inputSearchText",
    translation: {
      ar: "إدخال نص البحث",
      en: "Input search text",
      fr: "Saisir le texte de recherche"
    }
  },
  {
    key: "select",
    translation: { ar: "حدد", en: "Select", fr: "Sélectionner" }
  },
  {
    key: "triggerDesc",
    translation: {
      ar: "انقر للترتيب تنازليًا",
      en: "Click to sort descending",
      fr: "Cliquez pour trier par ordre décroissant"
    }
  },
  {
    key: "triggerAsc",
    translation: {
      ar: "انقر للترتيب تصاعدياً",
      en: "Click to sort ascending",
      fr: "Cliquez pour trier par ordre croissant"
    }
  },
  {
    key: "cancelSort",
    translation: {
      ar: "انقر لإلغاء الترتيب",
      en: "Click to cancel sorting",
      fr: "Cliquez pour annuler le tri"
    }
  },
  {
    key: "step1Installation",
    translation: {
      ar: "1 - التثبيت",
      en: "1 - Installation",
      fr: "1 - Mise en place"
    }
  },
  {
    key: "step2Attribute",
    translation: {
      ar: "2 - السمات",
      en: "2 - Attributes",
      fr: "2 - Attributs"
    }
  },
  {
    key: "step3FrameA",
    translation: {
      ar: "3 - إطار أ",
      en: "3 - Frame A",
      fr: "3 - Cadre A"
    }
  },
  {
    key: "step4FrameB",
    translation: {
      ar: "4 - إطار ب",
      en: "4 - Frame B",
      fr: "4 - Cadre B"
    }
  },
  {
    key: "step5OUs",
    translation: {
      ar: "5 - تعيين وحدات تنظيمية",
      en: "5 - Assign OrgUnits",
      fr: "5 - Attribuer des unités d'organisation"
    }
  },
  {
    key: "step6Users",
    translation: {
      ar: "6 - تعيين مستخدمين",
      en: "6 - Assign Users",
      fr: "6 - Attribuer des utilisateurs"
    }
  },
  {
    key: "step7Review",
    translation: {
      ar: "7 - مراجعة وإنهاء",
      en: "7 - Review & Finish",
      fr: "7 - Réviser et terminer"
    }
  },
  {
    key: "errorMissingTET",
    translation: {
      ar: "خطأ، يرجى تحديد كل السمات الافتراضية ونوع الكيان المتعقب.",
      en: "ERROR Please select ALL default attributes and Tracked Entity Type.",
      fr: "ERREUR Veuillez sélectionner TOUS les attributs par défaut et le type d'entité suivie."
    }
  },
  {
    key: "step1Attributes",
    translation: {
      ar: "1 - السمات",
      en: "1 - Attributes",
      fr: "1 - Attributs"
    }
  },
  {
    key: "step2Certificate",
    translation: {
      ar: "2 - الشهادة",
      en: "2 - Certificate",
      fr: "2 - Certificat"
    }
  },
  {
    key: "saveSuccessful",
    translation: {
      ar: "تم الحفظ بنجاح!",
      en: "Successfully Save!",
      fr: "Enregistrer avec succès!"
    }
  },
  {
    key: "selectionTitle",
    translation: {
      ar: "تثبيت حزمة الشهادة الطبية لأسباب الوفاة الخاصة بمنظمة الصحة العالمية",
      en: "INSTALLATION OF WHO MCCD PACKAGE",
      fr: "INSTALLATION DU PACKAGE WHO MCCD"
    }
  },
  {
    key: "globalICDTool",
    translation: {
      ar: "استخدم رابط أداة التصنيف الدولي للأمراض الخاصة بمنظمة الصحة العالمية",
      en: "Use global WHO ICD Tool url",
      fr: "Utiliser l'URL de l'outil ICD global de l'OMS"
    }
  },
  {
    key: "otherICDTool",
    translation: {
      ar: "استخدم رابط آخر لأداة التصنيف الدولي للأمراض",
      en: "Use other ICD Tool url",
      fr: "Utiliser une autre URL de l'outil ICD"
    }
  },
  {
    key: "defaultInstallation",
    translation: {
      ar: "تثبيت افتراضي",
      en: "Default Installation",
      fr: "Installation par défaut"
    }
  },
  {
    key: "defaultInstallationInfo",
    translation: {
      ar: "استخدم برنامج الشهادة الطبية لأسباب الوفاة الافتراضي مع الحد الأدنى من الاعدادات",
      en: "Use default MCCOD program with minimum configurations",
      fr: "Utiliser le programme MCCOD par défaut avec des configurations minimales"
    }
  },
  {
    key: "customInstallation",
    translation: {
      ar: "تثبيت مخصص",
      en: "Custom Installation",
      fr: "Installation personnalisée"
    }
  },
  {
    key: "customInstallationInfo",
    translation: {
      ar: "استخدم برنامج الشهادة الطبية لأسباب الوفاة الافتراضي مع بيانات وصفية إضافية حسب حاجتك",
      en: "Use default MCCOD program with additional metadata as you need",
      fr: "Utilisez le programme MCCOD par défaut avec des métadonnées supplémentaires selon vos besoins"
    }
  },
  {
    key: "installWithDocker",
    translation: {
      ar: "كيفية تثبيت خادم واجهة برمجة التطبيقات الخاص بالتصنيف الدولي للأمراض، المراجعة الحادية عشر باستخدام دوكر:",
      en: "How to install ICD-11 API Server using Docker:",
      fr: "Comment installer le serveur API ICD-11 à l'aide de Docker:"
    }
  },
  {
    key: "installationWarning",
    translation: {
      ar: "تعذر على التطبيق بدء عملية التثبيت",
      en: "COD app could not start the installation process.",
      fr: "L'application COD n'a pas pu démarrer le processus d'installation."
    }
  },
  {
    key: "installationWarningTitle",
    translation: {
      ar: "يتطلب إعداد التطبيق وحدات تنظيمية وتعيين مستخدمين. يرجى التحقق مما إذا كانوا قد أنشأوا",
      en: "The app setup requires Organisation Units and assigned Users. Please check whether they created.",
      fr: "La configuration de l'application nécessite des unités organisationnelles et des utilisateurs affectés. Veuillez vérifier s'ils ont créé."
    }
  },
  {
    key: "backToMaintenance",
    translation: {
      ar: "انتقل إلى تطبيق الضبط",
      en: "Go to Maintenance app",
      fr: "Accédez à l'application Maintenance"
    }
  },
  {
    key: "trackedEntityType",
    translation: {
      ar: "نوع الكيان المتتبع",
      en: "Tracked Entity Type",
      fr: "Type d'entité suivie"
    }
  },
  {
    key: "systemID",
    translation: {
      ar: "الرقم التعريفي للنظام (يتم إنشاؤه تلقائياً)",
      en: "COD System ID (auto-generated)",
      fr: "ID système COD (généré automatiquement)"
    }
  },
  {
    key: "defaultAttribute",
    translation: {
      ar: "السمات الافتراضية",
      en: "Default attributes",
      fr: "Attributs par défaut"
    }
  },
  {
    key: "otherAttributes",
    translation: {
      ar: "سمات أخرى",
      en: "Other attributes",
      fr: "Autres attributs"
    }
  },
  {
    key: "otherAvailableAttributes",
    translation: {
      ar: "السمات المتاحة",
      en: "Available attributes",
      fr: "Attributs disponibles"
    }
  },
  {
    key: "otherSelectedAttributes",
    translation: {
      ar: "السمات المختارة",
      en: "Selected attributes",
      fr: "Attributs sélectionnés"
    }
  },
  {
    key: "defaultDEsInFrameA",
    translation: {
      ar: "عناصر البيانات الافتراضية (لا يمكن تغييرها)",
      en: "Default data elements (cannot be changed)",
      fr: "Éléments de données par défaut (ne peuvent pas être modifiés)"
    }
  },
  {
    key: "otherSectionsInFrameA",
    translation: {
      ar: "أقسام أخرى",
      en: "Other sections",
      fr: "Autres rubriques"
    }
  },
  {
    key: "availableDEs",
    translation: {
      ar: "عناصر البيانات المتاحة",
      en: "Available data elements",
      fr: "Éléments de données disponibles"
    }
  },
  {
    key: "selectedDEs",
    translation: {
      ar: "عناصر البيانات المختارة",
      en: "Selected data elements",
      fr: "Éléments de données sélectionnés"
    }
  },
  {
    key: "defaultSectionsInFrameB",
    translation: {
      ar: "الأقسام الافتراضية",
      en: "Default sections",
      fr: "Rubriques par défaut"
    }
  },
  {
    key: "otherSectionsInFrameB",
    translation: {
      ar: "أقسام أخرى",
      en: "Other sections",
      fr: "Autres rubriques"
    }
  },
  {
    key: "OULevel",
    translation: {
      ar: "مستوى الوحدة التنظيمية:",
      en: "Organisation unit level:",
      fr: "Niveau de l'unité d'organisation:"
    }
  },
  {
    key: "OUGroup",
    translation: {
      ar: "مجموعة الوحدة التنظيمية:",
      en: "Organisation unit group:",
      fr: "Groupe d'unités d'organisation:"
    }
  },
  {
    key: "deselect",
    translation: {
      ar: "إلغاء تحديد",
      en: "Deselect",
      fr: "Désélectionner"
    }
  },
  {
    key: "selectAll",
    translation: {
      ar: "تحديد الكل",
      en: "Select all",
      fr: "Tout sélectionner"
    }
  },
  {
    key: "deselectAll",
    translation: {
      ar: "إلغاء تحديد الكل",
      en: "Deselect all",
      fr: "Tout déselectionner"
    }
  },
  {
    key: "adminGroup",
    translation: {
      ar: "مجموعة الإدارة",
      en: "ADMIN GROUP",
      fr: "GROUPE D'ADMINISTRATION"
    }
  },
  {
    key: "captureGroup",
    translation: {
      ar: "مجموعة الإدخال",
      en: "CAPTURE GROUP",
      fr: "GROUPE DE CAPTURE"
    }
  },
  {
    key: "viewGroup",
    translation: {
      ar: "مجموعة الاستعراض",
      en: "VIEW GROUP",
      fr: "VOIR LE GROUPE"
    }
  },
  {
    key: "installing",
    translation: {
      ar: "تثبيت تطبيق أسباب الوفاة",
      en: "Installing the COD app",
      fr: "22 / 5,000 Translation results Translation result Installation de l'application COD"
    }
  },
  {
    key: "waitForInstalling",
    translation: {
      ar: "يرجى الانتظار حتى تنتهي العملية.",
      en: "Please wait untill the process done.",
      fr: "Veuillez patienter jusqu'à ce que le processus soit terminé."
    }
  },
  {
    key: "importAttributes",
    translation: {
      ar: "استيراد السمات",
      en: "Importing Attributes",
      fr: "Importation d'attributs"
    }
  },
  {
    key: "importOptionSets",
    translation: {
      ar: "استيراد حزم الخيارات",
      en: "Importing Option Sets",
      fr: "Importation de jeux d'options"
    }
  },
  {
    key: "importTrackedEntityAttributes",
    translation: {
      ar: "استيراد سمات  الكيانات المتتبعة",
      en: "Importing Tracked Entity Attributes",
      fr: "Importation des attributs d'entité suivie"
    }
  },
  {
    key: "importTrackedEntityTypes",
    translation: {
      ar: "استيراد أنواع الكيانات المتتبعة",
      en: "Importing Tracked Entity Types",
      fr: "Importation de types d'entités suivies"
    }
  },
  {
    key: "importDataElements",
    translation: {
      ar: "استيراد عناصر البيانات",
      en: "Importing Data Elements",
      fr: "Importation d'éléments de données"
    }
  },
  {
    key: "importPrograms",
    translation: {
      ar: "استيراد البرامج",
      en: "Importing Programs",
      fr: "Importation de programmes"
    }
  },
  {
    key: "importProgramStages",
    translation: {
      ar: "استيراد مراحل البرامج",
      en: "Importing Program Stages",
      fr: "Importation des étapes du programme"
    }
  },
  {
    key: "importProgramStageSections",
    translation: {
      ar: "استيراد أقسام مراحل البرامج",
      en: "Importing Program Stage Sections",
      fr: "Importation de sections d'étape de programme"
    }
  },
  {
    key: "importProgramIndicators",
    translation: {
      ar: "استيراد مؤشرات البرامج",
      en: "Importing Program Indicators",
      fr: "Importation des indicateurs de programme"
    }
  },
  {
    key: "importIndicators",
    translation: {
      ar: "استيراد المؤشرات",
      en: "Importing Indicators",
      fr: "Importation d'indicateurs"
    }
  },
  {
    key: "importOptions",
    translation: {
      ar: "استيراد الخيارات",
      en: "Importing Options",
      fr: "Options d'importation"
    }
  },
  {
    key: "complete",
    translation: {
      ar: "اكتمل التثبيت",
      en: "Install Complete",
      fr: "Installation terminée"
    }
  },
  {
    key: "programID",
    translation: {
      ar: "معرف البرنامج:",
      en: "The program id:",
      fr: "L'identifiant du programme:"
    }
  },
  {
    key: "defaultCertificate",
    translation: { ar: "افتراضي", en: "Default", fr: "Défaut" }
  },
  {
    key: "customCertificate",
    translation: { ar: "مخصص", en: "Custom", fr: "Personnalisé" }
  },
  {
    key: "certificateTitle",
    translation: { ar: "عنوان", en: "Title", fr: "Titre" }
  },
  {
    key: "certificateLogo",
    translation: { ar: "شعار", en: "Logo", fr: "Logo" }
  },
  {
    key: "upload",
    translation: { ar: "رفع/تحميل", en: "Upload", fr: "Télécharger" }
  },
  {
    key: "addItemBody",
    translation: {
      ar: "إضافة عنصر إلى النص الأساسي",
      en: "Add an item to Body",
      fr: "Ajouter un élément au corps"
    }
  },
  {
    key: "addItemFooter",
    translation: {
      ar: "إضافة عنصر إلى التذييل",
      en: "Add an item to Footer",
      fr: "Ajouter un élément au pied de page"
    }
  },
  {
    key: "reviewDefaultCertificate",
    translation: { ar: "مراجعة", en: "Review", fr: "Passer en revue" }
  },
  {
    key: "certificateAddItemTitle",
    translation: {
      ar: "إضافة عنصر إلى",
      en: "Add an item to",
      fr: "Ajouter un élément à"
    }
  },
  {
    key: "print",
    translation: { ar: "طباعة", en: "Print", fr: "Imprimer" }
  },
  {
    key: "close",
    translation: { ar: "إغلاق", en: "Close", fr: "Proche" }
  },
  {
    key: "reportedDate",
    translation: {
      ar: "تاريخ الإبلاغ",
      en: "Reported Date",
      fr: "Date du rapport"
    }
  },
  {
    key: "incidentDate",
    translation: {
      ar: "تاريخ الوفاة",
      en: "Date of Death",
      fr: "Date de décès"
    }
  },
  {
    key: "printCertificate",
    translation: { ar: "شهادة", en: "Certificate", fr: "Certificat" }
  },
  {
    key: "reasonLeadingToDeath",
    translation: {
      ar: "مرض أو حالة تؤدي مباشرة إلى الوفاة",
      en: "Disease or condition directly leading to death",
      fr: "Maladie ou affection entraînant directement la mort"
    }
  },
  {
    key: "timeFromOnsetToDeath",
    translation: {
      ar: "الوقت من التشخيص إلى الوفاة",
      en: "Time from onset to death",
      fr: "Délai entre le début et la mort"
    }
  },
  {
    key: "underlying",
    translation: {
      ar: "السبب المؤدي الى الوفاة",
      en: "Underlying",
      fr: "Sous-jacent"
    }
  },
  {
    key: "immediate",
    translation: {
      ar: "سبب الوفاة المباشر",
      en: "Immediate",
      fr: "Immédiat"
    }
  },
  {
    key: "reportDirection",
    translation: {
      ar: "قم بالإبلاغ عن تسلسل الأحداث بالترتيب \"بسبب\" (ب - ج - د) إذا كان ذلك ممكنًا. حدد السبب الأساسي في أدنى سطر مستخدم ، وحدد مربع الاختيار لـ \"الأساسي\"",
      en: "Report chain of events in 'due to' order (B - C - D) if applicable. State the underlying cause on the lowest used line, and tick the checkbox for 'Underlying'",
      fr: "Indiquez la chaîne d'événements dans l'ordre « dû à » (B - C - D), le cas échéant. Indiquez la cause sous-jacente sur la ligne utilisée la plus basse et cochez la case \"Sous-jacent\""
    }
  },
  {
    key: "dueTo",
    translation: { ar: "بسبب", en: "Due to", fr: "En raison de" }
  },
  {
    key: "otherReasonLeadingToDeath",
    translation: {
      ar: "الحالات المهمة الأخرى التي تساهم في الوفاة (يمكن تضمين الفواصل الزمنية بين قوسين بعد الحالة)",
      en: "Other significant conditions contributing to death (time intervals can be included in brackets after the condition)",
      fr: "Autres affections importantes contribuant au décès (les intervalles de temps peuvent être inclus entre parenthèses après l'affection)"
    }
  },
  {
    key: "underlyingCOD",
    translation: {
      ar: "سبب الوفاة الأساسي",
      en: "Underlying cause of death",
      fr: "Cause sous-jacente du décès"
    }
  },
  {
    key: "icd11Chapter",
    translation: {
      ar: "فصل التصنيف الدولي للأمراض، المراجعة الحادية عشر",
      en: "ICD-11 Chapter",
      fr: "Chapitre CIM-11"
    }
  },
  {
    key: "icd11Grouping",
    translation: {
      ar: "مجموعات التصنيف الدولي للأمراض، المراجعة الحادية عشر",
      en: "ICD-11 Grouping",
      fr: "Groupement CIM-11"
    }
  },
  {
    key: "icd11",
    translation: {
      ar: "التصنيف الدولي للأمراض، المراجعة الحادية عشر",
      en: "ICD-11",
      fr: "CIM-11"
    }
  },
  {
    key: "surgeryWithin4months",
    translation: {
      ar: "هل أجريت الجراحة خلال الأسابيع الأربعة الماضية؟",
      en: "Was surgery performed within the last 4 weeks?",
      fr: "La chirurgie a-t-elle été pratiquée au cours des 4 dernières semaines ?"
    }
  },
  {
    key: "surgeryDate",
    translation: {
      ar: "إذا كانت الإجابة بنعم ، يرجى تحديد تاريخ الجراحة",
      en: "If yes, please specify date of surgery",
      fr: "Si oui, veuillez préciser la date de l'intervention"
    }
  },
  {
    key: "surgeryReason",
    translation: {
      ar: "إذا كانت الإجابة بنعم ، يرجى تحديد سبب الجراحة (المرض أو الحالة)",
      en: "If yes, please specify reason for surgery (disease or condition)",
      fr: "Si oui, veuillez préciser la raison de la chirurgie (maladie ou affection)"
    }
  },
  {
    key: "autopsy",
    translation: {
      ar: "هل تم طلب تشريح الجثة؟",
      en: "Was an autopsy requested?",
      fr: "Une autopsie a-t-elle été demandée ?"
    }
  },
  {
    key: "findings",
    translation: {
      ar: "إذا كانت الإجابة بنعم ، فهل استخدمت النتائج في الشهادة؟",
      en: "If yes, were the findings used in the certification?",
      fr: "Si oui, les résultats ont-ils été utilisés dans la certification ?"
    }
  },
  {
    key: "posisoning",
    translation: {
      ar: "إذا كان هناك سبب خارجي أو تسمم ، حدد تاريخ الإصابة",
      en: "If external cause or posisoning, date of injury",
      fr: "Si cause externe ou intoxication, date de la blessure"
    }
  },
  {
    key: "describe",
    translation: {
      ar: "يرجى وصف كيف حدث السبب الخارجي (في حالة التسمم ، يرجى تحديد مسبب التسمم)",
      en: "Please describe how external cause occurred (if poisoning, please specify poisoning agent)",
      fr: "Veuillez décrire comment la cause externe s'est produite (en cas d'empoisonnement, veuillez préciser l'agent empoisonnant)"
    }
  },
  {
    key: "occurrencePlace",
    translation: {
      ar: "مكان حدوث السبب الخارجي",
      en: "Place of occurrence of the external cause",
      fr: "Lieu de survenance de la cause externe"
    }
  },
  {
    key: "occurrenceSpecifyPlace",
    translation: {
      ar: "حدد مكان حدوث السبب الخارجي",
      en: "Specify place of occurence of the external cause",
      fr: "Préciser le lieu d'apparition de la cause externe"
    }
  },
  {
    key: "pregnant",
    translation: {
      ar: "حمل متعدد؟",
      en: "Multiple pregnancy?",
      fr: "Grossesse multiple?"
    }
  },
  {
    key: "stillborn",
    translation: {
      ar: "مولود ميت قبل أو أثناء الولادة؟",
      en: "Stillborn?",
      fr: "Mort-né?"
    }
  },
  {
    key: "hoursSurvived",
    translation: {
      ar: "إذا كانت الوفاة في غضون 24 ساعة من الولادة، حدد عدد ساعات البقاء على قيد الحياة",
      en: "If death within 24hrs specify number of hours survived",
      fr: "Si décès dans les 24h précisez le nombre d'heures de survie"
    }
  },
  {
    key: "birthWeight",
    translation: {
      ar: "الوزن عند الولادة (بالجرام)",
      en: "Birth weight (in grams)",
      fr: "Poids à la naissance (en grammes)"
    }
  },
  {
    key: "pregnantWeeks",
    translation: {
      ar: "عدد أسابيع الحمل المكتملة",
      en: "Number of completed weeks of pregnancy",
      fr: "Nombre de semaines de grossesse révolues"
    }
  },
  {
    key: "motherAge",
    translation: {
      ar: "عمر الأم (بالسنوات)",
      en: "Age of mother (in years)",
      fr: "Âge de la mère (en années)"
    }
  },
  {
    key: "perinatal",
    translation: {
      ar: "إذا كانت الوفاة في فترة حول الولادة، حدد حالة الأم التي أثرت على الجنين والمولود الجديد",
      en: "If death was perinatal, state conditions of mother that affected the fetus and newborn",
      fr: "Si le décès était périnatal, indiquer les conditions de la mère qui ont affecté le fœtus et le nouveau-né"
    }
  },
  {
    key: "maternal",
    translation: {
      ar: "وفيات الأمهات",
      en: "Maternal death",
      fr: "Décès maternel"
    }
  },
  {
    key: "pregnancyLastYear",
    translation: {
      ar: "بالنسبة للنساء ، هل كانت المتوفاة حامل خلال العام الماضي؟",
      en: "For women, was the deceased pregnant within the past year?",
      fr: "Pour les femmes, la personne décédée était-elle enceinte au cours de la dernière année?"
    }
  },
  {
    key: "timePregnancy",
    translation: {
      ar: "إذا كانت الإجابة بنعم ، عمر الحمل عند وفاة الأم",
      en: "If yes, time from pregnancy",
      fr: "Si oui, le temps depuis la grossesse"
    }
  },
  {
    key: "pregnancyToDeath",
    translation: {
      ar: "هل ساهم الحمل في الوفاة؟",
      en: "Did the pregnancy contribute to the death?",
      fr: "La grossesse a-t-elle contribué au décès?"
    }
  },
  {
    key: "proportionOfDeathFromBroadCausesAll",
    translation: {
      ar: "نسبة الوفيات من أسباب الوفاة الرئيسية (جميع الأجناس ، جميع الأعمار)",
      en: "Proportion of deaths from broad causes (all sexes, all ages)",
      fr: "Proportion de décès de causes générales (tous sexes, tous âges)"
    }
  },
  {
    key: "mortalityFromBoardCausesOfDeath",
    translation: {
      ar: "الوفيات من أسباب الوفاة الرئيسية",
      en: "Mortality from broad causes of death",
      fr: "Mortality from broad causes of death"
    }
  },
  {
    key: "distributionOfDeathByBroadCausesAndAgeGroups",
    translation: {
      ar: "توزيع الوفيات حسب أسباب الوفاة الرئيسية والفئات العمرية",
      en: "Distribution of deaths by broad causes and age groups",
      fr: "Répartition des décès par grandes causes et groupes d'âge"
    }
  },
  {
    key: "overViewDistributionOfDeath",
    translation: {
      ar: "نظرة عامة عن توزيع أسباب إجمالي الوفيات مجمعة حسب الفئة",
      en: "Overview of the distribution of causes of total deaths grouped by category",
      fr: "Aperçu de la répartition des causes de décès totaux regroupées par catégorie"
    }
  },
  {
    key: "clickOnBubleForDetail",
    translation: {
      ar: "انقر على كل فقاعات للحصول على التفاصيل",
      en: "Click on each buble for details",
      fr: "Cliquez sur chaque bulle pour plus de détails"
    }
  },
  {
    key: "communicable",
    translation: {
      ar: "معدي",
      en: "communicable",
      fr: "transmissible"
    }
  },
  {
    key: "nonCommunicable",
    translation: {
      ar: "غير معدي",
      en: "non-communicable",
      fr: "non communicable"
    }
  },
  {
    key: "externalCauses",
    translation: {
      ar: "أسباب خارجية",
      en: "external causes",
      fr: "causes externes"
    }
  },
  {
    key: "illDefined",
    translation: {
      ar: "أسباب وفاة غير محددة",
      en: "ill-defined",
      fr: "mal défini"
    }
  },
  {
    key: "numberOfDeathBy",
    translation: {
      ar: "عدد الوفيات حسب",
      en: "Number of Death by",
      fr: "Nombre de décès par"
    }
  },
  {
    key: "tuberculosis",
    translation: { ar: "السل", en: "Tuberculosis", fr: "Tuberculose" }
  },
  {
    key: "sexuallyTransmittedDiseasesExcludingHiv",
    translation: {
      ar: "الأمراض المنقولة جنسياً باستثناء الإيدز",
      en: "Sexually transmitted diseases excluding HIV",
      fr: "Maladies sexuellement transmissibles hors VIH"
    }
  },
  {
    key: "hiv",
    translation: { ar: "الإيدز", en: "HIV", fr: "VIH" }
  },
  {
    key: "diarrhoealDiseases",
    translation: {
      ar: "أمراض الإسهال",
      en: "Diarrhoeal diseases",
      fr: "Maladies diarrhéiques"
    }
  },
  {
    key: "pertussis",
    translation: {
      ar: "السعال الديكي",
      en: "Pertussis",
      fr: "Coqueluche"
    }
  },
  {
    key: "poliomyelitis",
    translation: {
      ar: "شلل الأطفال",
      en: "Poliomyelitis",
      fr: "Poliomyélite"
    }
  },
  {
    key: "diphtheria",
    translation: {
      ar: "الدفتيريا",
      en: "Diphtheria",
      fr: "Diphtérie"
    }
  },
  {
    key: "measles",
    translation: { ar: "مرض الحصبة", en: "Measles", fr: "Rougeole" }
  },
  {
    key: "tetanus",
    translation: { ar: "كُزاز", en: "Tetanus", fr: "Tétanos" }
  },
  {
    key: "meningitis",
    translation: {
      ar: "التهاب السحايا",
      en: "Meningitis",
      fr: "Méningite"
    }
  },
  {
    key: "hepatitisB",
    translation: {
      ar: "التهاب الكبد ب",
      en: "Hepatitis B",
      fr: "Hépatite B"
    }
  },
  {
    key: "hepatitisC",
    translation: {
      ar: "التهاب الكبد ج",
      en: "Hepatitis C",
      fr: "Hépatite C"
    }
  },
  {
    key: "malaria",
    translation: { ar: "ملاريا", en: "Malaria", fr: "Paludisme" }
  },
  {
    key: "tropicalClusterDiseases",
    translation: {
      ar: "أمراض المناطق المدارية",
      en: "Tropical-cluster diseases",
      fr: "Maladies du cluster tropical"
    }
  },
  {
    key: "lowerRespiratoryInfections",
    translation: {
      ar: "التهابات الجهاز التنفسي السفلي",
      en: "Lower respiratory infections",
      fr: "Infections des voies respiratoires inférieures"
    }
  },
  {
    key: "maternalConditions",
    translation: {
      ar: "ظروف تتعلق بالام  و تؤثر على الحمل و الولادة",
      en: "Maternal conditions",
      fr: "Conditions maternelles"
    }
  },
  {
    key: "conditionsArisingDuringThePerinatalPeriod",
    translation: {
      ar: "الحالات التي تظهر خلال الفترة المحيطة بالولادة",
      en: "Conditions arising during the perinatal period",
      fr: "Conditions survenant pendant la période périnatale"
    }
  },
  {
    key: "nutritionalDeficiencies",
    translation: {
      ar: "نقص غذائي",
      en: "Nutritional deficiencies",
      fr: "Déficiences nutritionnelles"
    }
  },
  {
    key: "mouthAndOropharynxCancers",
    translation: {
      ar: "سرطانات الفم والبلعوم",
      en: "Mouth and oropharynx cancers",
      fr: "Cancers de la bouche et de l'oropharynx"
    }
  },
  {
    key: "oesophagusCancer",
    translation: {
      ar: "سرطان المريء",
      en: "Oesophagus cancer",
      fr: "Cancer de l'œsophage"
    }
  },
  {
    key: "stomachCancer",
    translation: {
      ar: "سرطان المعدة",
      en: "Stomach cancer",
      fr: "Cancer de l'estomac"
    }
  },
  {
    key: "colonAndRectumCancers",
    translation: {
      ar: "سرطانات القولون والمستقيم",
      en: "Colon and rectum cancers",
      fr: "Cancers du côlon et du rectum"
    }
  },
  {
    key: "liverCancer",
    translation: {
      ar: "سرطان الكبد",
      en: "Liver cancer",
      fr: "Cancer du foie"
    }
  },
  {
    key: "pancreasCancer",
    translation: {
      ar: "سرطان البنكرياس",
      en: "Pancreas cancer",
      fr: "Cancer du pancréas"
    }
  },
  {
    key: "tracheaBronchusAndLungCancers",
    translation: {
      ar: "سرطانات القصبة الهوائية والشعب الهوائية والرئة",
      en: "Trachea, bronchus and lung cancers",
      fr: "Cancers de la trachée, des bronches et du poumon"
    }
  },
  {
    key: "melanomaAndOtherSkinCancers",
    translation: {
      ar: "سرطان الجلد وسرطانات الجلد الأخرى",
      en: "Melanoma and other skin cancers",
      fr: "Mélanome et autres cancers de la peau"
    }
  },
  {
    key: "breastCancer",
    translation: {
      ar: "سرطان الثدي",
      en: "Breast cancer",
      fr: "Cancer du sein"
    }
  },
  {
    key: "cervixUteriCancer",
    translation: {
      ar: "سرطان عنق الرحم",
      en: "Cervix uteri cancer",
      fr: "Cancer du col de l'utérus"
    }
  },
  {
    key: "corpusUteriCancer",
    translation: {
      ar: "سرطان الرحم",
      en: "Corpus uteri cancer",
      fr: "Cancer du corps utérin"
    }
  },
  {
    key: "ovaryCancer",
    translation: {
      ar: "سرطان المبيض",
      en: "Ovary cancer",
      fr: "Cancer de l'ovaire"
    }
  },
  {
    key: "prostateCancer",
    translation: {
      ar: "سرطان البروستات",
      en: "Prostate cancer",
      fr: "Cancer de la prostate"
    }
  },
  {
    key: "bladderCancer",
    translation: {
      ar: "سرطان المثانة",
      en: "Bladder cancer",
      fr: "Cancer de la vessie"
    }
  },
  {
    key: "lymphomasAndMultipleMyeloma",
    translation: {
      ar: "الأورام اللمفاوية والورم النخاعي المتعدد",
      en: "Lymphomas and multiple myeloma",
      fr: "Lymphomes et myélome multiple"
    }
  },
  {
    key: "leukaemia",
    translation: { ar: "سرطان الدم", en: "Leukaemia", fr: "Leucémie" }
  },
  {
    key: "alzheimerAndOtherDementias",
    translation: {
      ar: "الزهايمر وأنواع الخرف الأخرى",
      en: "Alzheimer and other dementias",
      fr: "Alzheimer et autres démences"
    }
  },
  {
    key: "parkinsonDisease",
    translation: {
      ar: "مرض باركنسون",
      en: "Parkinson disease",
      fr: "Maladie de Parkinson"
    }
  },
  {
    key: "hypertensiveDisease",
    translation: {
      ar: "مرض ارتفاع ضغط الدم",
      en: "Hypertensive disease",
      fr: "Maladie hypertensive"
    }
  },
  {
    key: "ischaemicHeartDisease",
    translation: {
      ar: "مرض القلب المتعلق بتروية القلب",
      en: "Ischaemic heart disease",
      fr: "Cardiopathie ischémique"
    }
  },
  {
    key: "cerebrovascularDisease",
    translation: {
      ar: "مرض الأوعية الدموية الدماغية",
      en: "Cerebrovascular disease",
      fr: "Maladie cérébrovasculaire"
    }
  },
  {
    key: "chronicObstructivePulmonaryDisease",
    translation: {
      ar: "مرض الانسداد الرئوي المزمن",
      en: "Chronic obstructive pulmonary disease",
      fr: "Bronchopneumopathie chronique obstructive"
    }
  },
  {
    key: "asthma",
    translation: { ar: "الربو", en: "Asthma", fr: "Asthme" }
  },
  {
    key: "digestiveDiseases",
    translation: {
      ar: "أمراض الجهاز الهضمي",
      en: "Digestive diseases",
      fr: "Maladies digestives"
    }
  },
  {
    key: "genitoUrinaryDiseases",
    translation: {
      ar: "أمراض الجهاز البولي التناسلي",
      en: "Genito-urinary diseases",
      fr: "Maladies génito-urinaires"
    }
  },
  {
    key: "congenitalAnomalies",
    translation: {
      ar: "التشوهات الخلقية",
      en: "Congenital anomalies",
      fr: "Anomalies congénitales"
    }
  },
  {
    key: "roadTrafficAccidents",
    translation: {
      ar: "حوادث المرور على الطرق",
      en: "Road traffic accidents",
      fr: "Accidents de la route"
    }
  },
  {
    key: "suicide",
    translation: { ar: "انتحار", en: "Suicide", fr: "Suicide" }
  },
  {
    key: "homicide",
    translation: { ar: "جريمة قتل", en: "Homicide", fr: "Homicide" }
  },
  {
    key: "mortaliryFromNcds",
    translation: {
      ar: "الوفيات من الأمراض غير المعدية",
      en: "Mortality from NCDs",
      fr: "Mortalité due aux MNT"
    }
  },
  {
    key: "malignantNeoplasms",
    translation: {
      ar: "الأورام الخبيثة",
      en: "Malignant neoplasms",
      fr: "Néoplasmes malins"
    }
  },
  {
    key: "diabetesMellitus",
    translation: {
      ar: "داء السكري",
      en: "Diabetes mellitus",
      fr: "Diabète sucré"
    }
  },
  {
    key: "cardiovascularDiseases",
    translation: {
      ar: "أمراض القلب والأوعية الدموية",
      en: "Cardiovascular diseases",
      fr: "Maladies cardiovasculaires"
    }
  },
  {
    key: "respiratoryDiseases",
    translation: {
      ar: "أمراض الجهاز التنفسي",
      en: "Respiratory diseases",
      fr: "Maladies respiratoires"
    }
  },
  {
    key: "numberOfDeathBySexAndAge",
    translation: {
      ar: "عدد الوفيات حسب الجنس والعمر",
      en: "Number of deaths by sex and age",
      fr: "Nombre de décès selon le sexe et l'âge"
    }
  },
  {
    key: "numberOfDeathByMonth",
    translation: {
      ar: "عدد الوفيات حسب الشهر",
      en: "Number of deaths by month",
      fr: "Nombre de décès par mois"
    }
  },
  {
    key: "pneumonia",
    translation: {
      ar: "التهاب رئوي",
      en: "Pneumonia",
      fr: "Pneumonie"
    }
  },
  {
    key: "otherDiseasesOfTheDigestiveSystem",
    translation: {
      ar: "أمراض الجهاز الهضمي الأخرى",
      en: "Other diseases of the digestive system",
      fr: "Autres maladies du système digestif"
    }
  },
  {
    key: "otherDirectObstetricDeaths",
    translation: {
      ar: "وفيات الولادة المباشرة الأخرى",
      en: "Other direct obstetric deaths",
      fr: "Autres décès obstétricaux directs"
    }
  },
  {
    key: "prematurity",
    translation: {
      ar: "الخداج",
      en: "Prematurity",
      fr: "Prématurité"
    }
  },
  {
    key: "symptomsSignAndAbnormalClinicalAndLaboratoryFindingsNotElsewhereClassified",
    translation: {
      ar: "الأعراض والنتائج السريرية والمخبرية الغير طبيعية ، الغير مصنفة في مكان آخر",
      en: "Symptoms sign and abnormal clinical and laboratory findings, not elsewhere classified",
      fr: "Symptômes et résultats cliniques et de laboratoire anormaux, non classés ailleurs"
    }
  },
  {
    key: "otherAndUnspecifiedCongenitalMalformations",
    translation: {
      ar: "التشوهات الخلقية الأخرى وغير المحددة",
      en: "Other and unspecified congenital malformations",
      fr: "Malformations congénitales autres et non précisées"
    }
  },
  {
    key: "otherAndUnspecifiedPerinatalConditions",
    translation: {
      ar: "حالات أخرى غير محددة في الفترة المحيطة بالولادة",
      en: "Other and unspecified perinatal conditions",
      fr: "Affections périnatales autres et non précisées"
    }
  },
  {
    key: "intrauterineHypoxiaAndBirthAsphyxia",
    translation: {
      ar: "نقص الأكسجة داخل الرحم واختناق الولادة",
      en: "Intrauterine hypoxia and birth asphyxia",
      fr: "Hypoxie intra-utérine et asphyxie à la naissance"
    }
  },
  {
    key: "name",
    translation: { ar: "الاسم", en: "Name", fr: "Nom" }
  },
  {
    key: "points",
    translation: { ar: "نقاط", en: "Points", fr: "Points" }
  },
  {
    key: "certainInfectiousOrParasiticDiseases",
    translation: {
      ar: "بعض الأمراض المعدية أو الطفيلية المعينة",
      en: "Certain infectious or parasitic diseases",
      fr: "Certaines maladies infectieuses ou parasitaires"
    }
  },
  {
    key: "neoplasms",
    translation: { ar: "أورام", en: "Neoplasms", fr: "Tumeurs" }
  },
  {
    key: "diseasesOfTheBloodOrBloodFormingOrgans",
    translation: {
      ar: "أمراض الدم أو الأعضاء المكونة للدم",
      en: "Diseases of the blood or blood-forming organs",
      fr: "Maladies du sang ou des organes hématopoïétiques"
    }
  },
  {
    key: "diseasesOfTheImmuneSystem",
    translation: {
      ar: "أمراض جهاز المناعة",
      en: "Diseases of the immune system",
      fr: "Maladies du système immunitaire"
    }
  },
  {
    key: "endocrineNutritionalOrMetabolicDiseases",
    translation: {
      ar: "أمراض الغدد الصماء، التغذية أو التمثيل الغذائي",
      en: "Endocrine, nutritional or metabolic diseases",
      fr: "Maladies endocriniennes, nutritionnelles ou métaboliques"
    }
  },
  {
    key: "mentalBehaviouralOrNeurodevelopmentalDisorders",
    translation: {
      ar: "الاضطرابات العقلية أو السلوكية أو النمائية العصبية",
      en: "Mental, behavioural or neurodevelopmental disorders",
      fr: "Troubles mentaux, comportementaux ou neurodéveloppementaux"
    }
  },
  {
    key: "sleepWakeDisorders",
    translation: {
      ar: "اضطرابات النوم والاستيقاظ",
      en: "Sleep-wake disorders",
      fr: "Troubles veille-sommeil"
    }
  },
  {
    key: "diseasesOfTheNervousSystem",
    translation: {
      ar: "أمراض الجهاز العصبي",
      en: "Diseases of the nervous system",
      fr: "Maladies du système nerveux"
    }
  },
  {
    key: "diseasesOfTheVisualSystem",
    translation: {
      ar: "أمراض الجهاز البصري",
      en: "Diseases of the visual system",
      fr: "Maladies du système visuel"
    }
  },
  {
    key: "diseasesOfTheEarOrMastoidProcess",
    translation: {
      ar: "أمراض الأذن أو عملية الخشاء",
      en: "Diseases of the ear or mastoid process",
      fr: "Maladies de l'oreille ou de l'apophyse mastoïdienne"
    }
  },
  {
    key: "diseasesOfTheCirculatorySystem",
    translation: {
      ar: "أمراض الدورة الدموية",
      en: "Diseases of the circulatory system",
      fr: "Maladies du système circulatoire"
    }
  },
  {
    key: "diseasesOfTheRespiratorySystem",
    translation: {
      ar: "أمراض الجهاز التنفسي",
      en: "Diseases of the respiratory system",
      fr: "Maladies du système respiratoire"
    }
  },
  {
    key: "diseasesOfTheDigestiveSystem",
    translation: {
      ar: "أمراض الجهاز الهضمي",
      en: "Diseases of the digestive system",
      fr: "Maladies du système digestif"
    }
  },
  {
    key: "diseasesOfTheSkin",
    translation: {
      ar: "أمراض الجلد",
      en: "Diseases of the skin",
      fr: "Maladies de la peau"
    }
  },
  {
    key: "diseasesOfTheMusculoskeletalSystemOrConnectiveTissue",
    translation: {
      ar: "أمراض الجهاز الحركي أو النسيج الضام",
      en: "Diseases of the musculoskeletal system or connective tissue",
      fr: "Maladies du système musculo-squelettique ou du tissu conjonctif"
    }
  },
  {
    key: "diseasesOfTheGenitourinarySystem",
    translation: {
      ar: "أمراض الجهاز البولي التناسلي",
      en: "Diseases of the genitourinary system",
      fr: "Maladies de l'appareil génito-urinaire"
    }
  },
  {
    key: "conditionsRelatedToSexualHealth",
    translation: {
      ar: "الحالات المتعلقة بالصحة الجنسية",
      en: "Conditions related to sexual health",
      fr: "Conditions liées à la santé sexuelle"
    }
  },
  {
    key: "pregnancyChildbirthOrThePuerperium",
    translation: {
      ar: "الحمل، الولادة أو النفاس",
      en: "Pregnancy, childbirth or the puerperium",
      fr: "Grossesse, accouchement ou puerpéralité"
    }
  },
  {
    key: "certainConditionsOriginatingInThePerinatalPeriod",
    translation: {
      ar: "حالات معينة تنشأ في فترة ما حول الولادة",
      en: "Certain conditions originating in the perinatal period",
      fr: "Certaines affections originaires de la période périnatale"
    }
  },
  {
    key: "developmentalAnomalies",
    translation: {
      ar: "تشوهات متعلقه بالتطور الجنيني",
      en: "Developmental anomalies",
      fr: "Anomalies du développement"
    }
  },
  {
    key: "symptomsSignsOrClinicalFindingsNotElsewhereClassified",
    translation: {
      ar: "أعراض أو علامات أو نتائج سريرية غير مصنفة في مكان آخر",
      en: "Symptoms, signs or clinical findings, not elsewhere classified",
      fr: "Symptômes, signes ou constatations cliniques, non classés ailleurs"
    }
  },
  {
    key: "injuryPoisoningOrCertainOtherConsequencesOfExternalCauses",
    translation: {
      ar: "الإصابة،التسمم أو عواقب أخرى معينة للأسباب الخارجية",
      en: "Injury, poisoning or certain other consequences of external causes",
      fr: "Blessure, empoisonnement ou certaines autres conséquences de causes externes"
    }
  },
  {
    key: "externalCausesOfMorbidityOrMortality",
    translation: {
      ar: "الأسباب الخارجية للمرض أو الوفاة",
      en: "External causes of morbidity or mortality",
      fr: "Causes externes de morbidité ou de mortalité"
    }
  },
  {
    key: "factorsInfluencingHealthStatusOrContactWithHealthServices",
    translation: {
      ar: "العوامل المؤثرة على الحالة الصحية أو الاتصال بالخدمات الصحية",
      en: "Factors influencing health status or contact with health services",
      fr: "Facteurs influençant l'état de santé ou le contact avec les services de santé"
    }
  },
  {
    key: "codesForSpecialPurposes",
    translation: {
      ar: "رموز لأغراض خاصة",
      en: "Codes for special purposes",
      fr: "Codes à des fins spéciales"
    }
  },
  {
    key: "numberOfMalariaDeathsByMonth",
    translation: {
      ar: "عدد الوفيات الناجمة عن الملاريا حسب الشهر",
      en: "Number of malaria deaths by month",
      fr: "Nombre de décès dus au paludisme par mois"
    }
  },
  {
    key: "numberOfMalariaDeathsPlaceOfDeath",
    translation: {
      ar: "عدد الوفيات الناجمة عن الملاريا حسب مكان الوفاة",
      en: "Number of malaria deaths - place of death",
      fr: "Nombre de décès dus au paludisme - lieu du décès"
    }
  },
  {
    key: "numberOfMalariaDeathsBySex",
    translation: {
      ar: "عدد الوفيات الناجمة عن الملاريا حسب الجنس",
      en: "Number of malaria deaths by sex",
      fr: "Nombre de décès dus au paludisme par sexe"
    }
  },
  {
    key: "numberOfMalariaDeathsBySexAndDetailedAgeGroup",
    translation: {
      ar: "عدد الوفيات الناجمة عن الملاريا حسب الجنس والفئات العمرية التفصيلية",
      en: "Number of malaria deaths by sex and detailed age-group",
      fr: "Nombre de décès dus au paludisme par sexe et tranche d'âge détaillée"
    }
  },
  {
    key: "numberOfMalariaDeathsAndPercentOfAllMalariaDeathsByBroadAgeGroup",
    translation: {
      ar: "عدد الوفيات الناجمة عن الملاريا والنسبة المئوية لجميع وفيات الملاريا حسب الفئات العمرية الرئيسية",
      en: "Number of malaria deaths and percent of all malaria deaths by broad age-group",
      fr: "Nombre de décès dus au paludisme et pourcentage de tous les décès dus au paludisme par grand groupe d'âge"
    }
  },
  {
    key: "numberOfMalariaDeathsComparedWithOtherCausesOfDeaths",
    translation: {
      ar: "عدد الوفيات الناجمة عن الملاريا مقارنة بأسباب الوفاة الأخرى",
      en: "Number of malaria deaths compared with other causes of deaths",
      fr: "Nombre de décès dus au paludisme par rapport aux autres causes de décès"
    }
  },
  {
    key: "percentOfTotalMalariaDeaths",
    translation: {
      ar: "٪ من إجمالي وفيات الملاريا",
      en: "% of total malaria deaths",
      fr: "% du total des décès dus au paludisme"
    }
  },
  {
    key: "numberOfMalariaDeaths",
    translation: {
      ar: "عدد الوفيات الناجمة عن الملاريا",
      en: "Number of malaria deaths",
      fr: "Nombre de décès dus au paludisme"
    }
  },
  {
    key: "otherCauses",
    translation: {
      ar: "أسباب أخرى",
      en: "Other causes",
      fr: "Autres causes"
    }
  },
  {
    key: "numberOfTuberculosisDeathsByMonth",
    translation: {
      ar: "عدد الوفيات الناجمة عن السل حسب الشهر",
      en: "Number of tuberculosis deaths by month",
      fr: "Number of tuberculosis deaths by month"
    }
  },
  {
    key: "numberOfTuberculosisDeathsByPlaceOfDeath",
    translation: {
      ar: "عدد الوفيات الناجمة عن السل حسب مكان الوفاة",
      en: "Number of tuberculosis deaths by place of death",
      fr: "Nombre de décès par tuberculose par lieu de décès"
    }
  },
  {
    key: "numberOfTuberculosisDeathsBySex",
    translation: {
      ar: "عدد الوفيات الناجمة عن السل حسب الجنس",
      en: "Number of tuberculosis deaths by sex",
      fr: "Nombre de décès dus à la tuberculose par sexe"
    }
  },
  {
    key: "numberOfTuberculosisDeathsBySexAndDetailedAgeGroup",
    translation: {
      ar: "عدد الوفيات الناجمة عن السل حسب الجنس والفئات العمرية التفصيلية",
      en: "Number of tuberculosis deaths by sex and detailed age-group",
      fr: "Nombre de décès dus à la tuberculose par sexe et tranche d'âge détaillée"
    }
  },
  {
    key: "numberOfTuberculosisDeathsAndPercentOfAllTuberculosisDeathsByBroadAgeGroup",
    translation: {
      ar: "عدد الوفيات الناجمة عن السل والنسبة المئوية لجميع وفيات السل حسب الفئات العمرية الرئيسية",
      en: "Number of tuberculosis deaths and percent of all tuberculosis deaths by broad age-group",
      fr: "Nombre de décès dus à la tuberculose et pourcentage de tous les décès dus à la tuberculose par grand groupe d'âge"
    }
  },
  {
    key: "numberOfTuberculosisDeathsComparedWithOtherCausesOfDeaths",
    translation: {
      ar: "عدد الوفيات الناجمة عن السل مقارنة مع أسباب الوفاة الأخرى",
      en: "Number of tuberculosis deaths compared with other causes of deaths",
      fr: "Nombre de décès dus à la tuberculose par rapport aux autres causes de décès"
    }
  },
  {
    key: "percentOfTotalTuberculosisDeaths",
    translation: {
      ar: "٪ من إجمالي وفيات السل",
      en: "% of total tuberculosis deaths",
      fr: "% du total des décès dus à la tuberculose"
    }
  },
  {
    key: "numberOfTuberculosisDeaths",
    translation: {
      ar: "عدد الوفيات الناجمة عن السل",
      en: "Number of tuberculosis deaths",
      fr: "Nombre de décès par tuberculose"
    }
  },
  {
    key: "numberOfAidsDeathsByMonth",
    translation: {
      ar: "عدد الوفيات الناجمة عن الإيدز حسب الشهر",
      en: "Number of AIDS deaths by month",
      fr: "Nombre de décès du SIDA par mois"
    }
  },
  {
    key: "numberOfAidsDeathsPlaceOfDeath",
    translation: {
      ar: "عدد الوفيات الناجمة عن الإيدز - مكان الوفاة",
      en: "Number of AIDS deaths - place of death",
      fr: "Nombre de décès dus au SIDA - lieu du décès"
    }
  },
  {
    key: "numberOfAidsDeathsBySex",
    translation: {
      ar: "عدد الوفيات الناجمة عن الإيدز حسب الجنس",
      en: "Number of AIDS deaths by sex",
      fr: "Nombre de décès dus au SIDA par sexe"
    }
  },
  {
    key: "numberOfAidsDeathsBySexAndDetailedAgeGroup",
    translation: {
      ar: "عدد الوفيات الناجمة عن الإيدز حسب الجنس والفئات العمرية التفصيلية",
      en: "Number of AIDS deaths by sex and detailed age-group",
      fr: "Nombre de décès dus au SIDA par sexe et tranche d'âge détaillée"
    }
  },
  {
    key: "numberOfAidsDeathsAndPercentOfAllAidsDeathsByBroadAgeGroup",
    translation: {
      ar: "عدد الوفيات الناجمة عن الإيدز والنسبة المئوية لجميع وفيات الإيدز حسب الفئات العمرية الرئيسية",
      en: "Number of AIDS deaths and percent of all AIDS deaths by broad age-group",
      fr: "Nombre de décès dus au sida et pourcentage de tous les décès dus au sida par grand groupe d'âge"
    }
  },
  {
    key: "numberOfAidsDeathsComparedWithOtherCausesOfDeaths",
    translation: {
      ar: "عدد الوفيات الناجمة عن الإيدز مقارنة بأسباب الوفاة الأخرى",
      en: "Number of AIDS deaths compared with other causes of deaths",
      fr: "Nombre de décès dus au sida par rapport aux autres causes de décès"
    }
  },
  {
    key: "aids",
    translation: { ar: "الإيدز", en: "AIDS", fr: "SIDA" }
  },
  {
    key: "percentOfTotalAidsDeaths",
    translation: {
      ar: "٪ من إجمالي وفيات الإيدز",
      en: "% of total AIDS deaths",
      fr: "% du total des décès dus au SIDA"
    }
  },
  {
    key: "numberOfAidsDeaths",
    translation: {
      ar: "عدد الوفيات الناجمة عن الإيدز",
      en: "Number of AIDS deaths",
      fr: "Nombre de décès dus au SIDA"
    }
  },
  { key: "tb", translation: { ar: "السل", en: "TB", fr: "TB" } },
  {
    key: "other",
    translation: { ar: "أخرى", en: "Other", fr: "Autre" }
  },
  {
    key: "numberOfDeath",
    translation: {
      ar: "٪ من الوفيات",
      en: "% of Deaths",
      fr: "% de décès"
    }
  },
  {
    key: "percentOfTotalDeathAllCauses",
    translation: {
      ar: "٪ من إجمالي الوفيات من جميع الأسباب",
      en: "% of total deaths all causes",
      fr: "% du total des décès toutes causes"
    }
  },
  {
    key: "numberOfDeathsFromTbAidsMalariaAndOtherCausesAgeGroup",
    translation: {
      ar: "عدد الوفيات الناجمة عن السل والإيدز والملاريا وأسباب أخرى - الفئة العمرية",
      en: "Number of deaths from TB, AIDS, malaria and other causes - age-group",
      fr: "Nombre de décès dus à la tuberculose, au sida, au paludisme et à d'autres causes - groupe d'âge"
    }
  },
  {
    key: "distributionOfDeathsByTbAidsAndMalariaBySexAndAge",
    translation: {
      ar: "توزيع الوفيات الناجمة عن السل والإيدز والملاريا حسب الجنس والعمر",
      en: "Distribution of deaths by TB, AIDS and malaria by sex and age",
      fr: "Répartition des décès par tuberculose, sida et paludisme par sexe et âge"
    }
  },
  {
    key: "percentageOfDeathsFromTbAidsAndMalariaOutOfAllDeathsFromCommunicableDiseases",
    translation: {
      ar: "النسبة المئوية للوفيات الناجمة عن السل والإيدز والملاريا من إجمالي الوفيات الناجمة عن الأمراض المعدية",
      en: "Percentage of deaths from TB, AIDS and malaria out of all deaths from communicable diseases",
      fr: "Pourcentage de décès dus à la tuberculose, au sida et au paludisme sur l'ensemble des décès dus aux maladies transmissibles"
    }
  },
  {
    key: "numberOfTbAndAidsDeathsAndPercentOfTheseDeathsOutOfAllDeaths15YearsAndAbove",
    translation: {
      ar: "عدد الوفيات الناجمة عن السل والإيدز والنسبة المئوية لهذه الوفيات من إجمالي الوفيات: 15 سنة وما فوق",
      en: "Number of TB and AIDS deaths  and percent of these  deaths out of all deaths: 15 years and above",
      fr: "Nombre de décès dus à la tuberculose et au sida et pourcentage de ces décès sur l'ensemble des décès : 15 ans et plus"
    }
  },
  { key: "list", translation: { en: "List", fr: "Liste" } },
  { key: "uniqueField", translation: { en: "Unique Field" } },
  { key: "searchableFields", translation: { en: "Searchable fields" } },
  { key: "help", translation: { en: "Help" } },
  { key: "userManual", translation: { en: "User Manual" } },
  {
    key: "causeOfDeathVersion",
    translation: { en: "Cause of Death App (version 1.0.1)" }
  },
  { key: "appFeatures", translation: { en: "App features" } },
  { key: "installation", translation: { en: "Installation" } },
  { key: "back", translation: { en: "Back", fr: "Dos" } },
  { key: "install", translation: { en: "Install", fr: "Installer" } },
  { key: "selectName", translation: { en: "Section name" } },
  {
    key: "selectNameOption",
    translation: { en: "* Select Name Option" }
  },
  {
    key: "selectTrackedEntityType",
    translation: { en: "Select tracked entity type" }
  },
  { key: "selectOption", translation: { en: "Select option" } },
  { key: "noname", translation: { en: "No Name" } },
  { key: "fullname", translation: { en: "Fullname" } },
  { key: "firstlastname", translation: { en: "First & Last Name" } },
  {
    key: "firstmiddlelastname",
    translation: { en: "First, Middle & Last Name" }
  },
  { key: "firstname", translation: { en: "First Name" } },
  { key: "middlename", translation: { en: "Middle Name" } },
  { key: "lastname", translation: { en: "Last Name" } },
  {
    key: "warning",
    translation: { en: "Warning!!!", fr: "Avertissement!" }
  },
  { key: "clear", translation: { en: "Clear", fr: "Claire" } },
  { key: "stay", translation: { en: "Stay", fr: "Rester" } },
  { key: "leave", translation: { en: "Leave", fr: "Partir" } },
  {
    key: "changes_you_made_may_not_be_saved",
    translation: {
      en: "Changes you made may not be saved.",
      fr: "Les modifications que vous avez apportées ne seront peut-être pas enregistrées."
    }
  },
  {
    key: "note_WHO_digital_open_rule_integrated_cause_of_death_selection_Doris",
    translation: {
      en: "* Note: WHO Digital Open Rule Integrated cause of death Selection (DORIS)"
    }
  },
  { key: "compute", translation: { en: "Process", fr: "Calculer" } },
  { key: "icd11_tool", translation: { en: "ICD 11 Coding Tool" } },
  {
    key: "your_selection",
    translation: {
      en: "Your selection is:",
      fr: "Votre sélection est :"
    }
  },
  {
    key: "type_to_start_searching",
    translation: {
      en: "Type for start searching",
      fr: "Tapez pour lancer la recherche"
    }
  }
];

const LOCALES = {
  af_NA: "Afrikaans (Namibia)",
  af_ZA: "Afrikaans (South Africa)",
  af: "Afrikaans",
  ak_GH: "Akan (Ghana)",
  ak: "Akan",
  sq_AL: "Albanian (Albania)",
  sq: "Albanian",
  am_ET: "Amharic (Ethiopia)",
  am: "Amharic",
  ar_DZ: "Arabic (Algeria)",
  ar_BH: "Arabic (Bahrain)",
  ar_EG: "Arabic (Egypt)",
  ar_IQ: "Arabic (Iraq)",
  ar_JO: "Arabic (Jordan)",
  ar_KW: "Arabic (Kuwait)",
  ar_LB: "Arabic (Lebanon)",
  ar_LY: "Arabic (Libya)",
  ar_MA: "Arabic (Morocco)",
  ar_OM: "Arabic (Oman)",
  ar_QA: "Arabic (Qatar)",
  ar_SA: "Arabic (Saudi Arabia)",
  ar_SD: "Arabic (Sudan)",
  ar_SY: "Arabic (Syria)",
  ar_TN: "Arabic (Tunisia)",
  ar_AE: "Arabic (United Arab Emirates)",
  ar_YE: "Arabic (Yemen)",
  ar: "Arabic",
  hy_AM: "Armenian (Armenia)",
  hy: "Armenian",
  as_IN: "Assamese (India)",
  as: "Assamese",
  asa_TZ: "Asu (Tanzania)",
  asa: "Asu",
  az_Cyrl: "Azerbaijani (Cyrillic)",
  az_Cyrl_AZ: "Azerbaijani (Cyrillic, Azerbaijan)",
  az_Latn: "Azerbaijani (Latin)",
  az_Latn_AZ: "Azerbaijani (Latin, Azerbaijan)",
  az: "Azerbaijani",
  bm_ML: "Bambara (Mali)",
  bm: "Bambara",
  eu_ES: "Basque (Spain)",
  eu: "Basque",
  be_BY: "Belarusian (Belarus)",
  be: "Belarusian",
  bem_ZM: "Bemba (Zambia)",
  bem: "Bemba",
  bez_TZ: "Bena (Tanzania)",
  bez: "Bena",
  bn_BD: "Bengali (Bangladesh)",
  bn_IN: "Bengali (India)",
  bn: "Bengali",
  bs_BA: "Bosnian (Bosnia and Herzegovina)",
  bs: "Bosnian",
  bg_BG: "Bulgarian (Bulgaria)",
  bg: "Bulgarian",
  my_MM: "Burmese (Myanmar [Burma])",
  my: "Burmese",
  yue_Hant_HK: "Cantonese (Traditional, Hong Kong SAR China)",
  ca_ES: "Catalan (Spain)",
  ca: "Catalan",
  tzm_Latn: "Central Morocco Tamazight (Latin)",
  tzm_Latn_MA: "Central Morocco Tamazight (Latin, Morocco)",
  tzm: "Central Morocco Tamazight",
  chr_US: "Cherokee (United States)",
  chr: "Cherokee",
  cgg_UG: "Chiga (Uganda)",
  cgg: "Chiga",
  zh_Hans: "Chinese (Simplified Han)",
  zh_Hans_CN: "Chinese (Simplified Han, China)",
  zh_Hans_HK: "Chinese (Simplified Han, Hong Kong SAR China)",
  zh_Hans_MO: "Chinese (Simplified Han, Macau SAR China)",
  zh_Hans_SG: "Chinese (Simplified Han, Singapore)",
  zh_Hant: "Chinese (Traditional Han)",
  zh_Hant_HK: "Chinese (Traditional Han, Hong Kong SAR China)",
  zh_Hant_MO: "Chinese (Traditional Han, Macau SAR China)",
  zh_Hant_TW: "Chinese (Traditional Han, Taiwan)",
  zh: "Chinese",
  kw_GB: "Cornish (United Kingdom)",
  kw: "Cornish",
  hr_HR: "Croatian (Croatia)",
  hr: "Croatian",
  cs_CZ: "Czech (Czech Republic)",
  cs: "Czech",
  da_DK: "Danish (Denmark)",
  da: "Danish",
  nl_BE: "Dutch (Belgium)",
  nl_NL: "Dutch (Netherlands)",
  nl: "Dutch",
  dz: "Dzongkha (Bhutan)",
  ebu_KE: "Embu (Kenya)",
  ebu: "Embu",
  en_AS: "English (American Samoa)",
  en_AU: "English (Australia)",
  en_BE: "English (Belgium)",
  en_BZ: "English (Belize)",
  en_BW: "English (Botswana)",
  en_CA: "English (Canada)",
  en_GU: "English (Guam)",
  en_HK: "English (Hong Kong SAR China)",
  en_IN: "English (India)",
  en_IE: "English (Ireland)",
  en_IL: "English (Israel)",
  en_JM: "English (Jamaica)",
  en_MT: "English (Malta)",
  en_MH: "English (Marshall Islands)",
  en_MU: "English (Mauritius)",
  en_NA: "English (Namibia)",
  en_NZ: "English (New Zealand)",
  en_MP: "English (Northern Mariana Islands)",
  en_PK: "English (Pakistan)",
  en_PH: "English (Philippines)",
  en_SG: "English (Singapore)",
  en_ZA: "English (South Africa)",
  en_TT: "English (Trinidad and Tobago)",
  en_UM: "English (U.S. Minor Outlying Islands)",
  en_VI: "English (U.S. Virgin Islands)",
  en_GB: "English (United Kingdom)",
  en_US: "English (United States)",
  en_ZW: "English (Zimbabwe)",
  en: "English",
  eo: "Esperanto",
  et_EE: "Estonian (Estonia)",
  et: "Estonian",
  ee_GH: "Ewe (Ghana)",
  ee_TG: "Ewe (Togo)",
  ee: "Ewe",
  fo_FO: "Faroese (Faroe Islands)",
  fo: "Faroese",
  fil_PH: "Filipino (Philippines)",
  fil: "Filipino",
  fi_FI: "Finnish (Finland)",
  fi: "Finnish",
  fr_BE: "French (Belgium)",
  fr_BJ: "French (Benin)",
  fr_BF: "French (Burkina Faso)",
  fr_BI: "French (Burundi)",
  fr_CM: "French (Cameroon)",
  fr_CA: "French (Canada)",
  fr_CF: "French (Central African Republic)",
  fr_TD: "French (Chad)",
  fr_KM: "French (Comoros)",
  fr_CG: "French (Congo - Brazzaville)",
  fr_CD: "French (Congo - Kinshasa)",
  fr_CI: "French (Côte d’Ivoire)",
  fr_DJ: "French (Djibouti)",
  fr_GQ: "French (Equatorial Guinea)",
  fr_FR: "French (France)",
  fr_GA: "French (Gabon)",
  fr_GP: "French (Guadeloupe)",
  fr_GN: "French (Guinea)",
  fr_LU: "French (Luxembourg)",
  fr_MG: "French (Madagascar)",
  fr_ML: "French (Mali)",
  fr_MQ: "French (Martinique)",
  fr_MC: "French (Monaco)",
  fr_NE: "French (Niger)",
  fr_RW: "French (Rwanda)",
  fr_RE: "French (Réunion)",
  fr_BL: "French (Saint Barthélemy)",
  fr_MF: "French (Saint Martin)",
  fr_SN: "French (Senegal)",
  fr_CH: "French (Switzerland)",
  fr_TG: "French (Togo)",
  fr: "French",
  ff_SN: "Fulah (Senegal)",
  ff: "Fulah",
  gl_ES: "Galician (Spain)",
  gl: "Galician",
  lg_UG: "Ganda (Uganda)",
  lg: "Ganda",
  ka_GE: "Georgian (Georgia)",
  ka: "Georgian",
  de_AT: "German (Austria)",
  de_BE: "German (Belgium)",
  de_DE: "German (Germany)",
  de_LI: "German (Liechtenstein)",
  de_LU: "German (Luxembourg)",
  de_CH: "German (Switzerland)",
  de: "German",
  de: "German",
  el_CY: "Greek (Cyprus)",
  el_GR: "Greek (Greece)",
  el: "Greek",
  gu_IN: "Gujarati (India)",
  gu: "Gujarati",
  guz_KE: "Gusii (Kenya)",
  guz: "Gusii",
  ha_Latn: "Hausa (Latin)",
  ha_Latn_GH: "Hausa (Latin, Ghana)",
  ha_Latn_NE: "Hausa (Latin, Niger)",
  ha_Latn_NG: "Hausa (Latin, Nigeria)",
  ha: "Hausa",
  haw_US: "Hawaiian (United States)",
  haw: "Hawaiian",
  he_IL: "Hebrew (Israel)",
  he: "Hebrew",
  hi_IN: "Hindi (India)",
  hi: "Hindi",
  hu_HU: "Hungarian (Hungary)",
  hu: "Hungarian",
  is_IS: "Icelandic (Iceland)",
  is: "Icelandic",
  ig_NG: "Igbo (Nigeria)",
  ig: "Igbo",
  id_ID: "Indonesian (Indonesia)",
  id: "Indonesian",
  ga_IE: "Irish (Ireland)",
  ga: "Irish",
  it_IT: "Italian (Italy)",
  it_CH: "Italian (Switzerland)",
  it: "Italian",
  ja_JP: "Japanese (Japan)",
  ja: "Japanese",
  kea_CV: "Kabuverdianu (Cape Verde)",
  kea: "Kabuverdianu",
  kab_DZ: "Kabyle (Algeria)",
  kab: "Kabyle",
  kl_GL: "Kalaallisut (Greenland)",
  kl: "Kalaallisut",
  kln_KE: "Kalenjin (Kenya)",
  kln: "Kalenjin",
  kam_KE: "Kamba (Kenya)",
  kam: "Kamba",
  kn_IN: "Kannada (India)",
  kn: "Kannada",
  kk_Cyrl: "Kazakh (Cyrillic)",
  kk_Cyrl_KZ: "Kazakh (Cyrillic, Kazakhstan)",
  kk: "Kazakh",
  km_KH: "Khmer (Cambodia)",
  km: "Khmer",
  ki_KE: "Kikuyu (Kenya)",
  ki: "Kikuyu",
  rw_RW: "Kinyarwanda (Rwanda)",
  rw: "Kinyarwanda",
  kok_IN: "Konkani (India)",
  kok: "Konkani",
  ko_KR: "Korean (South Korea)",
  ko: "Korean",
  khq_ML: "Koyra Chiini (Mali)",
  khq: "Koyra Chiini",
  ses_ML: "Koyraboro Senni (Mali)",
  ses: "Koyraboro Senni",
  lag_TZ: "Langi (Tanzania)",
  lag: "Langi",
  lv_LV: "Latvian (Latvia)",
  lv: "Latvian",
  lt_LT: "Lithuanian (Lithuania)",
  lt: "Lithuanian",
  luo_KE: "Luo (Kenya)",
  luo: "Luo",
  luy_KE: "Luyia (Kenya)",
  luy: "Luyia",
  mk_MK: "Macedonian (Macedonia)",
  mk: "Macedonian",
  jmc_TZ: "Machame (Tanzania)",
  jmc: "Machame",
  kde_TZ: "Makonde (Tanzania)",
  kde: "Makonde",
  mg_MG: "Malagasy (Madagascar)",
  mg: "Malagasy",
  ms_BN: "Malay (Brunei)",
  ms_MY: "Malay (Malaysia)",
  ms: "Malay",
  ml_IN: "Malayalam (India)",
  ml: "Malayalam",
  mt_MT: "Maltese (Malta)",
  mt: "Maltese",
  gv_GB: "Manx (United Kingdom)",
  gv: "Manx",
  mr_IN: "Marathi (India)",
  mr: "Marathi",
  mas_KE: "Masai (Kenya)",
  mas_TZ: "Masai (Tanzania)",
  mas: "Masai",
  mer_KE: "Meru (Kenya)",
  mer: "Meru",
  mfe_MU: "Morisyen (Mauritius)",
  mfe: "Morisyen",
  naq_NA: "Nama (Namibia)",
  naq: "Nama",
  ne_IN: "Nepali (India)",
  ne_NP: "Nepali (Nepal)",
  ne: "Nepali",
  nd_ZW: "North Ndebele (Zimbabwe)",
  nd: "North Ndebele",
  nb_NO: "Norwegian Bokmål (Norway)",
  nb: "Norwegian Bokmål",
  nn_NO: "Norwegian Nynorsk (Norway)",
  nn: "Norwegian Nynorsk",
  nyn_UG: "Nyankole (Uganda)",
  nyn: "Nyankole",
  or_IN: "Oriya (India)",
  or: "Oriya",
  om_ET: "Oromo (Ethiopia)",
  om_KE: "Oromo (Kenya)",
  om: "Oromo",
  ps_AF: "Pashto (Afghanistan)",
  ps: "Pashto",
  fa_AF: "Persian (Afghanistan)",
  fa_IR: "Persian (Iran)",
  fa: "Persian",
  pl_PL: "Polish (Poland)",
  pl: "Polish",
  pt_BR: "Portuguese (Brazil)",
  pt_GW: "Portuguese (Guinea-Bissau)",
  pt_MZ: "Portuguese (Mozambique)",
  pt_PT: "Portuguese (Portugal)",
  pt: "Portuguese",
  pa_Arab: "Punjabi (Arabic)",
  pa_Arab_PK: "Punjabi (Arabic, Pakistan)",
  pa_Guru: "Punjabi (Gurmukhi)",
  pa_Guru_IN: "Punjabi (Gurmukhi, India)",
  pa: "Punjabi",
  ro_MD: "Romanian (Moldova)",
  ro_RO: "Romanian (Romania)",
  ro: "Romanian",
  rm_CH: "Romansh (Switzerland)",
  rm: "Romansh",
  rof_TZ: "Rombo (Tanzania)",
  rof: "Rombo",
  ru_MD: "Russian (Moldova)",
  ru_RU: "Russian (Russia)",
  ru_UA: "Russian (Ukraine)",
  ru: "Russian",
  rwk_TZ: "Rwa (Tanzania)",
  rwk: "Rwa",
  saq_KE: "Samburu (Kenya)",
  saq: "Samburu",
  sg_CF: "Sango (Central African Republic)",
  sg: "Sango",
  seh_MZ: "Sena (Mozambique)",
  seh: "Sena",
  sr_Cyrl: "Serbian (Cyrillic)",
  sr_Cyrl_BA: "Serbian (Cyrillic, Bosnia and Herzegovina)",
  sr_Cyrl_ME: "Serbian (Cyrillic, Montenegro)",
  sr_Cyrl_RS: "Serbian (Cyrillic, Serbia)",
  sr_Latn: "Serbian (Latin)",
  sr_Latn_BA: "Serbian (Latin, Bosnia and Herzegovina)",
  sr_Latn_ME: "Serbian (Latin, Montenegro)",
  sr_Latn_RS: "Serbian (Latin, Serbia)",
  sr: "Serbian",
  sn_ZW: "Shona (Zimbabwe)",
  sn: "Shona",
  ii_CN: "Sichuan Yi (China)",
  ii: "Sichuan Yi",
  si_LK: "Sinhala (Sri Lanka)",
  si: "Sinhala",
  sk_SK: "Slovak (Slovakia)",
  sk: "Slovak",
  sl_SI: "Slovenian (Slovenia)",
  sl: "Slovenian",
  xog_UG: "Soga (Uganda)",
  xog: "Soga",
  so_DJ: "Somali (Djibouti)",
  so_ET: "Somali (Ethiopia)",
  so_KE: "Somali (Kenya)",
  so_SO: "Somali (Somalia)",
  so: "Somali",
  es_AR: "Spanish (Argentina)",
  es_BO: "Spanish (Bolivia)",
  es_CL: "Spanish (Chile)",
  es_CO: "Spanish (Colombia)",
  es_CR: "Spanish (Costa Rica)",
  es_DO: "Spanish (Dominican Republic)",
  es_EC: "Spanish (Ecuador)",
  es_SV: "Spanish (El Salvador)",
  es_GQ: "Spanish (Equatorial Guinea)",
  es_GT: "Spanish (Guatemala)",
  es_HN: "Spanish (Honduras)",
  es_419: "Spanish (Latin America)",
  es_MX: "Spanish (Mexico)",
  es_NI: "Spanish (Nicaragua)",
  es_PA: "Spanish (Panama)",
  es_PY: "Spanish (Paraguay)",
  es_PE: "Spanish (Peru)",
  es_PR: "Spanish (Puerto Rico)",
  es_ES: "Spanish (Spain)",
  es_US: "Spanish (United States)",
  es_UY: "Spanish (Uruguay)",
  es_VE: "Spanish (Venezuela)",
  es: "Spanish",
  sw_KE: "Swahili (Kenya)",
  sw_TZ: "Swahili (Tanzania)",
  sw: "Swahili",
  sv_FI: "Swedish (Finland)",
  sv_SE: "Swedish (Sweden)",
  sv: "Swedish",
  gsw_CH: "Swiss German (Switzerland)",
  gsw: "Swiss German",
  shi_Latn: "Tachelhit (Latin)",
  shi_Latn_MA: "Tachelhit (Latin, Morocco)",
  shi_Tfng: "Tachelhit (Tifinagh)",
  shi_Tfng_MA: "Tachelhit (Tifinagh, Morocco)",
  shi: "Tachelhit",
  dav_KE: "Taita (Kenya)",
  dav: "Taita",
  ta_IN: "Tamil (India)",
  ta_LK: "Tamil (Sri Lanka)",
  ta: "Tamil",
  te_IN: "Telugu (India)",
  te: "Telugu",
  teo_KE: "Teso (Kenya)",
  teo_UG: "Teso (Uganda)",
  teo: "Teso",
  th_TH: "Thai (Thailand)",
  th: "Thai",
  bo_CN: "Tibetan (China)",
  bo_IN: "Tibetan (India)",
  bo: "Tibetan",
  ti_ER: "Tigrinya (Eritrea)",
  ti_ET: "Tigrinya (Ethiopia)",
  ti: "Tigrinya",
  to_TO: "Tonga (Tonga)",
  to: "Tonga",
  tr_TR: "Turkish (Turkey)",
  tr: "Turkish",
  uk_UA: "Ukrainian (Ukraine)",
  uk: "Ukrainian",
  ur_IN: "Urdu (India)",
  ur_PK: "Urdu (Pakistan)",
  ur: "Urdu",
  uz_Arab: "Uzbek (Arabic)",
  uz_Arab_AF: "Uzbek (Arabic, Afghanistan)",
  uz_Cyrl: "Uzbek (Cyrillic)",
  uz_Cyrl_UZ: "Uzbek (Cyrillic, Uzbekistan)",
  uz_Latn: "Uzbek (Latin)",
  uz_Latn_UZ: "Uzbek (Latin, Uzbekistan)",
  uz: "Uzbek",
  vi_VN: "Vietnamese (Vietnam)",
  vi: "Vietnamese",
  vun_TZ: "Vunjo (Tanzania)",
  vun: "Vunjo",
  cy_GB: "Welsh (United Kingdom)",
  cy: "Welsh",
  yo_NG: "Yoruba (Nigeria)",
  yo: "Yoruba",
  zu_ZA: "Zulu (South Africa)",
  zu: "Zulu",
};
export { LANGUAGES, TRANSLATION_KEYS_MAPPING, TRANSLATIONS, LOCALES };
