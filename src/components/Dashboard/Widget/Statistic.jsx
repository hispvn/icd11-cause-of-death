import { numberWithCommas } from "../../../utils";
import "./Statistic.css";
const Statistic = ({ data }) => {
  return <div className="statistic-container">{numberWithCommas(data.value)}</div>;
};
export default Statistic;
