import {
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
          width={236}
          style={{ backgroundColor: colorBgContainer, paddingRight: "16px" }}
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
                    height: "48px",
                    lineHeight: "48px",
                    padding: "0 32px",
                    fontSize: "0.8rem",
                    textTransform: "uppercase",
                  }}
                  key={index}
                  value={zone.zone}
                >
                  <Flex justify="space-between">
                    <span>{zone.zone}</span>
                    {/* <BulbOutlined /> */}
                  </Flex>
                </Radio.Button>
              ))}
            </Space>
          </Radio.Group>
        </Sider>
        <Layout
          style={{
            backgroundColor: colorBgContainer,
          }}
        >
          <Content style={{ margin: "0 16px" }}>
            <Flex justify="space-between" style={{ minHeight: "92px" }}>
              <div>
                <Flex style={{}}>
                  <Button
                    type="text"
                    disabled
                    style={{
                      height: "64px",
                      lineHeight: "64px",
                      padding: "0 32px",
                      marginRight: "8px",
                    }}
                  >
                    {activeFloor?.floor} / {activeZone?.zone}
                  </Button>
                  <Button
                    onClick={() => handleZoneOn()}
                    type="primary"
                    style={{
                      height: "64px",
                      lineHeight: "64px",
                      padding: "0 32px",
                      marginRight: "8px",
                    }}
                  >
                    {"Accendi tutto"}
                  </Button>
                  <Button
                    onClick={() => handleZoneOff()}
                    style={{
                      height: "64px",
                      lineHeight: "64px",
                      padding: "0 32px",
                    }}
                    danger
                  >
                    <Flex justify="space-between">
                      {"Spegni tutto"}
                      {/* <BulbOutlined /> */}
                    </Flex>
                  </Button>
                </Flex>
              </div>
            </Flex>

            <div
              style={{
                minHeight: 360,
                // paddingRight: "16px",
                background: colorBgContainer,
              }}
            >
              <Tabs
                items={[
                  {
                    key: "1",
                    label: "Luci",
                    children: (
                      <>
                        <Flex>
                          {activeZone?.luci
                            ?.filter((item) => item.hide !== true)
                            .map((component, index) => (
                              <LuciComponent key={index} item={component} />
                            ))}
                        </Flex>
                      </>
                    ),
                  },
                  {
                    key: "2",
                    disabled: !activeZone?.tende?.length,
                    label: "Tende",
                    children: (
                      <Row style={{ gap: 8 }}>
                        {activeZone?.tende

                          ?.filter((item) => item.hide !== true)
                          .map((component, index) => (
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
