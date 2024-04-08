import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Flex, theme } from "antd";
import { FunctionComponent } from "react";
import { sendDigitalPulse } from "../../helpers/crestron";
import { ITendaComponent } from "../luci/luci-config";

interface TendaComponentProps {
  onToggle?: () => void;
  item: ITendaComponent;
}

const TendaComponent: FunctionComponent<TendaComponentProps> = ({ item }) => {
  const {
    token: { colorBgContainer, borderRadiusLG, colorBgLayout },
  } = theme.useToken();

  function up() {
    sendDigitalPulse(
      `Lighting_zone[${item.index}].Curtains[${item.channel}].up`,
      100
    );
  }

  function down() {
    sendDigitalPulse(
      `Lighting_zone[${item.index}].Curtains[${item.channel}].down`,
      100
    );
  }

  return (
    <div id="controlGroupWrapper">
      <div
        className="controlGroup"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
          textAlign: "center",
          backgroundColor: colorBgLayout,
          borderRadius: borderRadiusLG,
          paddingTop: 16,
          paddingBottom: 16,
        }}
      >
        <p
          style={{
            fontSize: "1.2rem",
            //overflow: "hidden",
            marginBottom: 0,
            marginTop: 8,
          }}
        >
          {item.name}
        </p>
        <Flex
          gap={"small"}
          justify="between"
          style={{
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <div
            onMouseUp={() => {
              down();
            }}
            style={{
              backgroundColor: colorBgContainer,
              width: 100,
              height: 100,
              borderRadius: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <CaretDownOutlined style={{ fontSize: "3rem" }} />
          </div>

          <div
            onMouseUp={() => {
              up();
            }}
            style={{
              backgroundColor: colorBgContainer,
              width: 100,
              height: 100,
              borderRadius: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <CaretUpOutlined style={{ fontSize: "3rem" }} />
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default TendaComponent;
