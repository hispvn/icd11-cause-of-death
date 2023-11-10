/* Author DHIS2 - Modified by Nghia */
import React from "react";
import PropTypes from "prop-types";
import log from "loglevel";
// import SelectField from "material-ui/SelectField";
import { Select, DatePicker, Form, Row, Col } from "antd";
// import MenuItem from "material-ui/MenuItem";
// import DatePicker from "material-ui/DatePicker";
import { is53WeekISOYear, getFirstDateOfWeek } from "d2/period/helpers";

const Option = Select.Option;
const FormItem = Form.Item;

const styles = {
  datePicker: { width: "100%" },
  year: { width: 95 },
  month: { width: 125 },
  week: { width: 105 },
  biWeek: { width: 200 },
  biMonth: { width: 200 },
  quarter: { width: 200 },
  sixMonth: { width: 200 },
  line: { marginTop: 0 },
};

const getYear = (date) => new Date(date).getFullYear().toString();
const getTwoDigitMonth = (date) => {
  const month = new Date(date).getMonth() + 1; // Month is 0 indexed
  return `0${month}`.slice(-2);
};
const getTwoDigitDay = (date) => {
  const day = new Date(date).getDate();

  return `0${day}`.slice(-2);
};
const formattedDate = (date) =>
  `${getYear(date)}${getTwoDigitMonth(date)}${getTwoDigitDay(date)}`;
const getWeekYear = (date) => {
  // Create a new date object for the thursday of this week
  const target = new Date(date);
  target.setDate(target.getDate() - ((date.getDay() + 6) % 7) + 3);

  return target.getFullYear();
};
const isWeekValid = (date, week) =>
  // It's not possible to have a week 53 in a 52 week year
  !is53WeekISOYear(date) && Number(week) !== 53;
const biWeekToWeek = (biWeekStr) => parseInt(biWeekStr) * 2 - 1;

let state = {};

class PeriodPicker extends React.Component {
  constructor(props, context) {
    super(props, context);
    if (!this.props.selectedPeriod) {
      this.state = {};
    } else {
      this.state = state;
    }

    // const i18n = props.d2.i18n;
    // this.getTranslation = i18n.getTranslation.bind(i18n);
    this.getTranslation = (name) => name;
  }

  componentDidUpdate(prevProps) {
    if (this.props.periodType !== prevProps.periodType) {
      this.handleChange();
    }
  }

  componentWillUnmount() {
    state = this.state;
  }

  getPeriod() {
    const week =
      this.props.periodType === "BiWeekly" && this.state.biWeek
        ? biWeekToWeek(this.state.biWeek)
        : this.state.week;
    const date =
      this.state.year && week && getFirstDateOfWeek(this.state.year, week);

    switch (this.props.periodType) {
      case "Daily":
        return this.state.date && formattedDate(this.state.date);
      case "Weekly":
        if (date) {
          this.setState({ invalidWeek: !isWeekValid(date, this.state.week) });
        }
        return (
          date &&
          isWeekValid(date, this.state.week) &&
          `${getWeekYear(date)}W${this.state.week}`
        );
      case "WeeklyWednesday":
        if (date) {
          this.setState({ invalidWeek: !isWeekValid(date, this.state.week) });
        }
        return (
          date &&
          isWeekValid(date, this.state.week) &&
          `${getWeekYear(date)}WedW${this.state.week}`
        );
      case "WeeklyThursday":
        if (date) {
          this.setState({ invalidWeek: !isWeekValid(date, this.state.week) });
        }
        return (
          date &&
          isWeekValid(date, this.state.week) &&
          `${getWeekYear(date)}ThuW${this.state.week}`
        );
      case "WeeklySaturday":
        if (date) {
          this.setState({ invalidWeek: !isWeekValid(date, this.state.week) });
        }
        return (
          date &&
          isWeekValid(date, this.state.week) &&
          `${getWeekYear(date)}SatW${this.state.week}`
        );
      case "WeeklySunday":
        if (date) {
          this.setState({ invalidWeek: !isWeekValid(date, this.state.week) });
        }
        return (
          date &&
          isWeekValid(date, this.state.week) &&
          `${getWeekYear(date)}SunW${this.state.week}`
        );
      case "BiWeekly":
        if (date) {
          this.setState({
            invalidBiWeek: !isWeekValid(date, biWeekToWeek(this.state.biWeek)),
          });
        }
        return (
          this.state.year &&
          this.state.biWeek &&
          `${this.state.year}BiW${this.state.biWeek}`
        );
      case "Monthly":
        return (
          this.state.year &&
          this.state.month &&
          `${this.state.year}${this.state.month}`
        );
      case "BiMonthly":
        return (
          this.state.year &&
          this.state.biMonth &&
          `${this.state.year}0${this.state.biMonth}B`
        );
      case "Quarterly":
        return (
          this.state.year &&
          this.state.quarter &&
          `${this.state.year}Q${this.state.quarter}`
        );
      case "SixMonthly":
        return (
          this.state.year &&
          this.state.sixMonth &&
          `${this.state.year}S${this.state.sixMonth}`
        );
      case "SixMonthlyApril":
        return (
          this.state.year &&
          this.state.sixMonth &&
          `${this.state.year}AprilS${this.state.sixMonth}`
        );
      case "SixMonthlyNov":
        return (
          this.state.year &&
          this.state.sixMonth &&
          `${this.state.year}NovS${this.state.sixMonth}`
        );
      case "Yearly":
        return this.state.year;
      case "FinancialApril":
        return this.state.year && `${this.state.year}April`;
      case "FinancialJuly":
        return this.state.year && `${this.state.year}July`;
      case "FinancialOct":
        return this.state.year && `${this.state.year}Oct`;

      default:
        log.error(`Unknown period type: ${this.props.periodType}`);
        return false;
    }
  }

