import { Radio, RadioChangeEvent, Space, theme } from "antd";
import { FunctionComponent } from "react";
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

  return (
    <div style={{ margin: "16px 16px 0" }}>
      <div
        style={{
          minHeight: 80,
          paddingLeft: 16,
          paddingRight: 16,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Radio.Group onChange={handleFloorChange} value={activeFloor?.floor}>
          <Space direction="horizontal">
            {luciConfig.map((floor, index) => (
              <Radio.Button
                style={{
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                }}
                key={index}
                value={floor.floor}
              >
                {floor.floor}
              </Radio.Button>
            ))}
          </Space>
        </Radio.Group>
      </div>
    </div>
  );
};

export default Topbar;
