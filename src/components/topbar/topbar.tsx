import { Radio, RadioChangeEvent, theme } from "antd";
import { FunctionComponent, useEffect } from "react";
import { IFloor, luciConfig } from "../luci/luci-config";

interface TopbarProps {
  onFloorChange: (floor: IFloor) => void;
  activeFloor?: IFloor;
}

const Topbar: FunctionComponent<TopbarProps> = ({
  onFloorChange,
  activeFloor,
}) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleFloorChange = (floorName: RadioChangeEvent) => {
    const floor = luciConfig.find((el) => el.floor === floorName.target.value);
    floor && onFloorChange(floor);
  };

  useEffect(() => {
    if (!activeFloor) {
      onFloorChange(luciConfig[0]);
    }
  }, []);

  return (
    <div style={{ margin: "" }}>
      <div
        style={{
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Radio.Group onChange={handleFloorChange} value={activeFloor?.floor}>
          {luciConfig.map((floor, index) => (
            <Radio.Button
              style={{
                height: "64px",
                lineHeight: "64px",
                padding: "0 32px",
                fontSize: "1.5rem",
              }}
              key={index}
              value={floor.floor}
            >
              {floor.floor}
            </Radio.Button>
          ))}
        </Radio.Group>
      </div>
    </div>
  );
};

export default Topbar;
