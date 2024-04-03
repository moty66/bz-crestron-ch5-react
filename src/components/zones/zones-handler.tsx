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
  Tabs,
  theme,
} from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { FunctionComponent, useEffect, useState } from "react";
import LuciComponent from "../luci/luci";
import { IFloor, IFloorZone } from "../luci/luci-config";
import TendaComponent from "../tende/tenda";

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
        <Radio.Group
          style={{ width: "100%" }}
          onChange={handleZoneChange}
          value={activeZone?.zone}
        >
          <Space style={{ width: "100%" }} direction="vertical">
            {activeFloor.zones.map((zone, index) => (
              <Radio.Button
                style={{
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                key={index}
                value={zone.zone}
              >
                <Flex gap="large">
                  {zone.zone}
                  {zone.activeIcon ? zone.activeIcon : null}
                </Flex>
              </Radio.Button>
            ))}
          </Space>
        </Radio.Group>
      </Sider>
      <Layout style={{ backgroundColor: colorBgContainer }}>
        <Content style={{ margin: "0 16px" }}>
          <Row style={{ marginLeft: "16px" }}>
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
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Tabs
              type="card"
              size="large"
              defaultActiveKey="1"
              items={[
                {
                  key: "1",
                  label: "Luci",
                  children: (
                    <Row>
                      {activeZone?.luci.map((component, index) => (
                        <Col key={index} span={2}>
                          <LuciComponent item={component} />
                        </Col>
                      ))}
                    </Row>
                  ),
                },
                {
                  key: "2",
                  label: "Tende",
                  children: (
                    <Row style={{ gap: 8 }}>
                      {activeZone?.tende?.map((component, index) => (
                        <Col key={index} span={8}>
                          <TendaComponent item={component} />
                        </Col>
                      ))}
                    </Row>
                  ),
                },
              ]}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ZonesHandler;