  handleChange() {
    if (this.state.status === true) {
      if (this.getPeriod()) {
        this.props.onPickPeriod(this.getPeriod());
      }
    } else {
      if (this.props.periodType === "Daily") {
        if (this.getPeriod()) {
          this.props.onPickPeriod(this.getPeriod());
        }
      } else {
        // let object = {
        //   endDate: null,
        //   id: null,
        //   name: null,
        //   startDate: null,
        //   type: this.props.periodType
        // };
        //this.props.onPickPeriod(object, false);
      }
    }
  }

  renderOptionPicker(name, options) {
    const changeState = (value) => {
      const currentYear = new Date().getFullYear();
      let future = 0;
      if (
        this.props.openFuturePeriods !== null &&
        this.props.periodType === "Monthly"
      ) {
        future = this.getYearOfFutureMonth() - currentYear;
      }
      if (
        this.props.openFuturePeriods !== null &&
        this.props.periodType === "Quarterly"
      ) {
        future = this.getYearOfFutureQuarter() - currentYear;
      }
      if (
        this.props.openFuturePeriods !== null &&
        (this.props.periodType === "SixMonthly" ||
          this.props.periodType === "SixMonthlyNov" ||
          this.props.periodType === "SixMonthlyApril")
      ) {
        future = this.getYearOfFutureSixMonth() - currentYear;
      }
      if (
        this.props.openFuturePeriods !== null &&
        this.props.periodType === "Weekly"
      ) {
        future = this.getYearOfFutureWeekly() - currentYear;
      }
      if (parseInt(currentYear) + future === parseInt(value)) {
        if (this.checkingPeriod(Object.keys(this.state)[2])) {
          this.setState({ status: true, [name]: value }, this.handleChange);
        } else {
          this.setState({ status: false, [name]: value }, this.handleChange);
        }
      } else {
        this.setState({ status: true, [name]: value }, this.handleChange);
      }
    };
    const isInvalid =
      (name === "week" && this.state.invalidWeek) ||
      (name === "biWeek" && this.state.invalidBiWeek);

    return (
      <FormItem
        style={{ marginBottom: 0 }}
        validateStatus={isInvalid && "error"}
      >
        <Select
          virtual={false}
          value={this.state[name]}
          onChange={changeState}
          style={styles[name]}
          placeholder={this.getTranslation(name)}

          // floatingLabelStyle={isInvalid ? { color: "red" } : {}}
        >
          {Object.keys(options)
            .sort((a, b) => {
              return name === "year" ? b - a : a - b;
            })
            .map((value) => (
              <Option key={value} value={value}>
                {/[^0-9]/.test(options[value]) && name !== "biWeek"
                  ? this.getTranslation(options[value])
                  : options[value]}
              </Option>
            ))}
        </Select>
      </FormItem>
    );
  }

  getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(+d);
    d.setHours(0, 0, 0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    // Get first day of year
    var yearStart = new Date(d.getFullYear(), 0, 1);
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    // Return array of year and week number
    return [d.getFullYear(), weekNo];
  }
  weeksInYear(year) {
    var d = new Date(year, 11, 31);
    var week = this.getWeekNumber(d)[1];
    return week === 1 ? this.getWeekNumber(d.setDate(24))[1] : week;
  }

