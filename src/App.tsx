import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { useMemo, useState } from "react";
import "./assets/App.css";
import { IFloor } from "./components/luci/luci-config";
import Topbar from "./components/topbar/topbar";
import ZonesHandler from "./components/zones/zones-handler";
import useWebXPanel from "./hooks/useWebXPanel";

const { Content, Sider } = Layout;
// Initialize eruda for panel/app debugging capabilities (in dev mode only)
if (import.meta.env.VITE_APP_ENV === "development") {
  import("eruda").then(({ default: eruda }) => {
    eruda.init();
  });
}

function App() {
  const [activeNav, setActiveNav] = useState("nav1");
  const [activeFloor, setActiveFloor] = useState<IFloor>();
  // const [digitalState, setDigitalState] = useState(false);
  // const [analogState, setAnalogState] = useState(0);
  // const [serialState, setSerialState] = useState("");

  const webXPanelConfig = useMemo(
    () => ({
      ipId: "0x06",
      host: "192.168.1.123",
      roomId: "",
      authToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsIlNvdXJjZSI6IkNvbnRyb2wgU3lzdGVtIn0.eyJleHAiOjE3MTEwMzAxNDQsInVzZXJuYW1lIjoiT2ZmbGluZVRva2VuIiwiT3B0aW9uYWwiOiI1MjIyODEwMzQifQ.2IalK01LXz5bzexqVFQAuZ9VrCSzJFJNNiop-dtHOVs",
    }),
    []
  ); // Dependencies array is empty, so this object is created only once

  useWebXPanel(webXPanelConfig);

  const items = [
    { icon: UserOutlined, value: "nav1" },
    { icon: VideoCameraOutlined, value: "nav2" },
    { icon: UploadOutlined, value: "nav3" },
    { icon: UserOutlined, value: "nav4" },
  ].map((el, index) => ({
    key: String(index + 1),
    icon: React.createElement(el.icon, {
      style: {
        fontSize: "1.5rem",
        transform: "scale(2.5)",
      },
    }),
    className: "gradient",
    style: {
      height: "67px",
      marginBottom: "4px",
      display: "flex",
      alignItems: "center",
    },
    // label: `nav ${index + 1}`,
    onClick: () => setActiveNav(el.value),
  }));

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        collapsible
        collapsed={true}
      >
        <div className="demo-logo-vertical" />
        <Menu
          mode="inline"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: colorBgContainer,
            height: "100%",
            width: "100%",
            paddingLeft: "2px",
            paddingRight: "2px",
          }}
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Topbar onFloorChange={setActiveFloor} activeFloor={activeFloor} />
        <Content style={{ margin: "16px 16px" }}>
          <div
            style={{
              padding: 16,
              minHeight: 360,
              height: "100%",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {activeNav === "nav1" && activeFloor && (
              <ZonesHandler activeFloor={activeFloor} />
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
