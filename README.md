# WHO ICD11 Cause Of Death

## Overview

The app provides a standardized approach to record cause of death information, following the International Statistical Classification of Diseases and Related Health Problems (ICD) guidelines. The app is linked with ICD 11 browser for searching the ICD 11 codes for the cause of death/medical condition entered by the user. Health workers can input data directly into the app, eliminating delays and reducing errors associated with coding in manual register.

## Feature

- Digital Mortality Rule Engine: WHO electronic MCCD form with embedded digital mortality rule base; rule engine for automated selection of Underlying Cause of Death.
- Cause of Death Certificate Generation: Generation of customized death certificate with extended options for countries to adopt their specific requirements while maintaining the core data points.
- Data Analytics: Standard and custom dashboards based on multiple ICD-11 special mortality tabulation lists, WHO standard analytics and ICD Chapter-wise analysis.
- Data Export and External Analysis: Allows ANACoD3 real time export for external and enhanced analysis.
- Easy Configuration: The CoD app allows both custom and manual installation options depending on the current configuration status of DHIS2 in country.

## Setting up

> [!NOTE]
> The app is using some components from tracker-capture-app-core, so we must download it to our local in order to set the app up (Download here https://github.com/hispvn/tracker-capture-app-core)

- Go to tracker-capture-app-core then run these commands one by one
```
yarn install
yarn build
yarn link
cd node_modules/react
yarn link
cd ../react-dom
yarn link
```

- Then go to icd11-cause-of-death and run these following commands
```
yarn link tracker-capture-app-core
yarn link react
yarn link react-dom
```

## Run locally (for development only)

- We have to add `.env` file to the root directory of the source code, and please follow the format
```
REACT_APP_BASE_URL=[PLACE YOUR INSTANCE URL HERE]
REACT_APP_USERNAME=[PLACE USERNAME HERE]
REACT_APP_PASSWORD=[PLACE PASSWORD HERE]
REACT_APP_ICD11_API_URL=https://dhis2.world/services/icd11
REACT_APP_ICD11_API_URL_PRODUCTION=../../../../services/icd11
```

- Then run `yarn start` in the root directory

## Build (for production)

- We have to add `.env` file to the root directory of the source code, and please follow the format
```
REACT_APP_BASE_URL=../../..
REACT_APP_USERNAME=
REACT_APP_PASSWORD=
REACT_APP_ICD11_API_URL=https://dhis2.world/services/icd11
REACT_APP_ICD11_API_URL_PRODUCTION=../../../../services/icd11
```

- Then run `yarn build` in the root directory