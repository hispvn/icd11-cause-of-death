import React from "react";
import { Treemap, ResponsiveContainer, Tooltip } from "recharts";
import "./Treemap.css";
const Content = ({ root, depth, x, y, width, height, index, payload, colors, rank, name }) => {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: colors[index],
          stroke: "#fff",
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10)
        }}
      />
      <text x={x + 4} y={y + height - 6} fill="#fff" fontSize={14} name="hello">
        {name}
      </text>
      {/* <text x={x + 4} y={y + 18} fill="#fff" fontSize={14}>
        {index + 1}
      </text> */}
    </g>
  );
};
const TooltipContent = (props) => {
  const name = props.payload[0] ? props.payload[0].payload.name : "";
  const value = props.payload[0] ? props.payload[0].payload.value : "";

  return (
    <div style={{ backgroundColor: "#ffffff", padding: 5, borderRadius: 5, maxWidth: 300 }}>
      {name}:&nbsp;<b>{value}</b>
    </div>
  );
};

const TreemapWidget = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <Treemap data={data.data} dataKey="size" content={<Content colors={data.colors} />}>
        <Tooltip content={<TooltipContent />} />
      </Treemap>
    </ResponsiveContainer>
  );
};
export default TreemapWidget;
