import { Button, Slider } from "antd";
import { FunctionComponent } from "react";
import useSendAnalog from "../../hooks/use-send-analog";
import useSendDigital from "../../hooks/use-send-digital";
import { IZoneComponent } from "./luci-config";

interface LuciComponentProps {
  onToggle?: () => void;
  item: IZoneComponent;
}

const LuciComponent: FunctionComponent<LuciComponentProps> = ({ item }) => {
  const [digitalState, sendPulse] = useSendDigital(1);
  const [analogState, sendAnalog] = useSendAnalog(1);

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
        <p
          style={{ fontSize: "1.1rem", marginBottom: 8, marginTop: 8 }}
          id="currentAnalogValue"
        >
          {analogState}
        </p>
        <Slider
          value={analogState}
          style={{ height: 320 }}
          min={0}
          max={65535}
          vertical
          defaultValue={analogState}
          onChange={(e) => sendAnalog(Number(e))}
        />
        <Button
          onClick={() => sendPulse(!digitalState)}
          style={{
            height: "48px",
            width: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {digitalState.toString() === "true" ? "ON" : "OFF"}
        </Button>
      </div>
    </div>
  );
};

export default LuciComponent;
