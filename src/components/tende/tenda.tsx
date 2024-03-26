import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Flex, theme } from "antd";
import { FunctionComponent } from "react";
import { ITendaComponent } from "../luci/luci-config";

interface TendaComponentProps {
  onToggle?: () => void;
  item: ITendaComponent;
}

const TendaComponent: FunctionComponent<TendaComponentProps> = ({ item }) => {
  // const [digitalState, sendPulse] = useSendDigital(1);
  // const [analogState, sendAnalog] = useSendAnalog(1);
  const {
    token: { colorBgLayout },
  } = theme.useToken();

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
        }}
      >
        <p
          style={{
            fontSize: "1.2rem",
            height: 56,
            overflow: "hidden",
            marginBottom: 8,
            marginTop: 8,
          }}
        >
          {item.name}
        </p>
        <Flex gap={"small"}>
          <div
            style={{
              backgroundColor: colorBgLayout,
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
          <div
            style={{
              backgroundColor: colorBgLayout,
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
        </Flex>
      </div>
    </div>
  );
};

export default TendaComponent;
