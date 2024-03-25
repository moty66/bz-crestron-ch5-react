import { Button } from "antd";
import { FunctionComponent } from "react";
import useSendDigital from "../../hooks/use-send-digital";
import useSendAnalog from "../../hooks/use-send-analog";
import useSendSerial from "../../hooks/use-send-serial";

interface LuciComponentProps {}

const LuciComponent: FunctionComponent<LuciComponentProps> = () => {
  const [digitalState, sendDigital] = useSendDigital(1);
  const [analogState, sendAnalog] = useSendAnalog(1);
  const [serialState, sendSerial] = useSendSerial(1);

  return (
    <div id="controlGroupWrapper">
      <div className="controlGroup">
        <Button
          id="sendDigitalButton"
          className="btn"
          onClick={() => sendDigital(!digitalState)}
        >
          Toggle Digital
        </Button>
        <p id="currentDigitalValue">{digitalState.toString()}</p>
      </div>
      <div className="controlGroup">
        <p id="currentAnalogValue">{analogState}</p>
        <input
          type="range"
          min="0"
          max="65535"
          value={analogState}
          placeholder="32767"
          id="analogSlider"
          onChange={(e) => sendAnalog(Number(e.target.value))}
        />
      </div>
      <div className="controlGroup">
        <input
          type="text"
          name="Data"
          id="currentSerialValue"
          placeholder="Placeholder"
          value={serialState}
          onChange={(e) => sendSerial(e.target.value)}
        />
      </div>
    </div>
  );
};

export default LuciComponent;
