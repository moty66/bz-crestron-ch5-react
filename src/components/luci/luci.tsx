import { Button, Slider } from "antd";
import { FunctionComponent } from "react";
import useSendAnalog from "../../hooks/use-send-analog";
import useSendDigital from "../../hooks/use-send-digital";

interface LuciComponentProps {
  onToggle?: () => void;
}

const LuciComponent: FunctionComponent<LuciComponentProps> = () => {
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
        <p style={{ fontSize: "1.2rem", height: 48, overflow: "hidden" }}>
          {"Faretto corridoio esterno asdas dasdas dasd asdasdasd asd a"}
        </p>
        <p style={{ fontSize: "1.1rem" }} id="currentAnalogValue">
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
          style={{ height: "67px", width: 67 }}
        >
          {digitalState.toString() === "true" ? "ON" : "OFF"}
        </Button>
      </div>
    </div>
  );
};

export default LuciComponent;
