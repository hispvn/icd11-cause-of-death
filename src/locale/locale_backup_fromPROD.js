const resources = {
  translations: [
    {
      key: "selectOrgUnit",
      translation: {
        en: "Select organisation unit",
        fr: "Sélectionnez l'unité d'organisation",
      },
    },
    {
      key: "newRegistration",
      translation: { en: "New Registration", fr: " Nouvelle inscription" },
    },
    { key: "search", translation: { en: "Search", fr: "Chercher" } },
    { key: "exit", translation: { en: "Exit", fr: "Sortir" } },
    { key: "page", translation: { en: "Page", fr: "Page" } },
    { key: "profile", translation: { en: "Profile", fr: "Le profil" } },
    { key: "save", translation: { en: "Save", fr: "Sauver" } },
    { key: "cancel", translation: { en: "Cancel", fr: "Annuler" } },
    {
      key: "certificate",
      translation: { en: "Certificate", fr: "Certificat" },
    },
    {
      key: "causeOfDeath",
      translation: { en: "Cause of Death", fr: "Cause de décès" },
    },
    { key: "frameA", translation: { en: "Frame A", fr: "Cadre A" } },
    { key: "frameB", translation: { en: "Frame B", fr: "Cadre B" } },
    {
      key: "medicalData",
      translation: { en: "Medical data", fr: "Données médicales" },
    },
    { key: "results", translation: { en: "Results", fr: "Résultats" } },
    { key: "surgery", translation: { en: "Surgery", fr: "Opération" } },
    {
      key: "mannerOfDeath",
      translation: { en: "Manner of Death", fr: "Manière de mourir" },
    },
    {
      key: "fetalOrInfantDeath",
      translation: {
        en: "Fetal of Infant Death",
        fr: "Mort fœtale du nourrisson",
      },
    },
    {
      key: "pleaseSelectYear",
      translation: {
        en: "Please select year",
        fr: "Veuillez sélectionner l'année",
      },
    },
    { key: "run", translation: { en: "RUN", fr: "COURS" } },
    {
      key: "anacodExportExcel",
      translation: {
        en: "Anacod Export (Excel)",
        fr: "Export Anacode (Excel)",
      },
    },
    {
      key: "mortalityLevels",
      translation: { en: "Mortality levels", fr: "Niveaux de mortalité" },
    },
    {
      key: "mortalityFromBroadCausesOfDeath",
      translation: {
        en: "Mortality from broad causes of death",
        fr: "Mortalité due aux causes générales de décès",
      },
    },
    {
      key: "mortalityByCauseAgeAndSex",
      translation: {
        en: "Mortality by cause, age and sex",
        fr: "Mortalité par cause, âge et sexe",
      },
    },
    {
      key: "mortalityFromNcds",
      translation: { en: "Mortality from NCDs", fr: "Mortalité due aux MNT" },
    },
    {
      key: "mostFrequentCauseOfDeath",
      translation: {
        en: "Most frequent cause of death",
        fr: "Cause de décès la plus fréquente",
      },
    },
    {
      key: "deathsByIcd11Chapter",
      translation: {
        en: "Deaths by ICD-11 Chapter",
        fr: "Deaths by ICD-11 Chapter",
      },
    },
    { key: "attributes", translation: { en: "Attributes" } },
    { key: "next", translation: { en: "Next" } },
    { key: "defaultAttributes", translation: { en: "Default attributes" } },
    { key: "femaleOption", translation: { en: "Female option" } },
    { key: "item", translation: { en: "Item" } },
    { key: "availableAttributes", translation: { en: "Available attributes" } },
    { key: "selectedAttributes", translation: { en: "Selected attributes" } },
    { key: "add", translation: { en: "Add", fr: "Ajouter" } },
    { key: "reload", translation: { en: "Reload", fr: "Recharger" } },
    {
      key: "translation",
      translation: { en: "Translation", fr: "Traduction" },
    },
    {
      key: "dataEntry",
      translation: { en: "Data Entry", fr: "Saisie des données" },
    },
    {
      key: "anacodExport",
      translation: { en: "Anacod Export", fr: "Exportation d'Anacod" },
    },
    {
      key: "dashboard",
      translation: { en: "Dashboard", fr: "Tableau de bord" },
    },
    {
      key: "administration",
      translation: { en: "Administration", fr: "Administration" },
    },
    {
      key: "exitApp",
      translation: { en: "Exit App", fr: "Quitter l'application" },
    },
    {
      key: "orgUnit",
      translation: { en: "Org Unit", fr: "Unité organisationnelle" },
    },
    {
      key: "addLanguage",
      translation: { en: "Add Language", fr: "Ajouter une langue" },
    },
    {
      key: "pleaseSelectLanguage",
      translation: {
        en: "Please select a language",
        fr: "Veuillez sélectionner une langue",
      },
    },
    {
      key: "lastUpdated",
      translation: { en: "Last updated", fr: "Dernière mise à jour" },
    },
    {
      key: "causeOfDeathApp",
      translation: {
        en: "Cause Of Death App",
        fr: " Application Cause de décès",
      },
    },
    {
      key: "inputSearchText",
      translation: {
        en: "Input search text",
        fr: "Saisir le texte de recherche",
      },
    },
    { key: "select", translation: { en: "Select", fr: "Sélectionner" } },
    {
      key: "triggerDesc",
      translation: {
        en: "Click to sort descending",
        fr: "Cliquez pour trier par ordre décroissant",
      },
    },
    {
      key: "triggerAsc",
      translation: {
        en: "Click to sort ascending",
        fr: "Cliquez pour trier par ordre croissant",
      },
    },
    {
      key: "cancelSort",
      translation: {
        en: "Click to cancel sorting",
        fr: "Cliquez pour annuler le tri",
      },
    },
    {
      key: "step1Installation",
      translation: { en: "1 - Installation", fr: "1 - Mise en place" },
    },
    {
      key: "step2Attribute",
      translation: { en: "2 - Attributes", fr: "2 - Attributs" },
    },
    {
      key: "step3FrameA",
      translation: { en: "3 - Frame A", fr: "3 - Cadre A" },
    },
    {
      key: "step4FrameB",
      translation: { en: "4 - Frame B", fr: "4 - Cadre B" },
    },
    {
      key: "step5OUs",
      translation: {
        en: "5 - Assign OrgUnits",
        fr: "5 - Attribuer des unités d'organisation",
      },
    },
    {
      key: "step6Users",
      translation: {
        en: "6 - Assign Users",
        fr: "6 - Attribuer des utilisateurs",
      },
    },
    {
      key: "step7Review",
      translation: { en: "7 - Review & Finish", fr: "7 - Réviser et terminer" },
    },
    {
      key: "errorMissingTET",
      translation: {
        en: "ERROR Please select ALL default attributes and Tracked Entity Type.",
        fr: "ERREUR Veuillez sélectionner TOUS les attributs par défaut et le type d'entité suivie.",
      },
    },
    {
      key: "step1Attributes",
      translation: { en: "1 - Attributes", fr: "1 - Attributs" },
    },
    {
      key: "step2Certificate",
      translation: { en: "2 - Certificate", fr: "2 - Certificat" },
    },
    {
      key: "saveSuccessful",
      translation: { en: "Successfully Save!", fr: "Enregistrer avec succès!" },
    },
    {
      key: "selectionTitle",
      translation: {
        en: "INSTALLATION OF WHO MCCD PACKAGE",
        fr: "INSTALLATION DU PACKAGE WHO MCCD",
      },
    },
    {
      key: "globalICDTool",
      translation: {
        en: "Use global WHO ICD Tool url",
        fr: "Utiliser l'URL de l'outil ICD global de l'OMS",
      },
    },
    {
      key: "otherICDTool",
      translation: {
        en: "Use other ICD Tool url",
        fr: "Utiliser une autre URL de l'outil ICD",
      },
    },
    {
      key: "defaultInstallation",
      translation: {
        en: "Default Installation",
        fr: "Installation par défaut",
      },
    },
    {
      key: "defaultInstallationInfo",
      translation: {
        en: "Use default MCCOD program with minimum configurations",
        fr: "Utiliser le programme MCCOD par défaut avec des configurations minimales",
      },
    },
    {
      key: "customInstallation",
      translation: {
        en: "Custom Installation",
        fr: "Installation personnalisée",
      },
    },
    {
      key: "customInstallationInfo",
      translation: {
        en: "Use default MCCOD program with additional metadata as you need",
        fr: "Utilisez le programme MCCOD par défaut avec des métadonnées supplémentaires selon vos besoins",
      },
    },
    {
      key: "installWithDocker",
      translation: {
        en: "How to install ICD-11 API Server using Docker:",
        fr: "Comment installer le serveur API ICD-11 à l'aide de Docker:",
      },
    },
    {
      key: "installationWarning",
      translation: {
        en: "COD app could not start the installation process.",
        fr: "L'application COD n'a pas pu démarrer le processus d'installation.",
      },
    },
    {
      key: "installationWarningTitle",
      translation: {
        en: "The app setup requires Organisation Units and assigned Users. Please check whether they created.",
        fr: "La configuration de l'application nécessite des unités organisationnelles et des utilisateurs affectés. Veuillez vérifier s'ils ont créé.",
      },
    },
    {
      key: "backToMaintenance",
      translation: {
        en: "Go to Maintenance app",
        fr: "Accédez à l'application Maintenance",
      },
    },
    {
      key: "trackedEntityType",
      translation: { en: "Tracked Entity Type", fr: "Type d'entité suivie" },
    },
    {
      key: "systemID",
      translation: {
        en: "COD System ID (auto-generated)",
        fr: "ID système COD (généré automatiquement)",
      },
    },
    {
      key: "defaultAttribute",
      translation: { en: "Default attributes", fr: "Attributs par défaut" },
    },
    {
      key: "otherAttributes",
      translation: { en: "Other attributes", fr: "Autres attributs" },
    },
    {
      key: "otherAvailableAttributes",
      translation: { en: "Available attributes", fr: "Attributs disponibles" },
    },
    {
      key: "otherSelectedAttributes",
      translation: { en: "Selected attributes", fr: "Attributs sélectionnés" },
    },
    {
      key: "defaultDEsInFrameA",
      translation: {
        en: "Default data elements (cannot be changed)",
        fr: "Éléments de données par défaut (ne peuvent pas être modifiés)",
      },
    },
    {
      key: "otherSectionsInFrameA",
      translation: { en: "Other sections", fr: "Autres rubriques" },
    },
    {
      key: "availableDEs",
      translation: {
        en: "Available data elements",
        fr: "Éléments de données disponibles",
      },
    },
    {
      key: "selectedDEs",
      translation: {
        en: "Selected data elements",
        fr: "Éléments de données sélectionnés",
      },
    },
    {
      key: "defaultSectionsInFrameB",
      translation: { en: "Default sections", fr: "Rubriques par défaut" },
    },
    {
      key: "otherSectionsInFrameB",
      translation: { en: "Other sections", fr: "Autres rubriques" },
    },
    {
      key: "OULevel",
      translation: {
        en: "Organisation unit level:",
        fr: "Niveau de l'unité d'organisation:",
      },
    },
    {
      key: "OUGroup",
      translation: {
        en: "Organisation unit group:",
        fr: "Groupe d'unités d'organisation:",
      },
    },
    { key: "deselect", translation: { en: "Deselect", fr: "Désélectionner" } },
    {
      key: "selectAll",
      translation: { en: "Select all", fr: "Tout sélectionner" },
    },
    {
      key: "deselectAll",
      translation: { en: "Deselect all", fr: "Tout déselectionner" },
    },
    {
      key: "adminGroup",
      translation: { en: "ADMIN GROUP", fr: "GROUPE D'ADMINISTRATION" },
    },
    {
      key: "captureGroup",
      translation: { en: "CAPTURE GROUP", fr: "GROUPE DE CAPTURE" },
    },
    {
      key: "viewGroup",
      translation: { en: "VIEW GROUP", fr: "VOIR LE GROUPE" },
    },
    {
      key: "installing",
      translation: {
        en: "Installing the COD app",
        fr: "22 / 5,000 Translation results Translation result Installation de l'application COD",
      },
    },
    {
      key: "waitForInstalling",
      translation: {
        en: "Please wait untill the process done.",
        fr: "Veuillez patienter jusqu'à ce que le processus soit terminé.",
      },
    },
    {
      key: "importAttributes",
      translation: {
        en: "Importing Attributes",
        fr: "Importation d'attributs",
      },
    },
    {
      key: "importOptionSets",
      translation: {
        en: "Importing Option Sets",
        fr: "Importation de jeux d'options",
      },
    },
    {
      key: "importTrackedEntityAttributes",
      translation: {
        en: "Importing Tracked Entity Attributes",
        fr: "Importation des attributs d'entité suivie",
      },
    },
    {
      key: "importTrackedEntityTypes",
      translation: {
        en: "Importing Tracked Entity Types",
        fr: "Importation de types d'entités suivies",
      },
    },
    {
      key: "importDataElements",
      translation: {
        en: "Importing Data Elements",
        fr: "Importation d'éléments de données",
      },
    },
    {
      key: "importPrograms",
      translation: {
        en: "Importing Programs",
        fr: "Importation de programmes",
      },
    },
    {
      key: "importProgramStages",
      translation: {
        en: "Importing Program Stages",
        fr: "Importation des étapes du programme",
      },
    },
    {
      key: "importProgramStageSections",
      translation: {
        en: "Importing Program Stage Sections",
        fr: "Importation de sections d'étape de programme",
      },
    },
    {
      key: "importProgramIndicators",
      translation: {
        en: "Importing Program Indicators",
        fr: "Importation des indicateurs de programme",
      },
    },
    {
      key: "importIndicators",
      translation: {
        en: "Importing Indicators",
        fr: "Importation d'indicateurs",
      },
    },
    {
      key: "importOptions",
      translation: { en: "Importing Options", fr: "Options d'importation" },
    },
    {
      key: "complete",
      translation: { en: "Install Complete", fr: "Installation terminée" },
    },
    {
      key: "programID",
      translation: { en: "The program id:", fr: "L'identifiant du programme:" },
    },
    { key: "defaultCertificate", translation: { en: "Default", fr: "Défaut" } },
    {
      key: "customCertificate",
      translation: { en: "Custom", fr: "Personnalisé" },
    },
    { key: "certificateTitle", translation: { en: "Title", fr: "Titre" } },
    { key: "certificateLogo", translation: { en: "Logo", fr: "Logo" } },
    { key: "upload", translation: { en: "Upload", fr: "Télécharger" } },
    {
      key: "addItemBody",
      translation: {
        en: "Add an item to Body",
        fr: "Ajouter un élément au corps",
      },
    },
    {
      key: "addItemFooter",
      translation: {
        en: "Add an item to Footer",
        fr: "Ajouter un élément au pied de page",
      },
    },
    {
      key: "reviewDefaultCertificate",
      translation: { en: "Review", fr: "Passer en revue" },
    },
    {
      key: "certificateAddItemTitle",
      translation: { en: "Add an item to", fr: "Ajouter un élément à" },
    },
    { key: "print", translation: { en: "Print", fr: "Imprimer" } },
    { key: "close", translation: { en: "Close", fr: "Proche" } },
    {
      key: "reportedDate",
      translation: { en: "Reported Date", fr: "Date du rapport" },
    },
    {
      key: "incidentDate",
      translation: { en: "Date of Death", fr: "Date de décès" },
    },
    {
      key: "printCertificate",
      translation: { en: "Certificate", fr: "Certificat" },
    },
    {
      key: "reasonLeadingToDeath",
      translation: {
        en: "Disease or condition directly leading to death",
        fr: "Maladie ou affection entraînant directement la mort",
      },
    },
    {
      key: "timeFromOnsetToDeath",
      translation: {
        en: "Time from onset to death",
        fr: "Délai entre le début et la mort",
      },
    },
    { key: "underlying", translation: { en: "Underlying", fr: "Sous-jacent" } },
    { key: "immediate", translation: { en: "Immediate", fr: "Immédiat" } },
    {
      key: "reportDirection",
      translation: {
        en: "Report chain of events in 'due to' order (B - C - D) if applicable. State the underlying cause on the lowest used line, and tick the checkbox for 'Underlying'",
        fr: "Indiquez la chaîne d'événements dans l'ordre « dû à » (B - C - D), le cas échéant. Indiquez la cause sous-jacente sur la ligne utilisée la plus basse et cochez la case \"Sous-jacent\"",
      },
    },
    { key: "dueTo", translation: { en: "Due to", fr: "En raison de" } },
    {
      key: "otherReasonLeadingToDeath",
      translation: {
        en: "Other significant conditions contributing to death (time intervals can be included in brackets after the condition)",
        fr: "Autres affections importantes contribuant au décès (les intervalles de temps peuvent être inclus entre parenthèses après l'affection)",
      },
    },
    {
      key: "underlyingCOD",
      translation: {
        en: "Underlying cause of death",
        fr: "Cause sous-jacente du décès",
      },
    },
    {
      key: "icd11Chapter",
      translation: { en: "ICD-11 Chapter", fr: "Chapitre CIM-11" },
    },
    {
      key: "icd11Grouping",
      translation: { en: "ICD-11 Grouping", fr: "Groupement CIM-11" },
    },
    { key: "icd11", translation: { en: "ICD-11", fr: "CIM-11" } },
    {
      key: "surgeryWithin4months",
      translation: {
        en: "Was surgery performed within the last 4 weeks?",
        fr: "La chirurgie a-t-elle été pratiquée au cours des 4 dernières semaines ?",
      },
    },
    {
      key: "surgeryDate",
      translation: {
        en: "If yes, please specify date of surgery",
        fr: "Si oui, veuillez préciser la date de l'intervention",
      },
    },
    {
      key: "surgeryReason",
      translation: {
        en: "If yes, please specify reason for surgery (disease or condition)",
        fr: "Si oui, veuillez préciser la raison de la chirurgie (maladie ou affection)",
      },
    },
    {
      key: "autopsy",
      translation: {
        en: "Was an autopsy requested?",
        fr: "Une autopsie a-t-elle été demandée ?",
      },
    },
    {
      key: "findings",
      translation: {
        en: "If yes, were the findings used in the certification?",
        fr: "Si oui, les résultats ont-ils été utilisés dans la certification ?",
      },
    },
    {
      key: "posisoning",
      translation: {
        en: "If external cause or posisoning, date of injury",
        fr: "Si cause externe ou intoxication, date de la blessure",
      },
    },
    {
      key: "describe",
      translation: {
        en: "Please describe how external cause occurred (if poisoning, please specify poisoning agent)",
        fr: "Veuillez décrire comment la cause externe s'est produite (en cas d'empoisonnement, veuillez préciser l'agent empoisonnant)",
      },
    },
    {
      key: "occurrencePlace",
      translation: {
        en: "Place of occurrence of the external cause",
        fr: "Lieu de survenance de la cause externe",
      },
    },
    {
      key: "occurrenceSpecifyPlace",
      translation: {
        en: "Specify place of occurence of the external cause",
        fr: "Préciser le lieu d'apparition de la cause externe",
      },
    },
    {
      key: "pregnant",
      translation: { en: "Multiple pregnancy?", fr: "Grossesse multiple?" },
    },
    { key: "stillborn", translation: { en: "Stillborn?", fr: "Mort-né?" } },
    {
      key: "hoursSurvived",
      translation: {
        en: "If death within 24hrs specify number of hours survived",
        fr: "Si décès dans les 24h précisez le nombre d'heures de survie",
      },
    },
    {
      key: "birthWeight",
      translation: {
        en: "Birth weight (in grams)",
        fr: "Poids à la naissance (en grammes)",
      },
    },
    {
      key: "pregnantWeeks",
      translation: {
        en: "Number of completed weeks of pregnancy",
        fr: "Nombre de semaines de grossesse révolues",
      },
    },
    {
      key: "motherAge",
      translation: {
        en: "Age of mother (in years)",
        fr: "Âge de la mère (en années)",
      },
    },
    {
      key: "perinatal",
      translation: {
        en: "If death was perinatal, state conditions of mother that affected the fetus and newborn",
        fr: "Si le décès était périnatal, indiquer les conditions de la mère qui ont affecté le fœtus et le nouveau-né",
      },
    },
    {
      key: "maternal",
      translation: { en: "Maternal death", fr: "Décès maternel" },
    },
    {
      key: "pregnancyLastYear",
      translation: {
        en: "For women, was the deceased pregnant within the past year?",
        fr: "Pour les femmes, la personne décédée était-elle enceinte au cours de la dernière année?",
      },
    },
    {
      key: "timePregnancy",
      translation: {
        en: "If yes, time from pregnancy",
        fr: "Si oui, le temps depuis la grossesse",
      },
    },
    {
      key: "pregnancyToDeath",
      translation: {
        en: "Did the pregnancy contribute to the death?",
        fr: "La grossesse a-t-elle contribué au décès?",
      },
    },
    { key: "mortalityLevel", translation: { en: "hehehehe" } },
    {
      key: "mortalityRateAllAges",
      translation: { en: "Mortality rate, all ages" },
    },
    { key: "registration", translation: { en: "Registration" } },
    {
      key: "mortalityRateAllAge",
      translation: { en: "Mortality rate, all ages" },
    },
    {
      key: "mortalityRateNeonates",
      translation: { en: "Mortality rate, neonates (0-27 days)" },
    },
    {
      key: "mortalityRateInfant",
      translation: { en: "Mortality rate, infant (< 1 year of age)" },
    },
    {
      key: "mortalityRateChildren",
      translation: { en: "Mortality rate, children < 5 years of age" },
    },
    {
      key: "mortalityRateAge0To14",
      translation: { en: "Mortality rate, age 0-14 years " },
    },
    {
      key: "mortalityRateAge15To49",
      translation: { en: "Mortality rate, age 15-49 years " },
    },
    {
      key: "mortalityRateAgeAbove50",
      translation: { en: "Mortality rate, 50 years and above" },
    },
    {
      key: "mortalityRateAge30To70",
      translation: { en: "Mortality rate, age 30-70 years" },
    },
    {
      key: "proportionOfDeathFromBroadCauses",
      translation: {
        en: "Proportion of deaths from broad causes (all sexes, all ages)",
      },
    },
    {
      key: "proportionOfDeathFromBroadCausesAll",
      translation: {
        en: "Proportion of deaths from broad causes (all sexes, all ages)",
        fr: "Proportion de décès de causes générales (tous sexes, tous âges)",
      },
    },
    {
      key: "mortalityFromBoardCausesOfDeath",
      translation: {
        en: "Mortality from broad causes of death",
        fr: "Mortality from broad causes of death",
      },
    },
    {
      key: "distributionOfDeathByBroadCausesAndAgeGroups",
      translation: {
        en: "Distribution of deaths by broad causes and age groups",
        fr: "Répartition des décès par grandes causes et groupes d'âge",
      },
    },
    {
      key: "overViewDistributionOfDeath",
      translation: {
        en: "Overview of the distribution of causes of total deaths grouped by category",
        fr: "Aperçu de la répartition des causes de décès totaux regroupées par catégorie",
      },
    },
    {
      key: "clickOnBubleForDetail",
      translation: {
        en: "Click on each buble for details",
        fr: "Cliquez sur chaque bulle pour plus de détails",
      },
    },
    {
      key: "communicable",
      translation: { en: "communicable", fr: "transmissible" },
    },
    {
      key: "nonCommunicable",
      translation: { en: "non-communicable", fr: "non communicable" },
    },
    {
      key: "externalCauses",
      translation: { en: "external causes", fr: "causes externes" },
    },
    { key: "illDefined", translation: { en: "ill-defined", fr: "mal défini" } },
    {
      key: "numberOfDeathBy",
      translation: { en: "Number of Death by", fr: "Nombre de décès par" },
    },
    {
      key: "tuberculosis",
      translation: { en: "Tuberculosis", fr: "Tuberculose" },
    },
    {
      key: "sexuallyTransmittedDiseasesExcludingHiv",
      translation: {
        en: "Sexually transmitted diseases excluding HIV",
        fr: "Maladies sexuellement transmissibles hors VIH",
      },
    },
    { key: "hiv", translation: { en: "HIV", fr: "VIH" } },
    {
      key: "diarrhoealDiseases",
      translation: { en: "Diarrhoeal diseases", fr: "Maladies diarrhéiques" },
    },
    { key: "pertussis", translation: { en: "Pertussis", fr: "Coqueluche" } },
    {
      key: "poliomyelitis",
      translation: { en: "Poliomyelitis", fr: "Poliomyélite" },
    },
    { key: "diphtheria", translation: { en: "Diphtheria", fr: "Diphtérie" } },
    { key: "measles", translation: { en: "Measles", fr: "Rougeole" } },
    { key: "tetanus", translation: { en: "Tetanus", fr: "Tétanos" } },
    { key: "meningitis", translation: { en: "Meningitis", fr: "Méningite" } },
    { key: "hepatitisB", translation: { en: "Hepatitis B", fr: "Hépatite B" } },
    { key: "hepatitisC", translation: { en: "Hepatitis C", fr: "Hépatite C" } },
    { key: "malaria", translation: { en: "Malaria", fr: "Paludisme" } },
    {
      key: "tropicalClusterDiseases",
      translation: {
        en: "Tropical-cluster diseases",
        fr: "Maladies du cluster tropical",
      },
    },
    {
      key: "lowerRespiratoryInfections",
      translation: {
        en: "Lower respiratory infections",
        fr: "Infections des voies respiratoires inférieures",
      },
    },
    {
      key: "maternalConditions",
      translation: { en: "Maternal conditions", fr: "Conditions maternelles" },
    },
    {
      key: "conditionsArisingDuringThePerinatalPeriod",
      translation: {
        en: "Conditions arising during the perinatal period",
        fr: "Conditions survenant pendant la période périnatale",
      },
    },
    {
      key: "nutritionalDeficiencies",
      translation: {
        en: "Nutritional deficiencies",
        fr: "Déficiences nutritionnelles",
      },
    },
    {
      key: "mouthAndOropharynxCancers",
      translation: {
        en: "Mouth and oropharynx cancers",
        fr: "Cancers de la bouche et de l'oropharynx",
      },
    },
    {
      key: "oesophagusCancer",
      translation: { en: "Oesophagus cancer", fr: "Cancer de l'œsophage" },
    },
    {
      key: "stomachCancer",
      translation: { en: "Stomach cancer", fr: "Cancer de l'estomac" },
    },
    {
      key: "colonAndRectumCancers",
      translation: {
        en: "Colon and rectum cancers",
        fr: "Cancers du côlon et du rectum",
      },
    },
    {
      key: "liverCancer",
      translation: { en: "Liver cancer", fr: "Cancer du foie" },
    },
    {
      key: "pancreasCancer",
      translation: { en: "Pancreas cancer", fr: "Cancer du pancréas" },
    },
    {
      key: "tracheaBronchusAndLungCancers",
      translation: {
        en: "Trachea, bronchus and lung cancers",
        fr: "Cancers de la trachée, des bronches et du poumon",
      },
    },
    {
      key: "melanomaAndOtherSkinCancers",
      translation: {
        en: "Melanoma and other skin cancers",
        fr: "Mélanome et autres cancers de la peau",
      },
    },
    {
      key: "breastCancer",
      translation: { en: "Breast cancer", fr: "Cancer du sein" },
    },
    {
      key: "cervixUteriCancer",
      translation: {
        en: "Cervix uteri cancer",
        fr: "Cancer du col de l'utérus",
      },
    },
    {
      key: "corpusUteriCancer",
      translation: { en: "Corpus uteri cancer", fr: "Cancer du corps utérin" },
    },
    {
      key: "ovaryCancer",
      translation: { en: "Ovary cancer", fr: "Cancer de l'ovaire" },
    },
    {
      key: "prostateCancer",
      translation: { en: "Prostate cancer", fr: "Cancer de la prostate" },
    },
    {
      key: "bladderCancer",
      translation: { en: "Bladder cancer", fr: "Cancer de la vessie" },
    },
    {
      key: "lymphomasAndMultipleMyeloma",
      translation: {
        en: "Lymphomas and multiple myeloma",
        fr: "Lymphomes et myélome multiple",
      },
    },
    { key: "leukaemia", translation: { en: "Leukaemia", fr: "Leucémie" } },
    {
      key: "alzheimerAndOtherDementias",
      translation: {
        en: "Alzheimer and other dementias",
        fr: "Alzheimer et autres démences",
      },
    },
    {
      key: "parkinsonDisease",
      translation: { en: "Parkinson disease", fr: "Maladie de Parkinson" },
    },
    {
      key: "hypertensiveDisease",
      translation: { en: "Hypertensive disease", fr: "Maladie hypertensive" },
    },
    {
      key: "ischaemicHeartDisease",
      translation: {
        en: "Ischaemic heart disease",
        fr: "Cardiopathie ischémique",
      },
    },
    {
      key: "cerebrovascularDisease",
      translation: {
        en: "Cerebrovascular disease",
        fr: "Maladie cérébrovasculaire",
      },
    },
    {
      key: "chronicObstructivePulmonaryDisease",
      translation: {
        en: "Chronic obstructive pulmonary disease",
        fr: "Bronchopneumopathie chronique obstructive",
      },
    },
    { key: "asthma", translation: { en: "Asthma", fr: "Asthme" } },
    {
      key: "digestiveDiseases",
      translation: { en: "Digestive diseases", fr: "Maladies digestives" },
    },
    {
      key: "genitoUrinaryDiseases",
      translation: {
        en: "Genito-urinary diseases",
        fr: "Maladies génito-urinaires",
      },
    },
    {
      key: "congenitalAnomalies",
      translation: { en: "Congenital anomalies", fr: "Anomalies congénitales" },
    },
    {
      key: "roadTrafficAccidents",
      translation: {
        en: "Road traffic accidents",
        fr: "Accidents de la route",
      },
    },
    { key: "suicide", translation: { en: "Suicide", fr: "Suicide" } },
    { key: "homicide", translation: { en: "Homicide", fr: "Homicide" } },
    {
      key: "mortaliryFromNcds",
      translation: { en: "Mortality from NCDs", fr: "Mortalité due aux MNT" },
    },
    {
      key: "malignantNeoplasms",
      translation: { en: "Malignant neoplasms", fr: "Néoplasmes malins" },
    },
    {
      key: "diabetesMellitus",
      translation: { en: "Diabetes mellitus", fr: "Diabète sucré" },
    },
    {
      key: "cardiovascularDiseases",
      translation: {
        en: "Cardiovascular diseases",
        fr: "Maladies cardiovasculaires",
      },
    },
    {
      key: "respiratoryDiseases",
      translation: { en: "Respiratory diseases", fr: "Maladies respiratoires" },
    },
    {
      key: "numberOfDeathBySexAndAge",
      translation: {
        en: "Number of deaths by sex and age",
        fr: "Nombre de décès selon le sexe et l'âge",
      },
    },
    {
      key: "numberOfDeathByMonth",
      translation: {
        en: "Number of deaths by month",
        fr: "Nombre de décès par mois",
      },
    },
    { key: "pneumonia", translation: { en: "Pneumonia", fr: "Pneumonie" } },
    {
      key: "otherDiseasesOfTheDigestiveSystem",
      translation: {
        en: "Other diseases of the digestive system",
        fr: "Autres maladies du système digestif",
      },
    },
    {
      key: "otherDirectObstetricDeaths",
      translation: {
        en: "Other direct obstetric deaths",
        fr: "Autres décès obstétricaux directs",
      },
    },
    {
      key: "prematurity",
      translation: { en: "Prematurity", fr: "Prématurité" },
    },
    {
      key: "symptomsSignAndAbnormalClinicalAndLaboratoryFindingsNotElsewhereClassified",
      translation: {
        en: "Symptoms sign and abnormal clinical and laboratory findings, not elsewhere classified",
        fr: "Symptômes et résultats cliniques et de laboratoire anormaux, non classés ailleurs",
      },
    },
    {
      key: "otherAndUnspecifiedCongenitalMalformations",
      translation: {
        en: "Other and unspecified congenital malformations",
        fr: "Malformations congénitales autres et non précisées",
      },
    },
    {
      key: "otherAndUnspecifiedPerinatalConditions",
      translation: {
        en: "Other and unspecified perinatal conditions",
        fr: "Affections périnatales autres et non précisées",
      },
    },
    {
      key: "intrauterineHypoxiaAndBirthAsphyxia",
      translation: {
        en: "Intrauterine hypoxia and birth asphyxia",
        fr: "Hypoxie intra-utérine et asphyxie à la naissance",
      },
    },
    { key: "name", translation: { en: "Name", fr: "Nom" } },
    { key: "point", translation: { en: "Point" } },
    { key: "points", translation: { en: "Points", fr: "Points" } },
    {
      key: "certainInfectiousOrParasiticDiseases",
      translation: {
        en: "Certain infectious or parasitic diseases",
        fr: "Certaines maladies infectieuses ou parasitaires",
      },
    },
    { key: "neoplasms", translation: { en: "Neoplasms", fr: "Tumeurs" } },
    {
      key: "diseasesOfTheBloodOrBloodFormingOrgans",
      translation: {
        en: "Diseases of the blood or blood-forming organs",
        fr: "Maladies du sang ou des organes hématopoïétiques",
      },
    },
    {
      key: "diseasesOfTheImmuneSystem",
      translation: {
        en: "Diseases of the immune system",
        fr: "Maladies du système immunitaire",
      },
    },
    {
      key: "endocrineNutritionalOrMetabolicDiseases",
      translation: {
        en: "Endocrine, nutritional or metabolic diseases",
        fr: "Maladies endocriniennes, nutritionnelles ou métaboliques",
      },
    },
    {
      key: "mentalBehaviouralOrNeurodevelopmentalDisorders",
      translation: {
        en: "Mental, behavioural or neurodevelopmental disorders",
        fr: "Troubles mentaux, comportementaux ou neurodéveloppementaux",
      },
    },
    {
      key: "sleepWakeDisorders",
      translation: {
        en: "Sleep-wake disorders",
        fr: "Troubles veille-sommeil",
      },
    },
    {
      key: "diseasesOfTheNervousSystem",
      translation: {
        en: "Diseases of the nervous system",
        fr: "Maladies du système nerveux",
      },
    },
    {
      key: "diseasesOfTheVisualSystem",
      translation: {
        en: "Diseases of the visual system",
        fr: "Maladies du système visuel",
      },
    },
    {
      key: "diseasesOfTheEarOrMastoidProcess",
      translation: {
        en: "Diseases of the ear or mastoid process",
        fr: "Maladies de l'oreille ou de l'apophyse mastoïdienne",
      },
    },
    {
      key: "diseasesOfTheCirculatorySystem",
      translation: {
        en: "Diseases of the circulatory system",
        fr: "Maladies du système circulatoire",
      },
    },
    {
      key: "diseasesOfTheRespiratorySystem",
      translation: {
        en: "Diseases of the respiratory system",
        fr: "Maladies du système respiratoire",
      },
    },
    {
      key: "diseasesOfTheDigestiveSystem",
      translation: {
        en: "Diseases of the digestive system",
        fr: "Maladies du système digestif",
      },
    },
    {
      key: "diseasesOfTheSkin",
      translation: { en: "Diseases of the skin", fr: "Maladies de la peau" },
    },
    {
      key: "diseasesOfTheMusculoskeletalSystemOrConnectiveTissue",
      translation: {
        en: "Diseases of the musculoskeletal system or connective tissue",
        fr: "Maladies du système musculo-squelettique ou du tissu conjonctif",
      },
    },
    {
      key: "diseasesOfTheGenitourinarySystem",
      translation: {
        en: "Diseases of the genitourinary system",
        fr: "Maladies de l'appareil génito-urinaire",
      },
    },
    {
      key: "conditionsRelatedToSexualHealth",
      translation: {
        en: "Conditions related to sexual health",
        fr: "Conditions liées à la santé sexuelle",
      },
    },
    {
      key: "pregnancyChildbirthOrThePuerperium",
      translation: {
        en: "Pregnancy, childbirth or the puerperium",
        fr: "Grossesse, accouchement ou puerpéralité",
      },
    },
    {
      key: "certainConditionsOriginatingInThePerinatalPeriod",
      translation: {
        en: "Certain conditions originating in the perinatal period",
        fr: "Certaines affections originaires de la période périnatale",
      },
    },
    {
      key: "developmentalAnomalies",
      translation: {
        en: "Developmental anomalies",
        fr: "Anomalies du développement",
      },
    },
    {
      key: "symptomsSignsOrClinicalFindingsNotElsewhereClassified",
      translation: {
        en: "Symptoms, signs or clinical findings, not elsewhere classified",
        fr: "Symptômes, signes ou constatations cliniques, non classés ailleurs",
      },
    },
    {
      key: "injuryPoisoningOrCertainOtherConsequencesOfExternalCauses",
      translation: {
        en: "Injury, poisoning or certain other consequences of external causes",
        fr: "Blessure, empoisonnement ou certaines autres conséquences de causes externes",
      },
    },
    {
      key: "externalCausesOfMorbidityOrMortality",
      translation: {
        en: "External causes of morbidity or mortality",
        fr: "Causes externes de morbidité ou de mortalité",
      },
    },
    {
      key: "factorsInfluencingHealthStatusOrContactWithHealthServices",
      translation: {
        en: "Factors influencing health status or contact with health services",
        fr: "Facteurs influençant l'état de santé ou le contact avec les services de santé",
      },
    },
    {
      key: "codesForSpecialPurposes",
      translation: {
        en: "Codes for special purposes",
        fr: "Codes à des fins spéciales",
      },
    },
    {
      key: "numberOfMalariaDeathsByMonth",
      translation: {
        en: "Number of malaria deaths by month",
        fr: "Nombre de décès dus au paludisme par mois",
      },
    },
    {
      key: "numberOfMalariaDeathsPlaceOfDeath",
      translation: {
        en: "Number of malaria deaths - place of death",
        fr: "Nombre de décès dus au paludisme - lieu du décès",
      },
    },
    {
      key: "numberOfMalariaDeathsBySex",
      translation: {
        en: "Number of malaria deaths by sex",
        fr: "Nombre de décès dus au paludisme par sexe",
      },
    },
    {
      key: "numberOfMalariaDeathsBySexAndDetailedAgeGroup",
      translation: {
        en: "Number of malaria deaths by sex and detailed age-group",
        fr: "Nombre de décès dus au paludisme par sexe et tranche d'âge détaillée",
      },
    },
    {
      key: "numberOfMalariaDeathsAndPercentOfAllMalariaDeathsByBroadAgeGroup",
      translation: {
        en: "Number of malaria deaths and percent of all malaria deaths by broad age-group",
        fr: "Nombre de décès dus au paludisme et pourcentage de tous les décès dus au paludisme par grand groupe d'âge",
      },
    },
    {
      key: "numberOfMalariaDeathsComparedWithOtherCausesOfDeaths",
      translation: {
        en: "Number of malaria deaths compared with other causes of deaths",
        fr: "Nombre de décès dus au paludisme par rapport aux autres causes de décès",
      },
    },
    { key: "male", translation: { en: "Male" } },
    { key: "female", translation: { en: "Female" } },
    {
      key: "percentOfTotalMalariaDeaths",
      translation: {
        en: "% of total malaria deaths",
        fr: "% du total des décès dus au paludisme",
      },
    },
    {
      key: "numberOfMalariaDeaths",
      translation: {
        en: "Number of malaria deaths",
        fr: "Nombre de décès dus au paludisme",
      },
    },
    {
      key: "otherCauses",
      translation: { en: "Other causes", fr: "Autres causes" },
    },
    {
      key: "numberOfTuberculosisDeathsByMonth",
      translation: {
        en: "Number of tuberculosis deaths by month",
        fr: "Number of tuberculosis deaths by month",
      },
    },
    {
      key: "numberOfTuberculosisDeathsByPlaceOfDeath",
      translation: {
        en: "Number of tuberculosis deaths by place of death",
        fr: "Nombre de décès par tuberculose par lieu de décès",
      },
    },
    {
      key: "numberOfTuberculosisDeathsBySex",
      translation: {
        en: "Number of tuberculosis deaths by sex",
        fr: "Nombre de décès dus à la tuberculose par sexe",
      },
    },
    {
      key: "numberOfTuberculosisDeathsBySexAndDetailedAgeGroup",
      translation: {
        en: "Number of tuberculosis deaths by sex and detailed age-group",
        fr: "Nombre de décès dus à la tuberculose par sexe et tranche d'âge détaillée",
      },
    },
    {
      key: "numberOfTuberculosisDeathsAndPercentOfAllTuberculosisDeathsByBroadAgeGroup",
      translation: {
        en: "Number of tuberculosis deaths and percent of all tuberculosis deaths by broad age-group",
        fr: "Nombre de décès dus à la tuberculose et pourcentage de tous les décès dus à la tuberculose par grand groupe d'âge",
      },
    },
    {
      key: "numberOfTuberculosisDeathsComparedWithOtherCausesOfDeaths",
      translation: {
        en: "Number of tuberculosis deaths compared with other causes of deaths",
        fr: "Nombre de décès dus à la tuberculose par rapport aux autres causes de décès",
      },
    },
    {
      key: "percentOfTotalTuberculosisDeaths",
      translation: {
        en: "% of total tuberculosis deaths",
        fr: "% du total des décès dus à la tuberculose",
      },
    },
    {
      key: "numberOfTuberculosisDeaths",
      translation: {
        en: "Number of tuberculosis deaths",
        fr: "Nombre de décès par tuberculose",
      },
    },
    {
      key: "numberOfAidsDeathsByMonth",
      translation: {
        en: "Number of AIDS deaths by month",
        fr: "Nombre de décès du SIDA par mois",
      },
    },
    {
      key: "numberOfAidsDeathsPlaceOfDeath",
      translation: {
        en: "Number of AIDS deaths - place of death",
        fr: "Nombre de décès dus au SIDA - lieu du décès",
      },
    },
    {
      key: "numberOfAidsDeathsBySex",
      translation: {
        en: "Number of AIDS deaths by sex",
        fr: "Nombre de décès dus au SIDA par sexe",
      },
    },
    {
      key: "numberOfAidsDeathsBySexAndDetailedAgeGroup",
      translation: {
        en: "Number of AIDS deaths by sex and detailed age-group",
        fr: "Nombre de décès dus au SIDA par sexe et tranche d'âge détaillée",
      },
    },
    {
      key: "numberOfAidsDeathsAndPercentOfAllAidsDeathsByBroadAgeGroup",
      translation: {
        en: "Number of AIDS deaths and percent of all AIDS deaths by broad age-group",
        fr: "Nombre de décès dus au sida et pourcentage de tous les décès dus au sida par grand groupe d'âge",
      },
    },
    {
      key: "numberOfAidsDeathsComparedWithOtherCausesOfDeaths",
      translation: {
        en: "Number of AIDS deaths compared with other causes of deaths",
        fr: "Nombre de décès dus au sida par rapport aux autres causes de décès",
      },
    },
    { key: "aisd", translation: { en: "AIDS" } },
    { key: "aids", translation: { en: "AIDS", fr: "SIDA" } },
    {
      key: "percentOfTotalAidsDeaths",
      translation: {
        en: "% of total AIDS deaths",
        fr: "% du total des décès dus au SIDA",
      },
    },
    {
      key: "numberOfAidsDeaths",
      translation: {
        en: "Number of AIDS deaths",
        fr: "Nombre de décès dus au SIDA",
      },
    },
    { key: "tb", translation: { en: "TB", fr: "TB" } },
    { key: "other", translation: { en: "Other", fr: "Autre" } },
    {
      key: "numberOfDeath",
      translation: { en: "% of Deaths", fr: "% de décès" },
    },
    {
      key: "percentOfTotalDeathAllCauses",
      translation: {
        en: "% of total deaths all causes",
        fr: "% du total des décès toutes causes",
      },
    },
    {
      key: "numberOfDeathsFromTbAidsMalariaAndOtherCausesAgeGroup",
      translation: {
        en: "Number of deaths from TB, AIDS, malaria and other causes - age-group",
        fr: "Nombre de décès dus à la tuberculose, au sida, au paludisme et à d'autres causes - groupe d'âge",
      },
    },
    {
      key: "distributionOfDeathsByTbAidsAndMalariaBySexAndAge",
      translation: {
        en: "Distribution of deaths by TB, AIDS and malaria by sex and age",
        fr: "Répartition des décès par tuberculose, sida et paludisme par sexe et âge",
      },
    },
    {
      key: "percentageOfDeathsFromTbAidsAndMalariaOutOfAllDeathsFromCommunicableDiseases",
      translation: {
        en: "Percentage of deaths from TB, AIDS and malaria out of all deaths from communicable diseases",
        fr: "Pourcentage de décès dus à la tuberculose, au sida et au paludisme sur l'ensemble des décès dus aux maladies transmissibles",
      },
    },
    {
      key: "numberOfTbAndAidsDeathsAndPercentOfTheseDeathsOutOfAllDeaths15YearsAndAbove",
      translation: {
        en: "Number of TB and AIDS deaths  and percent of these  deaths out of all deaths: 15 years and above",
        fr: "Nombre de décès dus à la tuberculose et au sida et pourcentage de ces décès sur l'ensemble des décès : 15 ans et plus",
      },
    },
    { key: "icd10", translation: { en: "ICD-10" } },
  ],
  languages: [
    { key: "en", label: "English" },
    { key: "fr", label: "French" },
  ],
};
export default resources;
