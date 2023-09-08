import { Button, Radio } from "antd";
import { BUTTON_ICONS } from "./const";
import "./index.css";

const IconButton = (props) => {
  return (
    <div className="icon-button">
      <Button {...props} icon={BUTTON_ICONS[props.icon]}></Button>
    </div>
  );
};

export default IconButton;
