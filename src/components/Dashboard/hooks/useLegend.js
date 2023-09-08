import { useState } from "react";

const useLegend = () => {
  const [hidden, setHidden] = useState([]);

  const toggleLegend = (legend) => {
    const foundIndex = hidden.findIndex((key) => key === legend.dataKey);
    if (foundIndex === -1) {
      hidden.push(legend.dataKey);
    } else {
      hidden.splice(foundIndex, 1);
    }
    setHidden([...hidden]);
  };

  return [hidden, toggleLegend];
};

export default useLegend;
