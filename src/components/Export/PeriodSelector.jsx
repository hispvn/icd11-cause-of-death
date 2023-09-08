/* Author Nghia */
import React from "react";
// import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// import { App as D2UIApp, mui3theme as dhis2theme } from "@dhis2/d2-ui-core";
import PeriodPicker from "./D2PeriodPicker";
import parsePeriod from "d2/period/parser";
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
import { connect } from "react-redux";
// import { getD2 } from "../../redux/selectors/helper.selector";
// import {
//   getSelectedPeriod,
//   getSelectedPeriodType,
//   getSelectedDataSetMetadata
// } from "../../redux/selectors/selected-metadata.selector";
// import { selectPeriod } from "../../redux/actions/selected-metadata.action";
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
const PeriodSelector = ({
  d2,
  closePeSelectorPopover,
  selectedPeriod,
  selectedPeriodType,
  selectPeriod,
  selectedDataSetMetadata
}) => {
  return (
    <div style={{ padding: 30 }}>
      <PeriodPicker
        d2={d2}
        openFuturePeriods={
          selectedDataSetMetadata
            ? selectedDataSetMetadata.openFuturePeriods - 1
            : null
        }
        selectedPeriod={selectedPeriod ? selectedPeriod : null}
        periodType={selectedPeriodType}
        onPickPeriod={(value) => {
          closePeSelectorPopover();
          selectPeriod(parsePeriod(value));
        }}
      />
    </div>
  );
};

// const mapStateToProps = state => {
//   return {
//     d2: getD2(state),
//     selectedPeriod: getSelectedPeriod(state),
//     selectedPeriodType: getSelectedPeriodType(state),
//     selectedDataSetMetadata: getSelectedDataSetMetadata(state)
//   };
// };
//
// const mapDispatchToProps = {
//   selectPeriod
// };

// export default connect(mapStateToProps, mapDispatchToProps)(PeriodSelector);
export default PeriodSelector;
