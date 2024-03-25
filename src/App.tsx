import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { useMemo, useState } from "react";
import "./assets/App.css";
import TestComponent from "./components/test-components";
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
        transform: "scale(1.5)",
      },
    }),
    style: {
      height: "76px",
    },
    // label: `nav ${index + 1}`,
    onClick: () => setActiveNav(el.value),
  }));

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        // breakpoint="none"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        width={80}
        style={{ width: "100%", display: "flex", alignItems: "center" }}
      >
        <Menu
          mode="inline"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: colorBgContainer,
            height: "100%",
            width: "100%",
          }}
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Sider>
      <Layout>
        <div style={{ margin: "16px 16px 0" }}>
          <div
            style={{
              minHeight: 80,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            qui
          </div>
        </div>
        <Content style={{ margin: "24px 16px 0", width: "100%" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              height: "100%",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {activeNav === "nav1" && <TestComponent />}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
