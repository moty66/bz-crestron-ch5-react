import { BulbOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Col,
  Divider,
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
import {
  CRESTRON_MAX_ANALOG_SIZE,
  sendAnalogValue,
} from "../../helpers/crestron";
import LuciComponent from "../luci/luci";
import { IFloor, IFloorZone } from "../luci/luci-config";
import TendaComponent from "../tende/tenda";
import Topbar from "../topbar/topbar";

interface ZonesHandlerProps {}

const ZonesHandler: FunctionComponent<ZonesHandlerProps> = () => {
  const [activeZone, setActiveZone] = useState<IFloorZone>();
  const [activeFloor, setActiveFloor] = useState<IFloor>();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleZoneChange = (e: RadioChangeEvent) => {
    const zone = activeFloor?.zones.find((el) => el.zone === e.target.value);
    zone && setActiveZone(zone);
  };

  useEffect(() => {
    setActiveZone(activeFloor?.zones[0]);
  }, [activeFloor]);

  function handleZoneOn() {
    if (!activeZone) return;
    activeZone.luci.forEach((item) => {
      sendAnalogValue(
        `Lighting_zone[${item.index}].Lighting_channel[${item.channel}].set_value`,
        CRESTRON_MAX_ANALOG_SIZE
      );
    });
  }

  function handleZoneOff() {
    if (!activeZone) return;
    activeZone.luci.forEach((item) => {
      sendAnalogValue(
        `Lighting_zone[${item.index}].Lighting_channel[${item.channel}].set_value`,
        0
      );
    });
  }

  return (
    <>
      <Topbar onFloorChange={setActiveFloor} activeFloor={activeFloor} />
      <Divider></Divider>
      <Layout>
        <Sider
          collapsible={false}
          collapsed={false}
          width={280}
          style={{ backgroundColor: colorBgContainer, paddingRight: "32px" }}
        >
          <Radio.Group
            style={{ width: "100%" }}
            onChange={handleZoneChange}
            value={activeZone?.zone}
          >
            <Space style={{ width: "100%" }} direction="vertical">
              {activeFloor?.zones.map((zone, index) => (
                <Radio.Button
                  style={{
                    width: "100%",
                    height: "64px",
                    lineHeight: "64px",
                    padding: "0 32px",
                    fontSize: "0.8rem",
                    textTransform: "uppercase",
                  }}
                  key={index}
                  value={zone.zone}
                >
                  <Flex justify="space-between">
                    <span>{zone.zone}</span>
                    <BulbOutlined />
                  </Flex>
                </Radio.Button>
              ))}
            </Space>
          </Radio.Group>
        </Sider>
        <Layout style={{ backgroundColor: colorBgContainer }}>
          <Content style={{ margin: "0 16px" }}>
            <Flex justify="space-between" style={{ minHeight: "92px" }}>
              <div>
                <Breadcrumb style={{ fontSize: "1.5rem", lineHeight: "64px" }}>
                  <Breadcrumb.Item>{activeFloor?.floor}</Breadcrumb.Item>
                  {activeZone?.zone && (
                    <Breadcrumb.Item>{activeZone.zone}</Breadcrumb.Item>
                  )}
                </Breadcrumb>
              </div>
              <div>
                <Flex style={{}}>
                  <Button
                    onClick={() => handleZoneOn()}
                    style={{
                      width: "100%",
                      height: "64px",
                      lineHeight: "64px",
                      padding: "0 32px",
                      marginRight: "8px",
                    }}
                  >
                    {"TOTAL ON"}
                  </Button>
                  <Button
                    onClick={() => handleZoneOff()}
                    style={{
                      width: "100%",
                      height: "64px",
                      lineHeight: "64px",
                      padding: "0 32px",
                    }}
                  >
                    {"TOTAL OFF"}
                  </Button>
                </Flex>
              </div>
            </Flex>

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
                      <>
                        <Row>
                          {activeZone?.luci.map((component, index) => (
                            <Col key={index} span={2}>
                              <LuciComponent item={component} />
                            </Col>
                          ))}
                        </Row>
                      </>
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
    </>
  );
};

export default ZonesHandler;
