import { Button, Divider, Flex } from "antd";
import { FunctionComponent } from "react";
import { sendDigitalPulse } from "../../helpers/crestron";

interface DashboardProps {}

const Dashboard: FunctionComponent<DashboardProps> = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "left",
        alignItems: "normal",
        height: "calc(100vh - 64px)",
        gap: "32px",
      }}
    >
      <div
        style={{
          width: "480px",
          flex: "1 0 auto",
          overflow: "hidden",
          height: "472px",
          backgroundColor: "#131224",
          borderRadius: "16px",
          pointerEvents: "none",
        }}
      >
        <iframe
          style={{
            width: "480px",
            overflow: "hidden",
            height: "472px",
            border: "none",
            pointerEvents: "none",
          }}
          src="/weather-iframe.html"
        ></iframe>
      </div>
      <div style={{ flexGrow: 1, paddingTop: "64px" }}>
        <h2 style={{ marginBottom: "64px" }}>Comandi rapidi</h2>
        <Flex gap={16}>
          <Button
            onClick={() => sendDigitalPulse(15)}
            size="large"
            type="primary"
          >
            Apri cancello pedonale
          </Button>
          <Button
            onClick={() => sendDigitalPulse(16)}
            size="large"
            type="primary"
          >
            Apri cancello auto
          </Button>
        </Flex>
        <Divider></Divider>
        <Flex gap={16} wrap="wrap">
          <Button onClick={() => sendDigitalPulse(10)} size="large">
            Spegni zona notte
          </Button>
          <Button onClick={() => sendDigitalPulse(11)} size="large">
            Spegni zona giorno
          </Button>
          <Button onClick={() => sendDigitalPulse(12)} size="large">
            Spegni piano interrato
          </Button>
        </Flex>
        <Divider></Divider>
        <Flex gap={16} wrap="wrap">
          <Button onClick={() => sendDigitalPulse(13)} size="large" danger>
            Spegni tutta casa
          </Button>
          <Button onClick={() => sendDigitalPulse(14)} size="large" danger>
            Spegni zona esterna
          </Button>
        </Flex>
      </div>
    </div>
  );
};

export default Dashboard;