  //use for future period
  getNumberOfWeek(year) {
    const today = this.setWeekOfFuturePeriod(new Date());
    const firstDayOfYear = new Date(year, 0, 1);
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  getYearOfFutureMonth() {
    let date = new Date();
    date = this.setMonthOfFuturePeriod("Monthly", date);
    return date.getFullYear();
  }

  getYearOfFutureQuarter() {
    let date = new Date();
    date = this.setMonthOfFuturePeriod("Quarterly", date);
    return date.getFullYear();
  }

  getYearOfFutureSixMonth() {
    let date = new Date();
    date = this.setMonthOfFuturePeriod("SixMonthly", date);
    return date.getFullYear();
  }

  getYearOfFutureBiMonth() {
    let date = new Date();
    date = this.setMonthOfFuturePeriod("BiMonthly", date);
    return date.getFullYear();
  }

  getYearOfFutureWeekly() {
    let date = new Date();
    date = this.setWeekOfFuturePeriod(date);
    return date.getFullYear();
  }

  setWeekOfFuturePeriod(date) {
    date.setDate(date.getDate() + this.props.openFuturePeriods * 7);
    return date;
  }

  setMonthOfFuturePeriod(type, date) {
    if (type === "Monthly") {
      date.setMonth(date.getMonth() + this.props.openFuturePeriods);
    }
    if (type === "Quarterly") {
      date.setMonth(date.getMonth() + this.props.openFuturePeriods * 3);
    }
    if (type === "SixMonthly") {
      date.setMonth(date.getMonth() + this.props.openFuturePeriods * 6);
    }
    if (type === "BiMonthly") {
      date.setMonth(date.getMonth() + this.props.openFuturePeriods * 2);
    }
    return date;
  }

  checkingPeriod(type) {
    if (this.state[type] !== undefined) {
      let currentMonth;
      let date = new Date();
      if (
        this.props.openFuturePeriods !== null &&
        this.props.openFuturePeriods !== 0 &&
        type === "month"
      ) {
        date = this.setMonthOfFuturePeriod("Monthly", date);
        currentMonth = date.getMonth() + 1;
      } else {
        if (
          this.props.openFuturePeriods !== null &&
          this.props.openFuturePeriods !== 0 &&
          type === "quarter"
        ) {
          date = this.setMonthOfFuturePeriod("Quarterly", date);
          currentMonth = date.getMonth() + 1;
        } else {
          if (
            this.props.openFuturePeriods !== null &&
            this.props.openFuturePeriods !== 0 &&
            type === "sixMonth"
          ) {
            date = this.setMonthOfFuturePeriod("SixMonthly", date);
            currentMonth = date.getMonth() + 1;
          } else {
            if (
              this.props.openFuturePeriods !== null &&
              this.props.openFuturePeriods !== 0 &&
              type === "biMonth"
            ) {
              date = this.setMonthOfFuturePeriod("BiMonthly", date);
              currentMonth = date.getMonth() + 1;
            } else {
              currentMonth = new Date().getMonth() + 1;
            }
          }
        }
      }

      if (type === "quarter") {
        if (currentMonth >= 1 && currentMonth <= 3) {
          if (parseInt(this.state[type]) > 1) {
            return false;
          } else {
            return true;
          }
        }
        if (currentMonth >= 4 && currentMonth <= 6) {
          if (parseInt(this.state[type]) > 2) {
            return false;
          } else {
            return true;
          }
        }
        if (currentMonth >= 7 && currentMonth <= 9) {
          if (parseInt(this.state[type]) > 3) {
            return false;
          } else {
            return true;
          }
        }
        if (currentMonth >= 10 && currentMonth <= 12) {
          return true;
        }
      }
      if (type === "sixMonth") {
        if (currentMonth <= 6) {
          if (parseInt(this.state[type]) > 1) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      }
      if (type === "month") {
        if (currentMonth < parseInt(this.state[type])) {
          return false;
        } else {
          return true;
        }
      }
      if (type === "week") {
        if (
          parseInt(this.getNumberOfWeek(this.getYearOfFutureWeekly())) <
          parseInt(this.state[type])
        ) {
          return false;
        } else {
          return true;
        }
      }
      if (type === "biMonth") {
        if (currentMonth >= 1 && currentMonth <= 2) {
          if (parseInt(this.state[type]) > 1) {
            return false;
          } else {
            return true;
          }
        }
        if (currentMonth >= 3 && currentMonth <= 4) {
          if (parseInt(this.state[type]) > 2) {
            return false;
          } else {
            return true;
          }
        }
        if (currentMonth >= 5 && currentMonth <= 6) {
          if (parseInt(this.state[type]) > 3) {
            return false;
          } else {
            return true;
          }
        }
        if (currentMonth >= 7 && currentMonth <= 8) {
          if (parseInt(this.state[type]) > 4) {
            return false;
          } else {
            return true;
          }
        }
        if (currentMonth >= 9 && currentMonth <= 10) {
          if (parseInt(this.state[type]) > 5) {
            return false;
          } else {
            return true;
          }
        }
        if (currentMonth >= 11 && currentMonth <= 12) {
          return true;
        }
      }
    } else {
      return true;
    }
  }

  renderYearPicker() {
    const years = {};
    const currentYear = new Date().getFullYear();
    let future = 0;
    if (
      this.props.openFuturePeriods !== null &&
      (this.props.periodType === "Yearly" ||
        this.props.periodType === "FinancialOct" ||
        this.props.periodType === "FinancialJuly" ||
        this.props.periodType === "FinancialApril")
    ) {
      future = this.props.openFuturePeriods;
    }
    if (
      this.props.openFuturePeriods !== null &&
      this.props.periodType === "Monthly"
    ) {
      future = this.getYearOfFutureMonth() - currentYear;
    }
    if (
      this.props.openFuturePeriods !== null &&
      this.props.periodType === "Quarterly"
    ) {
      future = this.getYearOfFutureQuarter() - currentYear;
    }
    if (
      this.props.openFuturePeriods !== null &&
      (this.props.periodType === "SixMonthly" ||
        this.props.periodType === "SixMonthlyNov" ||
        this.props.periodType === "SixMonthlyApril")
    ) {
      future = this.getYearOfFutureSixMonth() - currentYear;
    }
    if (
      this.props.openFuturePeriods !== null &&
      this.props.periodType === "BiMonthly"
    ) {
      future = this.getYearOfFutureBiMonth() - currentYear;
    }
    if (
      this.props.openFuturePeriods !== null &&
      this.props.periodType === "Weekly"
    ) {
      future = this.getYearOfFutureWeekly() - currentYear;
    }
    for (let year = 1970; year <= currentYear + future; year++) {
      years[year] = year;
    }

    return this.renderOptionPicker("year", years);
  }

  renderMonthPicker() {
    let months = {};
    let future =
      this.getYearOfFutureMonth() - parseInt(new Date().getFullYear());
    if (
      this.state.status === false ||
      parseInt(this.state.year) === parseInt(new Date().getFullYear()) + future
    ) {
      let date = new Date();
      date = this.setMonthOfFuturePeriod("Monthly", date);
      const currentMonth = date.getMonth() + 1;
      for (let i = 1; i <= currentMonth; i++) {
        if (i < 10) {
          months[`0${i}`] =
            i === 1
              ? "jan"
              : i === 2
              ? "feb"
              : i === 3
              ? "mar"
              : i === 4
              ? "apr"
              : i === 5
              ? "may"
              : i === 6
              ? "jun"
              : i === 7
              ? "jul"
              : i === 8
              ? "aug"
              : i === 9
              ? "sep"
              : "";
        } else {
          months[`${i}`] =
            i === 10 ? "oct" : i === 11 ? "nov" : i === 12 ? "dec" : "";
        }
      }
    } else {
      months = {
        "01": "jan",
        "02": "feb",
        "03": "mar",
        "04": "apr",
        "05": "may",
        "06": "jun",
        "07": "jul",
        "08": "aug",
        "09": "sep",
        10: "oct",
        11: "nov",
        12: "dec",
      };
    }
    return this.renderOptionPicker("month", months);
  }

  renderWeekPicker() {
    const weeks = {};
    let futureyear = this.getYearOfFutureWeekly();
    let future = futureyear - parseInt(new Date().getFullYear());
    if (
      this.state.status === false ||
      parseInt(this.state.year) === parseInt(new Date().getFullYear()) + future
    ) {
      for (let week = 1; week <= this.getNumberOfWeek(futureyear); week++) {
        weeks[`0${week}`.substr(-2)] = week;
      }
    } else {
      for (let week = 1; week <= this.weeksInYear(this.state.year); week++) {
        weeks[`0${week}`.substr(-2)] = week;
      }
    }
    return this.renderOptionPicker("week", weeks);
  }

  renderBiWeekPicker() {
    const biWeeks = {};
    const biWeekLimit = 27;
    const prefix = this.getTranslation("bi_week");
    for (let biWeek = 1; biWeek <= biWeekLimit; biWeek++) {
      biWeeks[`0${biWeek}`.substr(-2)] = `${prefix} ${biWeek}`;
    }

    return this.renderOptionPicker("biWeek", biWeeks);
  }

  renderBiMonthPicker() {
    let biMonths = {};
    let future =
      this.getYearOfFutureBiMonth() - parseInt(new Date().getFullYear());
    if (
      this.state.status === false ||
      parseInt(this.state.year) === parseInt(new Date().getFullYear()) + future
    ) {
      let date = new Date();
      date = this.setMonthOfFuturePeriod("BiMonthly", date);
      const currentMonth = date.getMonth() + 1;
      if (currentMonth >= 1 && currentMonth <= 2) {
        biMonths = { 1: "jan-feb" };
      }
      if (currentMonth >= 3 && currentMonth <= 4) {
        biMonths = { 1: "jan-feb", 2: "mar-apr" };
      }
      if (currentMonth >= 5 && currentMonth <= 6) {
        biMonths = { 1: "jan-feb", 2: "mar-apr", 3: "may-jun" };
      }
      if (currentMonth >= 7 && currentMonth <= 8) {
        biMonths = { 1: "jan-feb", 2: "mar-apr", 3: "may-jun", 4: "jul-aug" };
      }
      if (currentMonth >= 9 && currentMonth <= 10) {
        biMonths = {
          1: "jan-feb",
          2: "mar-apr",
          3: "may-jun",
          4: "jul-aug",
          5: "sep-oct",
        };
      }
      if (currentMonth >= 11 && currentMonth <= 12) {
        biMonths = {
          1: "jan-feb",
          2: "mar-apr",
          3: "may-jun",
          4: "jul-aug",
          5: "sep-oct",
          6: "nov-dec",
        };
      }
    } else {
      biMonths = {
        1: "jan-feb",
        2: "mar-apr",
        3: "may-jun",
        4: "jul-aug",
        5: "sep-oct",
        6: "nov-dec",
      };
    }

    return this.renderOptionPicker("biMonth", biMonths);
  }

  returnQuarterByMonth(currentMonth) {
    let quarters = null;
    if (currentMonth >= 1 && currentMonth <= 3) {
      quarters = { 1: "Q1" };
    }
    if (currentMonth >= 4 && currentMonth <= 6) {
      quarters = { 1: "Q1", 2: "Q2" };
    }
    if (currentMonth >= 7 && currentMonth <= 9) {
      quarters = { 1: "Q1", 2: "Q2", 3: "Q3" };
    }
    if (currentMonth >= 10 && currentMonth <= 12) {
      quarters = { 1: "Q1", 2: "Q2", 3: "Q3", 4: "Q4" };
    }
    return quarters;
  }

  renderQuarterPicker() {
    let quarters;
    let future =
      this.getYearOfFutureQuarter() - parseInt(new Date().getFullYear());
    if (
      this.state.status === false ||
      parseInt(this.state.year) === parseInt(new Date().getFullYear()) + future
    ) {
      let date = new Date();
      date = this.setMonthOfFuturePeriod("Quarterly", date);
      const currentMonth = date.getMonth() + 1;
      quarters = this.returnQuarterByMonth(currentMonth);
    } else {
      quarters = { 1: "Q1", 2: "Q2", 3: "Q3", 4: "Q4" };
    }
    return this.renderOptionPicker("quarter", quarters);
  }

  renderPeriodBasedOnPeriodType() {
    const setDateState = (nothing, date) => {
      const year = getYear(date);
      const month = getTwoDigitMonth(date);
      this.setState({ date, year, month }, this.handleChange);
    };
    let future = 0;
    switch (this.props.periodType) {
      case "Daily":
        let date = new Date();
        if (
          this.props.openFuturePeriods !== 0 &&
          this.props.openFuturePeriods !== null &&
          this.props.openFuturePeriods !== undefined
        ) {
          date.setDate(date.getDate() + this.props.openFuturePeriods);
        }
        return (
          <DatePicker
            placeholder={this.getTranslation("day")}
            onChange={setDateState}
            value={this.state.date}
            // autoOk
            // container="inline"
            style={styles.datePicker}
            // maxDate={date}
            disabledDate={(d) => !d || d.isAfter(date)}
          />
        );
      case "Weekly":
      case "WeeklyWednesday":
      case "WeeklyThursday":
      case "WeeklySaturday":
      case "WeeklySunday":
        return (
          <Row style={styles.line}>
            {this.renderYearPicker()}
            {this.renderWeekPicker()}
          </Row>
        );
      case "BiWeekly":
        return (
          <Row style={styles.line}>
            {this.renderYearPicker()}
            {this.renderBiWeekPicker()}
          </Row>
        );
      case "Monthly":
        return (
          <Row style={styles.line}>
            {this.renderYearPicker()}
            {this.renderMonthPicker()}
          </Row>
        );
      case "BiMonthly":
        return (
          <Row style={styles.line}>
            {this.renderYearPicker()}
            {this.renderBiMonthPicker()}
          </Row>
        );
      case "Quarterly":
        return (
          <Row style={styles.line}>
            {this.renderYearPicker()}
            {this.renderQuarterPicker()}
          </Row>
        );
      case "SixMonthly":
        let sixmonth;
        future =
          this.getYearOfFutureSixMonth() - parseInt(new Date().getFullYear());
        if (
          this.state.status === false ||
          parseInt(this.state.year) ===
            parseInt(new Date().getFullYear()) + future
        ) {
          let date = new Date();
          date = this.setMonthOfFuturePeriod("SixMonthly", date);
          const currentMonth = date.getMonth() + 1;
          if (currentMonth <= 6) {
            sixmonth = { 1: "jan-jun" };
          } else {
            sixmonth = { 1: "jan-jun", 2: "jul-dec" };
          }
        } else {
          sixmonth = { 1: "jan-jun", 2: "jul-dec" };
        }
        return (
          <Row style={styles.line}>
            {this.renderYearPicker()}
            {this.renderOptionPicker("sixMonth", sixmonth)}
          </Row>
        );

      case "SixMonthlyApril":
        let sixmonthApr;
        future =
          this.getYearOfFutureSixMonth() - parseInt(new Date().getFullYear());
        if (
          this.state.status === false ||
          parseInt(this.state.year) ===
            parseInt(new Date().getFullYear()) + future
        ) {
          let date = new Date();
          date = this.setMonthOfFuturePeriod("SixMonthly", date);
          const currentMonth = date.getMonth() + 1;
          if (currentMonth <= 6) {
            sixmonthApr = { 1: "apr-sep" };
          } else {
            sixmonthApr = { 1: "apr-sep", 2: "oct-mar" };
          }
        } else {
          sixmonthApr = { 1: "apr-sep", 2: "oct-mar" };
        }
        return (
          <Row style={styles.line}>
            {this.renderYearPicker()}
            {this.renderOptionPicker("sixMonth", sixmonthApr)}
          </Row>
        );
      case "SixMonthlyNov":
        let sixmonthNov;
        future =
          this.getYearOfFutureSixMonth() - parseInt(new Date().getFullYear());
        if (
          this.state.status === false ||
          parseInt(this.state.year) ===
            parseInt(new Date().getFullYear()) + future
        ) {
          let date = new Date();
          date = this.setMonthOfFuturePeriod("SixMonthly", date);
          const currentMonth = date.getMonth() + 1;
          if (currentMonth <= 6) {
            sixmonthNov = { 1: "nov-apr" };
          } else {
            sixmonthNov = { 1: "nov-apr", 2: "may-oct" };
          }
        } else {
          sixmonthNov = { 1: "nov-apr", 2: "may-oct" };
        }
        return (
          <Row style={styles.line}>
            {this.renderYearPicker()}
            {this.renderOptionPicker("sixMonth", sixmonthNov)}
          </Row>
        );
      case "Yearly":
      case "FinancialApril":
      case "FinancialJuly":
      case "FinancialOct":
        return <Row style={styles.line}>{this.renderYearPicker()}</Row>;

      default:
        return null;
    }
  }

  render() {
    return this.renderPeriodBasedOnPeriodType();
  }
}
PeriodPicker.propTypes = {
  periodType: PropTypes.oneOf([
    "Daily",
    "Weekly",
    "WeeklyWednesday",
    "WeeklyThursday",
    "WeeklySaturday",
    "WeeklySunday",
    "BiWeekly",
    "Monthly",
    "BiMonthly",
    "Quarterly",
    "SixMonthly",
    "SixMonthlyApril",
    "SixMonthlyNov",
    "Yearly",
    "FinancialApril",
    "FinancialJuly",
    "FinancialOct",
  ]).isRequired,

  onPickPeriod: PropTypes.func.isRequired,
};

export default PeriodPicker;
