import {
  Breadcrumb,
  Button,
  Col,
  Flex,
  Layout,
  Radio,
  RadioChangeEvent,
  Row,
  Space,
  theme,
} from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { FunctionComponent, useEffect, useState } from "react";
import { IFloor, IFloorZone } from "../luci/luci-config";
import LuciComponent from "../luci/luci";

interface ZonesHandlerProps {
  activeFloor: IFloor;
}

const ZonesHandler: FunctionComponent<ZonesHandlerProps> = ({
  activeFloor,
}) => {
  const [activeZone, setActiveZone] = useState<IFloorZone>();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleZoneOn = () => {
    alert(`ON: ${activeFloor.floor} ${activeZone?.zone}`);
  };

  const handleZoneOff = () => {
    alert(`OFF: ${activeFloor.floor} ${activeZone?.zone}`);
  };

  const handleZoneChange = (e: RadioChangeEvent) => {
    const zone = activeFloor.zones.find((el) => el.zone === e.target.value);
    zone && setActiveZone(zone);
  };

  useEffect(() => {
    setActiveZone(activeFloor.zones[0]);
  }, [activeFloor]);

  return (
    <Layout>
      <Sider
        collapsible={false}
        collapsed={false}
        style={{ backgroundColor: colorBgContainer }}
      >
        <Radio.Group onChange={handleZoneChange} value={activeZone?.zone}>
          <Space direction="vertical">
            {activeFloor.zones.map((zone, index) => (
              <Radio.Button
                style={{
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                }}
                key={index}
                value={zone.zone}
              >
                {zone.zone}
              </Radio.Button>
            ))}
          </Space>
        </Radio.Group>
      </Sider>
      <Layout style={{ backgroundColor: colorBgContainer }}>
        <Content style={{ margin: "0 16px" }}>
          <Row style={{ margin: "16px" }}>
            <Col span={20}>
              <Breadcrumb style={{ fontSize: "1.5rem" }}>
                <Breadcrumb.Item>{activeFloor.floor}</Breadcrumb.Item>
                {activeZone?.zone && (
                  <Breadcrumb.Item>{activeZone.zone}</Breadcrumb.Item>
                )}
              </Breadcrumb>
            </Col>
            <Col>
              <Flex gap="small" wrap="wrap">
                <Button
                  onClick={handleZoneOn}
                  style={{
                    height: "48px",
                    width: 48,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {"ON"}
                </Button>
                <Button
                  onClick={handleZoneOff}
                  style={{
                    height: "48px",
                    width: 48,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {"OFF"}
                </Button>
              </Flex>
            </Col>
          </Row>
          <div
            style={{
              padding: 16,
              minHeight: 360,
              background: colorBgContainer,
              // background: colorBgContainer,
            }}
          >
            <Row>
              {activeZone?.components.map((component, index) => (
                <Col key={index} span={2}>
                  <LuciComponent />
                </Col>
              ))}
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ZonesHandler;
