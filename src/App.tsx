import { BellOutlined, HomeOutlined, PictureOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import "./assets/App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Door from "./components/door/Door";
import ZonesHandler from "./components/zones/zones-handler";
import useSendDigital from "./hooks/use-send-digital";
import useWebXPanel from "./hooks/useWebXPanel";

const { Content, Sider } = Layout;
// Initialize eruda for panel/app debugging capabilities (in dev mode only)
if (import.meta.env.VITE_APP_ENV === "development") {
  import("eruda").then(({ default: eruda }) => {
    eruda.init();
  });
}

function App() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [doorBell] = useSendDigital("2");
  useEffect(() => {
    console.log("DoorBell", doorBell);
    if (doorBell) {
      setActiveNav("door");
    }
  }, [doorBell]);

  // const [digitalState, setDigitalState] = useState(false);
  // const [analogState, setAnalogState] = useState(0);
  // const [serialState, setSerialState] = useState("");

  // DEV
  // const config = {
  //   ipId: "0x03",
  //   host: "192.168.1.123",
  //   roomId: "",
  //   authToken:
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsIlNvdXJjZSI6IkNvbnRyb2wgU3lzdGVtIn0.eyJleHAiOjE3MTEwMzAxNDQsInVzZXJuYW1lIjoiT2ZmbGluZVRva2VuIiwiT3B0aW9uYWwiOiI1MjIyODEwMzQifQ.2IalK01LXz5bzexqVFQAuZ9VrCSzJFJNNiop-dtHOVs",
  // };

  // PROD
  const config = {
    ipId: "0x03",
    host: "192.168.179.5",
    roomId: "",
    authToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsIlNvdXJjZSI6IkNvbnRyb2wgU3lzdGVtIn0.eyJleHAiOjE3MTI1NjM0NDEsInVzZXJuYW1lIjoiT2ZmbGluZVRva2VuIiwiT3B0aW9uYWwiOiIyMDI5OTY4OTk5In0.CacPpltp3EIgxPagq8Xz9SXPsi0MM_Cevimui8Tq5EY",
  };

  const webXPanelConfig = useMemo(() => config, []); // Dependencies array is empty, so this object is created only once

  useWebXPanel(webXPanelConfig);

  const items = [
    { icon: PictureOutlined, value: "dashboard" },
    { icon: HomeOutlined, value: "home" },
    { icon: BellOutlined, value: "door" },
    // { icon: VideoCameraOutlined, value: "nav2" },
    // { icon: SecurityScanOutlined, value: "nav3" },
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
    <Layout>
      <Sider collapsible={false} collapsed={true}>
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
      <Layout style={{ width: "100%", minHeight: "100vh" }}>
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
            <Content
              style={{ display: activeNav === "home" ? "block" : "none" }}
            >
              <ZonesHandler />
            </Content>
            {activeNav === "door" && (
              <Content>
                <Door />
              </Content>
            )}
            {activeNav === "dashboard" && (
              <Content>
                <Dashboard />
              </Content>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
